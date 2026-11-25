import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { offerings, type Offering } from "@/content/offerings";
import { joinWhatsAppHref } from "@/content/site";
import { cn } from "@/lib/utils";

export function OfferingView({ offering }: { offering: Offering }) {
  const others = offerings.filter((item) => item.slug !== offering.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-[#071426] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,180,196,0.28),transparent_52%),radial-gradient(ellipse_at_bottom_left,rgba(22,78,168,0.5),transparent_48%)]"
        />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <p className="text-[0.72rem] uppercase tracking-[0.28em] text-cyan-100/80">
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <span className="mx-2">/</span>
            {offering.index}
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-heading text-4xl leading-[0.98] tracking-tight text-white sm:text-6xl">
            {offering.name}
          </h1>
          <p className="mt-5 max-w-2xl font-heading text-2xl tracking-tight text-cyan-100 sm:text-3xl">
            {offering.promise}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            {offering.lede}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/contact?service=${offering.slug}`}
              className={cn(buttonVariants({ size: "xl" }), "bg-white text-[#071426] hover:bg-white/90")}
            >
              Ask about this service
            </Link>
            <a
              href={joinWhatsAppHref()}
              className={cn(
                buttonVariants({ size: "xl", variant: "outline" }),
                "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white",
              )}
            >
              WhatsApp the desk
            </a>
          </div>
          <dl className="mt-12 grid gap-3 sm:grid-cols-3">
            {offering.facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 sm:p-5">
                <dt className="font-heading text-2xl tracking-tight text-white sm:text-3xl">{fact.value}</dt>
                <dd className="mt-2 text-sm leading-5 text-white/70">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>Who it is for</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl tracking-tight sm:text-4xl">The person in the room.</h2>
          </div>
          <p className="text-base leading-8 text-muted-foreground lg:col-span-8 lg:text-lg">{offering.audience}</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionLabel>How it proceeds</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-heading text-4xl tracking-tight sm:text-5xl">The work, in order.</h2>
          <ol className="mt-10 grid gap-4 lg:grid-cols-2">
            {offering.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                <p className="font-heading text-3xl text-brass">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-heading text-2xl tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-y border-border bg-paper-deep/60 py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>You leave with</SectionLabel>
            <ul className="mt-6 space-y-4">
              {offering.delivers.map((item) => (
                <li key={item} className="border-t border-border pt-4 text-base leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            {offering.notes.map((note) => (
              <article key={note.title} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                <h3 className="font-heading text-2xl tracking-tight">{note.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{note.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-2xl border border-[#071426] bg-[#071426] p-6 text-white sm:p-8">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-cyan-100/80">The limit</p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/80 sm:text-lg">{offering.boundary}</p>
          </div>
          <h2 className="mt-16 font-heading text-3xl tracking-tight sm:text-4xl">The other services</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="flex items-baseline justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4 hover:border-brass"
                >
                  <span>
                    <span className="mr-3 text-sm text-brass">{item.index}</span>
                    <span className="font-heading text-xl">{item.name}</span>
                  </span>
                  <span className="text-sm text-muted-foreground">Open</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
