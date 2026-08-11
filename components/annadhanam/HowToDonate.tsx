"use client";

import { ArrowRight, Sparkles, HeartHandshake } from "lucide-react";

export default function HowToDonate() {
  const tiers = [
    {
      amount: "₹500",
      label: "One Day Meal",
      desc: "Sponsors a full day of meals for one person in need.",
    },
    {
      amount: "₹2,500",
      label: "Weekly Feed",
      desc: "Provides nutritious meals for an entire week for a family.",
    },
    {
      amount: "₹10,000",
      label: "Monthly Sponsor",
      desc: "Fully sponsors our food service program for one month.",
    },
    {
      amount: "Any",
      label: "Your Offering",
      desc: "Every rupee you give feeds someone who is hungry today.",
    },
  ];

  return (
    <section className="bg-white border-t border-emerald-100 py-16 md:py-20 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1.5 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
              Annadhanam Support
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight">
              How to Donate
            </h2>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-emerald-200/80 rounded-2xl overflow-hidden shadow-sm bg-white">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className="group border-r border-b border-emerald-200/80 p-6 sm:p-8 bg-white hover:bg-emerald-50/50 transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-800 group-hover:text-emerald-600 transition-colors duration-300 mb-1">
                  {tier.amount}
                </p>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 mb-3 inline-block bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-md">
                  {tier.label}
                </span>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                  {tier.desc}
                </p>
              </div>

              {/* Accent Indicator */}
              <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center justify-between text-[11px] font-bold text-emerald-700">
                <span>Direct Meal Impact</span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Bar */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white text-gray-900 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-emerald-200">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0 border border-emerald-200">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 uppercase tracking-tight">
                Support Today's Meal Seva
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Your direct contribution reaches devotees and families in need immediately.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            
            <a  href="/donate"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-8 py-4 font-black text-xs uppercase tracking-widest rounded-xl shadow-md transition-all duration-300"
            >
              <span>Donate Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a  href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:bg-emerald-50 px-8 py-4 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}