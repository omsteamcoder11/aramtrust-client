// app/about/history/page.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

const TIMELINE = [
  {
    year: "2010",
    title: "Foundation",
    desc: "Uthamar Thiru Kovil Arrakattalai Makkal Sevai Margam was founded with a vision to serve the underprivileged, rooted in the teachings of Vallalar.",
    emoji: "🪔",
  },
  {
    year: "2012",
    title: "Annadhanam Begins",
    desc: "Free meal service (Annadhanam) was launched to feed the hungry and the poor — inspired by Vallalar's belief that feeding the hungry is the highest form of worship.",
    emoji: "🍱",
  },
  {
    year: "2015",
    title: "Education Aid Program",
    desc: "The trust began supporting underprivileged children with school fees, books, and supplies — lighting the lamp of knowledge in the community.",
    emoji: "📚",
  },
  {
    year: "2018",
    title: "Community Growth",
    desc: "The trust expanded its reach to more families across Arrakattalai and surrounding villages, touching hundreds of lives through consistent seva.",
    emoji: "🙏",
  },
  {
    year: "2020",
    title: "Temple Construction",
    desc: "The sacred temple construction project was launched — a permanent legacy of faith and devotion for generations to come.",
    emoji: "🏛️",
  },
  {
    year: "Today",
    title: "Continuing the Mission",
    desc: "With 500+ lives touched, 1000+ meals served, and a growing community of devotees and donors — the mission of seva continues stronger than ever.",
    emoji: "✨",
  },
];

const STATS = [
  { value: "2010", label: "Year Founded", icon: "🪔" },
  { value: "500+", label: "Lives Touched", icon: "🙏" },
  { value: "1000+", label: "Meals Served", icon: "🍱" },
  { value: "10+", label: "Years of Seva", icon: "🏗️" },
];

export default function OurHistoryPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <main ref={ref} className="min-h-screen overflow-x-hidden" style={{ background: "#fdf6f0" }}>

      {/* ── HERO ── */}
      <section className="py-20 text-center" style={{ background: "#fff8f3", borderBottom: "1px solid #edd9c8" }}>
        <div className="max-w-3xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(234,88,12,0.08)", border: "1px solid rgba(234,88,12,0.2)" }}
          >
            <span>🪔</span>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "#ea580c" }}>
              Uthamar Thiru Kovil · Arrakattalai
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-bold text-gray-900"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontFamily: "Georgia, serif", lineHeight: 1.1 }}
          >
            Our{" "}
            <span style={{ color: "#ea580c", fontStyle: "italic" }}>History</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ width: 56, height: 3, background: "linear-gradient(90deg,#ea580c,#d97706)", borderRadius: 2, margin: "16px auto" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: "#92400e", fontSize: "1rem", lineHeight: 1.7, fontWeight: 500 }}
          >
            A journey of faith, compassion, and selfless seva — rooted in the
            teachings of Vallalar since 2010.
          </motion.p>

        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12" style={{ background: "#fdf6f0" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.08 }}
                className="text-center rounded-2xl py-6 px-4"
                style={{ background: "#fff", border: "1px solid #edd9c8", boxShadow: "0 2px 8px rgba(234,88,12,0.06)" }}
              >
                <span className="text-2xl block mb-2">{stat.icon}</span>
                <p className="font-black text-2xl" style={{ color: "#ea580c" }}>{stat.value}</p>
                <p className="text-[10px] uppercase tracking-widest mt-1 font-semibold" style={{ color: "#92400e" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-16" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto px-6">

          <div className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-2" style={{ color: "#ea580c" }}>Our Journey</p>
            <h2 className="font-bold text-gray-900" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontFamily: "Georgia, serif" }}>
              Milestones of <span style={{ color: "#ea580c", fontStyle: "italic" }}>Seva</span>
            </h2>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
              style={{ background: "linear-gradient(to bottom, #ea580c, #fed7aa)", transform: "translateX(-50%)" }} />

            <div className="space-y-8">
              {TIMELINE.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content card */}
                  <div className="w-full md:w-[45%] rounded-2xl p-6"
                    style={{ background: "#fdf6f0", border: "1px solid #edd9c8", boxShadow: "0 2px 12px rgba(234,88,12,0.06)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "#ea580c" }}>{item.year}</p>
                        <h3 className="font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-[10%] justify-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs text-white z-10"
                      style={{ background: "linear-gradient(135deg,#ea580c,#d97706)", boxShadow: "0 0 0 4px #fdf6f0, 0 0 0 6px #edd9c8" }}>
                      {idx + 1}
                    </div>
                  </div>

                  {/* Empty space for opposite side */}
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 relative overflow-hidden" style={{ background: "#ea580c" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="text-4xl block mb-4">🪔</span>
            <p className="text-orange-200 text-[11px] font-bold tracking-[0.28em] uppercase mb-3">Be Part of the Story</p>
            <h2 className="font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontFamily: "Georgia, serif", lineHeight: 1.15 }}>
              Continue the Legacy of Seva
            </h2>
            <p className="text-orange-100 mb-8 leading-relaxed" style={{ fontSize: "0.95rem" }}>
              Help us write the next chapter — through your donation, volunteering, or sponsorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/donate"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide transition-all hover:scale-105"
                style={{ background: "white", color: "#ea580c", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}
              >
                <Heart className="w-4 h-4 fill-current" /> Offer Seva
              </Link>
              <Link href="/volunteer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide transition-all hover:bg-white/10"
                style={{ border: "2px solid rgba(255,255,255,0.5)", color: "white" }}
              >
                Volunteer With Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}