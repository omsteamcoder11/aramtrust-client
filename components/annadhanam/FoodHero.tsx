"use client";

import { Sparkles, ArrowRight, Utensils, HeartHandshake } from "lucide-react";

export default function FoodHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-[72px] md:pt-[80px] text-gray-900 border-b border-emerald-100">
      {/* Background Sacred Geometric Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Aram Trust • Annadhanam Wing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-6 text-gray-900">
              Food <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700">Service</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed font-normal mb-8">
              By the blessings of Uthamar Thiru Kovil, Aram Trust feeds the hungry and distributes 
              sacred prasadam to the poor across Arrakattalai, Tamil Nadu — every single day.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              
               <a  href="/donate"
                className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-8 py-4 font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Donate Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              
              <a  href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-emerald-400 text-gray-700 hover:bg-emerald-50 px-8 py-4 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Quick Highlight Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0 border border-emerald-200">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Daily Annadhanam</h2>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Serving nutritious, freshly cooked meals to thousands of devotees and underprivileged families.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0 border border-emerald-200">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Sacred Prasadam</h2>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Distributing blessed temple meals across rural communities with love and devotion.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500" />
    </section>
  );
}