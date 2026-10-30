import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Photo } from "@/components/media/Photo";
import { services } from "@/content/site";

export function ServiceIndex() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionLabel index="01—05">Five systems, one desk</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-heading text-4xl tracking-tight sm:text-5xl">
          What we actually take on.
        </h2>
        <ul className="mt-12 divide-y divide-border border-y border-border">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group grid gap-6 py-7 sm:grid-cols-12 sm:items-center"
              >
                <span className="text-sm text-brass sm:col-span-1">{service.index}</span>
                <span className="font-heading text-3xl tracking-tight sm:col-span-4">
                  {service.name}
                </span>
                <span className="text-sm leading-6 text-muted-foreground sm:col-span-5">
                  {service.short}
                </span>
                <span className="flex items-center justify-between gap-4 sm:col-span-2 sm:justify-end">
                  <Photo
                    src={service.image}
                    alt=""
                    sizes="96px"
                    className="hidden h-16 w-24 sm:block"
                  />
                  <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
