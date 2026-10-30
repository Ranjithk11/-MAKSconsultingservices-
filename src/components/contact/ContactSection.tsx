import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";

export function ContactSection({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; channel?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <p className="border border-border p-8 text-sm text-muted-foreground">
          Opening the form…
        </p>
      }
    >
      <ContactFormReady searchParams={searchParams} />
    </Suspense>
  );
}

async function ContactFormReady({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; channel?: string }>;
}) {
  const params = await searchParams;
  return (
    <ContactForm initialService={params.service} initialChannel={params.channel} />
  );
}
