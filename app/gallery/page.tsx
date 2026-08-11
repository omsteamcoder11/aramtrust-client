import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryClient from "@/components/gallery/GalleryClient";
import GalleryCTA from "@/components/gallery/GalleryCTA";

export const metadata = {
  title: "Gallery & Media | Makal Sevai Margam",
  description: "View photos and media from construction projects, food service, children's programs, and community events in Arrakattalai, Tamil Nadu.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <GalleryHero />
      <GalleryClient />
      <GalleryCTA />
    </main>
  );
}