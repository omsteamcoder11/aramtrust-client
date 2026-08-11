"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Heart, MapPin, Mail, ChevronRight, Users, Sparkles } from 'lucide-react';
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export default function SponsorPage() {
  return (
    <main className="bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="py-14 md:py-20 px-4 sm:px-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <span className="inline-flex items-center gap-2 text-[#7B1F3A] font-semibold tracking-widest uppercase text-xs mb-5 bg-[#7B1F3A]/5 px-4 py-1.5 rounded-full border border-[#7B1F3A]/10">
              <Sparkles size={11} /> Empowering India's Future
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
              How <span className="text-[#7B1F3A]">Sponsorship</span> Works
            </h1>
            <div className="mx-auto w-12 h-0.5 rounded-full bg-[#2E7D5E] mb-5" />
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Your monthly gift changes everything. A personal commitment to impact.
            </p>
            <div className="mt-8 inline-block bg-gray-900 text-white text-2xl sm:text-3xl font-extrabold px-8 py-4 rounded-xl shadow-md">
              ₹1,500 <span className="text-sm font-medium text-gray-400 uppercase tracking-widest ml-2">/ month</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.p {...fadeInUp} className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-10">
            Your ₹1,500 monthly gift supports
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <PillarCard
              icon={<Home size={24} />}
              title="A Safe Place"
              desc="Community centers across India where children receive life‑changing support, from education to health care."
            />
            <PillarCard
              icon={<Users size={24} />}
              title="A Caring Team"
              desc="Dedicated local staff and volunteers who understand the challenges children face in their own communities."
            />
            <PillarCard
              icon={<MapPin size={24} />}
              title="A Path Out"
              desc="Programs focused on health, education, and job readiness – tailored specifically to India's unique needs."
            />
          </div>
          <motion.div {...fadeInUp} className="mt-10 text-center">
            <Link
              href="/sponsor-a-child"
              className="inline-flex items-center gap-2 bg-[#7B1F3A] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#6A1831] transition-all shadow-md group"
            >
              Become a Sponsor
              <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TRANSFORM A LIFE + PERSONAL CONNECTION */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <motion.div {...fadeInUp}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                Help a child <span className="text-[#2E7D5E]">transform</span> her life
              </h2>
              <div className="w-10 h-0.5 rounded-full bg-[#7B1F3A] mb-5" />
              <div className="space-y-4 text-gray-500 text-sm sm:text-base leading-relaxed">
                <p>
                  When you sponsor a child, your monthly gift of ₹1,500 provides access to essential benefits like medical checkups, educational support, and career guidance.
                </p>
                <p className="border-l-4 border-[#7B1F3A] pl-4 text-gray-700 font-semibold">
                  You become a partner in breaking the cycle of poverty for one child – and through them, their entire family.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="bg-gray-50 rounded-xl p-6 sm:p-8 border border-gray-200"
            >
              <div className="w-12 h-12 bg-[#7B1F3A] rounded-xl flex items-center justify-center text-white mb-5">
                <Mail size={22} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                A personal connection
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                Watch your sponsored child grow through letters, photos, and annual updates. You can even plan a visit to see our programs in action.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IMPACT STAT */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#7B1F3A] mb-3">
              1 in 5
            </div>
            <div className="w-10 h-0.5 rounded-full bg-[#2E7D5E] mx-auto mb-4" />
            <p className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              Children in India live in multidimensional poverty.
            </p>
            <p className="text-gray-500 text-sm sm:text-base">
              Your sponsorship gives them the tools to break free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Common <span className="text-[#7B1F3A]">Questions</span>
            </h2>
            <div className="mx-auto w-10 h-0.5 rounded-full bg-[#2E7D5E]" />
          </motion.div>
          <div className="space-y-4">
            <FAQCard
              question="Where does ChildSave work?"
              answer="Currently, we focus on underserved communities across India, including urban slums and rural villages. Our programs are tailored to local needs."
              link="/where-we-work"
              linkText="See our locations"
            />
            <FAQCard
              question="Is this a monthly commitment?"
              answer="Yes, it's ₹1,500 a month. You can sponsor for as long as you like, and you're free to cancel anytime through your dashboard."
              link="/sponsor-a-child"
              linkText="Start today"
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-white">
        <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center">
          <Heart className="text-[#7B1F3A] mx-auto mb-4" size={32} fill="#7B1F3A" />
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Ready to make a <span className="text-[#2E7D5E]">Difference?</span>
          </h3>
          <div className="mx-auto w-10 h-0.5 rounded-full bg-[#7B1F3A] mb-5" />
          <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-md mx-auto">
            Join the movement. Start your sponsorship journey and change a life forever.
          </p>
          <Link
            href="/sponsor-a-child"
            className="inline-flex items-center gap-2 bg-[#7B1F3A] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#6A1831] transition-all shadow-md group"
          >
            Sponsor a Child Now
            <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

    </main>
  );
}

function PillarCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div
      {...fadeInUp}
      className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 hover:border-[#7B1F3A]/20 hover:shadow-md transition-all duration-300 text-center group"
    >
      <div className="w-11 h-11 bg-[#7B1F3A]/5 rounded-xl flex items-center justify-center text-[#7B1F3A] mx-auto mb-4 group-hover:bg-[#7B1F3A] group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function FAQCard({ question, answer, link, linkText }: { question: string; answer: string; link: string; linkText: string }) {
  return (
    <motion.div
      {...fadeInUp}
      className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-200 hover:border-[#7B1F3A]/20 hover:shadow-sm transition-all"
    >
      <h3 className="text-base font-bold text-[#7B1F3A] mb-2">{question}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-3">{answer}</p>
      <Link
        href={link}
        className="inline-flex items-center gap-1 text-[#2E7D5E] font-semibold text-xs uppercase tracking-wider hover:gap-2 transition-all"
      >
        {linkText} <ChevronRight size={13} />
      </Link>
    </motion.div>
  );
}