import TestimonialsHero from "@/components/testimonials/TestimonialsHero";
import ImpactStats from "@/components/testimonials/ImpactStats";
import TestimonialsGrid from "@/components/testimonials/TestimonialsGrid";
import TestimonialsCTA from "@/components/testimonials/TestimonialsCTA";

export const metadata = {
  title: "Testimonials | Makal Sevai Margam",
  description: "Real stories and testimonials from parents, children, volunteers, and donors of Makal Sevai Margam in Arrakattalai, Tamil Nadu.",
};

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <TestimonialsHero />
      <ImpactStats />
      <TestimonialsGrid />
      {/* <TestimonialsCTA /> */}
    </main>
  );
}