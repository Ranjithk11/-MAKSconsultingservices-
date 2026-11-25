import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { offerings } from "@/content/offerings";
import { studio } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Six services from ${studio.name} in ${studio.city}: coin scheme, financial advice, business consulting, digital investment, websites, and marketing suggestions.`,
};

export default function ServicesPage() {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <SectionLabel>Services</SectionLabel>
      <h1 className="mt-4 max-w-3xl font-heading text-4xl tracking-tight sm:text-6xl">
        Six services, each with its own page.
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
        Read the one that matches the work. The coin scheme keeps its group rules and payout table. The others are advice, an engagement, or a build — and they say so.
      </p>
      <ol className="mt-12 divide-y divide-border border-y border-border">
        {offerings.map((offering) => (
          <li key={offering.slug}>
            <Link
              href={`/services/${offering.slug}`}
              className="grid gap-4 py-8 sm:grid-cols-12 sm:items-start sm:gap-8 sm:py-10"
            >
              <p className="font-heading text-3xl text-brass sm:col-span-2">{offering.index}</p>
              <div className="sm:col-span-4">
                <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">{offering.name}</h2>
              </div>
              <p className="text-sm leading-6 text-muted-foreground sm:col-span-6 sm:text-base sm:leading-7">
                {offering.lede}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </Container>
  );
}
