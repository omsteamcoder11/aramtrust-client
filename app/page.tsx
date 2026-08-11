import HeroSection from "../components/home/HeroSection";
import MissionSection from "../components/home/MissionSection";
import HomeImpact from "../components/home/HomeImpact";
import Home from "../components/home/Home";
import StatsBar from "../components/home/StatsBar";
import CTASection from "../components/home/CTASection";
import FeaturedSection from "../components/home/FeaturedSection";  // ← ADD THIS IMPORT
// import ServicesSection from "../components/home/ServicesSection";

export default function Page() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-gray-900">
      <HeroSection />
      <MissionSection />
      <HomeImpact />
      <FeaturedSection />  {/* ← ADD THIS COMPONENT */}
      <Home />
      {/* Separator */}
      <div className="h-20 bg-white" />

      <StatsBar />
      {/* <ServicesSection /> */}
      <CTASection />
    </div>
  );
}