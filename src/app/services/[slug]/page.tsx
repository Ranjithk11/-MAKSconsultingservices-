import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { HostStatus } from "@/components/services/HostStatus";
import { ServiceArticle } from "@/components/services/ServiceArticle";
import { getService, services } from "@/content/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service" };
  return { title: service.name, description: service.lede };
}

export default function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <Container className="py-24 text-sm text-muted-foreground">Opening the system…</Container>
      }
    >
      <ServiceBody params={params} />
    </Suspense>
  );
}

async function ServiceBody({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return (
    <>
      <ServiceArticle service={service} />
      {service.slug === "hosting-platform" ? <HostStatus /> : null}
    </>
  );
}
