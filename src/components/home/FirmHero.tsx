import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BrandTitle, ServiceSubline } from "@/components/layout/BrandTitle";
import { Container } from "@/components/layout/Container";
import { joinWhatsAppHref, studio } from "@/content/site";
import { cn } from "@/lib/utils";

export function FirmHero() {
  return (
    <section className="relative overflow-hidden bg-[#071426] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,180,196,0.28),transparent_52%),radial-gradient(ellipse_at_bottom_left,rgba(22,78,168,0.55),transparent_48%)]"
      />
      <Container className="relative py-16 sm:py-20 lg:py-28">
        <p className="text-[0.72rem] uppercase tracking-[0.28em] text-cyan-100/80">{studio.city}</p>
        <div className="mt-5">
          <BrandTitle />
        </div>
        <ServiceSubline />
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
          {studio.tagline} Each service has its own page, written from the figures and the rules for that work.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/services"
            className={cn(buttonVariants({ size: "xl" }), "bg-white text-[#071426] hover:bg-white/90")}
          >
            Open the services
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
      </Container>
    </section>
  );
}
