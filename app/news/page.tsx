"use client";
import { useState } from "react";

const pressReleases = [
  {
    title: "ChildSave Expands Youth Employment Program to Three New Countries",
    date: "March 15, 2026",
    summary: "Building on the success of Into Employment®, ChildSave is scaling its job training initiative to reach 10,000 more young people in Colombia, India, and Zambia.",
    link: "#",
  },
  {
    title: "Annual Report 2025: Record Impact Amid Global Challenges",
    date: "February 10, 2026",
    summary: "ChildSave served over 200,000 children last year, with 82% of expenditures going directly to programs. Read the full report and financials.",
    link: "#",
  },
  {
    title: "ChildSave Receives 4-Star Rating from Charity Navigator for 10th Consecutive Year",
    date: "January 22, 2026",
    summary: "The organization maintains a perfect 100 in accountability and transparency, reinforcing its commitment to donors and children alike.",
    link: "#",
  },
];

const mediaResources = [
  { name: "ChildSave Logo & Brand Kit", type: "ZIP", size: "4.2 MB" },
  { name: "Press Photos (High Resolution)", type: "ZIP", size: "18 MB" },
  { name: "Fact Sheet (PDF)", type: "PDF", size: "1.1 MB" },
  { name: "2025 Annual Report (PDF)", type: "PDF", size: "3.5 MB" },
];

export default function NewsroomPage() {
  const [form, setForm] = useState({ name: "", email: "", media_outlet: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.media_outlet || !form.message) {
      alert("Please fill in all fields.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media-inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", media_outlet: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="bg-white overflow-x-hidden text-slate-900">
      {/* Hero - Themed with Plum/Green Gradient */}
      <section className="bg-gradient-to-br from-[#fdf2f8] via-white to-[#f0f9f6] py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none">
            News<span className="text-[#8b265a]">room</span>
          </h1>
          <p className="mt-8 text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
            Resources and information about ChildSave for media professionals.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl shadow-rose-900/5 border border-gray-100 relative">
            <div className="absolute top-0 left-10 w-20 h-1 bg-[#8b265a] rounded-full"></div>
            <p className="text-gray-700 text-xl md:text-2xl leading-relaxed font-medium">
              ChildSave is a leader in the movement to end poverty. We support children and youth in 10 countries, and form programs and partnerships that equip them to become sustainably employed, contributing citizens.
            </p>
            <div className="mt-10 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center gap-6">
              <p className="font-black text-gray-900 text-sm uppercase tracking-widest">For media inquiries:</p>
              <a href="mailto:media@childsave.org" className="inline-flex items-center gap-3 px-8 py-4 bg-[#fdf2f8] text-[#8b265a] rounded-2xl text-xl font-black hover:bg-[#8b265a] hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                media@childsave.org
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
              Our media team <span className="text-[#1e6b52]">provides</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {[
              { icon: "📖", title: "Success stories", text: "Stories about the programs and partnerships we're cultivating around the globe to help end the generational cycle of poverty." },
              { icon: "💼", title: "Into Employment® expertise", text: "Examples of our customized approach to providing job training that leads to purposeful entry-level positions and dream careers." },
              { icon: "🎤", title: "Expert interviews", text: "Interviews on issues related to child and youth development programming, global health equity and youth workforce development." },
              { icon: "📊", title: "Information & data", text: "Data that can better inform your stories about combatting global poverty through the consistent support of children and youth." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start gap-6 bg-slate-50 p-8 md:p-10 rounded-3xl hover:bg-[#f0f9f6] transition-all duration-500 group border border-transparent hover:border-[#1e6b52]/20">
                <div className="text-5xl group-hover:scale-125 transition-transform duration-500">{item.icon}</div>
                <div>
                  <h3 className="font-black text-gray-900 text-xl mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
                Recent <span className="text-[#8b265a]">News</span>
              </h2>
              <p className="mt-2 text-gray-500 font-bold uppercase tracking-widest text-sm">Updates & Press Releases</p>
            </div>
            <a href="#" className="hidden md:inline-block bg-white border-2 border-[#8b265a] text-[#8b265a] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#8b265a] hover:text-white transition-all shadow-xl">
              View all releases
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {pressReleases.map((release, idx) => (
              <div key={idx} className="group bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-[#8b265a]/20">
                <div className="px-3 py-1 bg-[#fdf2f8] text-[#8b265a] rounded-lg text-[10px] font-black uppercase tracking-widest inline-block mb-6">{release.date}</div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mt-2 leading-tight group-hover:text-[#8b265a] transition-colors">{release.title}</h3>
                <p className="text-gray-500 mt-6 leading-relaxed font-medium line-clamp-3">{release.summary}</p>
                <a href={release.link} className="inline-flex items-center mt-8 text-[#1e6b52] font-black uppercase tracking-widest text-xs group/btn">
                  Read full story <span className="ml-2 group-hover/btn:translate-x-2 transition-transform">→</span>
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 md:hidden">
            <a href="#" className="inline-block border-2 border-[#8b265a] text-[#8b265a] px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs">View all</a>
          </div>
        </div>
      </section>

      {/* Media Resources */}
      <section className="py-16 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
              Media <span className="text-[#1e6b52]">Resources</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 font-medium">Download logos, photos, reports and more.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaResources.map((resource, idx) => (
              <a key={idx} href="#" className="group flex items-center justify-between bg-white p-6 rounded-2xl hover:bg-[#8b265a] transition-all duration-300 border-2 border-gray-100 hover:border-[#8b265a] shadow-sm hover:shadow-2xl">
                <div className="text-left">
                  <p className="font-black text-gray-900 group-hover:text-white transition-colors">{resource.name}</p>
                  <p className="text-xs font-bold text-gray-400 group-hover:text-rose-100 uppercase tracking-widest mt-1">{resource.type} • {resource.size}</p>
                </div>
                <span className="w-10 h-10 bg-slate-50 text-[#8b265a] rounded-xl flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-all">⬇️</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-28 bg-slate-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-rose-900/10 border border-gray-100">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 text-center mb-6 tracking-tighter uppercase">
              Media <span className="text-[#8b265a]">Inquiry</span>
            </h2>
            <p className="text-center text-gray-600 font-medium mb-12 leading-relaxed">
              For interview requests, expert commentary, or additional materials, please fill out the form below.
            </p>

            {status === "success" ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-6">✅</div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Inquiry Sent!</h3>
                <p className="text-gray-500 font-medium mb-8">Our media team will get back to you shortly.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-8 py-4 bg-[#1e6b52] text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#154d3b] transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:border-[#8b265a] focus:bg-white transition-all outline-none font-medium"
                      placeholder="Full name" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:border-[#8b265a] focus:bg-white transition-all outline-none font-medium"
                      placeholder="Email address" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Media Outlet</label>
                  <input type="text" name="media_outlet" value={form.media_outlet} onChange={handleChange} required
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:border-[#8b265a] focus:bg-white transition-all outline-none font-medium"
                    placeholder="Publication name" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Message</label>
                  <textarea rows={4} name="message" value={form.message} onChange={handleChange} required
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:border-[#8b265a] focus:bg-white transition-all outline-none font-medium resize-none"
                    placeholder="How can we help?" />
                </div>
                {status === "error" && (
                  <p className="text-red-500 text-sm font-bold text-center">Something went wrong. Please try again.</p>
                )}
                <button type="submit" disabled={status === "loading"}
                  className="w-full bg-[#8b265a] text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-rose-600/30 hover:bg-[#701e48] transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
                  {status === "loading" ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}