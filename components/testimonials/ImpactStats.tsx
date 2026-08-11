"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Users, CalendarDays, Sparkles } from "lucide-react";

export default function ImpactStats() {
  const stats = [
    {
      value: "200+",
      label: "Lives Supported",
      sub: "Families & individuals helped",
      icon: HeartHandshake,
    },
    {
      value: "340+",
      label: "Active Volunteers",
      sub: "Dedicated service members",
      icon: Users,
    },
    {
      value: "12",
      label: "Years of Service",
      sub: "Serving since 2010",
      icon: CalendarDays,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white text-gray-900 py-16 md:py-20 border-b border-emerald-100">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-100/40 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-emerald-50 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Optional Sub-Header Tag */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Our Journey in Numbers
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-white border border-gray-200 rounded-2xl p-8 md:p-10 text-center hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center overflow-hidden"
              >
                {/* Top Border Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Icon Badge */}
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Stat Value */}
                <p className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 bg-clip-text text-transparent leading-none mb-3 tracking-tight">
                  {stat.value}
                </p>

                {/* Label */}
                <p className="text-sm font-black text-gray-900 uppercase tracking-wider mb-1 group-hover:text-emerald-700 transition-colors">
                  {stat.label}
                </p>

                {/* Subtitle */}
                <p className="text-xs text-gray-500 font-medium">
                  {stat.sub}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}