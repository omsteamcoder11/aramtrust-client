// app/employment/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Into Employment | ChildSave India",
  description:
    "ChildSave's Into Employment program prepares young people in India for sustainable careers through technical training, life skills, and job placement support.",
};

export default function EmploymentPage() {
  const programComponents = [
    {
      title: "Technical Training",
      description:
        "Scholarships for college or vocational education to prepare young people for the local job market.",
      icon: "🎓",
    },
    {
      title: "Career Readiness",
      description:
        "Individual support from staff to create résumés, practice interviewing, and connect with employers.",
      icon: "📄",
    },
    {
      title: "Life Skills",
      description:
        "Youth become confident, strong communicators and value-driven team players.",
      icon: "💪",
    },
    {
      title: "Job Placement",
      description:
        "We help place our youth in jobs with local companies and provide guidance as they begin careers.",
      icon: "🤝",
    },
    {
      title: "Entrepreneurship",
      description:
        "Training on business fundamentals for youth interested in launching small-scale ventures.",
      icon: "💡",
    },
  ];

  const countries = [
    { name: "Colombia", since: 2013 },
    { name: "Dominican Republic", since: 2011 },
    { name: "Ecuador", since: 2013 },
    { name: "Guatemala", since: 2011 },
    { name: "Honduras", since: 2009 },
    { name: "India", since: 2014, highlighted: true },
    { name: "Mexico", since: 2014 },
    { name: "Philippines", since: 2009 },
    { name: "Zambia", since: 2015 },
  ];

  const stats = [
    { value: "500+", label: "Youth Trained Annually" },
    { value: "75%", label: "Hired in 6 Months" },
    { value: "40+", label: "Employer Partners" },
  ];

  // Logo-matched colors
  const MAROON = "#7B1F5E";
  const GREEN = "#1A7A4A";
  const CREAM = "#FAF7F2";
  const CREAM2 = "#F3EDE4";
  const TEXT = "#1C1C1C";
  const MUTED = "#6B6560";

  return (
    <main style={{ background: CREAM, color: TEXT, fontFamily: "'Arial', sans-serif" }}>

      {/* ── HERO: simple rectangle, no drama ─────────────────── */}
      <section
        style={{
          background: MAROON,
          padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.2rem, 5vw, 5rem)",
        }}
      >
        <div style={{ maxWidth: "900px" }}>
          <p
            style={{
              fontSize: "clamp(0.7rem, 1.1vw, 0.8rem)",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 0.9rem",
            }}
          >
            Change a Generation
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5.5vw, 4rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              margin: "0 0 1.2rem",
            }}
          >
            Into Employment<span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>®</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.75,
              maxWidth: "580px",
              margin: 0,
            }}
          >
            Our programs prepare young people to fill the needs of local job
            markets. Scholarships provide access to college, technical training,
            job readiness and life skills.
          </p>
        </div>
      </section>

      {/* ── PULL QUOTE ───────────────────────────────────────── */}
      <section
        style={{
          background: CREAM2,
          borderLeft: `5px solid ${GREEN}`,
          padding: "clamp(1.8rem, 4vw, 3rem) clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.7vw, 1.15rem)",
            color: TEXT,
            lineHeight: 1.75,
            maxWidth: "780px",
            margin: "0 auto",
            fontStyle: "italic",
          }}
        >
          Into Employment provides young people the coaching, 21st-century life
          skills and job-placement support to find — and compete for — careers
          in their communities.
        </p>
      </section>

      {/* ── PROGRAM COMPONENTS ───────────────────────────────── */}
      <section style={{ background: CREAM, padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.2rem, 5vw, 5rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: MAROON,
              marginBottom: "1.8rem",
            }}
          >
            Program Components
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: "1px",
              background: "#DDD6CE",
              border: "1px solid #DDD6CE",
            }}
          >
            {programComponents.map((c) => (
              <div
                key={c.title}
                style={{
                  background: "#fff",
                  padding: "clamp(1.4rem, 2.5vw, 2rem)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  borderTop: `3px solid ${MAROON}`,
                }}
              >
                <div style={{ fontSize: "1.8rem" }}>{c.icon}</div>
                <h3
                  style={{
                    fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: MAROON,
                    margin: 0,
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(0.78rem, 1.1vw, 0.88rem)",
                    color: MUTED,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETAILED OFFERINGS ───────────────────────────────── */}
      <section style={{ background: CREAM2, padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.2rem, 5vw, 5rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: GREEN,
              marginBottom: "1.8rem",
            }}
          >
            Into Employment Provides
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1px",
              background: "#DDD6CE",
              border: "1px solid #DDD6CE",
            }}
          >
            {[
              { title: "Technical Training", desc: "Scholarships for college or vocational education to prepare youth for the job market.", icon: "🎓" },
              { title: "Life Skills", desc: "Become confident, strong communicators and value-driven team players.", icon: "💪" },
              { title: "Career Readiness", desc: "Support to create résumés, practice interviewing, and search for jobs.", icon: "📄" },
              { title: "Job Placement", desc: "We help place our youth in jobs and provide guidance as they begin their careers.", icon: "🤝" },
              { title: "Entrepreneurship", desc: "Training on business fundamentals for youth interested in launching small-scale ventures.", icon: "💡" },
            ].map((item, i) => (
              <div
                key={item.title}
                style={{
                  background: "#fff",
                  padding: "clamp(1.4rem, 2.5vw, 2rem)",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  gridColumn: i === 4 ? "1 / -1" : undefined,
                  borderLeft: `3px solid ${GREEN}`,
                }}
              >
                <span style={{ fontSize: "1.6rem", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                <div>
                  <h3
                    style={{
                      fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: TEXT,
                      margin: "0 0 0.4rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.78rem, 1.1vw, 0.88rem)",
                      color: MUTED,
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDIA STATS ──────────────────────────────────────── */}
      <section style={{ background: CREAM, padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.2rem, 5vw, 5rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: MAROON,
              marginBottom: "1.8rem",
            }}
          >
            Into Employment in India
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1px",
              background: "#DDD6CE",
              border: "1px solid #DDD6CE",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#fff",
                  padding: "clamp(1.8rem, 3.5vw, 2.8rem) clamp(1.2rem, 2.5vw, 2rem)",
                  textAlign: "center",
                  borderBottom: `3px solid ${MAROON}`,
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                    fontWeight: 800,
                    color: MAROON,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    marginTop: "0.7rem",
                    fontSize: "clamp(0.72rem, 1.1vw, 0.82rem)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.13em",
                    color: MUTED,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL PRESENCE ──────────────────────────────────── */}
      <section style={{ background: CREAM2, padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.2rem, 5vw, 5rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: GREEN,
              marginBottom: "1.8rem",
            }}
          >
            Global Presence, Local Leadership
          </h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {countries.map((country) => (
              <span
                key={country.name}
                style={{
                  background: country.highlighted ? MAROON : "#fff",
                  color: country.highlighted ? "#fff" : TEXT,
                  border: `1px solid ${country.highlighted ? MAROON : "#CCC5BC"}`,
                  padding: "0.45rem 1rem",
                  fontSize: "clamp(0.75rem, 1.1vw, 0.85rem)",
                  fontWeight: country.highlighted ? 700 : 400,
                  letterSpacing: "0.03em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                {country.name}
                {country.since && (
                  <span style={{ opacity: 0.5, fontSize: "0.8em" }}>
                    ({country.since})
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section
        style={{
          background: "#fff",
          borderTop: `4px solid ${GREEN}`,
          padding: "clamp(2.5rem, 5vw, 4.5rem) clamp(1.2rem, 5vw, 5rem)",
        }}
      >
        <div style={{ maxWidth: "680px" }}>
          <h3
            style={{
              fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)",
              fontWeight: 800,
              color: TEXT,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              margin: "0 0 0.9rem",
            }}
          >
            Invest in a young person's future.
          </h3>
          <p
            style={{
              fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
              color: MUTED,
              lineHeight: 1.75,
              margin: "0 0 2rem",
              maxWidth: "520px",
            }}
          >
            Help young people gain the skills they need to secure sustainable
            employment and break the cycle of poverty.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            
            <a  href="/donate"
              style={{
                background: MAROON,
                color: "#fff",
                padding: "0.85rem 2.2rem",
                fontWeight: 700,
                fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Support Into Employment
            </a>
            
            <a  href="/contact"
              style={{
                background: "transparent",
                color: GREEN,
                padding: "0.85rem 2.2rem",
                fontWeight: 700,
                fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
                border: `1.5px solid ${GREEN}`,
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