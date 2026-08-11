// app/services/education/page.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Heart,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Users,
  Star,
  Sparkles,
  ChevronRight,
  Gift,
  HandHeart,
  Award,
} from "lucide-react";

const STATS = [
  { value: "500+", label: "Children Helped", icon: BookOpen },
  { value: "10+", label: "Years Active", icon: Sparkles },
  { value: "100%", label: "Goes to Cause", icon: Heart },
  { value: "Free", label: "For All Children", icon: Star },
];

const WHAT_WE_PROVIDE = [
  {
    icon: BookOpen,
    title: "Books & Supplies",
    desc: "We provide textbooks, notebooks, pens, and all necessary school supplies to underprivileged children every year.",
  },
  {
    icon: GraduationCap,
    title: "School Fees",
    desc: "We cover school fees for children from poor families who cannot afford basic education costs.",
  },
  {
    icon: Users,
    title: "Tuition Support",
    desc: "Extra tuition and coaching support is provided to help children perform better academically.",
  },
  {
    icon: Star,
    title: "Merit Awards",
    desc: "Outstanding students are recognized and rewarded to encourage excellence and inspire others.",
  },
];

export default function EducationPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <main ref={ref} className="min-h-screen overflow-x-hidden bg-white text-slate-800">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#041f12] via-[#062e1b] to-[#0a4227] text-white pt-28 pb-16 md:pb-24 border-b border-emerald-800/40">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-200">
                Education Aid
              </span>
            </div>

            <h1
              className="font-black text-white mb-4 uppercase tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}
            >
              Lighting the Lamp of{" "}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Knowledge
              </span>
            </h1>

            <div className="w-14 h-1 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full mb-6" />

            <p className="mb-8 text-emerald-100/90 text-sm sm:text-base leading-relaxed font-medium max-w-2xl">
              Rooted in the teachings of Vallalar — we believe every child deserves
              the right to education. Uthamar Thiru Kovil Arrakattalai Makkal Sevai Margam
              supports underprivileged children with school fees, books, and supplies
              across Arrakattalai and surrounding villages in Tamil Nadu.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "School Fees",
                "Books & Supplies",
                "Tuition Support",
                "Merit Awards",
              ].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-200 border border-emerald-700/50 backdrop-blur-sm"
                >
                  • {item}
                </span>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-black text-xs uppercase tracking-widest bg-gradient-to-r from-amber-400 to-amber-500 text-[#041f12] shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-400 hover:scale-[1.02] transition-all"
              >
                <Heart className="w-4 h-4 fill-current" /> Support a Child
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-black text-xs uppercase tracking-widest border border-emerald-400/30 text-white hover:bg-emerald-500/10 hover:border-emerald-400 transition-all"
              >
                Volunteer <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Gold Line Highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500" />
      </section>

      {/* ── STATS ── */}
      <section className="py-12 bg-emerald-50/40 border-b border-emerald-100/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.08 }}
                  className="text-center rounded-2xl py-6 px-4 bg-white border border-emerald-200/60 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-amber-400" />
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 border border-emerald-200/60 mx-auto flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="font-black text-2xl text-[#041f12]">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-widest mt-1 font-bold text-emerald-800">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT WE PROVIDE ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-emerald-700 mb-2 block">
              What We Offer
            </span>
            <h2
              className="font-black text-[#041f12] uppercase tracking-tight"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              How We <span className="text-emerald-700">Support Children</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-emerald-600 to-amber-400 rounded-full mx-auto mt-3.5" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHAT_WE_PROVIDE.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.08 }}
                  className="group bg-[#f8faf8] border border-emerald-200/70 rounded-2xl p-6 sm:p-7 hover:bg-gradient-to-b hover:from-white hover:to-emerald-50/50 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-700 border border-emerald-200/60 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-[#041f12] uppercase tracking-tight text-sm mb-2.5 group-hover:text-emerald-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-emerald-200/50 flex items-center gap-1 text-[11px] font-bold text-emerald-700 group-hover:text-amber-600 transition-colors">
                    <span>Impact Program</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW TO HELP ── */}
      <section className="py-16 md:py-24 bg-emerald-50/30 border-t border-emerald-100/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-emerald-700 mb-2 block">
              Get Involved
            </span>
            <h2
              className="font-black text-[#041f12] uppercase tracking-tight"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              How You Can <span className="text-emerald-700">Help</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-emerald-600 to-amber-400 rounded-full mx-auto mt-3.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Gift,
                step: "01",
                title: "Donate",
                desc: "Your donation directly funds school fees, books, and supplies for one child for an entire year. 100% goes to the cause.",
                btn: "Donate Now",
                href: "/donate",
              },
              {
                icon: HandHeart,
                step: "02",
                title: "Volunteer",
                desc: "Teach, tutor, or mentor children in our community across Arrakattalai. Your time and knowledge makes a lasting difference.",
                btn: "Volunteer With Us",
                href: "/volunteer",
              },
              {
                icon: Award,
                step: "03",
                title: "Sponsor a Child",
                desc: "Sponsor one child's complete education for a year — school fees, books, uniform and supplies fully covered.",
                btn: "Sponsor Now",
                href: "/sponsor-form",
              },
            ].map((item, idx) => {
              const ActionIcon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white border border-emerald-200/70 rounded-2xl p-7 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-emerald-500/20 group-hover:text-emerald-600 transition-colors">
                        {item.step}
                      </span>
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 border border-emerald-200/60 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <ActionIcon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-black text-[#041f12] uppercase tracking-tight text-base mb-3 group-hover:text-emerald-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl border border-emerald-200 bg-emerald-50/50 text-emerald-800 font-black text-xs uppercase tracking-widest hover:bg-emerald-700 hover:text-white hover:border-emerald-700 transition-all duration-200"
                  >
                    <span>{item.btn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#041f12] via-[#062e1b] to-[#0a4227] text-white py-16 md:py-24">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-6 h-6" />
            </div>

            <p className="text-amber-300 text-[11px] font-black tracking-[0.28em] uppercase mb-3">
              Uthamar Thiru Kovil Arrakattalai
            </p>

            <h2
              className="font-black text-white uppercase tracking-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1.1 }}
            >
              Help a Child Learn Today
            </h2>

            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full mx-auto mb-6" />

            <p className="text-emerald-100/90 text-sm leading-relaxed max-w-lg mx-auto mb-8">
              Every rupee you donate goes directly to a child's education in Arrakattalai,
              Tamil Nadu. Be the reason a child smiles today and succeeds tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-gradient-to-r from-amber-400 to-amber-500 text-[#041f12] shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-400 hover:scale-[1.02] transition-all"
              >
                <Heart className="w-4 h-4 fill-current" /> Donate Now
              </Link>
              <Link
                href="/sponsor-form"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest border border-emerald-400/30 text-white hover:bg-emerald-500/10 hover:border-emerald-400 transition-all"
              >
                Sponsor a Child <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Gold Line Highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500" />
      </section>
    </main>
  );
}