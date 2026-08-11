// app/contact/page.tsx
"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Sparkles, HeartHandshake, Send } from "lucide-react";

const WHATSAPP_NUMBER = "919626608314"; // country code + number, no + or spaces

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    purpose: "General Inquiry",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `New Contact Form Message%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Phone:* ${encodeURIComponent(form.phone)}%0A*Email:* ${encodeURIComponent(form.email || "-")}%0A*Purpose:* ${encodeURIComponent(form.purpose)}%0A*Message:* ${encodeURIComponent(form.message)}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <main className="bg-white min-h-screen text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Banner */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-emerald-100">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Aram Trust • Nithya Dharma Salai
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Contact Us
          </h1>

          <p className="mt-3 text-lg sm:text-xl text-emerald-700 max-w-xl mx-auto font-semibold">
            அறம் அறக்கட்டளை — பெரியாக்குறிச்சி, நெய்வேலி - 2
          </p>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Whether you have questions regarding <strong>Annadhanam</strong>, sponsorships, 
            volunteering for <strong>Seva</strong>, or visiting us, our trust members are here to assist you.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">

            {/* Phone Card */}
            <div className="group bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-emerald-50 rounded-xl text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shrink-0 border border-emerald-200">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Call Us Direct</h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Speak directly with our trust representatives.
                  </p>
                  
                  <a  href="tel:+919626608314"
                    className="inline-block mt-3 text-xl font-black text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    +91 96266 08314
                  </a>
                  <br />
                  
                  <a  href="tel:+919442457848"
                    className="inline-block mt-1 text-base font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    +91 94424 57848
                  </a>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                    <p className="flex items-center gap-1.5 font-medium text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" /> Mon – Sat: 9:00 AM – 6:00 PM
                    </p>
                    <p className="text-slate-400 pl-5">Sunday: Open for Services</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="group bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-emerald-50 rounded-xl text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shrink-0 border border-emerald-200">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Email Enquiries</h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Send us feedback, donation details, or sponsorship queries.
                  </p>
                  
                 <a   href="mailto:aramtrustneyveli@gmail.com"
                    className="inline-block mt-3 text-base font-bold text-emerald-700 hover:underline break-all"
                  >
                    aramtrustneyveli@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="group bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-emerald-50 rounded-xl text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shrink-0 border border-emerald-200">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Visit Us</h2>
                  <address className="not-italic text-slate-600 text-sm mt-2 leading-relaxed">
                    <strong className="text-slate-900 block font-semibold">Aram Trust</strong>
                    Periyakurichi, Neyveli - 2<br />
                    Tamil Nadu, India
                    <br />
                    <span className="text-xs text-slate-400">Reg. No: R/Vadalur/Book - 4/49/2018</span>
                  </address>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-full pointer-events-none" />
              
              <h2 className="text-2xl font-bold text-gray-900 mb-1.5">
                Send a Message
              </h2>
              <p className="text-slate-500 text-sm mb-8">
                Fill out the form below — it opens WhatsApp with your message ready to send to our trust coordinators.
              </p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-slate-800 text-sm transition bg-slate-50/30 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-slate-800 text-sm transition bg-slate-50/30 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="yourname@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-slate-800 text-sm transition bg-slate-50/30 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Purpose of Contact
                  </label>
                  <select
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-slate-800 text-sm bg-white transition"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Annadhanam & Sponsorship">Annadhanam & Sponsorship</option>
                    <option value="Volunteering / Seva">Volunteering / Seva</option>
                    <option value="Visit">Visiting Aram Trust</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Type your message or enquiry details here..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-slate-800 text-sm transition resize-none bg-slate-50/30 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Volunteering & Seva Callout */}
        <div className="mt-12 bg-emerald-50 rounded-2xl p-6 sm:p-8 text-center border border-emerald-200 flex flex-col items-center justify-center gap-3">
          <HeartHandshake className="w-8 h-8 text-emerald-700" />
          <p className="text-slate-800 text-sm sm:text-base leading-relaxed max-w-2xl">
            Interested in volunteering or sponsoring one of our trust programs? 
            Reach out to us directly — we are always honored to welcome new hands to our <strong>Seva</strong>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            We endeavor to respond to all enquiries within one working day.
            Thank you for supporting <strong>Aram Trust</strong>.
          </p>
        </div>
      </footer>
    </main>
  );
}