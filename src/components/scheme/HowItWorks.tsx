import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { steps } from "@/content/site";

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-28 border-b border-border py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionLabel>How it works</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-heading text-4xl tracking-tight sm:text-5xl">
          Four rules. The same ones for every member.
        </h2>
        <ol className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.index}
              className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[0_18px_40px_-28px_rgba(7,26,51,0.45)] sm:p-6"
            >
              <p className="font-heading text-3xl text-brass">{step.index}</p>
              <h3 className="mt-4 font-heading text-2xl tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
