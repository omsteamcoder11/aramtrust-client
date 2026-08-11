import ConstructionHero from "@/components/construction/ConstructionHero";
import ImpactStats from "@/components/construction/ImpactStats";
import HowToDonate from "@/components/construction/HowToDonate";
import Testimonials from "@/components/construction/Testimonials";

export const metadata = {
  title: "Building Construction | Makal Sevai Margam",
  description: "We build homes and temple infrastructure for communities in Arrakattalai, Tamil Nadu.",
};

export default function ConstructionPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <ConstructionHero />
      <ImpactStats />
      <HowToDonate />
      <Testimonials />
    </main>
  );
}