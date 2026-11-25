import type { Metadata } from "next";
import { Advantages } from "@/components/scheme/Advantages";
import { HowItWorks } from "@/components/scheme/HowItWorks";
import { studio } from "@/content/site";

export const metadata: Metadata = {
  title: "How it works",
  description: `How a ${studio.scheme} group of ten members runs for ten months.`,
};

export default function PracticePage() {
  return (
    <>
      <HowItWorks />
      <Advantages />
    </>
  );
}
