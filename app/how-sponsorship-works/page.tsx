"use client";

import React from 'react';
import { 
  UserPlus, Mail, GraduationCap, ShieldCheck, 
  Heart, Globe, CheckCircle2, ArrowRight, 
  Zap, Sparkles, TrendingUp, HandHeart
} from 'lucide-react';

export default function HowSponsorshipWorks() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-gray-900 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 flex items-center justify-center overflow-hidden bg-[#f8f9f8]">
        {/* Abstract Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#009270]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#8B235E]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-sm mb-8 border border-gray-100">
            <Sparkles className="w-4 h-4 text-[#FFCC29] fill-[#FFCC29]" />
            <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-[0.2em]">Our Impact Model</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-8 text-[#2D2D2D] leading-[0.9]">
            HOW IT <span className="text-[#009270] italic">WORKS.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            From your first gift to their graduation day, we make sure your impact 
            is <span className="text-gray-900 font-bold underline decoration-[#FFCC29]">transparent</span> and life-changing.
          </p>
        </div>
      </section>

      {/* --- BENTO ACTION CARDS --- */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto -mt-12 md:-mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* GIVE CARD */}
          <ActionCard 
            color="bg-[#8B235E]"
            title="Give"
            features={[
              { label: "One time", bold: "or monthly giving" },
              { label: "Create lasting", bold: "change for a child" },
              { label: "High impact", bold: "donations globally", highlight: true }
            ]}
            btnText="Donate Today"
          />

          {/* SPONSOR CARD */}
          <ActionCard 
            color="bg-[#009270]"
            title="Sponsor"
            features={[
              { label: "Sponsor", bold: "a child in need" },
              { label: "Build", bold: "meaningful bonds" },
              { label: "Break", bold: "the cycle of poverty", highlight: true }
            ]}
            btnText="Find a Child"
          />

          {/* TRUST CARD */}
          <ActionCard 
            color="bg-[#E24A2A]"
            title="Trust"
            features={[
              { label: "Radical", bold: "financial clarity" },
              { label: "Verified", bold: "program outcomes" },
              { label: "Read our", bold: "annual reports", highlight: true }
            ]}
            btnText="View Transparency"
          />

        </div>
      </section>

      {/* --- THE JOURNEY STEPS --- */}
      <section className="py-20 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-[#2D2D2D] tracking-tight mb-4 uppercase">
              The Sponsorship <span className="text-[#009270]">Journey</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg italic">Step-by-step impact creation.</p>
          </div>
          <div className="hidden md:block h-px flex-grow mx-8 bg-gray-100 mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          <StepCard 
            number="01"
            icon={<UserPlus size={28} />} 
            title="Select" 
            desc="Explore profiles of children waiting for a hero. Choose a child whose story resonates with you." 
          />
          <StepCard 
            number="02"
            icon={<HandHeart size={28} />} 
            title="Support" 
            desc="Your monthly contribution provides nutrition, healthcare, and safe education environments." 
          />
          <StepCard 
            number="03"
            icon={<Mail size={28} />} 
            title="Connect" 
            desc="Send messages of hope. Watch them grow through regular updates and personal photos." 
          />
          <StepCard 
            number="04"
            icon={<GraduationCap size={28} />} 
            title="Success" 
            desc="Celebrate the ultimate win: graduation into sustainable employment and community leadership." 
          />
        </div>
      </section>

      {/* --- STATS / TRUST BAR --- */}
      <section className="py-16 bg-[#2D2D2D] text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <StatItem icon={<Globe className="text-[#009270]" />} value="25+" label="Countries" />
          <StatItem icon={<TrendingUp className="text-[#FFCC29]" />} value="84%" label="Job Placement" />
          <StatItem icon={<CheckCircle2 className="text-blue-400" />} value="100%" label="Transparent" />
          <StatItem icon={<Zap className="text-[#E24A2A]" />} value="1M+" label="Lives Impacted" />
        </div>
      </section>

      {/* --- FINAL CALL TO ACTION --- */}
      <section className="py-20 md:py-28 px-6 text-center">
        <h3 className="text-3xl md:text-5xl font-black mb-8 text-[#2D2D2D]">READY TO CHANGE A LIFE?</h3>
        <button className="bg-[#009270] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-[#007a5d] transition-all shadow-2xl shadow-[#009270]/20 active:scale-95 flex items-center gap-3 mx-auto">
          Start Your Journey Now <ArrowRight size={24} />
        </button>
      </section>

    </main>
  );
}

/* --- REUSABLE SUB-COMPONENTS --- */

function ActionCard({ color, title, features, btnText }: any) {
  return (
    <div className={`group ${color} p-8 md:p-10 rounded-[2.5rem] text-white flex flex-col items-start shadow-2xl transition-all duration-500 hover:-translate-y-3`}>
      <div className="w-12 h-1 bg-white/30 rounded-full mb-8"></div>
      <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic group-hover:scale-105 transition-transform origin-left">
        {title}
      </h2>
      <div className="space-y-4 mb-12 text-base md:text-lg opacity-90 font-medium">
        {features.map((f: any, i: number) => (
          <div key={i} className="flex items-start gap-2">
            <span className={f.highlight ? "text-[#FFCC29]" : "text-white/60"}>•</span>
            <p className={f.highlight ? "text-[#FFCC29] font-bold" : ""}>
              {f.label} <span className="font-bold">{f.bold}</span>
            </p>
          </div>
        ))}
      </div>
      <button className="mt-auto w-full border-2 border-white/50 px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all active:scale-95 text-sm">
        {btnText}
      </button>
    </div>
  );
}

function StepCard({ number, icon, title, desc }: { number: string, icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="relative p-8 bg-white border border-gray-100 rounded-[2rem] hover:shadow-2xl hover:border-[#009270]/20 transition-all group overflow-hidden h-full">
      <div className="absolute -right-4 -top-4 text-8xl font-black text-gray-50 opacity-10 group-hover:opacity-20 transition-opacity">
        {number}
      </div>
      <div className="flex items-center justify-start mb-8">
        <div className="text-[#009270] bg-[#009270]/5 p-5 rounded-2xl group-hover:bg-[#009270] group-hover:text-white transition-all duration-500">
          {icon}
        </div>
      </div>
      <h4 className="text-2xl font-black text-[#2D2D2D] mb-4 uppercase tracking-tight">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function StatItem({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="mb-2">{icon}</div>
      <div className="text-2xl md:text-3xl font-black tracking-tighter">{value}</div>
      <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{label}</div>
    </div>
  );
}



