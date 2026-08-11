"use client";

import Link from "next/link";
import { Sparkles, Heart, ArrowRight } from "lucide-react";

export default function ProgramsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#041f12] via-[#062e1b] to-[#0a4227] text-white pt-[88px] md:pt-[100px] border-b border-emerald-800/40">
      {/* Background Radial Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24 relative z-10">
        <div className="max-w-3xl">
          
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-200">
              Our Services
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none mb-5">
            Our{" "}
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              Programs
            </span>
          </h1>

          <div className="w-14 h-1 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full mb-6" />

          {/* Description */}
          <p className="text-emerald-100/90 text-sm sm:text-lg max-w-xl leading-relaxed font-medium mb-8">
            Rooted in the blessings of Uthamar Thiru Kovil, our programs serve the
            community of Arrakattalai through construction, food, education, and care.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/volunteer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-gradient-to-r from-amber-400 to-amber-500 text-[#041f12] shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-400 hover:scale-[1.02] transition-all"
            >
              Volunteer With Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest border border-emerald-400/30 text-white hover:bg-emerald-500/10 hover:border-emerald-400 transition-all"
            >
              <Heart className="w-4 h-4 fill-current text-amber-400" />
              Donate Now
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Gold/Emerald Accent Divider */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500" />
    </section>
  );
}