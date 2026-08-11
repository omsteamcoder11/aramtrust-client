"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/home/Header";
import {
  Calendar,
  MapPin,
  Tag,
  ArrowRight,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = "all" | "upcoming" | "fundraiser" | "past";

interface Event {
  id:           number;
  title:        string;
  description:  string;
  date:         string;
  time:         string;
  location:     string;
  category:     "upcoming" | "fundraiser" | "past";
  image_url:    string;
  button_label: string;
  button_href:  string;
  is_active:    boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const TABS: { label: string; value: Category; emoji: string }[] = [
  { label: "All Events",   value: "all",        emoji: "🌟" },
  { label: "Upcoming",     value: "upcoming",   emoji: "📅" },
  { label: "Fundraisers",  value: "fundraiser", emoji: "💝" },
  { label: "Past Events",  value: "past",       emoji: "🏆" },
];

const CATEGORY_CONFIG: Record<string, {
  bg: string; text: string; dot: string; label: string
}> = {
  upcoming:   { bg: "bg-[#009270]/10",  text: "text-[#009270]",  dot: "bg-[#009270]",  label: "Upcoming"   },
  fundraiser: { bg: "bg-[#8B235E]/10",  text: "text-[#8B235E]",  dot: "bg-[#8B235E]",  label: "Fundraiser" },
  past:       { bg: "bg-gray-100",      text: "text-gray-500",   dot: "bg-gray-400",   label: "Past"       },
};

const BUTTON_CONFIG: Record<string, string> = {
  upcoming:   "bg-[#009270] hover:bg-[#007a5d] text-white shadow-[0_2px_8px_rgba(0,146,112,0.3)]",
  fundraiser: "bg-[#8B235E] hover:bg-[#6b1b48] text-white shadow-[0_2px_8px_rgba(139,35,94,0.3)]",
  past:       "bg-gray-100  hover:bg-gray-200  text-gray-600",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const resolveImageUrl = (url: string) => {
  if (!url) return "/images/gallery/img1.webp";
  if (url.startsWith("/uploads")) return `${API_URL}${url}`;
  if (url.startsWith("/events"))  return url;
  if (url.startsWith("http"))     return url;
  return url;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day:   "numeric",
      month: "long",
      year:  "numeric",
    });
  } catch {
    return dateStr;
  }
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border
    border-gray-100 animate-pulse"
  >
    <div className="w-full h-52 bg-gray-200" />
    <div className="p-5 flex flex-col gap-3">
      <div className="h-4 bg-gray-200 rounded-lg w-3/4" />
      <div className="h-3 bg-gray-200 rounded-lg w-full" />
      <div className="h-3 bg-gray-200 rounded-lg w-5/6" />
      <div className="flex flex-col gap-2 mt-1">
        <div className="h-3 bg-gray-200 rounded-lg w-1/2" />
        <div className="h-3 bg-gray-200 rounded-lg w-2/3" />
      </div>
      <div className="h-10 bg-gray-200 rounded-xl mt-2" />
    </div>
  </div>
);

// ─── EventCard ────────────────────────────────────────────────────────────────
const EventCard = ({ event }: { event: Event }) => {
  const cfg = CATEGORY_CONFIG[event.category] || CATEGORY_CONFIG.past;

  const href =
    event.category === "past"
      ? `/events/recap?event_id=${event.id}`
      : event.category === "fundraiser"
      ? `/donate?campaign=${event.id}`
      : `/events/register?event_id=${event.id}&event_title=${encodeURIComponent(event.title)}`;

  const btnStyle =
    event.category === "upcoming"
      ? { background: "transparent", color: "#009270", border: "1.5px solid #009270" }
      : event.category === "fundraiser"
      ? { background: "transparent", color: "#8B235E", border: "1.5px solid #8B235E" }
      : { background: "transparent", color: "#374151", border: "1.5px solid #374151" };

  return (
    <div
      className="group bg-white flex flex-col"
      style={{ border: "1px solid #e2e8f0", transition: "box-shadow 0.2s, transform 0.2s" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-gray-100 flex-shrink-0" style={{ height: "200px" }}>
        <img
          src={resolveImageUrl(event.image_url)}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/gallery/img1.webp";
          }}
        />
        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 ${cfg.bg} ${cfg.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="text-[14px] font-extrabold text-gray-900 uppercase tracking-tight leading-snug mb-2"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {event.title}
        </h3>

        <p
          className="text-[13px] text-gray-500 leading-relaxed mb-4 flex-1"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {event.description}
        </p>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 py-3 mb-4" style={{ borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}>
          <div className="flex items-center gap-2 text-[12px] text-gray-400">
            <Calendar size={12} className="text-[#009270] flex-shrink-0" />
            <span className="font-medium">
              {formatDate(event.date)}{event.time && ` · ${event.time}`}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-gray-400">
            <MapPin size={12} className="text-[#8B235E] flex-shrink-0" />
            <span className="font-medium truncate">{event.location}</span>
          </div>
        </div>

        {/* Button */}
        
         <a href={href}
          className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-[11px] font-bold uppercase tracking-wider transition-opacity duration-200 hover:opacity-80 active:scale-95"
          style={btnStyle}
        >
          {event.button_label || (event.category === "past" ? "View Recap" : "Learn More")}
          <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({
  query, onClear,
}: {
  query: string;
  onClear: () => void;
}) => (
  <div className="col-span-full flex flex-col items-center
    justify-center py-24 text-center"
  >
    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center
      justify-center text-3xl mb-4"
    >
      📅
    </div>
    <h3 className="text-gray-700 font-extrabold text-lg mb-2">
      No events found
    </h3>
    <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-6">
      {query
        ? `No events match "${query}". Try a different search.`
        : "No events in this category yet. Check back soon!"}
    </p>
    {query && (
      <button
        onClick={onClear}
        className="px-5 py-2.5 bg-[#8B235E] text-white rounded-xl
          font-bold text-sm hover:bg-[#6b1b48] transition-all"
      >
        Clear Search
      </button>
    )}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const [activeTab, setActiveTab]     = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents]           = useState<Event[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");

  // ── Fetch ──
  const fetchEvents = useCallback(async (category: Category) => {
    try {
      setLoading(true);
      setError("");

      // ✅ Fix 1 — API URL check
      if (!API_URL) throw new Error("API URL not configured");

      const url = category === "all"
        ? `${API_URL}/api/events`
        : `${API_URL}/api/events?category=${category}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();

      // ✅ Fix 2 — data format check
      if (!data.events || !Array.isArray(data.events))
        throw new Error("Invalid response format");

      setEvents(data.events);
    } catch (err: any) {
      console.warn("Events fetch failed:", err.message);
      setError("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents(activeTab);
  }, [activeTab, fetchEvents]);

  // ── Filter by search ──
  const filtered = events.filter((e) => {
    const q = searchQuery.toLowerCase();
    return (
      e.title.toLowerCase().includes(q)       ||
      e.location.toLowerCase().includes(q)    ||
      e.description.toLowerCase().includes(q)
    );
  });

  // ✅ Fix 3 — counts fixed
  const getCounts = useCallback((category: Category) => {
    if (category === "all") return events.length;
    return events.filter((e) => e.category === category).length;
  }, [events]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* ── Hero ── */}
      <section className="relative bg-white border-b border-gray-100
        pt-32 pb-14 md:pb-20 px-4 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px]
          bg-[#8B235E]/[0.03] rounded-full -translate-y-1/2
          translate-x-1/2 pointer-events-none"
        />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px]
          bg-[#009270]/[0.03] rounded-full translate-y-1/2
          -translate-x-1/2 pointer-events-none"
        />

        <div className="max-w-3xl mx-auto text-center relative">
          <span className="inline-flex items-center gap-2 text-[11px]
            font-extrabold tracking-[0.3em] uppercase text-[#009270] mb-4
            px-4 py-1.5 bg-[#009270]/10 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#009270]
              animate-pulse"
            />
            Get Involved
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900
            uppercase tracking-tight leading-tight mb-4"
          >
            Events &{" "}
            <span className="text-[#8B235E]">Fundraisers</span>
          </h1>

          <p className="text-gray-500 text-sm md:text-base max-w-xl
            mx-auto leading-relaxed mb-8"
          >
            Join our events, support our fundraisers and help us protect
            and empower children across communities.
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2
                text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search events by title, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3.5 rounded-xl border
                border-gray-200 text-sm text-gray-700 bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-[#009270]/30
                focus:border-[#009270] focus:bg-white transition-all
                duration-200 placeholder:text-gray-400 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2
                  p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={14} className="text-gray-400" />
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6
            mt-8 flex-wrap"
          >
            {[
              { label: "Total Events",  value: getCounts("all")        },
              { label: "Upcoming",      value: getCounts("upcoming")   },
              { label: "Fundraisers",   value: getCounts("fundraiser") },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-extrabold text-gray-800">
                  {value}
                </p>
                <p className="text-xs text-gray-400 font-medium uppercase
                  tracking-wider"
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky Tabs ── */}
      <section className="sticky top-[64px] z-20 bg-white/95
        backdrop-blur-md border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto
            scrollbar-none py-3"
          >
            <SlidersHorizontal
              size={15}
              className="text-gray-400 flex-shrink-0 mr-2"
            />
            {TABS.map((tab) => {
              const count = getCounts(tab.value); // ✅ fixed counts
              const isActive = activeTab === tab.value;

              return (
                <button
                  key={tab.value}
                  onClick={() => {
                    setActiveTab(tab.value);
                    setSearchQuery("");
                  }}
                  className={`flex-shrink-0 flex items-center gap-2
                    px-4 py-2 rounded-lg text-[12px] font-extrabold
                    uppercase tracking-wider transition-all duration-200
                    active:scale-95
                    ${isActive
                      ? "bg-[#8B235E] text-white shadow-[0_2px_8px_rgba(139,35,94,0.25)]"
                      : "text-gray-500 hover:text-[#8B235E] hover:bg-[#8B235E]/[0.06]"
                    }`}
                >
                  <span>{tab.emoji}</span>
                  <span>{tab.label}</span>
                  <span className={`text-[10px] font-extrabold px-1.5
                    py-0.5 rounded-md min-w-[20px] text-center
                    ${isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Events Grid ── */}
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">

        {/* Search result info */}
        {searchQuery && !loading && (
          <div className="flex items-center justify-between mb-6
            p-3 bg-white rounded-xl border border-gray-100 shadow-sm"
          >
            <p className="text-sm text-gray-500">
              <span className="font-bold text-gray-800">{filtered.length}</span>
              {" "}result{filtered.length !== 1 ? "s" : ""} for{" "}
              <span className="font-bold text-[#8B235E]">
                "{searchQuery}"
              </span>
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-gray-400 hover:text-gray-600
                font-semibold flex items-center gap-1"
            >
              <X size={12} /> Clear
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-400 text-sm font-semibold mb-3">
              {error}
            </p>
            <button
              onClick={() => fetchEvents(activeTab)}
              className="text-[#009270] text-sm font-bold underline
                hover:no-underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Events */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length > 0
              ? filtered.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              : <EmptyState
                  query={searchQuery}
                  onClear={() => setSearchQuery("")}
                />
            }
          </div>
        )}
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="relative bg-gradient-to-br from-[#8B235E]
          to-[#6b1b48] rounded-2xl px-8 py-10 md:py-12 overflow-hidden
          shadow-[0_8px_32px_rgba(139,35,94,0.25)]"
        >
          <div className="absolute top-0 right-0 w-64 h-64
            bg-white/[0.04] rounded-full -translate-y-1/2
            translate-x-1/2 pointer-events-none"
          />
          <div className="absolute bottom-0 left-0 w-48 h-48
            bg-white/[0.04] rounded-full translate-y-1/2
            -translate-x-1/2 pointer-events-none"
          />

          <div className="relative flex flex-col md:flex-row
            items-center justify-between gap-6"
          >
            <div>
              <p className="text-white/60 text-xs font-bold uppercase
                tracking-widest mb-2"
              >
                Partner With Us
              </p>
              <h2 className="text-white font-extrabold text-xl
                md:text-2xl uppercase tracking-tight mb-2"
              >
                Want to host an event?
              </h2>
              <p className="text-white/70 text-sm leading-relaxed
                max-w-md"
              >
                Partner with us to create meaningful impact in your
                community and help protect children's futures.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              
             <a   href="/contact"
                className="bg-white text-[#8B235E] px-6 py-3 rounded-xl
                  font-extrabold text-sm uppercase tracking-wider
                  hover:bg-gray-100 transition-all duration-200
                  active:scale-95 shadow-md text-center"
              >
                Get in Touch
              </a>
              
              <a  href="/volunteer"
                className="bg-white/10 border border-white/20 text-white
                  px-6 py-3 rounded-xl font-extrabold text-sm uppercase
                  tracking-wider hover:bg-white/20 transition-all
                  duration-200 active:scale-95 text-center"
              >
                Volunteer
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}