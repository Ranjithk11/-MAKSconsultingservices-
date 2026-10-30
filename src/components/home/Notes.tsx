import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { notes } from "@/content/site";

export function Notes() {
  return (
    <section className="bg-forest py-20 text-paper lg:py-28">
      <Container>
        <SectionLabel>
          <span className="text-brass-bright">From the work</span>
        </SectionLabel>
        <ul className="mt-10 grid gap-10 lg:grid-cols-3">
          {notes.map((note) => (
            <li key={note} className="border-t border-paper/20 pt-6">
              <p className="font-heading text-2xl leading-snug tracking-tight">{note}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
