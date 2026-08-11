"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  UtensilsCrossed,
  GraduationCap,
  Building2,
  HeartHandshake,
  ArrowRight,
  Heart,
  Users,
} from "lucide-react";

export default function ProgramsDonate() {
  const options = [
    {
      amount: "₹1,000",
      label: "Feed a Family",
      desc: "Provides meals for one family for a full month through our food service.",
      icon: UtensilsCrossed,
    },
    {
      amount: "₹5,000",
      label: "Educate a Child",
      desc: "Covers school fees, books, and uniform for one child for a year.",
      icon: GraduationCap,
    },
    {
      amount: "₹25,000",
      label: "Build a Wall",
      desc: "Funds a structural section of the temple construction.",
      icon: Building2,
    },
    {
      amount: "Any",
      label: "Your Offering",
      desc: "Every contribution, big or small, serves God's people with devotion.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#041f12] via-[#062e1b] to-[#0a4227] text-white py-16 md:py-24 border-t border-emerald-800/40">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3 bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-200">
              Sacred Contributions
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Support Our <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Programs</span>
          </h2>

          <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full mt-3" />
        </div>

        {/* Donation Tiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {options.map((opt, idx) => {
            const Icon = opt.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-[#041f12]/60 border border-emerald-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-950/60 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Accent Top Border Highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Icon & Amount */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-amber-400 border border-emerald-400/20 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-[#041f12] transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-amber-300 transition-colors">
                    {opt.amount}
                  </p>

                  <span className="text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-md mb-3 inline-block bg-emerald-500/20 text-emerald-200 border border-emerald-400/20">
                    {opt.label}
                  </span>

                  <p className="text-emerald-100/75 text-sm leading-relaxed font-medium mt-1">
                    {opt.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/donate"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-[#041f12] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>Donate Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/sponsor-form"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-emerald-400/30 text-emerald-100 bg-emerald-950/40 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-800/40 hover:border-amber-400/50 hover:text-white transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Sponsor a Seva</span>
          </Link>

          <Link
            href="/volunteer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-emerald-400/30 text-emerald-100 bg-emerald-950/40 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-800/40 hover:border-amber-400/50 hover:text-white transition-all duration-300"
          >
            <Users className="w-4 h-4 text-emerald-300" />
            <span>Volunteer With Us</span>
          </Link>
        </div>

      </div>

      {/* Decorative Bottom Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600 mt-16" />
    </section>
  );
}