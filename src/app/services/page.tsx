import type { Metadata } from "next";
import { Schedule } from "@/components/scheme/Schedule";
import { studio } from "@/content/site";

export const metadata: Metadata = {
  title: "Payout schedule",
  description: `The ten-month payout schedule for the ${studio.scheme}. Contribution is 10 BOT per person each month.`,
};

export default function ServicesPage() {
  return <Schedule />;
}
