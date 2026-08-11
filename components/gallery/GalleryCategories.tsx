"use client";

const categories = [
  { id: "all", label: "All Photos" },
  { id: "construction", label: "Construction" },
  { id: "food", label: "Food Service" },
  { id: "children", label: "Children Fund" },
  { id: "events", label: "Events & Festivals" },
  { id: "volunteers", label: "Volunteers" },
];

type Props = {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  loading: boolean;
  hasImages: boolean;
  filteredCount: number;
};

export default function GalleryCategories({
  activeCategory,
  setActiveCategory,
  loading,
  hasImages,
  filteredCount,
}: Props) {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-orange-600 text-white"
                  : "bg-orange-50 text-orange-600 hover:bg-orange-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-16 text-orange-600 font-black text-xs uppercase tracking-widest">
            Loading...
          </div>
        )}

        {!loading && !hasImages && (
          <div className="text-center py-16 md:py-24 bg-orange-50 border border-orange-100">
            <div className="max-w-md mx-auto px-4">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-orange-100 rounded-full">
                <span className="text-3xl">📷</span>
              </div>
              <h3 className="text-base font-black text-gray-900 uppercase tracking-tight mb-3">
                Photos Coming Soon
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                We are collecting photos from our recent projects and events.
                Please check back soon or follow us for updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                
              <a    href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-colors"
                >
                  Share Your Photos
                </a>
                
              <a    href="/volunteer"
                  className="inline-flex items-center justify-center gap-2 border border-orange-300 text-orange-600 px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-orange-50 transition-colors"
                >
                  Join Our Events
                </a>
              </div>
            </div>
          </div>
        )}

        {!loading && hasImages && filteredCount === 0 && (
          <div className="text-center py-16 bg-orange-50 border border-orange-100">
            <p className="text-sm font-black text-gray-500 uppercase tracking-widest">
              No photos in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}