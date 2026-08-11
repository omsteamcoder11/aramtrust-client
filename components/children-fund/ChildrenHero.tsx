export default function ChildrenHero() {
  return (
    <section style={{ background: '#ea580c' }} className="pt-[72px] md:pt-[80px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 inline-block bg-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">
              Our Services
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none mb-5">
            Poor Children <span className="text-amber-400">Fund</span>
          </h1>
          <p className="text-white/75 text-sm sm:text-lg max-w-xl leading-relaxed font-medium">
            By the blessings of Uthamar Thiru Kovil, we support underprivileged children
            in Arrakattalai with education, nutrition, and a better future.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a href="/sponsor-child"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-7 py-3.5 font-black text-xs uppercase tracking-widest hover:bg-orange-50 transition-colors">
              Sponsor a Child →
            </a>
            <a href="/donate"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-7 py-3.5 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
              Donate Now
            </a>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-amber-600" />
    </section>
  );
}