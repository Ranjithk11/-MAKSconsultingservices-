import { z } from "zod";
import { serviceSlugs } from "@/content/site";
import { normalizePhone } from "@/services/phone";

export const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Tell us your name.").max(80),
    email: z
      .string()
      .trim()
      .max(120)
      .email("Enter a valid email address."),
    phone: z.string().trim().max(24).optional().default(""),
    organisation: z.string().trim().max(120).optional().default(""),
    service: z.enum(serviceSlugs, "Choose one of the five systems."),
    message: z
      .string()
      .trim()
      .min(12, "A sentence or two is enough.")
      .max(2000),
    channel: z.enum(["mail", "whatsapp"], "Choose how we should reply."),
    companyWebsite: z.string().optional().default(""),
  })
  .superRefine((value, ctx) => {
    if (value.channel === "whatsapp" && !normalizePhone(value.phone)) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message:
          "Enter a mobile number for WhatsApp. A 10-digit Indian number is enough.",
      });
    } else if (value.phone && !normalizePhone(value.phone)) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "That phone number does not look complete.",
      });
    }
  });

export const agentSchema = z.object({
  sessionId: z
    .string()
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      "The conversation could not be kept.",
    ),
  message: z.string().trim().min(1, "Write a question.").max(1000),
});

export const deskKeySchema = z.object({
  key: z.string().min(1).max(200),
});

export type ContactInput = z.infer<typeof contactSchema>;
