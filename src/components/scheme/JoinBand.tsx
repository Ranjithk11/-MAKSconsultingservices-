import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { joinWhatsAppHref, studio } from "@/content/site";
import { cn } from "@/lib/utils";

export function JoinBand() {
  return (
    <section id="join" className="scroll-mt-28 bg-[#071426] py-16 text-white sm:py-20 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="text-[0.72rem] uppercase tracking-[0.28em] text-cyan-100/80">Participate</p>
          <h2 className="mt-4 max-w-xl font-heading text-4xl tracking-tight text-white sm:text-5xl">
            Send MAKS on WhatsApp.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/70">
            Send the word MAKS to {studio.phoneDisplay}. A person replies about the next group of ten. You can also write from the form.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={joinWhatsAppHref()}
              className={cn(buttonVariants({ size: "xl" }), "bg-white text-[#071426] hover:bg-white/90")}
            >
              WhatsApp {studio.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "xl", variant: "outline" }),
                "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white",
              )}
            >
              Write to us
            </Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
          <a
            href={`mailto:${studio.email}`}
            className="rounded-2xl border border-white/10 bg-white/10 p-5 transition hover:bg-white/20"
          >
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-cyan-100/70">Email</p>
            <p className="mt-3 break-all font-heading text-xl leading-snug">{studio.email}</p>
          </a>
          <a
            href={studio.websiteUrl}
            className="rounded-2xl border border-white/10 bg-white/10 p-5 transition hover:bg-white/20"
          >
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-cyan-100/70">Website</p>
            <p className="mt-3 font-heading text-xl">{studio.website}</p>
          </a>
        </div>
      </Container>
    </section>
  );
}
