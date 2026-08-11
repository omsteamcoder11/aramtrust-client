"use client";

import { Home, Calendar, Users, HardHat, TrendingUp } from "lucide-react";

export default function ImpactStats() {
  const stats = [
    {
      value: "50+",
      label: "Homes Built",
      sub: "Families sheltered safely",
      icon: Home,
    },
    {
      value: "10+",
      label: "Years of Service",
      sub: "Dedicated since 2010",
      icon: Calendar,
    },
    {
      value: "100+",
      label: "Active Volunteers",
      sub: "Selfless seva contributors",
      icon: Users,
    },
    {
      value: "3",
      label: "Ongoing Projects",
      sub: "Currently active sites",
      icon: HardHat,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#062e1b] via-[#0a4227] to-[#062e1b] py-16 md:py-20 text-white">
      {/* Background Subtle Emerald Geometric Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 border border-emerald-500/30">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              Makkal Sevai • Verified Footprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Our Impact in Numbers
            </h2>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-7 border border-emerald-500/20 hover:border-emerald-400/60 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Row: Value & Icon */}
                <div className="flex items-start justify-between mb-4">
                  <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-amber-300 tracking-tight">
                    {stat.value}
                  </p>
                  <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-[#041f12] transition-all duration-300 border border-emerald-500/20">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom Row: Label & Subtext */}
                <div>
                  <p className="text-base font-bold text-emerald-100 tracking-wide uppercase text-xs">
                    {stat.label}
                  </p>
                  <p className="text-xs text-emerald-200/60 font-medium mt-1">
                    {stat.sub}
                  </p>
                </div>

                {/* Subtle Hover Accent Bar */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}