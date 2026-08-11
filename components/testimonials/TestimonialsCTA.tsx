export default function TestimonialsCTA() {
  return (
    <section className="bg-white py-12 md:py-16 border-t border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-6xl font-black text-emerald-300 leading-none block mb-4">
            "
          </span>
          <p className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight leading-snug mb-6">
            Every life changed is a testimony<br />
            of faith and devotion.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            
            <a  href="/share-story"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-colors"
            >
              Share Your Story →
            </a>
            
             <a href="/volunteer"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-900 px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors"
            >
              Join Our Family
            </a>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-emerald-400 mt-10" />
    </section>
  );
}