"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Target, Users, Heart, ArrowRight, Share2, CheckCircle2,
  Flame, Globe, BookOpen, Home, Stethoscope, ShieldCheck, Filter, ChevronRight,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || '';

type CampaignStatus = "active" | "completed" | "urgent";
type FilterKey = "all" | "active" | "completed" | "urgent";

interface Campaign {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  color: string;
  raised_amount: number;
  goal_amount: number;
  donors: number;
  days_left: number | null;
  status: CampaignStatus;
  end_date: string | null;
  start_date: string | null;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Education:      <BookOpen size={20} strokeWidth={1.5} />,
  Shelter:        <Home size={20} strokeWidth={1.5} />,
  Healthcare:     <Stethoscope size={20} strokeWidth={1.5} />,
  "Digital Safety": <ShieldCheck size={20} strokeWidth={1.5} />,
  Global:         <Globe size={20} strokeWidth={1.5} />,
  Nutrition:      <Heart size={20} strokeWidth={1.5} />,
  General:        <Target size={20} strokeWidth={1.5} />,
};

const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000)   return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${amount.toLocaleString("en-IN")}`;
};

const getProgress = (raised: number, goal: number): number =>
  Math.min(Math.round((raised / goal) * 100), 100);

// ─── ProgressBar ──────────────────────────────────────────────────────────────
const ProgressBar = ({ raised, goal, color }: { raised: number; goal: number; color: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const progress = getProgress(raised, goal);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: animated ? `${progress}%` : "0%", backgroundColor: color }}
      />
    </div>
  );
};

// ─── StatusBadge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: CampaignStatus }) => {
  const config = {
    urgent:    { label: "Urgent",    className: "bg-red-50 text-red-600",       dot: "bg-red-500"     },
    active:    { label: "Active",    className: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
    completed: { label: "Completed", className: "bg-gray-100 text-gray-500",    dot: "bg-gray-400"    },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${c.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
};

// ─── CampaignCard ─────────────────────────────────────────────────────────────
const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  const progress = getProgress(campaign.raised_amount, campaign.goal_amount);
  const icon     = CATEGORY_ICONS[campaign.category] || CATEGORY_ICONS["General"];
  const color    = campaign.color || "#8B235E";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
      <div className="h-1 w-full" style={{ backgroundColor: color }} />
      <div className="p-5 sm:p-6 flex flex-col flex-1">

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}12`, color }}
            >
              {icon}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>
                {campaign.category || "General"}
              </span>
              <div className="flex items-center gap-1 text-gray-400 mt-0.5">
                <Globe size={9} />
                <span className="text-[10px] font-medium">{campaign.location}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={campaign.status} />
        </div>

        {/* Title & Description */}
        <h3 className="font-black text-[#1a1a2e] text-base sm:text-[17px] leading-snug mb-2 line-clamp-2">
          {campaign.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
          {campaign.description}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-gray-400 font-semibold">
              {formatCurrency(campaign.raised_amount)} raised
            </span>
            <span className="text-xs font-black" style={{ color }}>{progress}%</span>
          </div>
          <ProgressBar raised={campaign.raised_amount} goal={campaign.goal_amount} color={color} />
          <p className="text-[11px] text-gray-400 mt-1.5">
            Goal: {formatCurrency(campaign.goal_amount)}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between py-3 border-t border-gray-50 mb-4">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Users size={13} />
            <span className="text-xs font-semibold">
              {(campaign.donors || 0).toLocaleString()} donors
            </span>
          </div>
          {campaign.status !== "completed" && campaign.days_left !== null && campaign.raised_amount < campaign.goal_amount && (
            <div className="flex items-center gap-1.5">
              {campaign.days_left <= 10 && <Flame size={12} className="text-red-500" />}
              <span className={`text-xs font-bold ${campaign.days_left <= 10 ? "text-red-500" : "text-gray-500"}`}>
                {campaign.days_left <= 0
                  ? "Ends today!"
                  : campaign.days_left <= 10
                  ? `${campaign.days_left} days left`
                  : `${campaign.days_left} days remaining`}
              </span>
            </div>
          )}
          {campaign.raised_amount >= campaign.goal_amount && (
            <div className="flex items-center gap-1.5 text-green-600">
              <CheckCircle2 size={13} />
              <span className="text-xs font-bold">Goal Achieved</span>
            </div>
          )}
        </div>

        {/* End date */}
        {campaign.end_date && campaign.status !== "completed" && (
          <div className="flex items-center gap-1 text-gray-400 mb-3 text-[11px]">
            <span>🏁 Ends: {new Date(campaign.end_date).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric"
            })}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/donate?campaign=${campaign.id}`}
            className="flex-1 text-center py-2.5 rounded-xl font-black text-sm uppercase tracking-wider text-white hover:opacity-90 active:scale-95 transition-all"
            style={{ backgroundColor: color }}
          >
            Donate Now
          </Link>
          <button
            aria-label="Share campaign"
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/campaigns/${campaign.id}`);
              const toast = document.createElement("div");
              toast.className = "fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1a1a2e] text-white px-5 py-3 rounded-xl shadow-xl text-sm font-semibold z-50";
              toast.innerText = "Campaign link copied!";
              document.body.appendChild(toast);
              setTimeout(() => toast.remove(), 2000);
            }}
            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#8B235E] hover:border-[#8B235E] transition-all active:scale-95 flex-shrink-0"
          >
            <Share2 size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};

// ─── Filters ──────────────────────────────────────────────────────────────────
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all",       label: "All"       },
  { key: "urgent",    label: "Urgent"    },
  { key: "active",    label: "Active"    },
  { key: "completed", label: "Completed" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CampaignsPage() {
  const [campaigns, setCampaigns]     = useState<Campaign[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");           // ✅ Fix 1 — added error state
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [toastVisible, setToastVisible] = useState(false);

  // ✅ Fix 2 — proper fetch with all checks + retry support
  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      if (!API) throw new Error("API URL not configured");

      const res = await fetch(`${API}/api/campaigns/active`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();

      // ✅ Fix 3 — data format check
      if (!data.campaigns || !Array.isArray(data.campaigns))
        throw new Error("Invalid response format");

      setCampaigns(data.campaigns);
    } catch (err: any) {
      console.warn("Campaigns fetch failed:", err.message);
      setError("Failed to load campaigns. Please try again."); // ✅ Fix 4 — show error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const filtered       = activeFilter === "all" ? campaigns : campaigns.filter(c => c.status === activeFilter);
  const urgentCount    = campaigns.filter(c => c.status === "urgent").length;
  const totalRaised    = campaigns.reduce((s, c) => s + parseFloat(String(c.raised_amount || 0)), 0);
  const completedCount = campaigns.filter(c => c.status === "completed").length;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "Campaigns", url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);
    }
  };

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="bg-[#f9f4f7] border-b border-gray-100 pt-[72px] md:pt-[80px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#8B235E]/10 rounded-full px-4 py-1.5 mb-5">
              <Target size={13} className="text-[#8B235E]" />
              <span className="text-[#8B235E] text-xs font-bold uppercase tracking-wider">Our Campaigns</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Real Children. <span className="text-[#8B235E]">Real Needs.</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
              Every campaign represents a child or community that needs your help. Browse, contribute, and track the difference your support makes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 bg-[#8B235E] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#6b1b48] transition-colors"
              >
                Donate Now <ArrowRight size={14} />
              </Link>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg font-semibold text-sm hover:border-[#8B235E] hover:text-[#8B235E] transition-colors"
              >
                <Share2 size={14} /> Share Page
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 mt-10">
            {[
              { val: `${formatCurrency(totalRaised)}+`, label: "Total Raised" },
              { val: `${completedCount}`,               label: "Completed"    },
              { val: `${campaigns.length}`,             label: "Campaigns"    },
            ].map(s => (
              <div key={s.label} className="bg-white border border-gray-100 rounded-lg px-4 py-2.5">
                <p className="text-lg font-bold text-gray-900">{s.val}</p>
                <p className="text-[10px] text-gray-400 font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Urgent Banner ── */}
      {urgentCount > 0 && activeFilter !== "urgent" && (
        <div className="bg-red-50 border-b border-red-100 px-4 py-2.5">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-red-600">
              <Flame size={14} />
              <p className="text-sm font-semibold">
                <span className="font-bold">{urgentCount} urgent campaign{urgentCount > 1 ? "s" : ""}</span> need your support
              </p>
            </div>
            <button
              onClick={() => setActiveFilter("urgent")}
              className="text-xs font-bold text-red-600 uppercase tracking-wider underline"
            >
              View Urgent →
            </button>
          </div>
        </div>
      )}

      {/* ── Grid ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {activeFilter === "all"
                ? "All Campaigns"
                : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Campaigns`}
            </h2>
            <p className="text-gray-400 text-sm mt-0.5">
              {filtered.length} of {campaigns.length} campaigns
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={13} className="text-gray-300" />
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                  ${activeFilter === f.key
                    ? "bg-[#8B235E] text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ Fix 5 — error state with retry button */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-400 text-sm font-semibold mb-3">{error}</p>
            <button
              onClick={fetchCampaigns}
              className="px-6 py-2.5 bg-[#8B235E] text-white rounded-xl font-bold text-sm hover:bg-[#6b1b48] transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        )}

        {/* Campaigns */}
        {!loading && !error && (
          filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(c => <CampaignCard key={c.id} campaign={c} />)}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 font-medium">No campaigns found</p>
              <button
                onClick={() => setActiveFilter("all")}
                className="mt-2 text-[#8B235E] text-sm font-semibold underline"
              >
                View all
              </button>
            </div>
          )
        )}
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[#f9f4f7] border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-5">
          <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-[#8B235E]/10 rounded-lg flex items-center justify-center text-[#8B235E] mb-4">
              <Target size={20} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Start a Fundraiser</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Launch your own campaign and rally your community.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#8B235E] font-bold text-sm hover:gap-3 transition-all"
            >
              Get Started <ChevronRight size={14} />
            </Link>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-[#009270]/10 rounded-lg flex items-center justify-center text-[#009270] mb-4">
              <Users size={20} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Corporate Giving</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Partner with us through CSR or matched giving.
            </p>
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 text-[#009270] font-bold text-sm hover:gap-3 transition-all"
            >
              Partner With Us <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Toast ── */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${toastVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <CheckCircle2 size={15} className="text-green-400" /> Link copied!
      </div>

    </main>
  );
}