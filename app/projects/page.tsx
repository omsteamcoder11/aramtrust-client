import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsCTA from "@/components/projects/ProjectsCTA";

export const metadata = {
  title: "Completed Projects | Makal Sevai Margam",
  description: "See the completed construction and community projects by Makal Sevai Margam in Arrakattalai, Tamil Nadu.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <ProjectsHero />
      <ProjectsCTA />
    </main>
  );
}