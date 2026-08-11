// app/mission/page.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Heart, Utensils, GraduationCap, Eye, Users, Shield, Target, ArrowRight } from "lucide-react";

export default function MissionPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-60px", once: true });

  const values = [
    { icon: Heart, title: "Compassion", description: "Serving every soul with love, dignity, and active care.", number: "01" },
    { icon: Shield, title: "Trust & Transparency", description: "Rooted in integrity and clear financial accountability.", number: "02" },
    { icon: Users, title: "Community First", description: "Building resilient networks where every voice matters.", number: "03" },
    { icon: Target, title: "Impact & Action", description: "Direct, measurable support for vulnerable families.", number: "04" },
  ];

  const goals = [
    { title: "Daily Food Drives", desc: "Serving 10,000+ warm, nutritious meals annually across localities.", icon: Utensils, stat: "10,000+", label: "Meals/Year", emoji: "🍲" },
    { title: "Educational Support", desc: "Providing study kits, fees, and mentoring to underprivileged children.", icon: GraduationCap, stat: "300+", label: "Children Helped", emoji: "📚" },
    { title: "Emergency Relief", desc: "Immediate disaster, medical, and essential resource assistance.", icon: Shield, stat: "50+", label: "Relief Drives", emoji: "📦" },
  ];

  const stats = [
    { value: "2018", label: "Established", icon: "🌱" },
    { value: "10K+", label: "Meals Served", icon: "🍲" },
    { value: "500+", label: "Families Supported", icon: "🤝" },
    { value: "100%", label: "Direct Seva", icon: "💚" },
  ];

  return (
    <main ref={ref} className="min-h-screen overflow-x-hidden" style={{ background: "#f0fdf4" }}>

      {/* ── HERO ── */}
      <section className="relative py-12 sm:py-20 overflow-hidden" style={{ background: "#f0fdf4", borderBottom: "1px solid rgba(5,150,105,0.12)" }}>
        <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(5,150,105,0.1) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
            style={{ background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.2)" }}
          >
            <span>🌿</span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: "#059669" }}>
              Aram Trust · Community Welfare
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-bold text-emerald-950"
            style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", letterSpacing: "-0.02em", lineHeight: 1.15, fontFamily: "Georgia, serif" }}
          >
            Our Mission &{" "}
            <span style={{ color: "#059669", fontStyle: "italic" }}>Vision</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ width: 56, height: 3, background: "linear-gradient(90deg,#059669,#10b981)", borderRadius: 2, margin: "14px auto" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 sm:mt-4 max-w-xl mx-auto px-2"
            style={{ color: "#047857", fontSize: "clamp(0.875rem, 1.5vw, 1.05rem)", lineHeight: 1.7, fontWeight: 500 }}
          >
            Action-driven compassion — eradicating hunger, empowering children, and supporting vulnerable communities through selfless social work.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
                style={{ background: "#fff", border: "1px solid rgba(5,150,105,0.15)", boxShadow: "0 2px 8px rgba(5,150,105,0.06)" }}>
                <span className="text-xs sm:text-sm">{s.icon}</span>
                <span className="font-black text-xs sm:text-sm" style={{ color: "#059669" }}>{s.value}</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider" style={{ color: "#047857" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-xs sm:max-w-none mx-auto"
          >
            <Link href="/donate"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wide transition-all hover:opacity-90"
              style={{ background: "#059669", color: "white", boxShadow: "0 4px 16px rgba(5,150,105,0.35)" }}
            >
              <Heart className="w-4 h-4 fill-current" /> Sponsor A Meal
            </Link>
            <Link href="/volunteer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wide transition-all hover:bg-emerald-50"
              style={{ border: "1.5px solid rgba(5,150,105,0.3)", color: "#059669" }}
            >
              Volunteer <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-12 sm:py-16" style={{ background: "#f0fdf4" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase mb-1.5 sm:mb-2" style={{ color: "#059669" }}>Who We Are</p>
            <h2 className="font-bold text-emerald-950" style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)", fontFamily: "Georgia, serif" }}>
              Driven by Kindness, <span style={{ color: "#059669", fontStyle: "italic" }}>Guided by Service</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: "#fff", border: "1px solid rgba(5,150,105,0.15)", boxShadow: "0 4px 24px rgba(5,150,105,0.05)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(5,150,105,0.1)" }}>
                  <Heart className="w-5 h-5" style={{ color: "#059669" }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "#059669" }}>Mission</p>
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg" style={{ fontFamily: "Georgia, serif" }}>What We Do</h3>
                </div>
              </div>
              <p className="text-gray-600 leading-[1.8] text-xs sm:text-sm">
                To uplift underprivileged communities through daily <strong style={{ color: "#047857" }}>Annadhanam meal distribution</strong>, educational scholarships, and direct emergency relief — restoring dignity and hope for those in need.
              </p>
              <div className="mt-5 pt-4 flex items-center gap-2" style={{ borderTop: "1px solid rgba(5,150,105,0.12)" }}>
                <span>🌱</span>
                <p className="text-xs italic" style={{ color: "#047857" }}>"Nourishing humanity through pure, selfless action."</p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-2xl p-6 sm:p-8 overflow-hidden"
              style={{ background: "#ffffff", border: "1px solid rgba(5,150,105,0.15)", boxShadow: "0 4px 24px rgba(5,150,105,0.05)" }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)" }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(5,150,105,0.1)", border: "1px solid rgba(5,150,105,0.15)" }}>
                    <Eye className="w-5 h-5" style={{ color: "#059669" }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "#059669" }}>Vision</p>
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg" style={{ fontFamily: "Georgia, serif" }}>The Future We Build</h3>
                  </div>
                </div>
                <p className="leading-[1.8] text-xs sm:text-sm text-gray-600">
                  A society where <span style={{ color: "#059669", fontWeight: 700 }}>no individual goes to sleep hungry</span>, every child receives a fair education, and empathy forms the backbone of our local communities.
                </p>
                <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(5,150,105,0.12)" }}>
                  <p className="text-xs italic" style={{ color: "#047857" }}>"Building a hunger-free world through collective generosity."</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-12 sm:py-16" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase mb-1.5 sm:mb-2" style={{ color: "#059669" }}>What We Stand For</p>
            <h2 className="font-bold text-emerald-950" style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)", fontFamily: "Georgia, serif" }}>
              Our Core <span style={{ color: "#059669", fontStyle: "italic" }}>Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(5,150,105,0.12)" }}
                  className="relative group rounded-2xl p-5 sm:p-6 cursor-pointer transition-all duration-300 overflow-hidden"
                  style={{ background: "#f0fdf4", border: "1px solid rgba(5,150,105,0.15)" }}
                >
                  <span className="absolute top-3 right-4 font-black opacity-[0.08] select-none text-3xl sm:text-4xl"
                    style={{ color: "#059669", lineHeight: 1 }}>
                    {value.number}
                  </span>
                  <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "rgba(5,150,105,0.1)", border: "1px solid rgba(5,150,105,0.12)" }}>
                    <Icon className="w-5 h-5" style={{ color: "#059669" }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1" style={{ fontFamily: "Georgia, serif" }}>{value.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{value.description}</p>
                  <div className="mt-4 w-6 h-0.5 rounded-full transition-all duration-300 group-hover:w-full" style={{ background: "#059669" }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GOALS ── */}
      <section className="py-12 sm:py-16" style={{ background: "#f0fdf4" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase mb-1.5 sm:mb-2" style={{ color: "#059669" }}>Our Commitment</p>
            <h2 className="font-bold text-emerald-950" style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)", fontFamily: "Georgia, serif" }}>
              Goals by <span style={{ color: "#059669", fontStyle: "italic" }}>2030</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {goals.map((goal, idx) => {
              const Icon = goal.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "#fff", border: "1px solid rgba(5,150,105,0.15)", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}
                >
                  <div className="h-1" style={{ background: "linear-gradient(to right, #059669, #34d399)" }} />
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(5,150,105,0.08)" }}>
                        <Icon className="w-5 h-5" style={{ color: "#059669" }} />
                      </div>
                      <span className="text-2xl">{goal.emoji}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1" style={{ fontFamily: "Georgia, serif" }}>{goal.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4 sm:mb-5">{goal.desc}</p>
                    <div className="rounded-xl px-4 py-3 flex items-center justify-between"
                      style={{ background: "#f0fdf4", border: "1px solid rgba(5,150,105,0.12)" }}>
                      <p className="font-black text-xl sm:text-2xl" style={{ color: "#059669" }}>{goal.stat}</p>
                      <p className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold" style={{ color: "#047857" }}>{goal.label}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 sm:py-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #059669 0%, #047857 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse at 10% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="text-3xl sm:text-4xl block mb-3 sm:mb-4">🌱</span>
            <p className="text-emerald-200 text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase mb-2 sm:mb-3">Be Part of the Mission</p>
            <h2 className="font-bold text-white mb-3 sm:mb-4"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontFamily: "Georgia, serif", lineHeight: 1.15 }}>
              Join Aram Trust in Serving Others
            </h2>
            <p className="text-emerald-100 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto" style={{ fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)" }}>
              Help transform lives through direct hunger relief, education support, and compassionate community care.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xs sm:max-w-none mx-auto">
              <Link href="/donate"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wide transition-all hover:scale-105"
                style={{ background: "white", color: "#059669", boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
              >
                <Heart className="w-4 h-4 fill-current" /> Sponsor A Meal
              </Link>
              <Link href="/volunteer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wide transition-all hover:bg-white/10"
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