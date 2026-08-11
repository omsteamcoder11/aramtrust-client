import ProgramsHero from "@/components/programs/ProgramsHero";
import ProgramsList from "@/components/programs/ProgramsList";
import GetInvolved from "@/components/programs/GetInvolved";
import ProgramsDonate from "@/components/programs/ProgramsDonate";

export const metadata = {
  title: "Our Programs | Makal Sevai Margam",
  description: "Discover all the programs run by Makal Sevai Margam — construction, food service, children fund, and community welfare.",
};

export default function ProgramsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <ProgramsHero />
      <ProgramsList />
      <GetInvolved />
      <ProgramsDonate />
    </main>
  );
}