"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  UtensilsCrossed,
  GraduationCap,
  HeartHandshake,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function ProgramsList() {
  const programs = [
    {
      number: "01",
      title: "Building Construction",
      tag: "Infrastructure",
      desc: "We build homes for the homeless and temple infrastructure for the community. Every structure is built with donated funds and volunteer labour.",
      highlights: [
        "Homes for homeless families",
        "Temple hall construction",
        "Community infrastructure",
        "Volunteer-led builds",
      ],
      icon: Building2,
      link: "/services/construction",
    },
    {
      number: "02",
      title: "Food Service",
      tag: "Nutrition",
      desc: "Every day, our volunteers prepare and distribute fresh meals and sacred prasadam to the poor, elderly, and hungry across Arrakattalai.",
      highlights: [
        "Daily meal distribution",
        "Temple prasadam",
        "Festival feeding drives",
        "Elder care nutrition",
      ],
      icon: UtensilsCrossed,
      link: "/services/food-service",
    },
    {
      number: "03",
      title: "Poor Children Fund",
      tag: "Education & Care",
      desc: "We fund school fees, books, uniforms, meals, and health checkups for underprivileged children so no child is left behind.",
      highlights: [
        "School fees & uniforms",
        "Books & stationery",
        "Daily nutrition",
        "Health checkups",
      ],
      icon: GraduationCap,
      link: "/services/education",
    },
    {
      number: "04",
      title: "Community Welfare",
      tag: "Social Support",
      desc: "Beyond our core programs, we support families in crisis, connect people with resources, and organise community events throughout the year.",
      highlights: [
        "Family crisis support",
        "Community events",
        "Festival celebrations",
        "Elder welfare",
      ],
      icon: HeartHandshake,
      link: "/services/community-welfare",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3 bg-emerald-500/10 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-800">
              Community Initiatives
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#041f12] uppercase tracking-tight">
            All <span className="text-emerald-700">Programs</span>
          </h2>
          
          <div className="w-12 h-1 bg-gradient-to-r from-emerald-600 to-amber-400 rounded-full mt-3" />
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {programs.map((program, idx) => {
            const Icon = program.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-white border border-emerald-200/80 rounded-2xl p-6 sm:p-8 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Subtle Amber Bar on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Metadata Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 border border-emerald-200/60 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-3xl font-black text-emerald-950/20 group-hover:text-emerald-700/40 transition-colors leading-none">
                        {program.number}
                      </span>
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800">
                      {program.tag}
                    </span>
                  </div>

                  {/* Program Title */}
                  <h3 className="text-lg sm:text-xl font-black text-[#041f12] uppercase tracking-tight mb-3 group-hover:text-emerald-800 transition-colors">
                    {program.title}
                  </h3>

                  {/* Program Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                    {program.desc}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-emerald-100/80 mb-6">
                    {program.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                        <span className="text-xs text-slate-700 font-semibold">
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Link */}
                <Link
                  href={program.link}
                  className="inline-flex items-center justify-between w-full pt-3 text-[11px] font-black uppercase tracking-widest text-emerald-800 group-hover:text-amber-600 transition-colors"
                >
                  <span>Learn More & Support</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}