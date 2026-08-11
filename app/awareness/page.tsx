// app/awareness/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Megaphone,
  Users,
  Globe,
  BookOpen,
  Heart,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Quote,
  ChevronRight,
  Radio,
  Handshake,
  School,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Program {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  color: string;
}

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initial: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROGRAMS: Program[] = [
  {
    icon: <School size={24} strokeWidth={1.5} />,
    title: "School Outreach",
    description:
      "We bring child safety education directly into classrooms — equipping students with the knowledge to recognize danger, speak up, and protect themselves and their peers.",
    tag: "Education",
    color: "#8B235E",
  },
  {
    icon: <Radio size={24} strokeWidth={1.5} />,
    title: "Community Radio Campaigns",
    description:
      "Partnering with local radio stations to broadcast awareness messages in regional languages, reaching deep rural communities where digital access is limited.",
    tag: "Media",
    color: "#009270",
  },
  {
    icon: <Globe size={24} strokeWidth={1.5} />,
    title: "Digital Awareness Drive",
    description:
      "Leveraging social media, short films, and online campaigns to educate youth and parents about child trafficking, exploitation, and reporting mechanisms.",
    tag: "Digital",
    color: "#8B235E",
  },
  {
    icon: <Handshake size={24} strokeWidth={1.5} />,
    title: "Parent & Guardian Workshops",
    description:
      "Interactive workshops empowering parents with tools to have open conversations with their children about safety, trust, and boundaries.",
    tag: "Workshops",
    color: "#009270",
  },
  {
    icon: <BookOpen size={24} strokeWidth={1.5} />,
    title: "Resource Distribution",
    description:
      "Distributing multilingual booklets, posters, and toolkits across schools, health centres, and community hubs to sustain awareness year-round.",
    tag: "Resources",
    color: "#8B235E",
  },
  {
    icon: <Lightbulb size={24} strokeWidth={1.5} />,
    title: "Youth Ambassador Program",
    description:
      "Training young leaders to become advocates in their own communities — spreading awareness organically through peer-to-peer education.",
    tag: "Leadership",
    color: "#009270",
  },
];

const STATS: Stat[] = [
  { value: "2.4", label: "Million people reached", suffix: "M" },
  { value: "340", label: "Schools covered", suffix: "+" },
  { value: "18", label: "States active", suffix: "" },
  { value: "92", label: "Community volunteers", suffix: "K" },
];

const STEPS: Step[] = [
  {
    number: "01",
    title: "Identify the Need",
    description:
      "We map communities with the highest vulnerability to child exploitation and prioritize outreach accordingly.",
  },
  {
    number: "02",
    title: "Design the Program",
    description:
      "Our team collaborates with local leaders, educators, and child psychologists to create culturally relevant content.",
  },
  {
    number: "03",
    title: "Deploy on Ground",
    description:
      "Trained facilitators conduct sessions in schools, community centres, and via mass media channels.",
  },
  {
    number: "04",
    title: "Measure & Scale",
    description:
      "We track reach, retention, and behavioural change — continuously improving and scaling what works.",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The school program changed how I talk to my daughter. I now know the signs to look for and she feels safe coming to me.",
    name: "Meena R.",
    role: "Parent, Tamil Nadu",
    initial: "M",
  },
  {
    quote:
      "Being a Youth Ambassador gave me a voice. I've reached over 200 students in my village alone.",
    name: "Arjun K.",
    role: "Youth Ambassador, Karnataka",
    initial: "A",
  },
  {
    quote:
      "ChildSave's radio campaign was the first time our village had ever heard about child trafficking openly discussed.",
    name: "Fatima B.",
    role: "Community Leader, Rajasthan",
    initial: "F",
  },
];

// ─── useCountUp Hook ──────────────────────────────────────────────────────────

const useCountUp = (target: string, isVisible: boolean) => {
  const [count, setCount] = useState(0);
  const numericTarget = parseFloat(target);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1800;
    const increment = numericTarget / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(parseFloat(start.toFixed(1)));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, numericTarget]);

  return count;
};

// ─── StatCard ─────────────────────────────────────────────────────────────────

const StatCard = ({ stat, isVisible }: { stat: Stat; isVisible: boolean }) => {
  const count = useCountUp(stat.value, isVisible);
  const isDecimal = stat.value.includes(".");

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-[#8B235E] mb-1">
        {isDecimal ? count.toFixed(1) : Math.floor(count)}
        <span className="text-[#009270]">{stat.suffix}</span>
      </div>
      <p className="text-gray-500 text-sm">{stat.label}</p>
    </div>
  );
};

// ─── ProgramCard ──────────────────────────────────────────────────────────────

const ProgramCard = ({ program }: { program: Program }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
    <div
      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
      style={{ backgroundColor: `${program.color}10`, color: program.color }}
    >
      {program.icon}
    </div>
    <span
      className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded mb-2 inline-block"
      style={{
        backgroundColor: `${program.color}10`,
        color: program.color,
      }}
    >
      {program.tag}
    </span>
    <h3 className="text-gray-900 font-bold text-lg mb-2">{program.title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{program.description}</p>
    <div className="flex items-center gap-1 mt-4 text-sm font-medium" style={{ color: program.color }}>
      Learn more <ChevronRight size={14} />
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const AwarenessPage = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      
      {/* ── HERO SECTION ── */}
      <section className="bg-[#8B235E] text-white pt-[72px] md:pt-[80px]">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Megaphone size={18} className="text-[#FFCC29]" />
              <span className="text-[#FFCC29] text-xs font-semibold uppercase tracking-wider">
                Awareness Programs
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Awareness is the{" "}
              <span className="text-[#FFCC29]">First Line</span> of Protection
            </h1>
            
            <p className="text-white/80 text-base md:text-lg max-w-2xl mb-6">
              Every child deserves to grow up informed, safe, and empowered.
              Our awareness programs educate communities, schools, and families
              to recognise, prevent, and respond to child exploitation.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2 bg-[#FFCC29] text-[#1a1a2e] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-yellow-300 transition-colors"
              >
                Get Involved <ArrowRight size={14} />
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/20 transition-colors"
              >
                Support Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION SECTION ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-[#8B235E] text-xs font-semibold uppercase tracking-wider mb-2 block">
              Our Mission
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Awareness{" "}
              <span className="text-[#009270]">Changes Everything</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Most child exploitation happens in silence — not because people
              don't care, but because they don't know. A parent who recognises
              the signs of grooming, a teacher who knows how to respond, a
              child who understands their own rights — these are powerful
              shields against harm.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              ChildSave's awareness programs break the silence. We create
              safe spaces for difficult conversations and equip communities
              with practical tools to protect every child.
            </p>
            <ul className="space-y-2">
              {[
                "Culturally sensitive and locally relevant content",
                "Delivered in 12+ regional languages",
                "Evidence-based curriculum developed with child experts",
                "Free resources available to all communities",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#009270] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <Megaphone size={32} className="text-[#8B235E] mb-4" />
            <blockquote className="text-lg font-semibold text-gray-800 mb-3">
              "An aware community is an empowered community. Knowledge is the most powerful tool we can give."
            </blockquote>
            <p className="text-gray-500 text-sm">— ChildSave Leadership Team</p>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS SECTION ── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-[#8B235E] text-xs font-semibold uppercase tracking-wider mb-2 block">
              What We Run
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our Awareness Programs
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm">
              Six targeted programs designed to educate, empower, and protect
              children across India's most vulnerable communities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map((program, i) => (
              <ProgramCard key={i} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-[#009270] text-xs font-semibold uppercase tracking-wider mb-2 block">
            Our Process
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            How It Works
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-[#8B235E] flex items-center justify-center mb-3">
                <span className="text-white font-bold text-sm">{step.number}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── IMPACT NUMBERS ── */}
      <section ref={statsRef} className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-[#8B235E] text-xs font-semibold uppercase tracking-wider mb-2 block">
              Our Reach
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Impact by the Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} isVisible={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-[#8B235E] text-xs font-semibold uppercase tracking-wider mb-2 block">
            Voices
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            What People Say
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
              <Quote size={28} className="text-gray-200 mb-3" />
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-[#8B235E] flex items-center justify-center text-white font-semibold text-sm">
                  {t.initial}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {t.name}
                  </p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="bg-[#8B235E] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <Heart size={32} className="mx-auto mb-4 text-[#FFCC29]" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Be the Voice Every Child Needs
          </h2>
          <p className="text-white/80 max-w-md mx-auto mb-6 text-sm">
            Whether you volunteer or donate — every action creates ripples of change.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 bg-[#FFCC29] text-[#1a1a2e] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-yellow-300 transition-colors"
            >
              Volunteer With Us <ArrowRight size={14} />
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/20 transition-colors"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default AwarenessPage;