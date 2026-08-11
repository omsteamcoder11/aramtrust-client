"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Heart, ArrowRight } from 'lucide-react';

export default function HomeHero() {
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full flex flex-col lg:flex-row items-center"
      style={{ background: '#f0fdf4', borderTop: '2px solid #a7f3d0', padding: '60px 40px' }}
    >

      {/* LEFT — Image */}
      <div
        className="relative w-full lg:w-1/2 h-[500px] overflow-hidden shadow-sm"
        style={{
          borderRadius: '16px',
          transform: visible ? 'translateX(0)' : 'translateX(-60px)',
          opacity: visible ? 1 : 0,
          transition: 'all 0.7s ease',
        }}
      >
        <Image
          src="/services/education3.jpg"
          alt="Aram Trust Food Distribution and Community Care"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
        />

        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/95 shadow-sm">
          <span className="text-sm">🌿</span>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">Aram Trust</p>
            <p className="text-[8px] text-gray-500">Serving Humanity</p>
          </div>
        </div>
      </div>

      {/* RIGHT — Content */}
      <div
        className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-12"
        style={{
          background: '#f0fdf4',
          transform: visible ? 'translateX(0)' : 'translateX(60px)',
          opacity: visible ? 1 : 0,
          transition: 'all 0.7s ease 0.2s',
        }}
      >
        <div className="space-y-4 max-w-md mx-auto lg:mx-0">

          {/* Label */}
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-emerald-500" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-600 uppercase">
              Aram Trust
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900">
            Nourishing Communities
            <br />
            <span className="text-emerald-600">Ending Hunger.</span>
          </h1>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            Dedicated to providing wholesome meals, fresh produce, and basic necessities 
            to the poor, needy, and sick to build sustainable and happier livelihoods.
          </p>

          {/* Pills */}
          <div className="flex flex-wrap gap-2">
            {['Annadhanam', 'Fresh Food Drives', 'Basic Necessities'].map((item) => (
              <span key={item} className="text-xs font-medium text-emerald-800 bg-emerald-100/60 px-2.5 py-1 rounded-full">
                • {item}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div>
              <p className="text-2xl font-black text-emerald-600">1000+</p>
              <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">
                Lives Touched
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-600">100%</p>
              <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">
                Dedicated Seva
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-600">5000+</p>
              <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">
                Meals Served
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 pt-2">
            <a
              href="/donate"
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 font-bold text-xs uppercase tracking-wide text-white transition-all hover:opacity-90 shadow-sm"
              style={{ background: "#059669" }}
            >
              <Heart className="w-3 h-3 fill-white" />
              Support Food Drive
            </a>

            <a
              href="/services"
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 font-bold text-xs uppercase tracking-wide transition-all hover:bg-emerald-100/50"
              style={{ border: "1px solid #059669", color: "#059669" }}
            >
              Our Programs
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Trust badge */}
          <div className="flex items-center gap-2 pt-2">
            <div className="flex -space-x-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-5 h-5 rounded-full bg-emerald-100 border border-white flex items-center justify-center text-[8px] text-emerald-600">
                  ✓
                </div>
              ))}
            </div>
            <p className="text-[9px] text-gray-500">
              Supported by <span className="font-bold text-emerald-600">numerous</span> compassionate donors
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}