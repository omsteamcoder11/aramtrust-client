import FoodHero from "@/components/annadhanam/FoodHero";
import HowWeServe from "@/components/annadhanam/HowWeServe";
import HowToDonate from "@/components/annadhanam/HowToDonate";

export const metadata = {
title: "Annadhanam | Makkal Sevai Margam",
  description: "We feed the hungry and distribute sacred prasadam to the poor across Arrakattalai, Tamil Nadu every day.",
};

export default function AnnadhanamPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <FoodHero />
      <HowWeServe />
      <HowToDonate />
    </main>
  );
}