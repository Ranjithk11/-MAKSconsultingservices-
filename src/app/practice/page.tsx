import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Photo } from "@/components/media/Photo";
import { buttonVariants } from "@/components/ui/button";
import { method, refusals, studio } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "MAKS is a small Kolkata practice. One system at a time, for a first season of ninety days.",
};

export default function PracticePage() {
  return (
    <>
      <Container className="py-16 lg:py-24">
        <SectionLabel>Practice</SectionLabel>
        <h1 className="mt-4 max-w-3xl font-heading text-5xl tracking-tight sm:text-6xl">
          A Kolkata desk for firms that already have enough software.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
          {studio.name} is a small practice. We design and operate the five
          systems a firm quietly depends on: the database, the host, the mail,
          the WhatsApp line, and the agents.
        </p>
      </Container>
      <Container>
        <figure>
          <Photo
            src="/images/practice-courtyard.jpg"
            alt="A weathered courtyard studio with stone floors, plaster columns, and a row of potted palms."
            sizes="(min-width: 1024px) 72rem, 100vw"
            priority
            className="aspect-[16/9]"
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">
            Kolkata. Visits by appointment.
          </figcaption>
        </figure>
      </Container>
      <Container className="grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-heading text-3xl tracking-tight">When we are hired</h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              A spreadsheet has become the database. The host is a laptop
              someone takes home. The firm mail lands in spam. Clients are
              writing to a personal WhatsApp. Or someone has proposed an agent
              that would be allowed to hit send.
            </p>
            <p>
              We take one system at a time. A first season is ninety days. At
              the end of it the credentials are yours, the runbook is short,
              and you can ask us to leave.
            </p>
          </div>
        </div>
        <div className="lg:col-span-5">
          <h2 className="font-heading text-3xl tracking-tight">What we will not do</h2>
          <ul className="mt-6 space-y-4">
            {refusals.map((item) => (
              <li key={item} className="border-t border-border pt-4 text-sm leading-6">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="pb-8">
        <h2 className="font-heading text-3xl tracking-tight">The season</h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2">
          {method.map((step) => (
            <li key={step.index} className="border-t border-border pt-5">
              <p className="text-sm text-brass">{step.index}</p>
              <h3 className="mt-2 font-heading text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
      <Container className="grid gap-8 py-16 lg:grid-cols-2">
        <div className="border border-border p-6 sm:p-8">
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">Visit</p>
          <p className="mt-4 font-heading text-3xl">{studio.city}</p>
          <p className="mt-3 text-sm leading-6">{studio.visit}</p>
          <p className="text-sm leading-6">{studio.hours}</p>
          <a
            href={`mailto:${studio.email}`}
            className="mt-4 inline-block text-sm underline decoration-brass underline-offset-4"
          >
            {studio.email}
          </a>
        </div>
        <div className="flex flex-col justify-between border border-forest bg-forest p-6 text-paper sm:p-8">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass-bright">
              A working session
            </p>
            <p className="mt-4 font-heading text-3xl">Tell us which system is failing.</p>
          </div>
          <Link href="/contact" className={cn(buttonVariants({ size: "xl" }), "mt-8 bg-paper text-forest hover:bg-paper/90")}>
            Write to the desk
          </Link>
        </div>
      </Container>
    </>
  );
}
