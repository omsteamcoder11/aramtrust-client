"use client";

import { Utensils, Heart, Sparkles, Calendar, ChevronRight } from "lucide-react";

export default function HowWeServe() {
  const steps = [
    {
      step: "01",
      title: "Food Preparation",
      desc: "Every day, our volunteers gather at the temple kitchen to prepare fresh, wholesome meals using donated ingredients.",
      icon: Utensils,
    },
    {
      step: "02",
      title: "Community Distribution",
      desc: "Cooked food is distributed directly to the poor, elderly, and homeless in Arrakattalai and surrounding areas.",
      icon: Heart,
    },
    {
      step: "03",
      title: "Temple Prasadam",
      desc: "Sacred prasadam from Uthamar Thiru Kovil is offered to devotees and shared with those who cannot visit the temple.",
      icon: Sparkles,
    },
    {
      step: "04",
      title: "Special Feeding Drives",
      desc: "On festival days, we organise mass feeding events serving hundreds of meals in a single day.",
      icon: Calendar,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1.5 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
              Our Process & Execution
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight">
              How We Serve
            </h2>
          </div>
        </div>

        {/* Steps Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white border border-emerald-200/70 rounded-2xl p-6 sm:p-7 hover:bg-emerald-50/40 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-emerald-500/20 group-hover:text-emerald-600 transition-colors duration-300">
                      {s.step}
                    </span>
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-2.5 group-hover:text-emerald-800 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {/* Footer Link Accent */}
                <div className="mt-6 pt-4 border-t border-emerald-200/50 flex items-center gap-1 text-[11px] font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors">
                  <span>Step {s.step} Execution</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          } )}
        </div>

      </div>
    </section>
  );
}