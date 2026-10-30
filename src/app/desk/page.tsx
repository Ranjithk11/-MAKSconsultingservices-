import type { Metadata } from "next";
import { DeskBoard } from "@/components/desk/DeskBoard";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";

export const metadata: Metadata = {
  title: "Studio desk",
  description: "Stored notes, the mail and WhatsApp outbox, and the agent transcript.",
  robots: { index: false, follow: false },
};

export default function DeskPage() {
  return (
    <Container className="py-16 lg:py-24">
      <SectionLabel>Operator</SectionLabel>
      <h1 className="mt-4 font-heading text-5xl tracking-tight sm:text-6xl">Studio desk</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        Everything the site stores: notes, letters waiting or sent, WhatsApp
        inbound, and what the agent was asked. This is the database, not a
        separate product.
      </p>
      <div className="mt-12">
        <DeskBoard />
      </div>
    </Container>
  );
}
