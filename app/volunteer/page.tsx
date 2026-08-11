"use client";

import { VolunteerForm } from "./VolunteerForm";

const T = {
  green:     "#059669",
  greenDeep: "#047857",
  accent:    "#10b981",
};

const STEPS = [
  { step: "01", title: "Fill the Form",    desc: "Share your details and area of interest",         emoji: "📝" },
  { step: "02", title: "We Contact You",   desc: "Our team will reach out within 2-3 working days", emoji: "📞" },
  { step: "03", title: "Orientation",      desc: "A brief intro session about our community work",  emoji: "🤝" },
  { step: "04", title: "Start Serving",    desc: "Begin your journey of selfless service",           emoji: "🙏" },
];

const AREAS = [
  { emoji: "🍱", title: "Annadhanam",         desc: "Help prepare and serve free meals to the hungry and the poor — our most sacred seva." },
  { emoji: "📦", title: "Relief Distribution", desc: "Assist in packing and delivering emergency relief kits to families in need." },
  { emoji: "🏥", title: "Medical Camp",        desc: "Support free health check-up camps for the elderly and underprivileged." },
  { emoji: "🪔", title: "Community Events",    desc: "Help organise and manage community outreach events and awareness drives." },
  { emoji: "📚", title: "Teaching Children",   desc: "Tutor and mentor underprivileged children — light the lamp of knowledge." },
  { emoji: "🗂️", title: "Admin & Office",      desc: "Support day-to-day administrative and coordination work of the trust." },
];

export default function VolunteerPage() {
  return (
    <main className="bg-white overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative bg-white border-b overflow-hidden py-14 md:py-20 lg:py-28"
        style={{ borderColor: "rgba(5,150,105,0.10)" }}>

        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(5,150,105,0.07) 0%, transparent 70%)",
          }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* badge */}
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-6"
            style={{ borderColor: "rgba(5,150,105,0.30)", color: T.green, background: "rgba(5,150,105,0.06)" }}>
            🤝 Join Our Seva Family
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
            style={{ color: "#052e1c" }}>
            Volunteer{" "}
            <span style={{
              background: `linear-gradient(135deg, ${T.green}, ${T.accent})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              With Us
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-semibold"
            style={{ color: T.green }}>
            சேவை செய்யுங்கள் • Serve with Purpose
          </p>

          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Aram Trust believes that serving the hungry and the needy is one of life&apos;s highest callings.
            Join our growing family of volunteers and be part of something truly meaningful.
          </p>

          {/* stats */}
          <div className="mt-10 inline-grid grid-cols-3 gap-px rounded-2xl overflow-hidden border"
            style={{ borderColor: "rgba(5,150,105,0.12)" }}>
            {[
              { value: "100+", label: "Volunteers" },
              { value: "50+",  label: "Events Served" },
              { value: "10+",  label: "Years Active" },
            ].map((s) => (
              <div key={s.label} className="px-5 sm:px-8 py-4 sm:py-5 text-center bg-white hover:bg-emerald-50 transition-colors">
                <p className="text-xl sm:text-2xl font-extrabold" style={{ color: T.green }}>{s.value}</p>
                <p className="text-xs font-semibold text-gray-400 mt-0.5 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-14 md:py-20 border-b"
        style={{ background: "#f0fdf4", borderColor: "rgba(5,150,105,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
              style={{ background: "rgba(5,150,105,0.08)", color: T.green }}>
              Simple Process
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold" style={{ color: "#052e1c" }}>
              How It Works
            </h2>
            <div className="mt-3 mx-auto w-14 h-1 rounded-full"
              style={{ background: `linear-gradient(90deg,${T.green},${T.accent})` }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STEPS.map((s, i) => (
              <div key={s.step} className="relative rounded-2xl p-5 sm:p-6 border text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ background: "#ffffff", borderColor: "rgba(5,150,105,0.12)" }}>

                {/* connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 z-10"
                    style={{ background: `linear-gradient(90deg,${T.green},${T.accent})` }} />
                )}

                <div className="text-3xl mb-3">{s.emoji}</div>
                <div className="inline-block text-xs font-extrabold px-2.5 py-1 rounded-full mb-3"
                  style={{ background: "rgba(5,150,105,0.08)", color: T.green }}>
                  Step {s.step}
                </div>
                <h3 className="text-base font-extrabold mb-2" style={{ color: "#052e1c" }}>{s.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Volunteer Areas ── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
              style={{ background: "rgba(5,150,105,0.08)", color: T.green }}>
              Where You Can Help
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold" style={{ color: "#052e1c" }}>
              Volunteer Areas
            </h2>
            <div className="mt-3 mx-auto w-14 h-1 rounded-full"
              style={{ background: `linear-gradient(90deg,${T.green},${T.accent})` }} />
            <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
              Choose the area that matches your passion and skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {AREAS.map((area) => (
              <div key={area.title}
                className="rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: "#ffffff", borderColor: "rgba(5,150,105,0.12)" }}>
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl text-3xl mb-4 border"
                  style={{ background: "rgba(5,150,105,0.06)", borderColor: "rgba(5,150,105,0.12)" }}>
                  {area.emoji}
                </div>
                <div className="h-1 rounded-full mb-4 w-8 transition-all duration-300"
                  style={{ background: `linear-gradient(90deg,${T.green},${T.accent})` }} />
                <h3 className="text-base sm:text-lg font-extrabold mb-2" style={{ color: "#052e1c" }}>
                  {area.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Registration Form ── */}
      <section className="py-10 md:py-14 border-t"
        style={{ background: "#f0fdf4", borderColor: "rgba(5,150,105,0.08)" }}>
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#052e1c" }}>
              Register Now
            </h2>
            <div className="mt-3 mx-auto w-14 h-1 rounded-full"
              style={{ background: `linear-gradient(90deg,${T.green},${T.accent})` }} />
            <p className="mt-3 text-sm text-gray-500">
              Fill in your details and we will get back to you soon.
            </p>
          </div>
          <VolunteerForm />
        </div>
      </section>

    </main>
  );
}