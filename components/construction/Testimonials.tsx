"use client";

import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Recipient Name",
      location: "Arrakattalai, Tamil Nadu",
      quote:
        "Thanks to Makal Sevai Margam, our family now has a proper roof over our heads. God bless all the donors.",
      initial: "R",
    },
    {
      name: "Volunteer Name",
      location: "Volunteer, Since 2018",
      quote:
        "Being part of the construction team is one of the most fulfilling things I have done. We build hope for families.",
      initial: "V",
    },
    {
      name: "Donor Name",
      location: "Donor, Chennai",
      quote:
        "I funded a room as an offering in my mother's name. Seeing the family move in brought tears to my eyes.",
      initial: "D",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#062e1b] via-[#0a4227] to-[#041f12] py-16 md:py-20 text-white">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1.5 h-8 bg-gradient-to-b from-emerald-400 to-amber-400 rounded-full" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              Community Voices
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              What People Say
            </h2>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-emerald-500/20 hover:border-emerald-400/60 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-emerald-400/50 mb-4 group-hover:text-amber-400 transition-colors duration-300" />
                <p className="text-emerald-100/90 text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-5 border-t border-emerald-500/20">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-amber-400 flex items-center justify-center text-[#041f12] font-black text-sm rounded-xl shrink-0 shadow-md shadow-emerald-500/20">
                  {t.initial}
                </div>
                <div>
                  <p className="text-white font-bold text-sm uppercase tracking-tight">
                    {t.name}
                  </p>
                  <p className="text-emerald-200/70 text-xs font-medium">
                    {t.location}
                  </p>
                </div>
              </div>

              {/* Hover Accent Glow */}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Gold Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600 mt-16" />
    </section>
  );
}