"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  UserCheck, LineChart, MessageCircle, Mail, 
  ArrowRight, ShieldCheck, Heart, Star, Sparkles
} from 'lucide-react';

const steps = [
  {
    step: "01",
    title: "Choose a Profile",
    desc: "Select a child from our verified database based on regional or educational needs with complete transparency.",
    icon: UserCheck
  },
  {
    step: "02",
    title: "Monthly Support",
    desc: "Your automated monthly contribution covers essential tuition, premium nutrition, and specialized healthcare.",
    icon: Star
  },
  {
    step: "03",
    title: "Track Progress",
    desc: "Receive quarterly digital academic reports and scanned personal letters from your sponsored child.",
    icon: LineChart
  }
];

// Animation variants for reusability
const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: easing }
};
export default function SponsorshipPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans selection:bg-[#8B235E]/10 overflow-x-hidden">
      
      {/* --- HERO: CINEMATIC CONNECTION --- */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-24 px-6 bg-[#0B0F19] rounded-b-[4rem] md:rounded-b-[10rem] overflow-hidden text-white">
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070')] bg-cover bg-center scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-[#0B0F19]/95 to-[#0B0F19]" />
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] as [number, number, number, number] }}
            className="text-center md:text-left"
          >
            <span className="inline-flex items-center gap-2 text-[#FFCC29] font-black tracking-[0.4em] uppercase text-[10px] mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <Sparkles size={12} /> Direct Impact Sponsorship
            </span>
            <h1 className="text-6xl md:text-[10rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase italic">
              One Child. <br /> 
              <span className="text-[#009270] not-italic text-outline-white">One Sponsor.</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-10">
              <p className="text-gray-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
                Sponsorship is more than a donation. It's a high-impact personal commitment to fundamentally changing the trajectory of a young life forever.
              </p>
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="hidden md:block"
              >
                <ArrowRight size={48} className="text-[#8B235E]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(#8B235E_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
      </section>

      {/* --- HOW IT WORKS: PREMIUM STEP GRID --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-28">
            <h2 className="text-4xl md:text-7xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">
              The Journey <br /> of <span className="text-[#8B235E]">Change.</span>
            </h2>
            <div className="w-24 h-2 bg-[#FFCC29] mx-auto mt-8 rounded-full" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
          {steps.map((item, i) => (
            <motion.div 
              key={i} 
              {...fadeInUp}
              transition={{ delay: i * 0.2 }}
              className="relative group p-8 rounded-[3rem] hover:bg-gray-50 transition-all duration-500"
            >
              <div className="text-[140px] font-black text-gray-100 absolute -top-16 right-4 -z-10 group-hover:text-[#009270]/10 transition-all duration-700 select-none">
                {item.step}
              </div>
              <div className="w-20 h-20 bg-white rounded-[2rem] shadow-2xl shadow-gray-200 flex items-center justify-center text-[#8B235E] mb-10 border border-gray-100 group-hover:scale-110 group-hover:bg-[#8B235E] group-hover:text-white transition-all duration-500">
                <item.icon size={36} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter mb-6 group-hover:translate-x-2 transition-transform">
                {item.title}
              </h3>
              <p className="text-gray-500 text-base font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SPONSOR BENEFITS: MODERN BENTO STYLE --- */}
      <section className="py-32 bg-[#F8FAFC] rounded-[4rem] md:rounded-[10rem] mx-4 md:mx-10 mb-24 overflow-hidden relative border border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
             <div className="aspect-[4/5] md:aspect-square bg-white rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] p-12 md:p-20 flex flex-col justify-center border border-gray-50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#009270]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                
                <MessageCircle className="text-[#009270] mb-10 group-hover:rotate-12 transition-transform" size={80} />
                <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-10 leading-[0.9] text-gray-900">
                    Stay <br /> <span className="text-[#8B235E]">Connected.</span>
                </h2>
                <div className="space-y-8">
                    <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 bg-[#FFCC29]/20 rounded-full flex items-center justify-center text-[#FFCC29]">
                          <Mail size={20} />
                        </div>
                        <span className="text-[12px] font-black uppercase tracking-widest text-gray-500">Handwritten Letters (Scanned)</span>
                    </div>
                    <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 bg-[#009270]/20 rounded-full flex items-center justify-center text-[#009270]">
                          <ShieldCheck size={20} />
                        </div>
                        <span className="text-[12px] font-black uppercase tracking-widest text-gray-500">Verified Impact Audits</span>
                    </div>
                </div>
             </div>

             {/* Trust Badge Floating */}
             <motion.div 
               whileHover={{ scale: 1.05, rotate: -2 }}
               className="absolute -bottom-12 -left-6 md:-left-12 bg-[#0B0F19] p-10 rounded-[3rem] shadow-2xl text-white hidden md:block border border-white/10"
             >
                <Heart size={40} className="mb-4 text-[#8B235E] fill-[#8B235E]" />
                <p className="text-5xl font-black leading-none tracking-tighter italic">1:1</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mt-3 text-gray-500">Pure Relationship</p>
             </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-12"
          >
            <h3 className="text-5xl md:text-8xl font-black text-gray-900 italic tracking-tighter uppercase leading-[0.85]">
                Beyond <br /> <span className="text-[#009270] not-italic">Finance.</span>
            </h3>
            <p className="text-gray-500 text-xl md:text-2xl font-medium leading-relaxed border-l-8 border-[#8B235E] pl-8">
                Your presence as a sponsor provides a child with more than just physical needs; it provides the psychological fuel of knowing someone believes in them.
            </p>
            <div className="pt-6">
                <button className="group px-14 py-8 bg-[#0B0F19] text-white rounded-[2.5rem] font-black uppercase tracking-[0.25em] text-[12px] shadow-2xl hover:bg-[#8B235E] hover:shadow-[#8B235E]/40 transition-all flex items-center gap-4 active:scale-95">
                    Explore Children <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- FINAL CALL TO ACTION: MINIMALIST --- */}
      <section className="py-40 text-center px-6 relative">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-[8rem] font-black text-gray-900 uppercase italic tracking-tighter mb-12 leading-[0.8]">
            Start Your <br /> 
            <span className="text-[#8B235E]">Legacy</span> 
            <span className="text-[#FFCC29]">.</span>
          </h2>
          <div className="flex flex-col items-center gap-8">
            <p className="text-gray-400 font-bold text-[12px] uppercase tracking-[0.6em]">
              Marthandam • Chennai • Global Impact
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#FFCC29] to-transparent" />
          </div>
        </motion.div>
        
        {/* Subtle Decorative Elements */}
        <div className="absolute top-1/2 left-10 w-24 h-24 border border-gray-100 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 border-t border-r border-gray-50 rounded-tr-[5rem]" />
      </section>

    </div>
  );
}



