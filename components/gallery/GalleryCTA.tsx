export default function GalleryCTA() {
  return (
    <section className="bg-orange-600 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-4">
          Have Photos to Share?
        </h3>
        <p className="text-white/80 text-sm max-w-lg mx-auto mb-6">
          If you have photos from our events, construction projects, or community service,
          please share them with us.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-orange-50 transition-colors">
            Contact Us →
          </a>
          <a href="/volunteer"
            className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
            Join Our WhatsApp Group
          </a>
        </div>
      </div>
      <div className="h-1 w-full bg-amber-400 mt-10" />
    </section>
  );
}