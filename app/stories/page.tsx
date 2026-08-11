import StoriesHero from "@/components/stories/StoriesHero";
import StoriesGrid from "@/components/stories/StoriesGrid";
import StoriesQuote from "@/components/stories/StoriesQuote";
import StoriesCTA from "@/components/stories/StoriesCTA";

export const metadata = {
  title: "Success Stories | Makal Sevai Margam",
  description: "Real stories of lives changed through the work of Makal Sevai Margam in Arrakattalai, Tamil Nadu.",
};

export default function StoriesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <StoriesHero />
      <StoriesGrid />
      <StoriesQuote />
      <StoriesCTA />
    </main>
  );
}