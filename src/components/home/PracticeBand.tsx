import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Photo } from "@/components/media/Photo";
import { buttonVariants } from "@/components/ui/button";

export function PracticeBand() {
  return (
    <section className="border-y border-border bg-paper-deep/50">
      <Container className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-24">
        <figure>
          <Photo
            src="/images/practice-courtyard.jpg"
            alt="A weathered courtyard studio with stone floors, plaster columns, and a row of potted palms."
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[16/10]"
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">
            The courtyard we work beside.
          </figcaption>
        </figure>
        <div>
          <SectionLabel>The practice</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl tracking-tight sm:text-5xl">
            We stay after the launch.
          </h2>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            We do not sell a platform with your name on it. We sit with the
            people who already do the work, leave the credentials in their
            name, and remain for a first season of ninety days.
          </p>
          <Link href="/practice" className={`${buttonVariants({ size: "xl", variant: "outline" })} mt-8`}>
            Read the practice
          </Link>
        </div>
      </Container>
    </section>
  );
}
