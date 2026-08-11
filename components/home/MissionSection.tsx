"use client";

import React, { useRef } from "react";
import { Heart, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const AboutMissionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: false });

  return (
    <section
      ref={ref}
      className="w-full py-20 px-5"
      style={{ background: "#f0fdf4" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT — Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="relative rounded-2xl overflow-hidden shadow-sm"
              style={{ height: 400 }}
            >
              <Image
                src="/images/about-seva.webp"
                alt="Community food distribution"
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(4,120,87,0.4) 0%, transparent 55%)",
                }}
              />
            </div>
          </motion.div>

          {/* RIGHT — Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Small label */}
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#059669" }}
            >
              About Us
            </p>

            {/* Main Heading */}
            <h2
              className="text-2xl md:text-3xl font-semibold leading-snug"
              style={{ color: "#111827", fontFamily: "Georgia, serif" }}
            >
              Aram Trust <br />
              Ending the struggle for food and basic necessities.
            </h2>

            {/* Paragraph 1 */}
            <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>
              Aram Trust aims at ending the struggle for food for the poor, needy, and sick. 
              We are dedicated to providing essential basic necessities because we believe 
              that true community upliftment and encouragement pave the way for a better, 
              more compassionate society.
            </p>

            {/* Paragraph 2 */}
            <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>
              Our goal is to support vulnerable families with everything required for sustainable 
              and happy livelihoods. We are actively expanding the reach of our food distribution 
              program to serve larger communities, introducing fresh produce and culturally appropriate 
              meals to meet diverse dietary needs.
            </p>

            {/* Highlight quote */}
            <p
              className="text-sm italic leading-relaxed pl-4"
              style={{
                color: "#047857",
                borderLeft: "3px solid #A7F3D0",
              }}
            >
              "Empowering lives and nourishing communities for a sustainable and happier future."
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm transition-all hover:opacity-90 shadow-sm"
                style={{ background: "#059669" }}
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                Donate Now
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:bg-emerald-50"
                style={{
                  border: "1.5px solid #059669",
                  color: "#059669",
                  background: "transparent",
                }}
              >
                <Users className="w-3.5 h-3.5" />
                Get Involved
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutMissionSection;