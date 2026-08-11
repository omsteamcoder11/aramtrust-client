"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

/* ── Leaf SVG (replacing Diya for Aram Trust) ── */
const LeafIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M20 34C20 34 8 26 8 16C8 9.37258 13.3726 4 20 4C26.6274 4 32 9.37258 32 16C32 26 20 34 20 34Z"
      fill="#10B981"
      opacity="0.2"
    />
    <path
      d="M20 34C20 34 10 24 10 16C10 10.4772 14.4772 6 20 6C25.5228 6 30 10.4772 30 16C30 24 20 34 20 34Z"
      fill="#059669"
    />
    <path
      d="M20 34V12M20 18L25 14M20 23L26 19M20 22L15 18"
      stroke="#A7F3D0"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/* ── Theme tokens (Emerald Green Theme) ── */
const T = {
  emerald:       '#059669',
  emeraldDeep:   '#047857',
  mint:          '#10b981',
  mintLight:     '#a7f3d0',
  navText:       '#064e3b',
  navSubtle:     'rgba(4,120,87,0.45)',
  navMuted:      '#047857',
  footerBg:      '#f0fdf4',
  border:        '#a7f3d0',
};

/* ── Nav items — matches Header exactly ── */
const NAV_ITEMS = [
  {
    key: 'about', topText: 'LEARN', bottomText: 'ABOUT US',
    links: [
      { label: 'Mission & Vision', href: '/mission' },
      { label: 'Contact Us',       href: '/contact' },
    ],
  },
  {
    key: 'services', topText: 'OUR', bottomText: 'ACTIVITY',
    links: [
      { label: 'Annadhanam (Free Meals)', href: '/services/annadhanam' },
      { label: 'Education Aid',            href: '/services/education' },
    ],
  },
  {
    key: 'impact', topText: 'SEE OUR', bottomText: 'IMPACT',
    links: [
      { label: 'Testimonials', href: '/testimonials' },
    ],
  },
  {
    key: 'donate', topText: 'MAKE A', bottomText: 'DIFFERENCE',
    links: [
      { label: 'Donate Now',        href: '/donate' },
      { label: 'Volunteer With Us', href: '/volunteer' },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full" style={{ background: T.footerBg }}>

      {/* Top gradient accent */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg,${T.emerald},${T.mintLight},${T.mint})`,
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16">

          {/* ── LEFT: Brand + Contact + Social ── */}
          <div className="flex flex-col gap-6">

            {/* Logo */}
            <Link href="/"
              aria-label="Aram Trust"
              className="flex items-center gap-3 group w-fit"
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 12,
                background: 'rgba(5,150,105,0.08)',
                border: '1.5px solid rgba(5,150,105,0.20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 300ms cubic-bezier(0.34,1.56,0.64,1), background 200ms',
              }} className="group-hover:scale-105 group-hover:-rotate-2">
                <LeafIcon size={30} />
              </div>
              <div style={{ lineHeight: 1.25 }}>
                <p style={{ fontWeight: 900, fontSize: 16, letterSpacing: '-0.02em', textTransform: 'uppercase', margin: 0 }}>
                  <span style={{ color: T.navText }}>Aram </span>
                  <span style={{ color: T.emerald }}>Trust</span>
                </p>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.emeraldDeep, margin: 0 }}>
                  Serving The Community
                </p>
              </div>
            </Link>

            {/* Tagline */}
            <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.7, maxWidth: 260 }}>
              Dedicated to eliminating hunger, serving warm meals, and supporting vulnerable communities with compassion and care.
            </p>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { Icon: Mail,  href: 'mailto:aramtrustneyveli@gmail.com', text: 'aramtrustneyveli@gmail.com' },
                { Icon: Phone, href: 'tel:+919626608314',                  text: '+91 96266 08314' },
              ].map(({ Icon, href, text }) => (
                <a key={href} href={href}
                  className="hover:!text-emerald-600 transition-colors"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', fontSize: 13, color: '#4b5563' }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(5,150,105,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={13} style={{ color: T.emerald }} />
                  </div>
                  {text}
                </a>
              ))}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#4b5563' }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0, marginTop: 2,
                  background: 'rgba(5,150,105,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <MapPin size={13} style={{ color: T.emerald }} />
                </div>
                <span>Aram Trust,<br />Periyakurichi, Neyveli - 2,<br />Tamil Nadu, India</span>
              </div>
            </div>

          </div>

          {/* ── RIGHT: Nav columns ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {NAV_ITEMS.map((item) => (
              <div key={item.key}>
                {/* Column heading */}
                <div style={{ marginBottom: 14 }}>
                  <p style={{
                    fontSize: 9, fontWeight: 800, letterSpacing: '0.22em',
                    textTransform: 'uppercase', color: T.navSubtle, margin: 0,
                  }}>
                    {item.topText}
                  </p>
                  <p style={{
                    fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '-0.01em', color: T.navText, margin: '3px 0 8px',
                  }}>
                    {item.bottomText}
                  </p>
                  {/* Underline gradient */}
                  <div style={{
                    width: 28, height: 2, borderRadius: 2,
                    background: `linear-gradient(90deg,${T.emerald},${T.mintLight})`,
                  }} />
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}
                        className="group flex items-center gap-1.5 hover:!text-emerald-600 transition-colors"
                        style={{ fontSize: 12, fontWeight: 600, color: '#4b5563', textDecoration: 'none', letterSpacing: '0.03em' }}
                      >
                        <span style={{
                          display: 'inline-block', width: 0, height: 1.5, borderRadius: 2, flexShrink: 0,
                          background: T.emerald, transition: 'width 250ms ease',
                        }} className="group-hover:!w-2.5" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Newsletter ── */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${T.border}` }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: T.navText, display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
                <LeafIcon size={18} />
                Stay Updated
              </h3>
              <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
                Get the latest impact updates and meal drive stories from Aram Trust.
              </p>
            </div>
            <div style={{ display: 'flex', width: '100%', maxWidth: 360 }}>
              <input type="email" placeholder="Enter your email"
                style={{
                  flex: 1, padding: '10px 14px', fontSize: 13, outline: 'none',
                  background: '#fff', border: `1px solid ${T.border}`,
                  borderRight: 'none', color: T.navText,
                  borderRadius: '8px 0 0 8px',
                }}
              />
              <button style={{
                padding: '10px 20px', fontSize: 11, fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '0.08em',
                color: '#fff', border: 'none', cursor: 'pointer', flexShrink: 0,
                background: `linear-gradient(135deg,${T.emerald},${T.emeraldDeep})`,
                borderRadius: '0 8px 8px 0',
                boxShadow: '0 2px 10px rgba(5,150,105,0.30)',
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ marginTop: 28, paddingTop: 22, borderTop: `1px solid ${T.border}` }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: 10, color: '#6b7280', margin: 0 }}>
            © {currentYear} Aram Trust · All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Sitemap'].map(label => (
              <a key={label} href="#"
                className="hover:text-emerald-600 transition-colors"
                style={{ fontSize: 10, color: '#6b7280', textDecoration: 'none' }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}