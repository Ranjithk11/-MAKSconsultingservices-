import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";
import { StudioCard } from "@/components/contact/StudioCard";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { studio } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Write to ${studio.name} about a service, or send MAKS on WhatsApp to ${studio.phoneDisplay}.`,
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; channel?: string }>;
}) {
  return (
    <Container className="py-14 sm:py-16 lg:py-24">
      <SectionLabel>Contact</SectionLabel>
      <h1 className="mt-4 max-w-3xl font-heading text-4xl tracking-tight sm:text-6xl">
        Name the service. A person replies.
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
        Choose coin scheme, advice, consulting, digital investment, a website, or a marketing note.
        Or send the word MAKS on WhatsApp to {studio.phoneDisplay}.
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
