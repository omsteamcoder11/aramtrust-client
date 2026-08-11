"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "5000+", label: "Meals Distributed", icon: "🍱" },
  { value: "1000+", label: "Beneficiaries Helped", icon: "🤝" },
  { value: "15+", label: "Communities Reached", icon: "🌾" },
  { value: "100%", label: "Nutritional Support", icon: "🥗" },
];

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-80px", once: false });

  return (
    <section
      ref={ref}
      className="w-full py-12 sm:py-14 px-4"
      style={{
        background: "#f0fdf4",
        borderTop: "1px solid #a7f3d0",
        borderBottom: "1px solid #a7f3d0",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Icon Circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-3 shadow-sm"
                style={{
                  background: "#ffffff",
                  border: "1px solid #a7f3d0",
                  boxShadow: "0 2px 8px rgba(5, 150, 105, 0.05)",
                }}
              >
                {stat.icon}
              </div>

              {/* Value */}
              <p
                className="text-3xl sm:text-4xl font-black leading-none mb-1"
                style={{ color: "#059669" }}
              >
                {stat.value}
              </p>

              {/* Label */}
              <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800/60">
                {stat.label}
              </p>

              {/* Divider between items */}
              {i < stats.length - 1 && (
                <div
                  className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-px h-8"
                  style={{ background: "#a7f3d0" }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-8 text-[9px] font-medium uppercase tracking-[0.2em]"
        style={{ color: "#059669", opacity: 0.7 }}
      >
        Aram Trust · Nourishing Communities · Ending Hunger
      </motion.p>
    </section>
  );
}