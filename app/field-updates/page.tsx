// app/field-updates/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Calendar, ChevronRight, Heart, BookOpen, Stethoscope, Home, Apple, Flame, Users } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "All" | "Education" | "Healthcare" | "Shelter" | "Nutrition" | "Emergency";

interface Story {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: Category;
  childrenHelped: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STORIES: Story[] = [
  {
    id: "1",
    title: "Little Priya's First Day at School",
    description: "After 2 years of being out of school, 8-year-old Priya finally joined our learning center. She wrote her first alphabet today.",
    date: "March 15, 2026",
    location: "Lucknow, Uttar Pradesh",
    category: "Education",
    childrenHelped: 45,
  },
  {
    id: "2",
    title: "Medical Camp Reaches Remote Village",
    description: "Our mobile health unit traveled 8 hours to reach Malgaon village. 120 children received free checkups and medicines.",
    date: "March 10, 2026",
    location: "Nandurbar, Maharashtra",
    category: "Healthcare",
    childrenHelped: 120,
  },
  {
    id: "3",
    title: "New Home for 30 Street Children",
    description: "With your support, we've renovated a safe shelter. These children now have beds, hot meals, and caring environment.",
    date: "March 5, 2026",
    location: "Indore, Madhya Pradesh",
    category: "Shelter",
    childrenHelped: 30,
  },
  {
    id: "4",
    title: "Mid-Day Meal Program Expanded",
    description: "We've added 15 new schools to our nutrition program. Now 2,500 children receive hot, nutritious meals daily.",
    date: "February 28, 2026",
    location: "Bhubaneswar, Odisha",
    category: "Nutrition",
    childrenHelped: 2500,
  },
  {
    id: "5",
    title: "Emergency Relief for Flood Victims",
    description: "Severe floods displaced 500 families. Our team distributed food packets, blankets, and hygiene kits within 24 hours.",
    date: "February 20, 2026",
    location: "Silchar, Assam",
    category: "Emergency",
    childrenHelped: 800,
  },
  {
    id: "6",
    title: "Art Therapy Heals Young Minds",
    description: "Through our weekly art sessions, children who survived trauma are finding their voice and expressing themselves.",
    date: "February 15, 2026",
    location: "Ranchi, Jharkhand",
    category: "Education",
    childrenHelped: 60,
  },
  {
    id: "7",
    title: "Clean Water Initiative Success",
    description: "Installed 10 water purification systems in rural schools, giving 2,000 children access to safe drinking water.",
    date: "February 10, 2026",
    location: "Jodhpur, Rajasthan",
    category: "Healthcare",
    childrenHelped: 2000,
  },
  {
    id: "8",
    title: "Winter Clothing Distribution",
    description: "Distributed warm blankets, sweaters, and socks to 500 children across 8 villages before the cold wave hit.",
    date: "February 5, 2026",
    location: "Shimla, Himachal Pradesh",
    category: "Emergency",
    childrenHelped: 500,
  },
  {
    id: "9",
    title: "Vocational Training for Teens",
    description: "Started tailoring and computer courses for 50 teenagers to help them become self-reliant and independent.",
    date: "January 28, 2026",
    location: "Patna, Bihar",
    category: "Education",
    childrenHelped: 50,
  },
];

const CATEGORIES: Category[] = ["All", "Education", "Healthcare", "Shelter", "Nutrition", "Emergency"];

const CATEGORY_ICON = {
  All: Heart,
  Education: BookOpen,
  Healthcare: Stethoscope,
  Shelter: Home,
  Nutrition: Apple,
  Emergency: Flame,
};

const CATEGORY_COLOR = {
  All: "#8B235E",
  Education: "#8B235E",
  Healthcare: "#009270",
  Shelter: "#8B235E",
  Nutrition: "#009270",
  Emergency: "#E74C3C",
};

const CATEGORY_BG = {
  All: "#F3E8F0",
  Education: "#F3E8F0",
  Healthcare: "#E0F5F0",
  Shelter: "#F3E8F0",
  Nutrition: "#E0F5F0",
  Emergency: "#FDEDEC",
};

// ─── Simple Card Component ────────────────────────────────────────────────────

const StoryCard = ({ story }: { story: Story }) => {
  const Icon = CATEGORY_ICON[story.category];
  const color = CATEGORY_COLOR[story.category];
  const bgColor = CATEGORY_BG[story.category];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div 
          className="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: bgColor, color: color }}
        >
          <Icon size={12} />
          <span>{story.category}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Calendar size={12} />
          <span>{story.date}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800 mb-2 leading-snug">
        {story.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
        {story.description}
      </p>

      {/* Meta Info */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {story.location.split(',')[0]}
          </span>
          <span className="flex items-center gap-1 text-[#009270] font-medium">
            <Users size={12} />
            {story.childrenHelped.toLocaleString()} helped
          </span>
        </div>
        <Link 
          href={`/field-updates/${story.id}`}
          className="text-sm font-medium flex items-center gap-1 transition-all hover:gap-2"
          style={{ color: color }}
        >
          Read <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const FieldUpdatesPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStories = STORIES.filter((story) => {
    const matchCategory = activeCategory === "All" || story.category === activeCategory;
    const matchSearch = 
      searchQuery === "" ||
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalChildrenHelped = filteredStories.reduce((sum, story) => sum + story.childrenHelped, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Heart className="w-10 h-10 text-[#8B235E] mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Field Updates
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Real stories of impact from our work with children across India
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Stats Bar */}
        <div className="bg-gradient-to-r from-[#8B235E]/5 to-[#009270]/5 rounded-xl p-4 mb-8">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <div className="text-2xl font-bold text-[#8B235E]">{filteredStories.length}</div>
              <div className="text-xs text-gray-500">Stories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#009270]">{totalChildrenHelped.toLocaleString()}+</div>
              <div className="text-xs text-gray-500">Children Helped</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#8B235E]">{STORIES.length}</div>
              <div className="text-xs text-gray-500">Total Updates</div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICON[cat];
                const isActive = activeCategory === cat;
                const color = CATEGORY_COLOR[cat];
                const bgColor = CATEGORY_BG[cat];
                
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      isActive 
                        ? "text-white" 
                        : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                    }`}
                    style={isActive ? { backgroundColor: color } : {}}
                  >
                    <Icon size={14} />
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8B235E]/20 focus:border-[#8B235E] w-full sm:w-64 bg-white"
            />
          </div>

          {/* Active Filter Hint */}
          {(activeCategory !== "All" || searchQuery) && (
            <div className="mt-3 text-sm text-gray-500">
              Showing {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'}
              {activeCategory !== "All" && ` in ${activeCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
              <button
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="ml-2 text-[#8B235E] text-xs underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Cards Grid */}
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No stories found</p>
            <button
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="mt-2 text-[#8B235E] text-sm underline"
            >
              View all stories
            </button>
          </div>
        )}

        {/* Simple Footer Note */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          Every story represents real children whose lives are changing because of your support
        </div>
      </div>
    </main>
  );
};

export default FieldUpdatesPage;