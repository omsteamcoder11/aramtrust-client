"use client";

import { DonateForm } from "./DonateForm";
import { Sparkles, Heart, Flame, ArrowRight, HandHeart, ShoppingBag, Shirt, Users, HelpCircle } from "lucide-react";

export default function DonatePage() {
  return (
    <main className="bg-white text-gray-900 overflow-x-hidden min-h-screen">
      
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 lg:py-32 border-b border-emerald-100">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-100/40 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-50 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          
          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              80G Tax Exemption
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
              <Heart className="w-3.5 h-3.5 text-emerald-600" />
              100% Goes to the Cause
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-gray-900">
            Offer Seva.{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent">
              Earn Blessings.
            </span>
          </h1>

          {/* Subtitle / Tamil Tagline */}
          <p className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-bold text-emerald-700 tracking-wide">
            உதவி செய்யுங்கள் • Serve with Devotion
          </p>

          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Rooted in the teachings of Vallalar — feed the hungry, build the temple,
            educate the child. Every rupee you offer creates a ripple of compassion
            that blesses generations.
          </p>

          {/* Stats Bar */}
          <div className="mt-10 inline-grid grid-cols-3 gap-px rounded-2xl overflow-hidden border border-emerald-200 bg-emerald-100 max-w-xl w-full">
            {[
              { value: "500+", label: "Lives Touched" },
              { value: "10+", label: "Years of Seva" },
              { value: "3", label: "Core Programs" },
            ].map((s) => (
              <div key={s.label} className="px-3 sm:px-6 py-4 sm:py-5 text-center bg-white hover:bg-emerald-50 transition-colors">
                <p className="text-xl sm:text-2xl font-black text-emerald-700">{s.value}</p>
                <p className="text-[10px] sm:text-xs font-bold text-gray-500 mt-0.5 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Donate Form Section ── */}
      <section id="donate-form" className="py-12 md:py-16 bg-white border-b border-emerald-100 relative scroll-mt-24">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <DonateForm />
        </div>
      </section>

      {/* ── Seva Funds ── */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 mb-4">
              Ways to Give
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-gray-900 tracking-tight">
              Choose Your Seva
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              From feeding a single devotee to sponsoring an entire festival — every act of giving is sacred.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            <SevaCard emoji="🍱" title="Annadhanam Fund"
              description="Sponsor free meals for devotees and the poor. Vallalar taught that feeding the hungry is the highest form of worship."
              link="/donate?fund=annadhanam#donate-form" tag="Most Popular" />
            <SevaCard emoji="🏛️" title="Temple Construction"
              description="Contribute to the building and renovation of the temple complex — a permanent legacy of your faith."
              link="/donate?fund=construction#donate-form" />
            <SevaCard emoji="📚" title="Education Aid"
              description="Fund school fees, books, and supplies for underprivileged children in the temple community."
              link="/donate?fund=education#donate-form" />
            <SevaCard emoji="🪔" title="Festival Sponsorship"
              description="Be the sponsor of a sacred festival celebration — from decorations to prasad distribution."
              link="/donate?fund=festival#donate-form" />
            <SevaCard emoji="🏥" title="Medical Camp"
              description="Support free medical check-up camps for the elderly and the poor organised by the trust."
              link="/donate?fund=medical#donate-form" />
            <SevaCard emoji="🙏" title="General Seva Fund"
              description="Your contribution goes where it is needed most — supporting all ongoing seva activities of the trust."
              link="/donate?fund=general#donate-form" />
          </div>
        </div>
      </section>

      {/* ── In-Kind Seva ── */}
      <section className="py-16 md:py-24 bg-white border-y border-emerald-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 mb-4">
              Beyond Money
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-gray-900 tracking-tight">
              Donate In-Kind
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              No contribution is too small. Offer what you have — your time, your goods, your presence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            <InKindCard icon={<ShoppingBag className="w-6 h-6 text-emerald-600" />} title="Groceries & Provisions"
              description="Donate rice, dal, oil, and other provisions directly for Annadhanam preparation." />
            <InKindCard icon={<Shirt className="w-6 h-6 text-emerald-600" />} title="Clothes & Essentials"
              description="Donate new or gently used clothing, blankets, and daily essentials for the needy." />
            <InKindCard icon={<Users className="w-6 h-6 text-emerald-600" />} title="Volunteer Service"
              description="Offer your time and skills — help at events, camps, or administrative work." />
          </div>

          <p className="text-center mt-10 text-sm text-gray-500 font-medium">
            To arrange an in-kind donation, please{" "}
            <a href="/contact" className="text-emerald-700 font-bold hover:underline transition-all">
              contact us
            </a>.
          </p>
        </div>
      </section>

      {/* ── Monthly Seva CTA ── */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 mb-6">
            <Flame className="w-7 h-7" />
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900 uppercase">
            Become a Monthly{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent">
              Seva Supporter
            </span>
          </h3>

          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />

          <p className="text-gray-600 mt-5 mb-8 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
            A monthly commitment — however small — ensures uninterrupted Annadhanam,
            continuous construction, and year-round community support. Be the steady
            flame that never goes out.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="/donate?frequency=monthly#donate-form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 transition-all active:scale-95 shadow-lg shadow-emerald-200">
              <HandHeart className="w-4 h-4" />
              Start Monthly Seva
            </a>
            <a href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-wider text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-all active:scale-95">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              Have Questions? Contact Us
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}

/* ── SevaCard Component ── */
function SevaCard({
  emoji, title, description, link, tag,
}: {
  emoji: string; title: string; description: string; link: string; tag?: string;
}) {
  return (
    <a href={link}
      className="group relative block rounded-2xl p-6 bg-white border border-gray-200 transition-all duration-300 hover:border-emerald-300 hover:-translate-y-1 hover:shadow-xl">

      {tag && (
        <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
          {tag}
        </span>
      )}

      <div className="h-1 rounded-full mb-5 w-8 group-hover:w-16 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300" />

      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900 group-hover:text-emerald-700 transition-colors">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed font-medium">{description}</p>
      <span className="inline-flex items-center gap-1.5 mt-5 text-xs font-black uppercase tracking-wider text-emerald-600 group-hover:text-emerald-700">
        Give to this seva
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </span>
    </a>
  );
}

/* ── InKindCard Component ── */
function InKindCard({
  icon, title, description,
}: {
  icon: React.ReactNode; title: string; description: string;
}) {
  return (
    <div className="rounded-2xl p-6 bg-white border border-gray-200 text-center transition-all duration-300 hover:border-emerald-300 hover:-translate-y-0.5">
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200">
        {icon}
      </div>
      <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed font-medium">{description}</p>
    </div>
  );
}