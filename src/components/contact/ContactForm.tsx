"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { services, serviceSlugs, type ServiceSlug } from "@/content/site";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string; field?: string }
  | { kind: "success"; reference: string; mail: string; whatsapp: string | null };

const fieldClass = "h-12 rounded-sm bg-background px-3";

export function ContactForm({
  initialService,
  initialChannel,
}: {
  initialService?: string;
  initialChannel?: string;
}) {
  const startingService = serviceSlugs.includes(initialService as ServiceSlug)
    ? (initialService as ServiceSlug)
    : "database-storage";
  const startingChannel = initialChannel === "whatsapp" ? "whatsapp" : "mail";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [service, setService] = useState<ServiceSlug>(startingService);
  const [channel, setChannel] = useState<"mail" | "whatsapp">(startingChannel);
  const [message, setMessage] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "submitting" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          organisation,
          service,
          channel,
          message,
          companyWebsite,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        field?: string;
        reference?: string;
        mail?: string;
        whatsapp?: string | null;
      };
      if (!response.ok || !data.ok || !data.reference) {
        setStatus({
          kind: "error",
          message: data.error ?? "The note did not go through.",
          field: data.field,
        });
        return;
      }
      setStatus({
        kind: "success",
        reference: data.reference,
        mail: data.mail ?? "queued",
        whatsapp: data.whatsapp ?? null,
      });
    } catch {
      setStatus({
        kind: "error",
        message: "The desk could not be reached. Check the connection and try again.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="border border-border p-6 sm:p-8" role="status">
        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">Note received</p>
        <h2 className="mt-3 font-heading text-4xl tracking-tight">{status.reference}</h2>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{mailCopy(status.mail)}</p>
        {status.whatsapp ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {whatsappCopy(status.whatsapp)}
          </p>
        ) : null}
        <Button
          type="button"
          variant="outline"
          size="xl"
          className="mt-8"
          onClick={() => {
            setMessage("");
            setStatus({ kind: "idle" });
          }}
        >
          Send another note
        </Button>
      </div>
    );
  }

  const errorField = status.kind === "error" ? status.field : undefined;
  const errorMessage = status.kind === "error" ? status.message : "";

  return (
    <form onSubmit={onSubmit} className="relative border border-border p-6 sm:p-8" noValidate>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Company website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={companyWebsite}
            onChange={(event) => setCompanyWebsite(event.target.value)}
          />
        </label>
      </div>
      <div className="grid gap-5">
        <Field id="name" label="Name" error={errorField === "name" ? errorMessage : ""}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClass}
            aria-invalid={errorField === "name"}
            required
          />
        </Field>
        <Field id="email" label="Email" error={errorField === "email" ? errorMessage : ""}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass}
            aria-invalid={errorField === "email"}
            required
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="phone"
            label={channel === "whatsapp" ? "WhatsApp number" : "Phone, if you like"}
            error={errorField === "phone" ? errorMessage : ""}
          >
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={fieldClass}
              aria-invalid={errorField === "phone"}
              required={channel === "whatsapp"}
            />
          </Field>
          <Field id="organisation" label="Organisation" error="">
            <Input
              id="organisation"
              name="organisation"
              autoComplete="organization"
              value={organisation}
              onChange={(event) => setOrganisation(event.target.value)}
              className={fieldClass}
            />
          </Field>
        </div>
        <Field id="service" label="System" error={errorField === "service" ? errorMessage : ""}>
          <select
            id="service"
            name="service"
            value={service}
            onChange={(event) => setService(event.target.value as ServiceSlug)}
            className="h-12 w-full rounded-sm border border-input bg-background px-3 text-sm"
          >
            {services.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>
        <fieldset>
          <legend className="text-sm font-medium">How should we reply?</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(
              [
                ["mail", "Mail"],
                ["whatsapp", "WhatsApp"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={cn(
                  "flex cursor-pointer items-center justify-center border px-3 py-3 text-sm",
                  channel === value
                    ? "border-forest bg-forest text-paper"
                    : "border-border bg-background",
                )}
              >
                <input
                  type="radio"
                  name="channel"
                  value={value}
                  checked={channel === value}
                  onChange={() => setChannel(value)}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        <Field id="message" label="The note" error={errorField === "message" ? errorMessage : ""}>
          <Textarea
            id="message"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="min-h-36 rounded-sm bg-background px-3 py-3"
            aria-invalid={errorField === "message"}
            required
          />
        </Field>
        {status.kind === "error" && !status.field ? (
          <p className="text-sm text-destructive" role="alert">
            {status.message}
          </p>
        ) : null}
        <Button type="submit" size="xl" disabled={status.kind === "submitting"}>
          {status.kind === "submitting" ? "Sending the note…" : "Send to the desk"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function mailCopy(mail: string) {
  if (mail === "sent") return "Your note is stored, and a letter is on its way.";
  if (mail === "failed") {
    return "Your note is stored. The mail service reported a problem, and the studio can still read it on the desk.";
  }
  return "Your note is stored on the desk. Mail is not connected on this host, so the letter is waiting in the outbox and has not been marked sent.";
}

function whatsappCopy(status: string) {
  if (status === "sent") return "A WhatsApp acknowledgement was handed to the Cloud API.";
  if (status === "failed") return "WhatsApp did not accept the reply. The attempt is on the desk.";
  return "A WhatsApp reply is queued on the desk. It will send when the Cloud API is connected.";
}
