import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { buttonVariants } from "@/components/ui/button";
import { engagement, studio } from "@/content/site";

export const metadata: Metadata = {
  title: "How we work",
  description: `How ${studio.name} in ${studio.city} takes on one service at a time and leaves the writing with you.`,
};

export default function PracticePage() {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <SectionLabel>How we work</SectionLabel>
      <h1 className="mt-4 max-w-3xl font-heading text-4xl tracking-tight sm:text-6xl">
        One service is named before the work starts.
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
        {studio.name} keeps six services. They are not bundled into a single pitch. A coin-scheme group, a financial brief, a consulting season, a digital-holding review, a website, and a marketing note each end with something you can read.
      </p>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2">
        {engagement.map((step) => (
          <li key={step.index} className="rounded-2xl border border-border bg-card p-6">
            <p className="font-heading text-3xl text-brass">{step.index}</p>
            <h2 className="mt-3 font-heading text-3xl tracking-tight">{step.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
      <Link href="/services" className={`${buttonVariants({ size: "xl" })} mt-12`}>
        Choose a service
      </Link>
    </Container>
  );
}
