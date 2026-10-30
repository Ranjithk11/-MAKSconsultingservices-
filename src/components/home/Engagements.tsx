import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Photo } from "@/components/media/Photo";
import { engagements } from "@/content/site";

export function Engagements() {
  return (
    <section className="py-20 lg:py-28" id="engagements">
      <Container>
        <SectionLabel>Selected engagements</SectionLabel>
        <h2 className="mt-4 max-w-xl font-heading text-4xl tracking-tight sm:text-5xl">
          The shape of the work.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
          Composite accounts. Client names are withheld.
        </p>
        <ul className="mt-12 grid gap-10 lg:grid-cols-3">
          {engagements.map((engagement) => (
            <li key={engagement.title}>
              <Photo
                src={engagement.image}
                alt={engagement.imageAlt}
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="aspect-[4/3]"
              />
              <p className="mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-brass">
                {engagement.place}
              </p>
              <h3 className="mt-2 font-heading text-2xl tracking-tight">
                {engagement.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {engagement.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
