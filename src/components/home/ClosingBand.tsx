import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ClosingBand() {
  return (
    <section className="border-b border-border">
      <Container className="py-20 lg:py-28">
        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">
          Begin with one system
        </p>
        <h2 className="mt-4 max-w-3xl font-heading text-4xl tracking-tight sm:text-6xl">
          Bring the system that is failing quietly.
        </h2>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className={buttonVariants({ size: "xl" })}>
            Write to the desk
          </Link>
          <Link
            href="/contact?channel=whatsapp"
            className={cn(buttonVariants({ size: "xl", variant: "outline" }))}
          >
            Reply on WhatsApp
          </Link>
        </div>
      </Container>
    </section>
  );
}
