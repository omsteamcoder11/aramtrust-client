export default function GalleryHero() {
  return (
    <section style={{ background: '#ffffff' }} className="pt-[72px] md:pt-[80px] border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 inline-block bg-amber-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-600">
              See Our Impact
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 uppercase tracking-tight leading-none mb-5">
            Gallery & <span className="text-amber-600">Media</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-lg max-w-xl leading-relaxed font-medium">
            By the blessings of Uthamar Thiru Kovil, see moments of service, devotion,
            and community across Arrakattalai, Tamil Nadu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-7 py-3.5 font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors">
              Share Your Photos →
            </a>
            <a href="/donate"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-900 px-7 py-3.5 font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors">
              Support Our Work
            </a>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-amber-500" />
    </section>
  );
}