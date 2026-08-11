"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/home/Header";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface Event {
  id:          number;
  title:       string;
  description: string;
  date:        string;
  time:        string;
  location:    string;
  category:    string;
  image_url:   string;
}

const resolveImageUrl = (url: string) => {
  if (!url) return "/images/gallery/img1.webp";
  if (url.startsWith("/uploads")) return `${API_URL}${url}`;
  if (url.startsWith("http")) return url;
  return url;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });
  } catch { return dateStr; }
};

function RecapContent() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const eventId      = searchParams.get("event_id");

  const [event, setEvent]     = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (!eventId) { setError("Event not found."); setLoading(false); return; }
    const fetch_ = async () => {
      try {
        const res = await fetch(`${API_URL}/api/events/${eventId}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`); // ✅ Fix 1
        const data = await res.json();
        if (data.success) setEvent(data.event);
        else setError("Event not found.");
      } catch (err: any) {
        console.warn("Failed to load event:", err.message); // ✅ Fix 1
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, [eventId]);

  if (loading) return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-7 h-7 border-2 border-gray-200 border-t-[#8B235E] rounded-full animate-spin" />
      </div>
    </main>
  );

  if (error || !event) return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 pt-32 pb-16 text-center">
        <p className="text-gray-400 text-sm mb-4">{error || "Event not found."}</p>
        <button
          onClick={() => router.push("/events")}
          className="text-sm font-semibold text-[#8B235E] underline underline-offset-4"
        >
          Back to Events
        </button>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <article className="max-w-4xl mx-auto px-4 pt-28 pb-20">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm font-medium mb-10 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Events
        </button>

        {/* Label */}
        <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-gray-400 mb-4">
          Event Recap
        </p>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight leading-tight mb-6">
          {event.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-10 pb-8 border-b border-gray-100">
          <span className="flex items-center gap-2">
            <Calendar size={13} className="text-[#009270]" />
            {formatDate(event.date)}{event.time && ` · ${event.time}`}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={13} className="text-[#8B235E]" />
            {event.location}
          </span>
          <span className="flex items-center gap-2">
            <Tag size={13} className="text-gray-300" />
            Past Event
          </span>
        </div>

        {/* Image */}
        <div className="w-full aspect-[16/7] overflow-hidden bg-gray-100 mb-10">
          <img
            src={resolveImageUrl(event.image_url)}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/gallery/img1.webp"; // ✅ Fix 2
            }}
          />
        </div>

        {/* Description / Recap */}
        <div className="max-w-2xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-gray-400 mb-4">
            About This Event
          </p>
          <p className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-line">
            {event.description}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mt-14 pt-8">
          <button
            onClick={() => router.push("/events")}
            className="bg-[#8B235E] text-white px-6 py-3 text-sm font-extrabold uppercase tracking-wider hover:bg-[#6b1b48] transition-colors"
          >
            ← Back to All Events
          </button>
        </div>

      </article>
    </main>
  );
}

export default function RecapPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-7 h-7 border-2 border-gray-200 border-t-[#8B235E] rounded-full animate-spin" />
      </div>
    }>
      <RecapContent />
    </Suspense>
  );
}