import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { offerings } from "@/content/offerings";

export function ServiceGrid() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionLabel>The practice</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-heading text-4xl tracking-tight sm:text-5xl">
          Choose the page that matches the work.
        </h2>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {offerings.map((offering) => (
            <li key={offering.slug}>
              <Link
                href={`/services/${offering.slug}`}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-[0_18px_40px_-28px_rgba(7,26,51,0.45)] sm:p-6"
              >
                <p className="text-sm text-brass">{offering.index}</p>
                <h3 className="mt-3 font-heading text-3xl tracking-tight">{offering.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{offering.short}</p>
                <p className="mt-4 text-sm leading-6">{offering.promise}</p>
                <span className="mt-6 text-sm underline decoration-brass underline-offset-4">
                  Read {offering.name.toLowerCase()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
