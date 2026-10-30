import "server-only";

import fs from "node:fs";
import path from "node:path";
import { DatabaseSync, type SQLInputValue } from "node:sqlite";
import type { ServiceSlug } from "@/content/site";

export type Lead = {
  id: number;
  reference: string;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  service: ServiceSlug;
  message: string;
  channel: "mail" | "whatsapp";
  createdAt: string;
};

export type OutboxItem = {
  id: number;
  leadId: number | null;
  channel: "mail" | "whatsapp";
  recipient: string;
  subject: string;
  body: string;
  status: "queued" | "sent" | "failed";
  detail: string;
  createdAt: string;
};

export type AgentTurn = {
  id: number;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type InboundWhatsApp = {
  id: number;
  messageId: string;
  fromNumber: string;
  body: string;
  createdAt: string;
};

const globalForDb = globalThis as unknown as { maksDb?: DatabaseSync };

function database() {
  if (globalForDb.maksDb) return globalForDb.maksDb;
  const file =
    process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "maks.db");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      organisation TEXT NOT NULL DEFAULT '',
      service TEXT NOT NULL,
      message TEXT NOT NULL,
      channel TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS outbox (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id INTEGER,
      channel TEXT NOT NULL,
      recipient TEXT NOT NULL,
      subject TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL,
      status TEXT NOT NULL,
      detail TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      FOREIGN KEY (lead_id) REFERENCES leads(id)
    );
    CREATE TABLE IF NOT EXISTS agent_turns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS whatsapp_inbound (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message_id TEXT NOT NULL UNIQUE,
      from_number TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
  globalForDb.maksDb = db;
  return db;
}

function text(value: SQLInputValue | undefined) {
  return value == null ? "" : String(value);
}

function leadFromRow(row: Record<string, SQLInputValue>): Lead {
  return {
    id: Number(row.id),
    reference: text(row.reference),
    name: text(row.name),
    email: text(row.email),
    phone: text(row.phone),
    organisation: text(row.organisation),
    service: text(row.service) as ServiceSlug,
    message: text(row.message),
    channel: text(row.channel) as Lead["channel"],
    createdAt: text(row.created_at),
  };
}

export function insertLead(input: Omit<Lead, "id" | "createdAt">) {
  const createdAt = new Date().toISOString();
  const result = database()
    .prepare(
      `INSERT INTO leads
        (reference, name, email, phone, organisation, service, message, channel, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.reference,
      input.name,
      input.email,
      input.phone,
      input.organisation,
      input.service,
      input.message,
      input.channel,
      createdAt,
    );
  return { ...input, id: Number(result.lastInsertRowid), createdAt };
}

export function listLeads(limit = 50): Lead[] {
  return database()
    .prepare(
      "SELECT * FROM leads ORDER BY id DESC LIMIT ?",
    )
    .all(limit)
    .map(leadFromRow);
}

export function recordOutbox(input: Omit<OutboxItem, "id" | "createdAt">) {
  const createdAt = new Date().toISOString();
  database()
    .prepare(
      `INSERT INTO outbox
        (lead_id, channel, recipient, subject, body, status, detail, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.leadId,
      input.channel,
      input.recipient,
      input.subject,
      input.body,
      input.status,
      input.detail,
      createdAt,
    );
}

export function listOutbox(limit = 50): OutboxItem[] {
  return database()
    .prepare("SELECT * FROM outbox ORDER BY id DESC LIMIT ?")
    .all(limit)
    .map((row) => ({
      id: Number(row.id),
      leadId: row.lead_id == null ? null : Number(row.lead_id),
      channel: text(row.channel) as OutboxItem["channel"],
      recipient: text(row.recipient),
      subject: text(row.subject),
      body: text(row.body),
      status: text(row.status) as OutboxItem["status"],
      detail: text(row.detail),
      createdAt: text(row.created_at),
    }));
}

export function insertAgentTurn(input: Omit<AgentTurn, "id" | "createdAt">) {
  const createdAt = new Date().toISOString();
  database()
    .prepare(
      `INSERT INTO agent_turns (session_id, role, content, created_at)
       VALUES (?, ?, ?, ?)`,
    )
    .run(input.sessionId, input.role, input.content, createdAt);
}

export function listAgentTurns(limit = 40): AgentTurn[] {
  return database()
    .prepare("SELECT * FROM agent_turns ORDER BY id DESC LIMIT ?")
    .all(limit)
    .map((row) => ({
      id: Number(row.id),
      sessionId: text(row.session_id),
      role: text(row.role) as AgentTurn["role"],
      content: text(row.content),
      createdAt: text(row.created_at),
    }));
}

export function storeInboundWhatsApp(input: Omit<InboundWhatsApp, "id" | "createdAt">) {
  const createdAt = new Date().toISOString();
  database()
    .prepare(
      `INSERT OR IGNORE INTO whatsapp_inbound
        (message_id, from_number, body, created_at)
       VALUES (?, ?, ?, ?)`,
    )
    .run(input.messageId, input.fromNumber, input.body, createdAt);
}

export function listInboundWhatsApp(limit = 40): InboundWhatsApp[] {
  return database()
    .prepare("SELECT * FROM whatsapp_inbound ORDER BY id DESC LIMIT ?")
    .all(limit)
    .map((row) => ({
      id: Number(row.id),
      messageId: text(row.message_id),
      fromNumber: text(row.from_number),
      body: text(row.body),
      createdAt: text(row.created_at),
    }));
}
