"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Heart, Share2, Sparkles, ArrowRight } from "lucide-react";

export default function GetInvolved() {
  const ways = [
    {
      step: "01",
      title: "Volunteer On-Site",
      desc: "Join our construction teams, kitchen volunteers, or community outreach workers. No special skills needed — just a willing heart.",
      action: "Apply to Volunteer",
      href: "/volunteer",
      icon: Users,
    },
    {
      step: "02",
      title: "Sponsor a Program",
      desc: "Fund a specific program — a construction project, a month of meals, or a child's education. Your name honours the work.",
      action: "Become a Sponsor",
      href: "/sponsor-form",
      icon: Heart,
    },
    {
      step: "03",
      title: "Spread the Word",
      desc: "Share our mission with your family, friends, and community. Awareness is the first step toward change.",
      action: "Contact Us",
      href: "/contact",
      icon: Share2,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#041f12] via-[#062e1b] to-[#0a4227] text-white py-16 md:py-24 border-t border-emerald-800/40">
      {/* Radial Background Glow Effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3 bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-200">
              Join Our Mission
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            How to <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Get Involved</span>
          </h2>

          <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full mt-3" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {ways.map((w, idx) => {
            const Icon = w.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-[#041f12]/60 border border-emerald-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-950/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Accent Top Border Highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Step Icon and Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-amber-400 border border-emerald-400/20 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-[#041f12] transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-black text-emerald-500/20 group-hover:text-amber-400/30 transition-colors leading-none">
                      {w.step}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight mb-3 group-hover:text-amber-300 transition-colors">
                    {w.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-emerald-100/75 text-sm leading-relaxed mb-6 font-medium">
                    {w.desc}
                  </p>
                </div>

                {/* Call-to-Action Link Button */}
                <Link
                  href={w.href}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full border border-emerald-400/30 text-amber-300 font-black text-xs uppercase tracking-widest bg-emerald-950/40 hover:bg-amber-400 hover:text-[#041f12] hover:border-amber-400 transition-all duration-300"
                >
                  <span>{w.action}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}