"use client";

import { CHILDREN } from '@/app/data/children';
import Link from "next/link";

export default function ChangeLife() {
  const children = CHILDREN.slice(0, 3);

  return (
    <section className="bg-[#eaf6ff] py-16 sm:py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <h2 className="text-4xl md:text-5xl font-black text-center mb-14 text-gray-900">
          Make a Difference Today ❤️
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {children.map((child, index) => (
            <div
              key={child.id}
              className="relative rounded-3xl overflow-hidden group h-[420px] shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* IMAGE */}
              <img
                src={child.image}
                alt={child.name}
                className="w-full h-full object-cover object-[center_30%] group-hover:scale-110 transition duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

              {/* BADGE */}
              {index === 0 && (
                <span className="absolute top-4 left-4 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow">
                  ❤️ Highest Impact
                </span>
              )}

              {/* CONTENT */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {child.name}
                </h3>

                <p className="text-white/80 text-sm mb-4">
                  {child.age} yrs • {child.location}
                </p>

                <Link
                  href="/sponsor-a-child"
                  className="block text-center bg-white text-[#2b6ef2] font-bold py-3 rounded-xl shadow-lg hover:scale-[1.03] transition"
                >
                  Sponsor a Child
                </Link>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}



