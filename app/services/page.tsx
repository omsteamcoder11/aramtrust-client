"use client";

import Link from "next/link";

const T = {
  saffron:     "#ea580c",
  saffronDeep: "#c2410c",
  gold:        "#d97706",
};

const SERVICES = [
  {
    image:       "/services/construction.jpg",
    emoji:       "🏗️",
    title:       "Temple Construction",
    description: "Contributing to the building and renovation of the sacred temple complex — a permanent legacy of faith and devotion for generations to come.",
    stats:       [
      { value: "1",    label: "Temple Project" },
      { value: "100+", label: "Donors" },
      { value: "10+",  label: "Years" },
    ],
    href: "/services/construction",
  },
  {
    image: "/home/annadhanam.png",
    emoji:       "🍱",
    title:       "Annadhanam",
    description: "Serving free meals to devotees and the poor every day. Vallalar taught that feeding the hungry is the highest form of worship.",
    stats:       [
      { value: "1000+", label: "Meals Served" },
      { value: "Daily", label: "Service" },
      { value: "All",   label: "Are Welcome" },
    ],
    href: "/services/annadhanam",
  },
  {
    image:       "/services/education.jpg",
    emoji:       "📚",
    title:       "Education Aid",
    description: "Supporting underprivileged children with school fees, books, and supplies — lighting the lamp of knowledge in the community.",
    stats:       [
      { value: "500+", label: "Children Helped" },
      { value: "10+",  label: "Years Active" },
      { value: "100%", label: "Goes to Cause" },
    ],
    href: "/services/education",
  },
];

export default function ServicesPage() {
  return (
    <main style={{ background: "#ffffff", overflowX: "hidden" }}>

      {/* ── Hero ── */}
      <section style={{
        background: "linear-gradient(160deg,#fff8f3 0%,#ffffff 60%,#fff5ee 100%)",
        borderBottom: "1px solid rgba(234,88,12,0.08)",
        padding: "100px 20px 48px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(234,88,12,0.07)",
            border: "1px solid rgba(234,88,12,0.18)",
            borderRadius: 100, padding: "5px 14px 5px 6px",
            marginBottom: 16,
          }}>
            <span style={{
              background: "linear-gradient(135deg,#ea580c,#d97706)",
              borderRadius: "50%", width: 24, height: 24,
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 12,
            }}>🪔</span>
            <span style={{
              fontSize: 10, fontWeight: 800,
              letterSpacing: "0.16em", textTransform: "uppercase", color: T.saffron,
            }}>What We Do</span>
          </div>

          <h1 style={{
            fontSize: "clamp(28px,4vw,48px)",
            fontWeight: 900, color: "#1c0a00",
            lineHeight: 1.1, margin: "0 0 16px",
          }}>
            Our Seva{" "}
            <span style={{
              background: `linear-gradient(135deg,${T.saffron},${T.gold})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Programs</span>
          </h1>

          <div style={{
            width: 56, height: 3, borderRadius: 2,
            margin: "0 auto 20px",
            background: `linear-gradient(90deg,${T.saffron},${T.gold})`,
          }} />

          <p style={{
            fontSize: "clamp(14px,1.6vw,17px)",
            color: "#92400e", lineHeight: 1.7,
            margin: "0 auto", fontWeight: 500,
          }}>
            Rooted in the teachings of Vallalar — feeding the hungry,
            building the temple, and uplifting the community through
            selfless seva.
          </p>

        </div>
      </section>

      {/* ── Cards ── */}
      <section style={{
        background: "#fff8f3",
        padding: "56px 20px",
        borderBottom: "1px solid rgba(234,88,12,0.08)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 28,
        }}>
          {SERVICES.map((s) => (
            <div key={s.title} style={{
              background: "#ffffff",
              borderRadius: 24,
              border: "1px solid rgba(234,88,12,0.12)",
              boxShadow: "0 2px 16px rgba(234,88,12,0.06)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "transform 220ms, box-shadow 220ms",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(234,88,12,0.14)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(234,88,12,0.06)";
              }}
            >
              {/* ── Image ── */}
              <div style={{
                width: "100%", aspectRatio: "16/9",
                backgroundImage: `url('${s.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                backgroundColor: "rgba(234,88,12,0.08)",
              }}>
                {/* Gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top,rgba(28,10,0,0.55) 0%,transparent 60%)",
                }} />
                {/* Title on image */}
                <div style={{
                  position: "absolute", bottom: 14, left: 16,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 18,
                  }}>
                    {s.emoji}
                  </div>
                  <p style={{
                    color: "#fff", fontSize: 16,
                    fontWeight: 800, margin: 0,
                    textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                  }}>{s.title}</p>
                </div>
              </div>

              {/* ── Content ── */}
              <div style={{
                padding: "22px 24px 24px",
                flex: 1, display: "flex", flexDirection: "column",
              }}>

                <p style={{
                  fontSize: 14, color: "#92400e",
                  lineHeight: 1.7, margin: "0 0 20px",
                  fontWeight: 500, flex: 1,
                }}>
                  {s.description}
                </p>

                {/* Stats */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 8, marginBottom: 20,
                  padding: "14px 0",
                  borderTop: "1px solid rgba(234,88,12,0.08)",
                  borderBottom: "1px solid rgba(234,88,12,0.08)",
                }}>
                  {s.stats.map((st) => (
                    <div key={st.label} style={{ textAlign: "center" }}>
                      <p style={{
                        fontSize: 18, fontWeight: 900,
                        color: T.saffron, margin: 0, lineHeight: 1,
                      }}>{st.value}</p>
                      <p style={{
                        fontSize: 9, fontWeight: 600,
                        color: "#92400e", margin: "4px 0 0",
                        textTransform: "uppercase", letterSpacing: "0.06em",
                      }}>{st.label}</p>
                    </div>
                  ))}
                </div>

                {/* Learn More */}
                <Link href={s.href} style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8,
                  padding: "13px 20px", borderRadius: 100,
                  fontWeight: 800, fontSize: 12,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  color: "#ffffff", textDecoration: "none",
                  background: `linear-gradient(135deg,${T.saffron},${T.saffronDeep})`,
                  boxShadow: "0 2px 12px rgba(234,88,12,0.30)",
                  transition: "transform 200ms, box-shadow 200ms",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(234,88,12,0.45)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(234,88,12,0.30)";
                  }}
                >
                  Learn More →
                </Link>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{
        padding: "60px 20px",
        background: "#ffffff",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🙏</div>
          <h3 style={{
            fontSize: "clamp(22px,3vw,36px)",
            fontWeight: 900, color: "#1c0a00",
            margin: "0 0 12px",
          }}>
            Support Our{" "}
            <span style={{
              background: `linear-gradient(135deg,${T.saffron},${T.gold})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Seva Work</span>
          </h3>
          <div style={{
            width: 56, height: 3, borderRadius: 2,
            margin: "0 auto 16px",
            background: `linear-gradient(90deg,${T.saffron},${T.gold})`,
          }} />
          <p style={{
            fontSize: 15, color: "#92400e",
            lineHeight: 1.7, marginBottom: 28,
            fontWeight: 500,
          }}>
            Every contribution keeps our seva running. Be the reason
            someone eats today, learns tomorrow, and prays in a
            beautiful temple forever.
          </p>
          <div style={{
            display: "flex", gap: 12,
            justifyContent: "center", flexWrap: "wrap",
          }}>
            <Link href="/donate" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 28px", borderRadius: 100,
              fontWeight: 800, fontSize: 13,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: "#ffffff", textDecoration: "none",
              background: `linear-gradient(135deg,${T.saffron},${T.saffronDeep})`,
              boxShadow: "0 3px 14px rgba(234,88,12,0.35)",
            }}>
              🙏 Donate Now
            </Link>
            <Link href="/volunteer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 28px", borderRadius: 100,
              fontWeight: 800, fontSize: 13,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: T.saffron, textDecoration: "none",
              border: "1.5px solid rgba(234,88,12,0.30)",
              background: "transparent",
            }}>
              Volunteer With Us →
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

















