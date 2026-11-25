import { Advantages } from "@/components/scheme/Advantages";
import { Hero } from "@/components/scheme/Hero";
import { HowItWorks } from "@/components/scheme/HowItWorks";
import { JoinBand } from "@/components/scheme/JoinBand";
import { Schedule } from "@/components/scheme/Schedule";

export default function HomePage() {
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
