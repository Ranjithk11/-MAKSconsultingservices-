import { Logo } from "@/components/layout/Logo";
import { joinWhatsAppHref, scheme, studio } from "@/content/site";

export function StudioCard() {
  const whatsApp = joinWhatsAppHref();

  return (
    <aside className="border border-border p-6 sm:p-8">
      <Logo className="h-auto w-full max-w-xs" />
      <p className="mt-8 text-[0.72rem] uppercase tracking-[0.22em] text-brass">The studio</p>
      <h2 className="mt-4 font-heading text-4xl tracking-tight">{studio.city}</h2>
      <dl className="mt-8 space-y-5 text-sm leading-6">
        <div>
          <dt className="text-muted-foreground">Visit</dt>
          <dd className="mt-1">{studio.visit}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Hours</dt>
          <dd className="mt-1">{studio.hours}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Phone</dt>
          <dd className="mt-1">
            <a
              href={`tel:+${studio.phoneE164}`}
              className="underline decoration-brass underline-offset-4"
            >
              {studio.phoneDisplay}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Mail</dt>
          <dd className="mt-1">
            <a
              href={`mailto:${studio.email}`}
              className="break-all underline decoration-brass underline-offset-4"
            >
              {studio.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">WhatsApp</dt>
          <dd className="mt-1">
            <a
              href={whatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-brass underline-offset-4"
            >
              {studio.phoneDisplay}
            </a>
            . Send the word MAKS. The monthly draw is {scheme.draw.toLowerCase()}, confirmed on a WhatsApp call.
          </dd>
        </div>
      </dl>
    </aside>
  );
}
