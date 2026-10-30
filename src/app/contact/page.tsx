import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";
import { StudioCard } from "@/components/contact/StudioCard";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to the MAKS desk. Notes are stored, then handed to mail and, if you ask, WhatsApp.",
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; channel?: string }>;
}) {
  return (
    <Container className="py-16 lg:py-24">
      <SectionLabel>Contact</SectionLabel>
      <h1 className="mt-4 max-w-3xl font-heading text-5xl tracking-tight sm:text-6xl">
        Write to the desk.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        Name the system. A person replies on weekdays. The note is stored
        before any letter or WhatsApp message is attempted.
      </p>
      <div className="mt-12 grid items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactSection searchParams={searchParams} />
        </div>
        <div className="lg:col-span-5">
          <StudioCard />
        </div>
      </div>
    </Container>
  );
}
