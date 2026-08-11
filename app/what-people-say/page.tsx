"use client";

import React from 'react';
import { motion } from "framer-motion";
import { 
  Quote, 
  Star, 
  Play, 
  Heart, 
  CheckCircle, 
  ArrowRight, 
  MessageCircle,
  ShieldCheck, 
  Award,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function WhatPeopleSay() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white selection:bg-[#009270]/10">
      
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative bg-[#f8f9f8] pt-32 pb-20 px-6 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-2 bg-[#8B235E]/5 px-5 py-2 rounded-full mb-8 border border-[#8B235E]/10">
              <Heart className="w-3 h-3 text-[#8B235E] fill-[#8B235E]" />
              <span className="text-[10px] font-black text-[#8B235E] uppercase tracking-[0.4em]">Our Community</span>
            </div>
            <h1 className="text-5xl md:text-9xl font-black text-[#2D2D2D] mb-8 tracking-tighter leading-[0.85] uppercase italic">
              Hear from <br /> our <span className="text-[#009270] not-italic">Supporters.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Real stories from the people who make our mission possible. Discover why thousands trust ChildSave.
            </p>
          </motion.div>
        </div>
        
        {/* Background Decorative Text */}
        <div className="absolute top-10 left-0 md:left-1/2 md:-translate-x-1/2 text-[15rem] font-black text-gray-200/20 select-none -z-0 tracking-tighter">
          TRUST
        </div>
      </section>

      {/* --- FEATURED VIDEO TESTIMONIAL --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          {...fadeInUp}
          className="relative group cursor-pointer overflow-hidden rounded-[3rem] aspect-video md:aspect-[21/9] bg-gray-900 shadow-2xl border-8 border-white shadow-gray-200"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
          
          <div className="absolute inset-0 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000" />
          
          <div className="absolute bottom-12 left-12 z-20 text-white max-w-xl">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#FFCC29] text-[#FFCC29]" />)}
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter italic uppercase">"The best decision our family ever made."</h2>
            <div className="flex items-center gap-3">
               <div className="w-10 h-1 bg-[#009270] rounded-full" />
               <p className="text-white/80 font-bold uppercase tracking-widest text-xs">The Thompson Family, Sponsors since 2018</p>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <Play className="text-[#009270] fill-[#009270] ml-1" size={32} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- TESTIMONIAL GRID --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <TestimonialCard 
            quote="Knowing that my monthly gift provides clean water and school supplies gives me such peace of mind."
            author="David Miller"
            location="Chicago, IL"
            tag="Monthly Donor"
          />
          <TestimonialCard 
            quote="I've exchanged over 20 letters with my sponsored child, Maria. Watching her grow up via photos is a blessing."
            author="Sarah Jenkins"
            location="London, UK"
            tag="Child Sponsor"
          />
          <TestimonialCard 
            quote="The transparency at ChildSave is unmatched. I know exactly where my money goes and the impact it makes."
            author="Michael Chen"
            location="Toronto, CA"
            tag="Legacy Partner"
          />
          <TestimonialCard 
            quote="Their career program helped my sponsored student become a nurse. The cycle of poverty is actually breaking!"
            author="Dr. Emily Watson"
            location="Sydney, AU"
            tag="Visionary Member"
          />
          <TestimonialCard 
            quote="I visited my sponsored child in Kenya last year. Seeing the community center in person was life-changing."
            author="James O'Brien"
            location="Dublin, IE"
            tag="Global Traveler"
          />
          <TestimonialCard 
            quote="Reliable, compassionate, and effective. I recommend ChildSave to everyone looking to make a real difference."
            author="Linda Garcia"
            location="Madrid, ES"
            tag="Supporter"
          />
        </motion.div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="bg-gray-50 py-20 px-6 border-y border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-16 md:gap-24">
          <TrustBadge icon={<CheckCircle size={20}/>} text="Top-Rated Charity 2024" />
          <TrustBadge icon={<ShieldCheck size={20} />} text="Platinum Transparency" />
          <TrustBadge icon={<Award size={20} />} text="94% Efficiency Rating" />
          <TrustBadge icon={<Star size={20} />} text="4.9/5 Supporter Score" />
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6 text-center">
        <motion.div 
          {...fadeInUp}
          className="max-w-4xl mx-auto bg-[#2D2D2D] rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden shadow-2xl shadow-gray-400"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12">
            <MessageCircle size={200} />
          </div>
          <Sparkles className="text-[#009270] mx-auto mb-8" size={48} />
          <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none">Join the <span className="text-[#009270]">Story.</span></h2>
          <p className="text-gray-400 text-xl md:text-2xl font-medium mb-12 max-w-xl mx-auto leading-relaxed">
            Your support can be the reason a child dreams big today.
          </p>
          <div className="flex justify-center">
            <Link href="/how-sponsorship-works" className="bg-[#009270] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#007a5d] hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#009270]/20">
              Start Sponsoring <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

/* --- COMPONENTS --- */

function TestimonialCard({ quote, author, location, tag }: any) {
  return (
    <motion.div 
      variants={fadeInUp}
      className="p-12 rounded-[3rem] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:-translate-y-3 transition-all duration-500 flex flex-col group relative overflow-hidden"
    >
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[4rem] -z-0 group-hover:bg-[#009270]/5 transition-colors" />
      
      <div className="relative z-10 flex flex-col h-full">
        <Quote className="text-[#8B235E] opacity-20 mb-8" size={48} />
        <p className="text-gray-700 text-xl font-medium leading-relaxed italic mb-10 flex-grow">
          "{quote}"
        </p>
        
        <div className="pt-8 border-t border-gray-50 flex items-center gap-5">
          <div className="w-14 h-14 bg-[#2D2D2D] rounded-2xl flex items-center justify-center text-white font-black text-xl italic shadow-lg shadow-gray-200">
            {author[0]}
          </div>
          <div>
            <h4 className="font-black text-gray-900 tracking-tighter uppercase italic">{author}</h4>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">{location}</p>
          </div>
          <div className="ml-auto hidden sm:block">
            <span className="text-[9px] font-black bg-[#009270]/10 text-[#009270] px-3 py-1.5 rounded-lg uppercase tracking-widest border border-[#009270]/20">
              {tag}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TrustBadge({ icon, text }: any) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="text-[#2D2D2D] group-hover:text-[#009270] group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <span className="font-black text-[10px] uppercase tracking-[0.3em] text-[#2D2D2D] border-b-2 border-transparent group-hover:border-[#009270] transition-all">
        {text}
      </span>
    </div>
  );
}



