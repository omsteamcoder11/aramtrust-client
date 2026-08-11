"use client";

import React from 'react';
import { UtensilsCrossed, Gift, HeartPulse } from 'lucide-react';

const services = [
  {
    icon: UtensilsCrossed,
    label: "Annadhanam",
    title: "Ending Hunger Through Daily Meals",
    desc: "Dedicated to ending the struggle for food by distributing fresh, nutritious, and culturally appropriate meals to the poor, needy, and sick.",
    iconBg: "#059669",
    accent: "#059669",
  },
  {
    icon: Gift,
    label: "Basic Necessities",
    title: "Essential Care & Support",
    desc: "Providing essential daily necessities and basic amenities to underprivileged families to help build sustainable and happy livelihoods.",
    iconBg: "#047857",
    accent: "#047857",
  },
  {
    icon: HeartPulse,
    label: "Health & Nutrition",
    title: "Support for the Sick & Elderly",
    desc: "Ensuring proper dietary care and fresh produce for the sick, elderly, and vulnerable community members across diverse regions.",
    iconBg: "#065f46",
    accent: "#065f46",
  },
];

export default function HomeImpact() {
  return (
    <div
      className="w-full font-sans"
      style={{ background: "#f0fdf4" }}
    >
      {/* Top border line */}
      <div
        className="w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #059669, #34d399, #059669, transparent)",
        }}
      />

      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #059669)" }} />
            <span className="text-lg">🌿</span>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #059669)" }} />
          </div>

          <p
            className="text-[11px] font-black uppercase tracking-[0.35em] mb-3"
            style={{ color: "#059669" }}
          >
            What We Do
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "#111827", fontFamily: "Georgia, serif" }}
          >
            Aram Trust Impacting Lives{" "}
            <span style={{ color: "#059669" }}>Every Single Day</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed max-w-xl mx-auto" style={{ color: "#4b5563" }}>
            Focused community initiatives dedicated to nourishing body and spirit with dignity and compassion.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col p-7 rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative overflow-hidden"
                style={{
                  background: "#ffffff",
                  border: "1px solid #a7f3d0",
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-sm"
                  style={{ background: s.iconBg }}
                >
                  <Icon size={22} className="text-white" strokeWidth={1.8} />
                </div>

                {/* Label */}
                <p
                  className="text-[10px] font-black uppercase tracking-widest mb-2"
                  style={{ color: s.accent }}
                >
                  {s.label}
                </p>

                {/* Title */}
                <h3
                  className="text-lg font-bold mb-3 leading-snug"
                  style={{ color: "#111827", fontFamily: "Georgia, serif" }}
                >
                  {s.title}
                </h3>

                {/* Desc */}
                <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>
                  {s.desc}
                </p>

                {/* Bottom Divider */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="h-px flex-1" style={{ background: "#d1fae5" }} />
                  <span className="text-xs opacity-40">🌿</span>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* Bottom border line */}
      <div
        className="w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #059669, #34d399, #059669, transparent)",
        }}
      />
    </div>
  );
}