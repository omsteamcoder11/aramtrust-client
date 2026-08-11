"use client";

import { HeartHandshake, ArrowRight, CheckCircle2, Sparkles, Building, Layers } from "lucide-react";

export default function HowToDonate() {
  const steps = [
    {
      step: "01",
      title: "Choose a Project",
      desc: "Browse our active construction projects and choose the sanctuary or home closest to your heart.",
    },
    {
      step: "02",
      title: "Make a Contribution",
      desc: "Donate any amount online or via bank transfer. Every rupee goes directly to materials and labor.",
    },
    {
      step: "03",
      title: "We Build Together",
      desc: "Our dedicated workers begin construction. You receive regular progress updates with detailed photos.",
    },
    {
      step: "04",
      title: "See the Impact",
      desc: "Once complete, we share a full report with photos and the story of the family or temple helped.",
    },
  ];

  const tiers = [
    {
      amount: "₹5,000",
      label: "Foundation Supporter",
      desc: "Contributes directly to essential raw materials like high-grade bricks and cement.",
      highlight: false,
    },
    {
      amount: "₹25,000",
      label: "Wall Builder",
      desc: "Funds an entire structural wall or major section of a sanctuary home.",
      highlight: false,
    },
    {
      amount: "₹1,00,000",
      label: "Home Maker",
      desc: "Fully sponsors a single room for a deserving family in need.",
      highlight: true, // Emerald/Amber dark highlight
    },
    {
      amount: "Any Amount",
      label: "Seva Contributor",
      desc: "Every contribution, big or small, builds something meaningful for the community.",
      highlight: false,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f8faf8] text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header 1: Process */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-800 border border-emerald-200">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Simple 4-Step Process</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#041f12] tracking-tight">
              How to Fund a Construction
            </h2>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-emerald-200/70 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-emerald-500/30 group-hover:text-emerald-600 transition-colors">
                    {s.step}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform" />
                </div>
                <h3 className="text-base font-bold text-[#041f12] tracking-tight mb-2">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section Header 2: Tiers */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-800 border border-emerald-200">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Sponsorship Levels</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#041f12] tracking-tight">
              Contribution Tiers
            </h2>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between border ${
                tier.highlight
                  ? "bg-gradient-to-b from-[#0a4227] to-[#062e1b] text-white border-emerald-500/50 shadow-xl scale-[1.02]"
                  : "bg-white text-slate-800 border-emerald-200/70 hover:border-emerald-400 hover:shadow-md"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 right-4 px-3 py-0.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-amber-400 text-[#041f12] text-[10px] font-black uppercase tracking-wider rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Most Impactful
                </span>
              )}

              <div>
                <p className={`text-2xl sm:text-3xl font-black mb-1 ${tier.highlight ? "text-amber-300" : "text-emerald-800"}`}>
                  {tier.amount}
                </p>

                <span
                  className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 ${
                    tier.highlight
                      ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30"
                      : "bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                  }`}
                >
                  {tier.label}
                </span>

                <p className={`text-xs sm:text-sm leading-relaxed ${tier.highlight ? "text-emerald-100/80" : "text-slate-600"}`}>
                  {tier.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-500/10 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Transparency</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="bg-gradient-to-r from-emerald-500/10 via-amber-500/5 to-emerald-500/10 rounded-2xl p-6 sm:p-8 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-emerald-700 rounded-xl text-white shadow-md shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#041f12]">Ready to make a difference?</h4>
              <p className="text-slate-600 text-xs sm:text-sm">Join hands with us in constructing homes & temples in Tamil Nadu.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="/donate"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              <span>Donate Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/sponsor-form"
              className="inline-flex items-center justify-center gap-2 bg-white border border-emerald-300 text-emerald-950 hover:bg-emerald-50 px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              Sponsor a Seva
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}