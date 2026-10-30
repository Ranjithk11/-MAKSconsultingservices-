import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { method } from "@/content/site";

export function Method() {
  return (
    <section className="border-t border-border py-20 lg:py-28">
      <Container>
        <SectionLabel>A first season</SectionLabel>
        <h2 className="mt-4 max-w-xl font-heading text-4xl tracking-tight sm:text-5xl">
          Not a rewrite.
        </h2>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {method.map((step) => (
            <li key={step.index} className="border-t border-border pt-5">
              <p className="text-sm text-brass">{step.index}</p>
              <h3 className="mt-3 font-heading text-3xl tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
