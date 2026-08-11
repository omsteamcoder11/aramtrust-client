"use client";

import { Sparkles, ArrowRight, Building2, HeartHandshake } from "lucide-react";

export default function ConstructionHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#062e1b] via-[#0a4227] to-[#041f12] pt-[72px] md:pt-[80px] text-white">
      {/* Background Sacred Geometric Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Aram Sevai • Construction Wing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-6">
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-amber-300">Construction</span>
            </h1>

            <p className="text-emerald-100/80 text-base sm:text-lg max-w-xl leading-relaxed font-normal mb-8">
              By the blessings of Uthamar Thiru Kovil, we construct homes for the underprivileged 
              and build sacred temple infrastructure for the community of Arrakattalai, Tamil Nadu.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/donate"
                className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-[#041f12] px-8 py-4 font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Fund Construction</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-emerald-200/20 hover:border-emerald-400/50 text-emerald-100 hover:bg-white/5 px-8 py-4 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Quick Highlight Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-start gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 shrink-0 border border-emerald-500/30">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-emerald-200 text-sm uppercase tracking-wide">Temple Infrastructure</h2>
                <p className="text-xs text-emerald-100/70 mt-1 leading-relaxed">
                  Preserving heritage through sustainable mandapam and temple mandir restoration.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-start gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 shrink-0 border border-emerald-500/30">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-emerald-200 text-sm uppercase tracking-wide">Homes for Homeless</h2>
                <p className="text-xs text-emerald-100/70 mt-1 leading-relaxed">
                  Providing safe, permanent housing for deserving underprivileged families.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Green/Gold Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600" />
    </section>
  );
}