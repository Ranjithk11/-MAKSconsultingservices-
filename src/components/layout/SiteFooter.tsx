import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { offerings } from "@/content/offerings";
import { joinWhatsAppHref, studio } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border pb-28">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="h-auto w-48 sm:w-56" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
            {studio.scheme}. {studio.tagline}
          </p>
          <p className="mt-4 text-sm text-foreground">{studio.motto}</p>
        </div>
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">Visit</p>
          <p className="mt-3 text-sm leading-6">
            {studio.visit}
            <br />
            {studio.hours}
          </p>
          <a
            href={`tel:+${studio.phoneE164}`}
            className="mt-3 block text-sm underline decoration-brass underline-offset-4"
          >
            {studio.phoneDisplay}
          </a>
          <a
            href={`mailto:${studio.email}`}
            className="mt-2 inline-block break-all text-sm underline decoration-brass underline-offset-4"
          >
            {studio.email}
          </a>
        </div>
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">Services</p>
          <ul className="mt-3 space-y-2 text-sm">
            {offerings.map((offering) => (
              <li key={offering.slug}>
                <Link
                  href={`/services/${offering.slug}`}
                  className="hover:underline hover:decoration-brass hover:underline-offset-4"
                >
                  {offering.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">Join</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Send the word MAKS on WhatsApp. A person answers.
          </p>
          <a
            href={joinWhatsAppHref()}
            className="mt-3 inline-block text-sm underline decoration-brass underline-offset-4"
          >
            {studio.phoneDisplay}
          </a>
          <a
            href={studio.websiteUrl}
            className="mt-2 block text-sm underline decoration-brass underline-offset-4"
          >
            {studio.website}
          </a>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>© 2026 {studio.name}</p>
        <p>{studio.city}</p>
      </Container>
    </footer>
  );
}
