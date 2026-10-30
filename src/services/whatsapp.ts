import "server-only";

import { getService, studio } from "@/content/site";
import { recordOutbox, storeInboundWhatsApp, type Lead } from "@/services/database";
import { normalizePhone } from "@/services/phone";

export function whatsAppHref(message = studio.greeting) {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "").replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function acknowledgementBody(lead: Lead) {
  const service = getService(lead.service)?.name ?? lead.service;
  return [
    `MAKS desk received your note ${lead.reference}.`,
    `System: ${service}.`,
    `We reply on weekdays, 10:00–18:00 IST.`,
  ].join("\n");
}

export async function deliverWhatsApp(lead: Lead) {
  const to = normalizePhone(lead.phone);
  const body = acknowledgementBody(lead);
  if (!to) {
    recordOutbox({
      leadId: lead.id,
      channel: "whatsapp",
      recipient: lead.phone,
      subject: lead.reference,
      body,
      status: "failed",
      detail: "The phone number could not be normalised.",
    });
    return "failed" as const;
  }

  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) {
    recordOutbox({
      leadId: lead.id,
      channel: "whatsapp",
      recipient: to,
      subject: lead.reference,
      body,
      status: "queued",
      detail:
        "WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID is not set. The message is stored on the desk.",
    });
    return "queued" as const;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to,
          type: "text",
          text: { preview_url: false, body },
        }),
      },
    );
    const detail = await response.text();
    if (!response.ok) {
      recordOutbox({
        leadId: lead.id,
        channel: "whatsapp",
        recipient: to,
        subject: lead.reference,
        body,
        status: "failed",
        detail: detail.slice(0, 500) || `WhatsApp returned ${response.status}.`,
      });
      return "failed" as const;
    }
    recordOutbox({
      leadId: lead.id,
      channel: "whatsapp",
      recipient: to,
      subject: lead.reference,
      body,
      status: "sent",
      detail: "Accepted by the WhatsApp Cloud API.",
    });
    return "sent" as const;
  } catch (error) {
    const detail = error instanceof Error ? error.message : "WhatsApp failed.";
    recordOutbox({
      leadId: lead.id,
      channel: "whatsapp",
      recipient: to,
      subject: lead.reference,
      body,
      status: "failed",
      detail: detail.slice(0, 500),
    });
    return "failed" as const;
  }
}

export type InboundMessage = {
  messageId: string;
  fromNumber: string;
  body: string;
};

export function parseInboundMessages(payload: unknown): InboundMessage[] {
  if (!payload || typeof payload !== "object") return [];
  const entries = (payload as { entry?: unknown }).entry;
  if (!Array.isArray(entries)) return [];
  const messages: InboundMessage[] = [];
  for (const entry of entries) {
    const changes = (entry as { changes?: unknown }).changes;
    if (!Array.isArray(changes)) continue;
    for (const change of changes) {
      const value = (change as { value?: { messages?: unknown } }).value;
      const list = value?.messages;
      if (!Array.isArray(list)) continue;
      for (const message of list) {
        if (!message || typeof message !== "object") continue;
        const item = message as {
          id?: unknown;
          from?: unknown;
          type?: unknown;
          text?: { body?: unknown };
        };
        if (item.type !== "text" || typeof item.text?.body !== "string") continue;
        if (typeof item.id !== "string" || typeof item.from !== "string") continue;
        messages.push({
          messageId: item.id,
          fromNumber: item.from,
          body: item.text.body.slice(0, 4000),
        });
      }
    }
  }
  return messages;
}

export function keepInboundMessages(messages: InboundMessage[]) {
  for (const message of messages) {
    storeInboundWhatsApp(message);
  }
}
