"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Sparkles, MessageSquareHeart } from "lucide-react";

export default function TestimonialsHero() {
  return (
    <section className="relative overflow-hidden bg-white text-gray-900 pt-[88px] md:pt-[104px] pb-12 md:pb-20 border-b border-emerald-100">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-100/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-50 blur-[100px] rounded-full pointer-events-none" />

      {/* Decorative Geometric Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.8) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Tag / Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Don't Believe Us? See Results
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 uppercase tracking-tight leading-[1.1] mb-6">
            Real{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed font-medium mb-8">
            Hear from parents, children, volunteers, and donors who are part of the{" "}
            <span className="text-emerald-700 font-semibold">Aram Trust</span> family in Arrakattalai, Tamil Nadu.
          </p>

          {/* Stat Badges / Highlights */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-emerald-200 shadow-sm">
              <MessageSquareHeart className="w-4 h-4 text-emerald-600" />
              <span>100+ Verified Stories</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-emerald-200 shadow-sm">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              <span>Arrakattalai Community</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Radiant Divider Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
    </section>
  );
}