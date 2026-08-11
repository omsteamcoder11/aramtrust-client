export default function StoriesHero() {
  return (
    <section style={{ background: '#047857' }} className="pt-[72px] md:pt-[80px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 inline-block bg-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400">
              See Our Impact
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none mb-5">
            Success <span className="text-emerald-400">Stories</span>
          </h1>
          <p className="text-white/75 text-sm sm:text-lg max-w-xl leading-relaxed font-medium">
            Every meal served and every family supported by Aram Trust is a
            testimony of warmth, compassion, and community care.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a href="/donate"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-7 py-3.5 font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-colors">
              Support Us →
            </a>
            <a href="/volunteer"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-7 py-3.5 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
              Volunteer With Us
            </a>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-emerald-600" />
    </section>
  );
}