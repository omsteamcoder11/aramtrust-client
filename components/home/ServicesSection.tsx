"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const services = [
  {
    icon: "🏗️",
    title: "Building Construction",
    subtitle: "Shelter & Structures",
    desc: "We build homes and community structures for families in need — brick by brick, rooted in the blessings of Uthamar Thiru Kovil, Arrakattalai.",
    points: [
      "Homes for homeless families",
      "Community hall construction",
      "Temple restoration work",
    ],
    href: "/services/construction",
    color: "from-orange-900/40 to-orange-950/60",
    accent: "#f97316",
  },
  {
    icon: "🍱",
    title: "Food Service",
    subtitle: "Annadanam · Daily Meals",
    desc: "Daily meals served with love and devotion to the hungry, elderly, and those who cannot provide for themselves in our community.",
    points: [
      "Daily annadanam program",
      "Festival food distribution",
      "Meals for the elderly",
    ],
    href: "/services/food",
    color: "from-amber-900/40 to-amber-950/60",
    accent: "#fbbf24",
  },
  {
    icon: "💛",
    title: "Poor Children Fund",
    subtitle: "Education & Healthcare",
    desc: "Funding education, healthcare, and nutrition for children from the poorest families — giving them a future they truly deserve.",
    points: [
      "School fees & supplies",
      "Healthcare support",
      "Nutrition assistance",
    ],
    href: "/services/children-fund",
    color: "from-yellow-900/40 to-yellow-950/60",
    accent: "#fcd34d",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-80px", once: false });

  return (
    <section
      ref={ref}
      className="w-full py-16 sm:py-20 px-4 sm:px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.35em]
            text-amber-500 mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900
            tracking-tight">
            Our{" "}
            <span className="text-orange-500">Services</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3
            max-w-xl mx-auto leading-relaxed">
            Three pillars of service — rooted in faith, driven by
            compassion, dedicated to our community.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-2xl overflow-hidden
                flex flex-col"
              style={{
                background: "linear-gradient(145deg,#1c0700,#2d0d00)",
                border: "1px solid rgba(251,191,36,0.12)",
              }}
            >
              {/* Top accent */}
              <div
                className="h-[2px] w-full"
                style={{
                  background: `linear-gradient(90deg,transparent,${service.accent},transparent)`,
                }}
              />

              {/* Card content */}
              <div className="p-6 sm:p-7 flex flex-col flex-1">

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center
                    justify-center text-2xl mb-5 flex-shrink-0"
                  style={{
                    background: "rgba(251,191,36,0.10)",
                    border: "1px solid rgba(251,191,36,0.18)",
                  }}
                >
                  {service.icon}
                </div>

                {/* Subtitle */}
                <p
                  className="text-[10px] font-black uppercase
                    tracking-[0.3em] mb-2"
                  style={{ color: service.accent }}
                >
                  {service.subtitle}
                </p>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white
                  mb-3 leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-amber-100/50 text-sm leading-relaxed
                  mb-5">
                  {service.desc}
                </p>

                {/* Points */}
                <ul className="space-y-2 mb-6 flex-1">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm
                        text-amber-200/60"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: service.accent }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm
                    font-bold uppercase tracking-wider transition-all
                    duration-200 group-hover:gap-3"
                  style={{ color: service.accent }}
                >
                  Learn More
                  <span className="transition-transform duration-200
                    group-hover:translate-x-1">
                    →
                  </span>
                </Link>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/donate"
            className="inline-flex items-center justify-center
              gap-2 rounded-full px-8 py-3 text-sm font-bold
              uppercase tracking-wider text-[#1a0500]
              transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#fcd34d,#fbbf24,#f59e0b)",
              boxShadow: "0 4px 20px rgba(251,191,36,0.30)",
            }}
          >
            🙏 Support Our Work
          </Link>
        </motion.div>

      </div>
    </section>
  );
}