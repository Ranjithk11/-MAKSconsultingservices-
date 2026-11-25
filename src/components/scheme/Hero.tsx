import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { facts, joinWhatsAppHref, scheme, studio } from "@/content/site";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#071426] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,180,196,0.28),transparent_52%),radial-gradient(ellipse_at_bottom_left,rgba(22,78,168,0.55),transparent_48%)]"
      />
      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-7">
          <p className="text-[0.72rem] uppercase tracking-[0.28em] text-cyan-100/80">
            {studio.partners}
          </p>
          <h1 className="mt-5 max-w-xl text-balance font-heading text-[2.7rem] leading-[0.96] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
            {studio.scheme}
          </h1>
          <p className="mt-5 font-heading text-2xl tracking-tight text-cyan-100 sm:text-3xl">
            {scheme.kicker}
          </p>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            {scheme.lede}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={joinWhatsAppHref()}
              className={cn(buttonVariants({ size: "xl" }), "bg-white text-[#071426] hover:bg-white/90")}
            >
              Send MAKS on WhatsApp
            </a>
            <Link
              href="/#schedule"
              className={cn(
                buttonVariants({ size: "xl", variant: "outline" }),
                "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white",
              )}
            >
              View the schedule
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/60">
            {studio.tagline}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-5">
          {facts.map((fact) => (
            <article
              key={fact.unit}
              className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md sm:p-5"
            >
              <p className="font-heading text-3xl tracking-tight text-white sm:text-4xl">{fact.value}</p>
              <p className="mt-2 text-sm font-medium text-cyan-50">{fact.unit}</p>
              <p className="mt-1 text-xs leading-5 text-white/60">{fact.detail}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
