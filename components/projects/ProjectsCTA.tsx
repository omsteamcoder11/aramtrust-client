export default function ProjectsCTA() {
  return (
    <section className="bg-orange-600 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60 block mb-3">
              Make a Difference
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
              Fund the<br />Next Project
            </h3>
          </div>
          <div>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
              Every completed project started with one generous donation. Your contribution
              today becomes the foundation of tomorrow's home, kitchen, or temple hall.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/fund-construction"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-orange-50 transition-colors">
                Fund a Construction →
              </a>
              <a href="/donate"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-amber-400 mt-12" />
    </section>
  );
}