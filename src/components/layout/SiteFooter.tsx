import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { services, studio } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border pb-28">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-3xl tracking-tight">{studio.short}</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
            {studio.name}. A Kolkata practice for the systems a firm already runs on.
          </p>
        </div>
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">Visit</p>
          <p className="mt-3 text-sm leading-6">
            {studio.visit}
            <br />
            {studio.hours}
          </p>
          <a
            href={`mailto:${studio.email}`}
            className="mt-3 inline-block text-sm underline decoration-brass underline-offset-4"
          >
            {studio.email}
          </a>
        </div>
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">Systems</p>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="hover:underline hover:decoration-brass hover:underline-offset-4"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">Desk</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/contact" className="hover:underline hover:underline-offset-4">
                Write to the desk
              </Link>
            </li>
            <li>
              <Link href="/practice" className="hover:underline hover:underline-offset-4">
                The practice
              </Link>
            </li>
            <li>
              <Link href="/desk" className="hover:underline hover:underline-offset-4">
                Studio desk
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>© 2026 {studio.name}</p>
        <p>Kolkata</p>
      </Container>
    </footer>
  );
}
