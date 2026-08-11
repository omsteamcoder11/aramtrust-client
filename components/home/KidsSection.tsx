"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Heart, ArrowRight } from "lucide-react";

export default function AboutMission() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-[#eaf6ff] overflow-hidden">

      {/* 🔥 PREMIUM CURVE BACKGROUND */}
      <div className="absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 w-[140%] h-[400px] bg-gradient-to-b from-white/70 to-transparent rounded-b-[100%] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* LEFT IMAGE */}
        <div className="relative flex justify-center lg:justify-start">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            {/* IMAGE */}
            <div className="w-[260px] h-[360px] sm:w-[320px] sm:h-[440px] md:w-[400px] md:h-[520px] rounded-t-full rounded-b-3xl overflow-hidden border-[8px] sm:border-[10px] border-white shadow-2xl relative">
              <img 
                src="/home/2.jpg" 
                alt="Happy children learning"
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#009270]/30 to-transparent" />
            </div>

            {/* FLOAT CARD */}
            {/* <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-6 sm:-bottom-8 -left-4 sm:-left-10 bg-white p-4 sm:p-6 rounded-3xl shadow-xl border border-gray-100 flex gap-3 sm:gap-4 items-center w-[220px] sm:w-[280px]"
            >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFCC29] flex items-center justify-center text-gray-900 shadow-lg">
                    <Heart size={20} />
                </div>
                <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                        <span>Total Impact</span>
                        <span className="text-[#009270]">85%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-[#009270]" />
                    </div>
                </div>
            </motion.div> */}

          </motion.div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-8 sm:space-y-10 text-center lg:text-left">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* <span className="text-[#8B235E] font-black tracking-[0.3em] uppercase text-[10px] mb-3 block">
              About Us
            </span> */}

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Your Small Help Can Create <br />
              <span className="text-[#009270]">A Big Change</span> in a Child’s Life
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mt-4">
              Every donation you make brings hope, education, and protection to children in need. 
              Your kindness can turn struggles into opportunities and dreams into reality.
            </p>

            {/* LIST */}
            <ul className="space-y-4 mt-8">
              {[
                "100% Transparent Donation Usage",
                "Direct Impact on Child Education",
                "Trusted & Verified NGO Support"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-700 justify-center lg:justify-start">
                  <CheckCircle2 size={18} className="text-[#009270]" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
      <a href="/donate" className="inline-flex items-center gap-3 py-3 sm:py-4 px-6 sm:px-8 bg-[#009270] text-white rounded-full font-bold uppercase tracking-wide text-xs sm:text-sm shadow-lg hover:bg-[#007a5d] transition-all mt-10">
  Donate Now
  <ArrowRight size={16} />
</a>

          </motion.div>
        </div>

      </div>
    </section>
  );
}



