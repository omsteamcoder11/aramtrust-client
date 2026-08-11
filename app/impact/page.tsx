// app/into-employment/impact/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Into Employment Impact | ChildSave India",
  description:
    "See how your support helps young people in India gain sustainable employment, break the cycle of poverty, and transform their communities.",
};

// ── Design tokens (matches logo + Employment page) ──────────
const T = {
  maroon:  "#7B1F5E",
  green:   "#1A7A4A",
  cream:   "#FAF7F2",
  cream2:  "#F3EDE4",
  white:   "#FFFFFF",
  text:    "#1C1C1C",
  muted:   "#6B6560",
  divider: "#DDD6CE",
} as const;

const BASE: React.CSSProperties = {
  fontFamily: "'Georgia', 'Times New Roman', serif",
  color: T.text,
};

const LABEL: React.CSSProperties = {
  fontFamily: "'Arial', sans-serif",
  fontSize: "clamp(0.68rem, 1vw, 0.78rem)",
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
};

const SECTION: React.CSSProperties = {
  padding: "clamp(2.5rem, 5vw, 4.5rem) clamp(1.2rem, 5vw, 5rem)",
};

// ── Components ───────────────────────────────────────────────
function SectionLabel({ children, color = T.maroon }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{ ...LABEL, color, margin: "0 0 0.8rem" }}>
      {children}
    </p>
  );
}

function StatCard({ number, label, description }: { number: string; label: string; description: string }) {
  return (
    <div
      style={{
        background: T.white,
        borderTop: `3px solid ${T.maroon}`,
        padding: "clamp(1.6rem, 3vw, 2.4rem) clamp(1.2rem, 2.5vw, 2rem)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
          fontWeight: 800,
          color: T.maroon,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontFamily: "'Arial', sans-serif",
        }}
      >
        {number}
      </div>
      <p
        style={{
          fontFamily: "'Arial', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
          color: T.text,
          margin: "0.6rem 0 0.3rem",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: "clamp(0.76rem, 1.1vw, 0.84rem)",
          color: T.muted,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function ImpactPage() {
  const industries = [
    "IT & Software", "Retail Sales", "Hospitality", "Call Centers",
    "Accounting", "Construction", "Electronics", "Beauty & Wellness",
    "Electrical", "Welding", "Entrepreneurship",
  ];

  return (
    <main style={{ ...BASE, background: T.cream, overflowX: "hidden" }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ background: T.maroon, ...SECTION }}>
        <div style={{ maxWidth: "860px" }}>
          <p style={{ ...LABEL, color: "rgba(255,255,255,0.55)", margin: "0 0 1rem" }}>
            Transform Future Generations
          </p>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4.5vw, 3.4rem)",
              fontWeight: 800,
              color: T.white,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              margin: "0 0 1.2rem",
            }}
          >
            Independence. Financial stability.
            <br />
            It starts here.
          </h1>
          <p
            style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
              color: "rgba(255,255,255,0.76)",
              lineHeight: 1.78,
              maxWidth: "600px",
              margin: 0,
            }}
          >
            Into Employment® extends the ripple started through our foundational
            programs by helping young people find sustainable, long-term and
            successful careers. Our youth graduate with the financial ability
            to support their families and change their communities.
          </p>
        </div>
      </section>

      {/* ── REPORT CALLOUT ───────────────────────────────── */}
      <section
        style={{
          background: T.cream2,
          borderLeft: `5px solid ${T.green}`,
          padding: "clamp(1.4rem, 3vw, 2rem) clamp(1.2rem, 5vw, 5rem)",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <p style={{ ...LABEL, color: T.green, margin: "0 0 0.4rem" }}>
              Latest Publication
            </p>
            <h2
              style={{
                fontSize: "clamp(1rem, 2vw, 1.3rem)",
                fontWeight: 700,
                color: T.text,
                margin: "0 0 0.3rem",
                fontFamily: "'Arial', sans-serif",
              }}
            >
              Into Employment Impact Report
            </h2>
            <p
              style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: "clamp(0.78rem, 1.2vw, 0.88rem)",
                color: T.muted,
                margin: 0,
              }}
            >
              Discover how your generosity is igniting hope and opportunity
              for young people across India.
            </p>
          </div>
          
          <a  href="#"
            style={{
              background: T.maroon,
              color: T.white,
              padding: "0.7rem 1.6rem",
              fontFamily: "'Arial', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.76rem, 1.1vw, 0.84rem)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              whiteSpace: "nowrap" as const,
              flexShrink: 0,
            }}
          >
            Read the Report <span>↗</span>
          </a>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section style={{ background: T.cream, ...SECTION }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionLabel>Your Support in Numbers</SectionLabel>
          <h2
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              fontWeight: 700,
              color: T.text,
              margin: "0 0 2rem",
              maxWidth: "520px",
              lineHeight: 1.3,
            }}
          >
            Your support impacts thousands of lives
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1px",
              background: T.divider,
              border: `1px solid ${T.divider}`,
            }}
          >
            <StatCard number="8,200+" label="Youth Trained" description="across India since 2014" />
            <StatCard number="74%" label="Find Jobs Within 6 Months" description="of program completion" />
            <StatCard number="2.5×" label="Average Income Increase" description="for participating families" />
          </div>
        </div>
      </section>

      {/* ── OPPORTUNITY + EQUITY ─────────────────────────── */}
      <section style={{ background: T.cream2, ...SECTION }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: T.divider,
            border: `1px solid ${T.divider}`,
          }}
        >
          {/* Left */}
          <div style={{ background: T.white, padding: "clamp(1.8rem, 3.5vw, 3rem)", borderTop: `3px solid ${T.green}` }}>
            <SectionLabel color={T.green}>Opportunity</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                fontWeight: 700,
                color: T.text,
                margin: "0 0 1rem",
                fontFamily: "'Arial', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Opportunity transforms futures
            </h2>
            <p
              style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
                color: T.muted,
                lineHeight: 1.78,
                margin: "0 0 1rem",
              }}
            >
              While unemployment and underemployment remain core causes of
              poverty, stable work unlocks opportunities, promotes sustained
              and inclusive economic growth, and can double or triple a
              family's income.
            </p>
            <p
              style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
                color: T.muted,
                lineHeight: 1.78,
                margin: 0,
              }}
            >
              Your donations to Into Employment ensure more access to critical
              resources and support as young people transition from childhood
              to adulthood. Opportunity can begin a new family legacy.
            </p>
          </div>

          {/* Right */}
          <div style={{ background: T.white, padding: "clamp(1.8rem, 3.5vw, 3rem)", borderTop: `3px solid ${T.maroon}` }}>
            <SectionLabel>Economic Equity</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                fontWeight: 700,
                color: T.text,
                margin: "0 0 1rem",
                fontFamily: "'Arial', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Investing in economic equity
            </h2>
            <p
              style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
                color: T.muted,
                lineHeight: 1.78,
                margin: "0 0 1rem",
              }}
            >
              With a gift to Into Employment, you're investing in young
              people's — especially women's — futures.
            </p>
            <p
              style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
                color: T.muted,
                lineHeight: 1.78,
                margin: "0 0 1rem",
              }}
            >
              Young women have historically been pulled from education to
              tend to their families. Globally, young men are almost 1.5
              times more likely to be employed than young women.
            </p>
            <div
              style={{
                background: T.cream2,
                borderLeft: `4px solid ${T.maroon}`,
                padding: "0.9rem 1.2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'Arial', sans-serif",
                  fontSize: "clamp(0.84rem, 1.2vw, 0.94rem)",
                  color: T.maroon,
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                68% of our participants are women — your investment is
                supporting a fairer future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────── */}
      <section style={{ background: T.cream, ...SECTION }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <div
            style={{
              borderLeft: `5px solid ${T.green}`,
              paddingLeft: "clamp(1.2rem, 3vw, 2.5rem)",
            }}
          >
            <p
              style={{
                fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
                color: T.text,
                fontStyle: "italic",
                lineHeight: 1.75,
                margin: "0 0 1.2rem",
              }}
            >
              "Thank you to everyone who came together to help children like
              Kavya make their dreams come true."
            </p>
            <p
              style={{
                fontFamily: "'Arial', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(0.8rem, 1.1vw, 0.88rem)",
                color: T.text,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: "0 0 0.2rem",
              }}
            >
              — Sunita, Kavya's mother
            </p>
            <p
              style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: "clamp(0.76rem, 1.1vw, 0.84rem)",
                color: T.muted,
                margin: 0,
              }}
            >
              Kavya, 21, is now in her final year of college, studying to
              become a software developer.
            </p>
          </div>
        </div>
      </section>

      {/* ── GRADUATE STORY ───────────────────────────────── */}
      <section style={{ background: T.cream2, ...SECTION }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: T.divider,
            border: `1px solid ${T.divider}`,
          }}
        >
          {/* Story text */}
          <div style={{ background: T.white, padding: "clamp(1.8rem, 3.5vw, 3rem)", borderTop: `3px solid ${T.maroon}` }}>
            <SectionLabel>Graduate Story</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(1rem, 1.9vw, 1.25rem)",
                fontWeight: 700,
                color: T.text,
                lineHeight: 1.45,
                margin: "0 0 0.9rem",
                fontStyle: "italic",
              }}
            >
              "I believe in ChildSave youth. Everyone should have the same
              opportunities to progress."
            </h2>
            <p
              style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: "clamp(0.78rem, 1.1vw, 0.86rem)",
                color: T.maroon,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: "0 0 1.2rem",
              }}
            >
              — Arjun Mehta, program graduate, business owner, employer partner
            </p>
            <p
              style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
                color: T.muted,
                lineHeight: 1.78,
                margin: "0 0 0.9rem",
              }}
            >
              Arjun Mehta, 29, owns a digital marketing agency in Pune and is
              a ChildSave graduate. He maintains ties to ChildSave by
              partnering with us to provide internships and employment to
              Into Employment participants.
            </p>
            <p
              style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
                color: T.muted,
                lineHeight: 1.78,
                margin: 0,
              }}
            >
              Arjun's story is a testament to the ripple effect: A child in
              poverty is supported through our programs. Not only does he
              achieve financial stability, but he also invests in other young
              adults who see him as a role model for rising out of poverty.
            </p>
          </div>

          {/* Pull stat */}
          <div
            style={{
              background: T.maroon,
              padding: "clamp(1.8rem, 3.5vw, 3rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1.4rem",
            }}
          >
            <p style={{ ...LABEL, color: "rgba(255,255,255,0.5)", margin: 0 }}>
              The Ripple Effect
            </p>
            <p
              style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
                color: "rgba(255,255,255,0.88)",
                lineHeight: 1.75,
                fontStyle: "italic",
                margin: 0,
              }}
            >
              With the right skills and opportunities, our graduates become
              contributors to their communities and mentors for the next
              generation.
            </p>
            <div
              style={{
                width: "48px",
                height: "3px",
                background: T.green,
              }}
            />
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────── */}
      <section style={{ background: T.cream, ...SECTION }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionLabel color={T.green}>Career Placement</SectionLabel>
          <h2
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              fontWeight: 700,
              color: T.text,
              margin: "0 0 0.6rem",
              lineHeight: 1.3,
            }}
          >
            Impact across industry verticals
          </h2>
          <p
            style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: "clamp(0.82rem, 1.3vw, 0.94rem)",
              color: T.muted,
              lineHeight: 1.7,
              margin: "0 0 1.8rem",
              maxWidth: "540px",
            }}
          >
            Your support upskills young people for career placements across a
            wide swath of industries in India.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {[
              "IT & Software", "Retail Sales", "Hospitality", "Call Centers",
              "Accounting", "Construction", "Electronics", "Beauty & Wellness",
              "Electrical", "Welding", "Entrepreneurship",
            ].map((industry, i) => (
              <span
                key={industry}
                style={{
                  background: i % 3 === 0 ? T.maroon : T.white,
                  color: i % 3 === 0 ? T.white : T.text,
                  border: `1px solid ${i % 3 === 0 ? T.maroon : T.divider}`,
                  padding: "0.42rem 1rem",
                  fontFamily: "'Arial', sans-serif",
                  fontWeight: i % 3 === 0 ? 700 : 400,
                  fontSize: "clamp(0.74rem, 1.1vw, 0.84rem)",
                  letterSpacing: "0.03em",
                }}
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section
        style={{
          background: T.white,
          borderTop: `4px solid ${T.green}`,
          ...SECTION,
        }}
      >
        <div style={{ maxWidth: "640px" }}>
          <SectionLabel color={T.green}>Be a Part of the Solution</SectionLabel>
          <h3
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
              fontWeight: 800,
              color: T.text,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              margin: "0 0 0.9rem",
            }}
          >
            Help build a brighter future.
          </h3>
          <p
            style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: "clamp(0.86rem, 1.4vw, 0.98rem)",
              color: T.muted,
              lineHeight: 1.78,
              margin: "0 0 2rem",
              maxWidth: "500px",
            }}
          >
            Your gift to Into Employment helps young people gain the skills,
            confidence, and connections they need to build a brighter future.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            
            <a  href="/donate?program=into-employment"
              style={{
                background: T.maroon,
                color: T.white,
                padding: "0.85rem 2.2rem",
                fontFamily: "'Arial', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(0.78rem, 1.1vw, 0.88rem)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Donate to Into Employment
            </a>
            
            <a  href="/contact"
              style={{
                background: "transparent",
                color: T.green,
                padding: "0.85rem 2.2rem",
                fontFamily: "'Arial', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(0.78rem, 1.1vw, 0.88rem)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
                border: `1.5px solid ${T.green}`,
              }}
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}