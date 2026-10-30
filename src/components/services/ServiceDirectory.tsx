import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Photo } from "@/components/media/Photo";
import { services } from "@/content/site";

export function ServiceDirectory() {
  return (
    <section className="pb-20">
      <Container>
        <ul className="grid gap-12">
          {services.map((service) => (
            <li key={service.slug} className="grid items-center gap-6 border-t border-border pt-8 lg:grid-cols-12">
              <Photo
                src={service.image}
                alt={service.imageAlt}
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="aspect-[4/3] lg:col-span-5"
              />
              <div className="lg:col-span-7 lg:pl-6">
                <p className="text-sm text-brass">{service.index}</p>
                <h2 className="mt-2 font-heading text-4xl tracking-tight">{service.name}</h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                  {service.lede}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-block text-sm underline decoration-brass underline-offset-4"
                >
                  The scope of {service.name.toLowerCase()}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
