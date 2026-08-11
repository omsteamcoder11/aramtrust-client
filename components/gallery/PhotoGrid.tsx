"use client";

import { GalleryImage } from "./GalleryClient";

type Props = {
  images: GalleryImage[];
  loading: boolean;
  backendUrl: string;
  lightbox: GalleryImage | null;
  setLightbox: (img: GalleryImage | null) => void;
};

export default function PhotoGrid({
  images,
  loading,
  backendUrl,
  lightbox,
  setLightbox,
}: Props) {
  if (loading || images.length === 0) return null;

  return (
    <>
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-orange-600" />
            <h2 className="text-lg sm:text-2xl font-black text-gray-900 uppercase tracking-tight">
              Recent Moments
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                onClick={() => setLightbox(img)}
                className="group relative aspect-square overflow-hidden border-2 border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <img
                  src={`${backendUrl}${img.image_url}`}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                  <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-black text-[10px] uppercase tracking-wider">
                      {img.title}
                    </p>
                    <span className="mt-1 inline-block px-2 py-0.5 bg-orange-600 text-white text-[8px] font-black uppercase tracking-wider">
                      {img.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white font-black text-xs uppercase tracking-widest hover:text-orange-400 transition-colors"
            >
              ✕ Close
            </button>
            <img
              src={`${backendUrl}${lightbox.image_url}`}
              alt={lightbox.title}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="bg-white px-4 py-3 flex items-center gap-3">
              <span className="px-2 py-0.5 bg-orange-600 text-white text-[8px] font-black uppercase tracking-wider">
                {lightbox.category}
              </span>
              <p className="text-gray-900 font-black text-xs uppercase tracking-wider">
                {lightbox.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}