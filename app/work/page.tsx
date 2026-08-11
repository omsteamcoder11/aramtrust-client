"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Target,
  ShieldCheck,
  Globe2,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Award,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyChooseUsPage() {
  return (
    <main className="bg-white min-h-screen text-gray-800">

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp}>
            <span
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border"
              style={{ color: "#7B2D8B", background: "#F3E8F7", borderColor: "#DFC5E8" }}
            >
              <Sparkles size={11} /> Excellence in Impact
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-gray-900 mb-5">
              Why Choose{" "}
              <span style={{ color: "#7B2D8B" }}>ChildSave?</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Find the best organization to sponsor a child — a sponsorship experience
              that fundamentally alters a child's life trajectory.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO QUOTE ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <div
              className="w-12 h-1 rounded-full mb-8"
              style={{ background: "#7B2D8B" }}
            />
            <p className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug mb-6">
              "Choosing the best child sponsorship program is an important decision –
              one that aligns with your values and is proven effective."
            </p>
            <p className="text-base text-gray-500 leading-relaxed">
              Though all child sponsorship charities work to benefit children, there are many
              distinctions. We invite you to explore more about ChildSave and our collective
              mission of bringing people together to end poverty for good.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── KEY CONSIDERATIONS ── */}
      <section className="py-20 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-2xl md:text-4xl font-extrabold text-gray-900 text-center mb-14 tracking-tight"
          >
            Key Similarities{" "}
            <span style={{ color: "#7B2D8B" }}>&</span>{" "}
            Differences
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <ConsiderationCard
              icon={<Target size={26} style={{ color: "#7B2D8B" }} />}
              title="The Approach"
              content="ChildSave uses a holistic approach that combines individual child development with community empowerment. Your sponsored child receives direct support like education and healthcare."
            />
            <ConsiderationCard
              icon={<TrendingUp size={26} style={{ color: "#7B2D8B" }} />}
              title="The Funding"
              content="ChildSave relies primarily on individual donations. Government grants account for less than 1% of our revenue, ensuring your support directly fuels our mission."
            />
            <ConsiderationCard
              icon={<Globe2 size={26} style={{ color: "#7B2D8B" }} />}
              title="Vision & Mission"
              content="ChildSave is a secular organization. Our supporters, staff, and families span all beliefs and backgrounds. We are united by a common goal: ending generational poverty."
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHAT TO LOOK FOR ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-3xl p-10 md:p-16 text-white relative overflow-hidden"
            style={{ background: "#2D0A3E" }}
          >
            <div className="absolute top-0 right-0 opacity-5 p-10 pointer-events-none">
              <ShieldCheck size={180} />
            </div>
            <motion.h2
              {...fadeUp}
              className="text-2xl md:text-4xl font-extrabold mb-12 tracking-tight leading-snug"
            >
              What to look for in a{" "}
              <span style={{ color: "#C084E8" }}>Sponsorship Program</span>
            </motion.h2>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {[
                "Interest in specific regions – focused on underserved communities in India.",
                "Focus on specific causes – education, health, and employment readiness.",
                "Religious affiliation – we are secular, welcoming all backgrounds.",
                "Financial transparency – audited financials and top independent ratings.",
                "Communication opportunities – write letters, send photos, or visit.",
                "Annual impact reports – clear outcomes and stories of change.",
                "Community empowerment – benefiting families and neighborhoods.",
              ].map((text, i) => (
                <motion.div key={i} variants={itemFade} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: "#2A9D5C" }}
                  />
                  <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-20 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-2xl md:text-4xl font-extrabold text-gray-900 text-center mb-12 tracking-tight"
          >
            How ChildSave{" "}
            <span style={{ color: "#7B2D8B" }}>Compares</span>
          </motion.h2>
          <motion.div
            {...fadeUp}
            className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
          >
            <table className="min-w-full bg-white">
              <thead>
                <tr style={{ background: "#7B2D8B" }}>
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-white">
                    Organization Feature
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-white">
                    ChildSave Metric
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium">
                {[
                  ["Founded", "2010 (India operations since 2012)"],
                  ["Monthly sponsorship amount", "₹1,500"],
                  ["% of funds for programs", "82%"],
                  ["Focus area", "Child + Community (holistic)"],
                  ["Government funding", "No (less than 1%)"],
                  ["Religious affiliation", "None (secular)"],
                  ["Wellness Programs", "✓ Included"],
                  ["Online Photo Access", "✓ Full History"],
                ].map(([label, value], i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                      {label}
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-semibold">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-3 mb-12">
            <HelpCircle size={28} style={{ color: "#7B2D8B" }} />
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Common{" "}
              <span style={{ color: "#7B2D8B" }}>Questions</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                q: "Can I communicate with my sponsored child?",
                a: "Yes! You can write letters and send photos anytime. Your words provide hope and encouragement. We also encourage you to visit your child to see the impact in person.",
              },
              {
                q: "How long does sponsorship last?",
                a: "A child's sponsorship typically continues until they turn 19, after which they graduate from the program. You may cancel at any time.",
              },
              {
                q: "Can I send extra gifts or money?",
                a: "Yes, you can make an 'Extra Gift' of ₹2,500 or more through your online account. Your child and family will be thrilled to know you are thinking of them.",
              },
              {
                q: "How do you ensure child safety?",
                a: "Child safeguarding is our top priority. We have a comprehensive policy covering protocols, training, and abuse prevention for all interactions.",
              },
            ].map(({ q, a }, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm transition-colors"
                style={{ borderColor: "transparent" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#DFC5E8")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "transparent")
                }
              >
                <h3 className="text-base font-bold text-gray-900 mb-3">{q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHARITY RATINGS ── */}
      <section className="py-20 px-6" style={{ background: "#2D0A3E" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
              Verified{" "}
              <span style={{ color: "#2A9D5C" }}>Trust</span>
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Trusted by the industry's most rigorous watchdogs for efficiency and transparency.
            </p>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {[
              { name: "Charity Navigator", rating: "4/4 Stars", detail: "100 in transparency" },
              { name: "CharityWatch", rating: "A−", detail: "Financial efficiency" },
              { name: "Great Nonprofits", rating: "Top-Rated", detail: "Supporter feedback" },
              { name: "Candid", rating: "Platinum", detail: "Highest level" },
              { name: "BBB Alliance", rating: "Accredited", detail: "Meets 20 standards" },
            ].map(({ name, rating, detail }, i) => (
              <motion.div
                key={i}
                variants={itemFade}
                className="rounded-2xl p-6 text-center border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                  {name}
                </p>
                <p
                  className="text-xl font-extrabold mb-1"
                  style={{ color: "#2A9D5C" }}
                >
                  {rating}
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  {detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-white">
        <motion.div
          {...fadeUp}
          className="max-w-2xl mx-auto text-center rounded-3xl p-12 md:p-16 border shadow-sm"
          style={{ background: "#F9F4FB", borderColor: "#DFC5E8" }}
        >
          <Award size={44} className="mx-auto mb-6" style={{ color: "#7B2D8B" }} />
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Ready to make a{" "}
            <span style={{ color: "#7B2D8B" }}>Difference?</span>
          </h3>
          <p className="text-gray-500 text-base mb-10 max-w-md mx-auto leading-relaxed">
            Your partnership with ChildSave transforms a child's future. Start your
            sponsorship journey today.
          </p>
          <Link
            href="/sponsor-a-child"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white text-sm font-bold tracking-wide transition-opacity hover:opacity-90 shadow-md"
            style={{ background: "#2A9D5C" }}
          >
            Sponsor a Child <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

    </main>
  );
}

/* ── SUB COMPONENTS ── */

function ConsiderationCard({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <motion.div
      variants={itemFade}
      className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform duration-300"
    >
      <div
        className="mb-5 p-3 rounded-xl w-fit"
        style={{ background: "#F3E8F7" }}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{content}</p>
    </motion.div>
  );
}