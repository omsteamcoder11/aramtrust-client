"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/home/Header";
import { ArrowLeft, CheckCircle, User, Mail, Phone, MessageSquare, Calendar, MapPin } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image_url: string;
}

const EMPTY_FORM = {
  name:    "",
  email:   "",
  phone:   "",
  message: "",
};

const resolveImageUrl = (url: string) => {
  if (!url) return "/images/gallery/img1.webp";
  if (url.startsWith("/uploads")) return `${API_URL}${url}`;
  if (url.startsWith("http")) return url;
  return url;
};

function RegisterForm() {
  const searchParams  = useSearchParams();
  const router        = useRouter();
  const eventId       = searchParams.get("event_id");
  const eventTitle    = searchParams.get("event_title") || "";

  const [event, setEvent]     = useState<Event | null>(null);
  const [form, setForm]       = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");

  // ── Fetch Event ──
  useEffect(() => {
    if (!eventId) return;
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_URL}/api/events/${eventId}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`); // ✅ Fix 1
        const data = await res.json();
        if (data.success) setEvent(data.event);
      } catch (err: any) {
        console.warn("Failed to fetch event:", err.message); // ✅ Fix 1
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim())  { setError("Name is required");  return; }
    if (!form.email.trim()) { setError("Email is required"); return; }
    if (!form.phone.trim()) { setError("Phone is required"); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/registrations`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id:    Number(eventId),
          event_title: event?.title || eventTitle,
          name:        form.name.trim(),
          email:       form.email.trim(),
          phone:       form.phone.trim(),
          message:     form.message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric", month: "long", year: "numeric",
      });
    } catch { return dateStr; }
  };

  // ── Success Screen ──
  if (success) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-lg border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500 w-10 h-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Registration Successful!</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">
              Thank you <strong className="text-gray-800">{form.name}</strong>! You have successfully registered for
            </p>
            <p className="text-[#8B235E] font-bold text-base mb-6">{event?.title || eventTitle}</p>
            <p className="text-gray-400 text-xs mb-8">
              We will contact you at <strong>{form.email}</strong> or <strong>{form.phone}</strong> with further details.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push("/events")}
                className="bg-[#8B235E] text-white py-3 px-6 rounded-xl font-bold text-sm hover:bg-[#6b1b48] transition-all"
              >
                Back to Events
              </button>
              <button
                onClick={() => router.push("/")}
                className="bg-gray-100 text-gray-600 py-3 px-6 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="max-w-6xl mx-auto px-4 pt-28 pb-16">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Events
        </button>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* ── Left: Image + Event Info ── */}
          <div className="flex flex-col gap-4">
            {/* Image */}
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={event?.image_url ? resolveImageUrl(event.image_url) : "/images/gallery/img1.webp"}
                alt={event?.title || eventTitle}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/gallery/img1.webp"; // ✅ Fix 2
                }}
              />
              {/* subtle dark gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {/* Category badge */}
              {event?.category && (
                <span className="absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20">
                  {event.category}
                </span>
              )}
              {/* Title overlay on image */}
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-white font-extrabold text-lg uppercase tracking-tight leading-snug drop-shadow">
                  {event?.title || eventTitle}
                </h1>
              </div>
            </div>

            {/* Event Meta */}
            {event && (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3">
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#009270]/10 text-[#009270] w-fit">
                  Event Details
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={14} className="text-[#009270]" />
                  <span>{formatDate(event.date)} · {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={14} className="text-[#8B235E]" />
                  <span>{event.location}</span>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Form ── */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-900 mb-1">Register Now</h2>
            <p className="text-gray-400 text-sm mb-6">Fill in your details and we'll get back to you shortly.</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm font-semibold mb-5">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name *</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="e.g. Ravi Kumar"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B235E]/20 focus:border-[#8B235E] transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address *</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="e.g. ravi@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B235E]/20 focus:border-[#8B235E] transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="e.g. 9876543210" maxLength={10}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B235E]/20 focus:border-[#8B235E] transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message (Optional)</label>
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Any questions or special requirements..." rows={3}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B235E]/20 focus:border-[#8B235E] transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit" disabled={loading}
                className="w-full bg-[#8B235E] hover:bg-[#6b1b48] text-white py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(139,35,94,0.3)]"
              >
                {loading ? "Submitting..." : "Register Now →"}
              </button>

              <p className="text-center text-xs text-gray-400">
                By registering, you agree to be contacted by ChildSave NGO regarding this event.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#8B235E] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}