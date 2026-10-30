import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { ServiceDirectory } from "@/components/services/ServiceDirectory";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Database storage, a hosting platform, mail, WhatsApp, and agent services from MAKS Consulting Services.",
};

export default function ServicesPage() {
  return (
    <>
      <Container className="py-16 lg:py-24">
        <SectionLabel>Services</SectionLabel>
        <h1 className="mt-4 max-w-3xl font-heading text-5xl tracking-tight sm:text-6xl">
          The five systems.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Each one can stand alone. Most firms arrive with one of them already
          in trouble. We start there, and we do not rename the others until
          they ask.
        </p>
      </Container>
      <ServiceDirectory />
    </>
  );
}
