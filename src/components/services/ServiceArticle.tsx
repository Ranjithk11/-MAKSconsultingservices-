import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Photo } from "@/components/media/Photo";
import { services, type Service } from "@/content/site";

export function ServiceArticle({ service }: { service: Service }) {
  const index = services.findIndex((item) => item.slug === service.slug);
  const next = services[(index + 1) % services.length];

  return (
    <article>
      <Container className="py-14 lg:py-20">
        <p className="text-sm text-muted-foreground">
          <Link href="/services" className="underline decoration-brass underline-offset-4">
            Services
          </Link>
          <span aria-hidden="true"> / </span>
          {service.name}
        </p>
        <p className="mt-8 text-sm text-brass">{service.index}</p>
        <h1 className="mt-3 max-w-3xl font-heading text-5xl tracking-tight sm:text-6xl">
          {service.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{service.lede}</p>
      </Container>
      <Container>
        <Photo
          src={service.image}
          alt={service.imageAlt}
          priority
          sizes="(min-width: 1024px) 72rem, 100vw"
          className="aspect-[16/9] sm:aspect-[2/1]"
        />
      </Container>
      <Container className="grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-3xl tracking-tight">What we take on</h2>
          <ul className="mt-6 space-y-4">
            {service.takes.map((item) => (
              <li key={item} className="border-t border-border pt-4 text-sm leading-6">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-3xl tracking-tight">What we leave with you</h2>
          <ul className="mt-6 space-y-4">
            {service.leaves.map((item) => (
              <li key={item} className="border-t border-border pt-4 text-sm leading-6">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="pb-16">
        <div className="border border-border bg-paper-deep/60 p-6 sm:p-8">
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">On this site</p>
          <p className="mt-3 max-w-2xl text-sm leading-6">{service.siteNote}</p>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">Next system</p>
          <Link
            href={`/services/${next.slug}`}
            className="font-heading text-3xl tracking-tight hover:underline hover:decoration-brass hover:underline-offset-4"
          >
            {next.index} {next.name}
          </Link>
        </div>
      </Container>
    </article>
  );
}
