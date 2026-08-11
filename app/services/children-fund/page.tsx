import ChildrenHero from "@/components/children-fund/ChildrenHero";
import HowWeHelp from "@/components/children-fund/HowWeHelp";
import HowToDonate from "@/components/children-fund/HowToDonate";

export const metadata = {
  title: "Poor Children Fund | Makal Sevai Margam",
  description: "We support underprivileged children in Arrakattalai with education, nutrition, and health care.",
};

export default function ChildrenFundPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <ChildrenHero />
      <HowWeHelp />
      <HowToDonate />
    </main>
  );
}