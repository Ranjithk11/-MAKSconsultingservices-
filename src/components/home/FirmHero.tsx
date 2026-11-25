import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { offerings } from "@/content/offerings";
import { joinWhatsAppHref, studio } from "@/content/site";
import { cn } from "@/lib/utils";

export function FirmHero() {
  return (
    <section className="relative overflow-hidden bg-[#071426] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,180,196,0.28),transparent_52%),radial-gradient(ellipse_at_bottom_left,rgba(22,78,168,0.55),transparent_48%)]"
      />
      <Container className="relative grid items-end gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <p className="text-[0.72rem] uppercase tracking-[0.28em] text-cyan-100/80">
            {studio.city} · {studio.name}
          </p>
          <h1 className="mt-5 max-w-xl text-balance font-heading text-[2.7rem] leading-[0.96] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
            Six services. One desk.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            Coin scheme, financial advice, business consulting, digital investment, website development, and marketing suggestions. Each one has its own page, its own limits, and a person who replies.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services"
              className={cn(buttonVariants({ size: "xl" }), "bg-white text-[#071426] hover:bg-white/90")}
            >
              See the six services
            </Link>
            <a
              href={joinWhatsAppHref()}
              className={cn(
                buttonVariants({ size: "xl", variant: "outline" }),
                "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white",
              )}
            >
              WhatsApp {studio.phoneDisplay}
            </a>
          </div>
          <p className="mt-6 text-sm text-white/60">{studio.tagline}</p>
        </div>
        <ol className="grid gap-2 lg:col-span-5">
          {offerings.map((offering) => (
            <li key={offering.slug}>
              <Link
                href={`/services/${offering.slug}`}
                className="flex items-baseline gap-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 transition hover:bg-white/20"
              >
                <span className="text-sm text-cyan-100/80">{offering.index}</span>
                <span className="font-heading text-xl tracking-tight">{offering.name}</span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
