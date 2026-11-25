import { FirmHero } from "@/components/home/FirmHero";
import { ServiceGrid } from "@/components/home/ServiceGrid";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { JoinBand } from "@/components/scheme/JoinBand";
import { engagement } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <FirmHero />
      <ServiceGrid />
      <section className="border-t border-border bg-paper-deep/50 py-16 sm:py-20">
        <Container>
          <SectionLabel>How we work</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-heading text-4xl tracking-tight sm:text-5xl">
            The same desk, a different page for each service.
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {engagement.map((step) => (
              <li key={step.index} className="rounded-2xl border border-border bg-card p-5">
                <p className="font-heading text-3xl text-brass">{step.index}</p>
                <h3 className="mt-3 font-heading text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <JoinBand />
    </>
  );
}
