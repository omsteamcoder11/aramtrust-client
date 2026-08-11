"use client";

import { useState, useEffect } from "react";
import GalleryCategories from "@/components/gallery/GalleryCategories";
import PhotoGrid from "@/components/gallery/PhotoGrid";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL as string;
if (!BACKEND_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not set. Add it to your .env.local (dev) or hosting provider's environment variables (production)."
  );
}
export type GalleryImage = {
  id: number;
  title: string;
  image_url: string;
  category: string;
  created_at: string;
};

export default function GalleryClient() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/gallery`);
        const data = await res.json();
        setImages(data.images || []);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const filtered =
    activeCategory === "all"
      ? images
      : images.filter(
          (img) => img.category.toLowerCase() === activeCategory
        );

  return (
    <>
      <GalleryCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        loading={loading}
        hasImages={images.length > 0}
        filteredCount={filtered.length}
      />
      <PhotoGrid
        images={filtered}
        loading={loading}
        backendUrl={BACKEND_URL}
        lightbox={lightbox}
        setLightbox={setLightbox}
      />
    </>
  );
}