import { studio } from "@/content/site";

export function StudioCard() {
  return (
    <aside className="border border-border p-6 sm:p-8">
      <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">The studio</p>
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
          <dt className="text-muted-foreground">Mail</dt>
          <dd className="mt-1">
            <a
              href={`mailto:${studio.email}`}
              className="underline decoration-brass underline-offset-4"
            >
              {studio.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">WhatsApp</dt>
          <dd className="mt-1">
            Use the button on this page, or choose WhatsApp as the reply on the form. The line sends only when the Cloud API is connected.
          </dd>
        </div>
      </dl>
    </aside>
  );
}
