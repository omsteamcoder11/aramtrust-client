"use client";

import Link from "next/link";

const PILLS = ["🍲 Annadhanam Seva", "🤝 Community Care", "📦 Emergency Relief"];

const STATS = [
  { n: "10K+", l: "Meals Served" },
  { n: "500+", l: "Families Supported" },
  { n: "100%", l: "Transparent Seva" },
];

const SERVICES = [
  { icon: "🍲", title: "Daily Meal Drives", desc: "Distributing warm food to those in need" },
  { icon: "🪔", title: "Annadhanam Seva", desc: "Nourishing hungry souls with dignity" },
  { icon: "🤝", title: "Community Upliftment", desc: "Direct support for vulnerable families" },
];

export default function HeroSection() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fade-up {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .h-font { font-family: var(--font-cormorant, Georgia, serif); }
        .b-font { font-family: var(--font-outfit, system-ui, sans-serif); }

        .shimmer {
          background: linear-gradient(90deg,#059669 0%,#34d399 30%,#059669 60%,#047857 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .au1 { animation: fade-up .6s ease .05s both; }
        .au2 { animation: fade-up .6s ease .15s both; }
        .au3 { animation: fade-up .6s ease .25s both; }
        .au4 { animation: fade-up .6s ease .35s both; }
        .au5 { animation: fade-up .6s ease .45s both; }
        .au6 { animation: fade-up .6s ease .55s both; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 32px; border-radius: 100px;
          font-size: 14px; font-weight: 800;
          letter-spacing: 0.10em; text-transform: uppercase;
          text-decoration: none; color: #fff;
          background: linear-gradient(135deg,#059669,#047857);
          box-shadow: 0 3px 14px rgba(5,150,105,0.35);
          transition: transform 200ms, box-shadow 200ms;
          white-space: nowrap;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(5,150,105,0.50);
        }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 30px; border-radius: 100px;
          font-size: 14px; font-weight: 800;
          letter-spacing: 0.10em; text-transform: uppercase;
          text-decoration: none; color: #059669;
          border: 1.5px solid rgba(5,150,105,0.28);
          background: transparent;
          transition: background 200ms, border-color 200ms;
          white-space: nowrap;
        }
        .btn-ghost:hover {
          background: rgba(5,150,105,0.06);
          border-color: rgba(5,150,105,0.50);
        }

        .pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 18px; border-radius: 100px;
          font-size: 13px; font-weight: 700; color: #064e3b;
          border: 1px solid rgba(5,150,105,0.18);
          background: #fff;
          white-space: nowrap;
          list-style: none;
        }

        .stat-box {
          padding: 16px 26px; border-radius: 12px;
          background: #fff;
          border: 1px solid rgba(5,150,105,0.12);
          box-shadow: 0 2px 8px rgba(5,150,105,0.05);
          transition: transform 180ms;
        }
        .stat-box:hover { transform: translateY(-2px); }

        .svc-item {
          display: flex; align-items: center; gap: 12px;
          padding: 22px 20px;
          transition: background 180ms; cursor: default;
          list-style: none;
        }
        .svc-item:hover { background: rgba(255,255,255,0.10); }

        .hero-section {
          position: relative;
          overflow: hidden;
          background-image:
            radial-gradient(circle, rgba(5,150,105,0.16) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
          background-position: center top;
        }
        .hero-blob-1 {
          position: absolute;
          top: -160px; left: -140px;
          width: 480px; height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.20), transparent 70%);
          pointer-events: none;
        }
        .hero-blob-2 {
          position: absolute;
          bottom: -180px; right: -150px;
          width: 540px; height: 540px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(5,150,105,0.18), transparent 70%);
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
        }
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          margin: 0; padding: 0;
        }
        .pills-list { margin: 0; padding: 0; }

        @media (max-width: 900px) {
          .svc-grid { grid-template-columns: 1fr; }
          .svc-item { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.12); }
          .svc-item:last-child { border-bottom: none; }
        }

        @media (max-width: 600px) {
          .pills-row { flex-wrap: wrap; }
          .btns-row  { flex-direction: column; width: 100%; }
          .btns-row a { justify-content: center; width: 100%; }
          .stats-row { gap: 14px; }
          .stat-box  { flex: 1; min-width: 100px; }
        }
      `}</style>

      {/* ── TOP ANNOUNCEMENT BAR ── */}
      <div style={{
        marginTop: 68,
        background: 'linear-gradient(90deg,#047857,#059669,#047857)',
        padding: '8px 16px', textAlign: 'center',
      }}>
        <p className="b-font" style={{
          color: '#fff', fontSize: 11, fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0,
        }}>
          <span aria-hidden="true">🌿</span> Aram Trust — Hunger Relief & Community Support Initiative <span aria-hidden="true">🌿</span>
        </p>
      </div>

      <section className="b-font hero-section" style={{
        background: 'linear-gradient(160deg,#f0fdf4 0%,#ffffff 60%,#e6f4ea 100%)',
        borderBottom: '1px solid rgba(5,150,105,0.08)',
      }}>
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 20px 56px' }}>
          <div className="hero-inner">

            {/* Tag */}
            <div className="au1" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(5,150,105,0.07)',
              border: '1px solid rgba(5,150,105,0.18)',
              borderRadius: 100, padding: '7px 18px 7px 8px',
              marginBottom: 22,
            }}>
              <span aria-hidden="true" style={{
                background: 'linear-gradient(135deg,#059669,#10b981)',
                borderRadius: '50%', width: 28, height: 28,
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 14,
              }}>🍃</span>
              <span style={{
                fontSize: 12, fontWeight: 800,
                letterSpacing: '0.16em', textTransform: 'uppercase', color: '#059669',
              }}>Community Service & Welfare</span>
            </div>

            {/* Headline */}
            <h1 className="au2 h-font" style={{
              fontSize: 'clamp(34px, 5.2vw, 64px)',
              lineHeight: 1.08, margin: '0 0 22px', color: '#064e3b', fontWeight: 700,
            }}>
              Eradicating Hunger<br />
              With Warmth &amp; <span className="shimmer">Compassion.</span>
            </h1>

            {/* Description */}
            <p className="au3" style={{
              fontSize: 'clamp(15px, 1.9vw, 20px)',
              color: '#047857', lineHeight: 1.7,
              margin: '0 auto 30px', maxWidth: 620, fontWeight: 500,
            }}>
              Aram Trust is committed to ensuring no one goes to bed hungry. We serve hot, nutritious meals and provide vital aid to communities in need.
            </p>

            {/* Pills */}
            <ul className="au4 pills-row pills-list" style={{
              display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 32, flexWrap: 'wrap',
            }}>
              {PILLS.map(p => (
                <li key={p} className="pill">{p}</li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="au5 btns-row" style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 30, flexWrap: 'wrap' }}>
              <Link href="/donate" className="btn-primary">
                <span aria-hidden="true">💚</span> Sponsor a Meal
              </Link>
              <Link href="/services/food" className="btn-ghost">Our Programs →</Link>
            </div>

            {/* Stats */}
            <div className="au6 stats-row" style={{
              display: 'flex', justifyContent: 'center', gap: 16,
              paddingTop: 24,
              marginTop: 24,
              borderTop: '1px solid rgba(5,150,105,0.15)',
              flexWrap: 'wrap',
            }}>
              {STATS.map(s => (
                <div key={s.l} className="stat-box">
                  <p className="h-font" style={{
                    fontSize: 32, fontWeight: 900,
                    color: '#059669', margin: 0, lineHeight: 1,
                  }}>{s.n}</p>
                  <p style={{
                    fontSize: 12, fontWeight: 600, color: '#047857',
                    margin: '5px 0 0', letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                  }}>{s.l}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── SERVICES STRIP ── */}
      <div style={{ background: 'linear-gradient(135deg,#059669,#047857)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ul className="svc-grid">
            {SERVICES.map((s, i) => (
              <li key={s.title} className="svc-item b-font" style={{
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                justifyContent: 'center',
              }}>
                <span aria-hidden="true" style={{
                  fontSize: 24, background: 'rgba(255,255,255,0.14)',
                  borderRadius: 10, padding: 10, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{s.icon}</span>
                <div>
                  <p style={{ color: '#fff', fontSize: 14, fontWeight: 800, margin: 0 }}>
                    {s.title}
                  </p>
                  <p style={{
                    color: 'rgba(255,255,255,0.78)', fontSize: 12,
                    margin: '3px 0 0', fontWeight: 500,
                  }}>{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}