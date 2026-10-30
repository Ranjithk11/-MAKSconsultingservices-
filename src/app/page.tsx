import { ClosingBand } from "@/components/home/ClosingBand";
import { Engagements } from "@/components/home/Engagements";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Method } from "@/components/home/Method";
import { Notes } from "@/components/home/Notes";
import { PracticeBand } from "@/components/home/PracticeBand";
import { ServiceIndex } from "@/components/home/ServiceIndex";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServiceIndex />
      <PracticeBand />
      <Engagements />
      <Method />
      <Notes />
      <ClosingBand />
    </>
  );
}
