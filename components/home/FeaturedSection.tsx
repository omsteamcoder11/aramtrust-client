"use client";
import React from "react";

export default function FeaturedSection() {
  return (
    <section className="bg-emerald-50/60 py-16 sm:py-20 px-6 sm:px-10 lg:px-20">
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        <div className="text-center lg:text-left">
          
          <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
            <span className="w-2 h-2 inline-block bg-emerald-500 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Aram Trust
            </span>
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            <span className="text-emerald-600">Nourishing Communities</span>
            <br />
            Ending the Struggle for Food
          </h1>

          <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
            Aram Trust is dedicated to serving the poor, needy, and sick by providing 
            basic necessities and healthy food. Through our food distribution programs, 
            we aim to ensure every individual lives a sustainable and dignified life.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start">
            
            <a 
              href="/programs"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 font-black text-xs uppercase tracking-widest rounded-md hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Our Programs →
            </a>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openSupportModal'))}
              className="inline-flex items-center justify-center gap-2 border border-emerald-300 text-emerald-700 bg-transparent px-6 py-3 font-black text-xs uppercase tracking-widest rounded-md hover:bg-emerald-100/50 transition-colors"
            >
              Support Us
            </button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md overflow-hidden rounded-xl shadow-md border border-emerald-100">
            <img
              src="/home/annadhanam.png"
              alt="Annadhanam food distribution drive by Aram Trust"
              className="w-full h-auto object-cover aspect-[4/3]"
            />
          </div>
        </div>

      </div>

    </section>
  );
}