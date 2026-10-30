import "server-only";

import nodemailer from "nodemailer";
import { studio, getService } from "@/content/site";
import { recordOutbox, type Lead } from "@/services/database";

type DeliveryStatus = "queued" | "sent" | "failed";

function fromAddress() {
  return process.env.MAIL_FROM ?? `MAKS Desk <${studio.email}>`;
}

function studioInbox() {
  return process.env.MAIL_TO ?? studio.email;
}

function letter(lead: Lead) {
  const service = getService(lead.service)?.name ?? lead.service;
  const subject = `Desk note ${lead.reference} — ${service}`;
  const text = [
    `A note arrived for the MAKS desk.`,
    ``,
    `Reference: ${lead.reference}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "—"}`,
    `Organisation: ${lead.organisation || "—"}`,
    `System: ${service}`,
    `Reply by: ${lead.channel}`,
    ``,
    lead.message,
  ].join("\n");
  const html = `
    <div style="background:#f3efe6;padding:32px;font-family:Georgia,serif;color:#1c1915">
      <p style="letter-spacing:0.18em;text-transform:uppercase;font-size:12px;font-family:Arial,sans-serif;color:#8d6840">MAKS desk</p>
      <h1 style="font-weight:normal;font-size:28px;margin:8px 0 16px">${lead.reference}</h1>
      <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6">
        ${lead.name}<br/>
        ${lead.email}<br/>
        ${lead.phone || "No phone"}<br/>
        ${lead.organisation || "No organisation"}<br/>
        ${service} · reply by ${lead.channel}
      </p>
      <p style="font-size:16px;line-height:1.6;white-space:pre-wrap">${escapeHtml(lead.message)}</p>
    </div>
  `;
  return { subject, text, html };
}

function acknowledgement(lead: Lead) {
  const service = getService(lead.service)?.name ?? lead.service;
  const subject = `We have your note — ${lead.reference}`;
  const text = [
    `Thank you. The MAKS desk has your note.`,
    ``,
    `Reference: ${lead.reference}`,
    `System: ${service}`,
    ``,
    `We reply on weekdays, 10:00–18:00 IST.`,
    `This letter was sent by the mail service on the studio site.`,
  ].join("\n");
  const html = `
    <div style="background:#f3efe6;padding:32px;font-family:Georgia,serif;color:#1c1915">
      <p style="letter-spacing:0.18em;text-transform:uppercase;font-size:12px;font-family:Arial,sans-serif;color:#8d6840">MAKS Consulting Services</p>
      <h1 style="font-weight:normal;font-size:28px;margin:8px 0 16px">We have your note.</h1>
      <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6">
        Reference <strong>${lead.reference}</strong><br/>
        System: ${service}<br/><br/>
        We reply on weekdays, 10:00–18:00 IST.
      </p>
    </div>
  `;
  return { subject, text, html };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

async function transport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
}

async function sendOne(input: {
  leadId: number;
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<DeliveryStatus> {
  if (!process.env.SMTP_HOST) {
    recordOutbox({
      leadId: input.leadId,
      channel: "mail",
      recipient: input.to,
      subject: input.subject,
      body: input.text,
      status: "queued",
      detail: "SMTP_HOST is not set. The letter is stored on the desk.",
    });
    return "queued";
  }

  try {
    const mailer = await transport();
    await mailer.sendMail({
      from: fromAddress(),
      to: input.to,
      replyTo: input.replyTo,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });
    recordOutbox({
      leadId: input.leadId,
      channel: "mail",
      recipient: input.to,
      subject: input.subject,
      body: input.text,
      status: "sent",
      detail: "Accepted by the SMTP host.",
    });
    return "sent";
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Mail failed.";
    recordOutbox({
      leadId: input.leadId,
      channel: "mail",
      recipient: input.to,
      subject: input.subject,
      body: input.text,
      status: "failed",
      detail: detail.slice(0, 500),
    });
    return "failed";
  }
}

export async function deliverMail(lead: Lead) {
  const studioLetter = letter(lead);
  const studioStatus = await sendOne({
    leadId: lead.id,
    to: studioInbox(),
    replyTo: lead.email,
    ...studioLetter,
  });
  const ack = acknowledgement(lead);
  const visitorStatus = await sendOne({
    leadId: lead.id,
    to: lead.email,
    ...ack,
  });
  if (studioStatus === "failed" || visitorStatus === "failed") return "failed";
  if (studioStatus === "sent" && visitorStatus === "sent") return "sent";
  return "queued";
}
