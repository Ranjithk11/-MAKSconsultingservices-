import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";
import { StudioCard } from "@/components/contact/StudioCard";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { studio } from "@/content/site";

export const metadata: Metadata = {
  title: "Participate",
  description: `Send MAKS on WhatsApp to ${studio.phoneDisplay}, or write to ${studio.email}.`,
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; channel?: string }>;
}) {
  return (
    <Container className="py-14 sm:py-16 lg:py-24">
      <SectionLabel>Participate</SectionLabel>
      <h1 className="mt-4 max-w-3xl font-heading text-4xl tracking-tight sm:text-6xl">
        Want to join a group of ten?
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
        Send the word MAKS on WhatsApp to {studio.phoneDisplay}, or leave a note here.
        A person replies on weekdays. The note is stored before any letter is sent.
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
