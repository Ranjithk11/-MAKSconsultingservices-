import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Advantages } from "@/components/scheme/Advantages";
import { Hero } from "@/components/scheme/Hero";
import { HowItWorks } from "@/components/scheme/HowItWorks";
import { JoinBand } from "@/components/scheme/JoinBand";
import { Schedule } from "@/components/scheme/Schedule";
import { OfferingView } from "@/components/services/OfferingView";
import { getOffering, serviceSlugs } from "@/content/offerings";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offering = getOffering(slug);
  if (!offering) return { title: "Service" };
  return {
    title: offering.name,
    description: offering.lede,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offering = getOffering(slug);
  if (!offering) notFound();

  if (offering.slug === "coin-scheme") {
    return (
      <>
        <Hero />
        <HowItWorks />
        <Schedule />
        <Advantages />
        <JoinBand />
      </>
    );
  }

  return <OfferingView offering={offering} />;
}
