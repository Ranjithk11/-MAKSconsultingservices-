import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { advantages } from "@/content/site";

export function Advantages() {
  return (
    <section id="advantages" className="scroll-mt-28 border-y border-border bg-paper-deep/60 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionLabel>Why members join</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-heading text-4xl tracking-tight sm:text-5xl">
          The same terms, written down.
        </h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
            <li key={item.title} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <h3 className="font-heading text-2xl tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
