import "server-only";

import { randomBytes } from "node:crypto";
import { insertLead } from "@/services/database";
import { deliverMail } from "@/services/mail";
import { normalizePhone } from "@/services/phone";
import type { ContactInput } from "@/services/validation";
import { deliverWhatsApp } from "@/services/whatsapp";

export async function receiveNote(input: ContactInput) {
  const lead = insertLead({
    reference: `MAKS-${new Date().getFullYear()}-${randomBytes(3).toString("hex").toUpperCase()}`,
    name: input.name,
    email: input.email,
    phone: input.phone ? (normalizePhone(input.phone) ?? input.phone) : "",
    organisation: input.organisation,
    service: input.service,
    message: input.message,
    channel: input.channel,
  });
  const mail = await deliverMail(lead);
  const whatsapp =
    input.channel === "whatsapp" ? await deliverWhatsApp(lead) : null;
  return { reference: lead.reference, mail, whatsapp };
}
