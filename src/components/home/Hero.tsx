import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Photo } from "@/components/media/Photo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="border-b border-border">
      <Container className="grid items-end gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7">
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">
            Kolkata practice
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-heading text-5xl leading-[0.96] tracking-[-0.03em] sm:text-7xl lg:text-[5.35rem]">
            We keep the record, the host, and the conversation.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
            MAKS Consulting Services operates five systems a firm depends on:
            database storage, a hosting platform, mail, WhatsApp, and agents
            that hand the work back to a person.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={buttonVariants({ size: "xl" })}>
              Book a working session
            </Link>
            <Link
              href="/services"
              className={cn(buttonVariants({ size: "xl", variant: "outline" }))}
            >
              See the five systems
            </Link>
          </div>
        </div>
        <figure className="lg:col-span-5">
          <Photo
            src="/images/hero-studio.jpg"
            alt="A walnut table in a quiet studio, with a brass lamp, a closed notebook, and tea, beside an open teak shutter."
            sizes="(min-width: 1024px) 36vw, 100vw"
            priority
            className="aspect-[3/4]"
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">
            The studio, late afternoon.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
