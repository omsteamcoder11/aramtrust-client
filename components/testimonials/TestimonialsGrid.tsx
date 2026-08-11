"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles, MapPin } from "lucide-react";

export default function TestimonialsGrid() {
  const testimonials = [
    {
      quote:
        "I have worked with many organisations over 20 years but Aram Trust stands apart. Their commitment to every single person is unwavering. This is not just an NGO — it is a family that refuses to give up on anyone.",
      name: "Sister Mary Thomas",
      role: "Community Partner",
      location: "Arrakattalai, Tamil Nadu",
      initial: "MT",
      category: "Partner",
    },
    {
      quote:
        "Before Aram Trust helped us, my children could not go to school. Now my son is in 5th standard and wants to become a teacher. God bless everyone who donated.",
      name: "Lakshmi",
      role: "Parent",
      location: "Arrakattalai, Tamil Nadu",
      initial: "L",
      category: "Parent",
    },
    {
      quote:
        "I have been volunteering with the food service for 3 years. Seeing the smile on an elderly person's face when we bring them a hot meal — that is my blessing.",
      name: "Murugan",
      role: "Volunteer",
      location: "Arrakattalai, Tamil Nadu",
      initial: "M",
      category: "Volunteer",
    },
    {
      quote:
        "I donated to build a room for a homeless family as an offering. When I saw the photos of them moving in, I cried with joy. This is what true devotion means.",
      name: "Priya",
      role: "Donor",
      location: "Chennai, Tamil Nadu",
      initial: "P",
      category: "Donor",
    },
    {
      quote:
        "Thanks to the Poor Children Fund, my daughter received books, uniform, and school fees. She is now the first in our family to go to college.",
      name: "Ramesh",
      role: "Parent",
      location: "Arrakattalai, Tamil Nadu",
      initial: "R",
      category: "Parent",
    },
    {
      quote:
        "Being part of the construction team changed my life. I helped build homes for 5 families last year. This seva gives me peace.",
      name: "Kumar",
      role: "Volunteer Builder",
      location: "Arrakattalai, Tamil Nadu",
      initial: "K",
      category: "Volunteer",
    },
  ];

  // Refined theme badge colors — emerald only, no amber/orange
  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    Parent: { bg: "rgba(16,185,129,0.08)", text: "#047857", border: "rgba(16,185,129,0.25)" },
    Volunteer: { bg: "rgba(16,185,129,0.12)", text: "#059669", border: "rgba(16,185,129,0.3)" },
    Donor: { bg: "rgba(16,185,129,0.10)", text: "#065f46", border: "rgba(16,185,129,0.28)" },
    Partner: { bg: "rgba(16,185,129,0.08)", text: "#047857", border: "rgba(16,185,129,0.25)" },
  };

  return (
    <section className="relative overflow-hidden bg-white text-gray-900 py-16 md:py-24 border-b border-emerald-100">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-100/40 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-50 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Voices of Grace
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight">
              What People Say
            </h2>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => {
            const cat = categoryColors[t.category] || categoryColors.Partner;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Border Hover Glow */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Quote Icon Header */}
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-8 h-8 text-emerald-200 group-hover:text-emerald-400 transition-colors" />
                    <span
                      className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border"
                      style={{
                        backgroundColor: cat.bg,
                        color: cat.text,
                        borderColor: cat.border,
                      }}
                    >
                      {t.category}
                    </span>
                  </div>

                  {/* Quote Body */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 italic font-medium">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-5 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    {/* Avatar Badge */}
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-200">
                      {t.initial}
                    </div>

                    <div>
                      <p className="text-sm font-black text-gray-900 uppercase tracking-wider group-hover:text-emerald-700 transition-colors">
                        {t.name}
                      </p>
                      <p className="text-xs text-emerald-700 font-medium">
                        {t.role}
                      </p>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-500" />
                        {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}