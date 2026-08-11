"use client";
import SupportModal from "./SupportModal"
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Heart, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  topText: string;
  bottomText: string;
  key: string;
  links: { label: string; href: string }[];
  align?: 'left' | 'center' | 'right';
}
interface DropdownLinkProps {
  label: string; href?: string; onClick?: () => void;
}
interface NavTriggerProps {
  topText: string; bottomText: string; isOpen: boolean;
  onClick: (e: React.MouseEvent) => void; id: string; controlsId: string;
}
interface MobileAccordionProps {
  title: string; children: React.ReactNode;
}
interface DropdownContainerProps {
  children: React.ReactNode; id: string; isOpen: boolean;
  align?: 'left' | 'center' | 'right';
}
interface NavItemWrapperProps {
  navKey: string; activeMenu: string | null;
  onOpen: (key: string) => void; onClose: () => void;
  children: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    key: 'about', topText: 'LEARN', bottomText: 'ABOUT US', align: 'left',
    links: [
      { label: 'MISSION & VISION', href: '/mission' },
      // { label: 'OUR HISTORY',      href: '/history' },
      // { label: 'OUR LEADERSHIP',   href: '/leadership' },
      { label: 'CONTACT US',       href: '/contact' },
    ],
  },
  {
    key: 'services', topText: 'OUR', bottomText: 'ACTIVITY', align: 'left',
    links: [
      // { label: 'TEMPLE CONSTRUCTION',  href: '/services/construction' },
      { label: 'ANNADHANAM (FREE MEALS)', href: '/services/annadhanam' },
      { label: 'EDUCATION AID',        href: '/services/education' },
      // { label: 'ALL SEVA PROGRAMS',    href: '/programs' },
    ],
  },
  {
    key: 'impact', topText: 'SEE OUR', bottomText: 'IMPACT', align: 'center',
    links: [
      // { label: 'SUCCESS STORIES', href: '/stories' },
      // { label: 'GALLERY & MEDIA', href: '/gallery' },
      { label: 'TESTIMONIALS',    href: '/testimonials' },
    ],
  },
  {
    key: 'donate', topText: 'MAKE A', bottomText: 'DIFFERENCE', align: 'right',
    links: [
      { label: 'DONATE NOW',             href: '/donate' },
      // { label: 'SPONSOR A SEVA',         href: '/sponsor-form' },
// { label: 'FUND TEMPLE CONSTRUCTION', href: '/services/construction' },
      { label: 'VOLUNTEER WITH US',      href: '/volunteer' },
    ],
  },
];

/* ── Theme tokens (green) ── */
const T = {
  navBg:        '#ffffff',
  navBorder:    'rgba(22,163,74,0.12)',
  navShadow:    '0 4px 32px rgba(20,83,45,0.10)',
  navText:      '#0a1c0a',
  navMuted:     '#166534',
  navSubtle:    'rgba(22,101,52,0.45)',
  saffron:      '#16a34a',
  saffronLight: '#4ade80',
  saffronDeep:  '#15803d',
  gold:         '#059669',
  goldLight:    '#6ee7b7',
  dropBg:       '#ffffff',
  dropBorder:   'rgba(22,163,74,0.14)',
  dropText:     '#0a1c0a',
  dropMuted:    '#166534',
  dropHover:    '#16a34a',
  mobileBg:     '#f3fdf6',
  mobileText:   '#0a1c0a',
};

/* ── Diya SVG ── */
const DiyaIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="20" cy="10" rx="3" ry="5" fill="#FCD34D" opacity="0.9" />
    <ellipse cx="20" cy="11" rx="1.8" ry="3.5" fill="#F97316" />
    <ellipse cx="20" cy="12.5" rx="1" ry="2" fill="#FEF3C7" />
    <rect x="19.3" y="14" width="1.4" height="3" rx="0.7" fill="#92400E" />
    <path d="M10 20 Q10 17 20 17 Q30 17 30 20 L28 28 Q28 30 20 30 Q12 30 12 28 Z" fill="#F59E0B" />
    <path d="M12 21 Q12 19 20 19 Q28 19 28 21 L26.5 27 Q26.5 28.5 20 28.5 Q13.5 28.5 13.5 27 Z" fill="#FCD34D" />
    <path d="M28 21 Q33 20 34 22 Q33 25 28 24" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5" />
    <rect x="13" y="29" width="14" height="3" rx="1.5" fill="#D97706" />
    <rect x="15" y="31" width="10" height="2" rx="1" fill="#92400E" />
    <circle cx="20" cy="7" r="1.2" fill="#FEF9C3" opacity="0.8" />
  </svg>
);

/* ── NavTrigger ── */
const NavTrigger = ({ topText, bottomText, isOpen, onClick, id, controlsId }: NavTriggerProps) => (
  <button id={id} aria-haspopup="true" aria-expanded={isOpen}
    aria-controls={controlsId} onClick={onClick}
    style={{ outline: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}
    className="flex flex-col items-center group focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 rounded-sm"
  >
    <span style={{
      fontSize: 9, fontWeight: 800, letterSpacing: '0.22em',
      textTransform: 'uppercase', display: 'block', marginBottom: 2,
      color: isOpen ? T.saffron : T.navSubtle,
      transition: 'color 200ms',
    }} className="group-hover:!text-green-500">
      {topText}
    </span>
    <div className="flex items-center gap-1.5">
      <span style={{
        fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em',
        color: isOpen ? T.saffron : T.navText,
        transition: 'color 200ms',
      }} className="group-hover:!text-green-600">
        {bottomText}
      </span>
      <ChevronDown size={13} aria-hidden="true" style={{
        color: isOpen ? T.saffron : T.navSubtle,
        transition: 'transform 300ms, color 200ms',
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      }} />
    </div>
    <div style={{
      height: 2, borderRadius: 2, marginTop: 5,
      background: `linear-gradient(90deg,${T.saffron},${T.goldLight})`,
      transition: 'width 280ms ease',
      width: isOpen ? '100%' : '0%',
    }} className="group-hover:!w-full" />
  </button>
);

/* ── DropdownContainer ── */
const DropdownContainer = ({ children, id, isOpen, align = 'center' }: DropdownContainerProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (isOpen) {
      const t = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(t);
    } else { setMounted(false); }
  }, [isOpen]);

  const alignStyle: React.CSSProperties =
    align === 'left'  ? { left: 0,    transform: mounted ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.97)' } :
    align === 'right' ? { right: 0,   transform: mounted ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.97)' } :
                        { left: '50%', transform: mounted ? 'translateY(0) translateX(-50%) scale(1)' : 'translateY(-10px) translateX(-50%) scale(0.97)' };

  const arrowPos = align === 'left' ? { left: 24 } : align === 'right' ? { right: 24 } : { left: '50%', marginLeft: -6 };

  return (
    <div id={id} role="region" style={{
      position: 'absolute', top: '100%', marginTop: 14,
      width: 240, zIndex: 9999,
      background: T.dropBg,
      border: `1px solid ${T.dropBorder}`,
      borderRadius: 18,
      padding: '1.5rem',
      display: 'flex', flexDirection: 'column', gap: 2,
      boxShadow: '0 20px 60px rgba(20,83,45,0.12), 0 4px 16px rgba(20,83,45,0.08)',
      opacity: mounted ? 1 : 0,
      pointerEvents: mounted ? 'auto' : 'none',
      transition: 'opacity 220ms cubic-bezier(0.16,1,0.3,1), transform 280ms cubic-bezier(0.34,1.2,0.64,1)',
      ...alignStyle,
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 20, right: 20, height: 3, borderRadius: 2,
        background: `linear-gradient(90deg,${T.saffron},${T.gold},${T.saffronLight})`,
      }} />
      <div style={{
        position: 'absolute', top: -7, width: 13, height: 13,
        background: T.dropBg,
        border: `1px solid ${T.dropBorder}`,
        transform: 'rotate(45deg)', borderRight: 'none', borderBottom: 'none',
        ...arrowPos,
      }} />
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {children}
      </div>
    </div>
  );
};

/* ── DropdownLink ── */
const DropdownLink = ({ label, href = '#', onClick }: DropdownLinkProps) => (
  <Link href={href} onClick={onClick}
    className="group flex items-center gap-2 py-2.5 px-2 -mx-2 rounded-lg transition-all duration-200 focus-visible:outline-none"
    style={{ textDecoration: 'none' }}
    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(22,163,74,0.06)')}
    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
  >
    <span style={{
      width: 0, height: 2, borderRadius: 2, flexShrink: 0,
      background: `linear-gradient(90deg,${T.saffron},${T.gold})`,
      transition: 'width 280ms ease',
    }} className="group-hover:!w-3" />
    <span style={{
      fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.06em', color: T.dropMuted,
      transition: 'color 200ms',
    }} className="group-hover:!text-green-600">
      {label}
    </span>
  </Link>
);

/* ── MobileAccordion ── */
const MobileAccordion = ({ title, children }: MobileAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div style={{ borderBottom: '1px solid rgba(22,163,74,0.10)' }} className="last:border-0">
      <button onClick={() => setIsOpen(p => !p)} aria-expanded={isOpen}
        style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none', width: '100%', padding: '14px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <span style={{
          fontSize: 13, fontWeight: 800, letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: isOpen ? T.saffron : T.mobileText,
          transition: 'color 200ms',
        }}>
          {title}
        </span>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isOpen ? `linear-gradient(135deg,${T.saffron},${T.gold})` : 'rgba(22,163,74,0.08)',
          border: `1px solid ${isOpen ? 'transparent' : 'rgba(22,163,74,0.18)'}`,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'all 320ms cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <ChevronDown size={15} aria-hidden="true"
            style={{ color: isOpen ? '#fff' : T.saffron }} />
        </div>
      </button>
      <div ref={contentRef} style={{
        overflow: 'hidden',
        maxHeight: `${height}px`,
        opacity: isOpen ? 1 : 0,
        transition: 'max-height 350ms cubic-bezier(0.4,0,0.2,1), opacity 250ms ease',
      }}>
        <div style={{
          paddingLeft: 16, paddingBottom: 16, marginLeft: 4,
          borderLeft: `2px solid rgba(22,163,74,0.20)`,
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

/* ── NavItemWrapper ── */
const NavItemWrapper = ({ navKey, activeMenu, onOpen, onClose, children }: NavItemWrapperProps) => {
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleMouseEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    enterTimer.current = setTimeout(() => onOpen(navKey), 80);
  }, [navKey, onOpen]);
  const handleMouseLeave = useCallback(() => {
    if (enterTimer.current) clearTimeout(enterTimer.current);
    leaveTimer.current = setTimeout(() => onClose(), 200);
  }, [onClose]);
  useEffect(() => () => {
    if (enterTimer.current) clearTimeout(enterTimer.current);
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);
  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
};

/* ══════════════════════════════════════════
   HEADER
══════════════════════════════════════════ */
const Header = () => {
  const [activeMenu, setActiveMenu]             = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled]             = useState(false);
  const [scrollProgress, setScrollProgress]     = useState(0);
const [showSupportModal, setShowSupportModal] = useState(false);
const handleOpenSupport = () => setShowSupportModal(true);
const handleCloseSupport = () => setShowSupportModal(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
      setScrollProgress(Math.min(window.scrollY / 120, 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node))
        setActiveMenu(null);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveMenu(null); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

const openMenu   = useCallback((k: string) => setActiveMenu(k), []);
const closeMenu  = useCallback(() => setActiveMenu(null), []);

useEffect(() => {
  const fn = () => setShowSupportModal(true);
  window.addEventListener('openSupportModal', fn);
  return () => window.removeEventListener('openSupportModal', fn);
}, []);
  const toggleMenu = useCallback((k: string) => setActiveMenu(p => p === k ? null : k), []);
  const closeMobile = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <>
      <header ref={headerRef} role="banner"
        className="w-full fixed top-0 left-0 z-[999] transition-all duration-300"
        style={{
          background: '#ffffff',
          borderBottom: isScrolled
            ? `1px solid rgba(22,163,74,0.15)`
            : `1px solid rgba(22,163,74,0.08)`,
          boxShadow: isScrolled
            ? '0 4px 24px rgba(20,83,45,0.10)'
            : '0 1px 8px rgba(20,83,45,0.05)',
          padding: '11px 24px',
        }}
      >
        {/* scroll progress */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: 0, height: 3, borderRadius: '0 3px 3px 0',
          background: `linear-gradient(90deg,${T.saffron},${T.goldLight},${T.gold})`,
          width: `${scrollProgress * 100}%`,
          transition: 'width 150ms linear',
          pointerEvents: 'none',
        }} />

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 relative">

          {/* ── Logo ── */}
          <Link href="/"
            aria-label="Aram Trust"
            className="flex items-center gap-3 flex-shrink-0 group"
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              width: 46, height: 46, borderRadius: 12,
              background: 'rgba(22,163,74,0.08)',
              border: '1.5px solid rgba(22,163,74,0.20)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 300ms cubic-bezier(0.34,1.56,0.64,1), background 200ms',
            }} className="group-hover:scale-105 group-hover:-rotate-2 group-hover:!bg-[rgba(22,163,74,0.14)]">
              <DiyaIcon size={30} />
            </div>
            <div style={{ lineHeight: 1.25 }}>
              <p style={{ fontWeight: 900, fontSize: 15, letterSpacing: '-0.02em', textTransform: 'uppercase', margin: 0 }}>
                <span style={{ color: '#0a1c0a' }}>Aram </span>
                <span style={{ color: T.saffron }}>Trust</span>
              </p>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.gold, margin: 0 }}>
                Serving The Community
              </p>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-7 2xl:gap-9">
            {NAV_ITEMS.map((item) => (
              <NavItemWrapper key={item.key} navKey={item.key}
                activeMenu={activeMenu} onOpen={openMenu} onClose={closeMenu}>
                <NavTrigger
                  id={`nav-btn-${item.key}`}
                  controlsId={`nav-menu-${item.key}`}
                  topText={item.topText} bottomText={item.bottomText}
                  isOpen={activeMenu === item.key}
                  onClick={(e) => { e.stopPropagation(); toggleMenu(item.key); }}
                />
                {activeMenu === item.key && (
                  <DropdownContainer id={`nav-menu-${item.key}`}
                    isOpen={activeMenu === item.key} align={item.align}>
                    {item.links.map((link) => (
                      <DropdownLink key={link.href}
                        label={link.label} href={link.href} onClick={closeMenu} />
                    ))}
                  </DropdownContainer>
                )}
              </NavItemWrapper>
            ))}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <button aria-label="Search"
              className="hidden sm:flex p-2 rounded-full items-center justify-center transition-all duration-200 active:scale-90"
              style={{ color: T.navSubtle, background: 'transparent', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(22,163,74,0.08)';
                (e.currentTarget as HTMLElement).style.color = T.saffron;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = T.navSubtle;
              }}
            >
              <Search size={19} strokeWidth={2.5} aria-hidden="true" />
            </button>

            <Link href="/donate"
              className="flex items-center gap-1.5 active:scale-95 hover:-translate-y-0.5"
              style={{
                padding: '10px 20px', borderRadius: 10, fontWeight: 800,
                fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.07em',
                color: '#ffffff', textDecoration: 'none',
                background: `linear-gradient(135deg,${T.saffron},${T.saffronDeep})`,
                boxShadow: '0 2px 12px rgba(22,163,74,0.35)',
                transition: 'transform 250ms, box-shadow 250ms',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(22,163,74,0.55)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(22,163,74,0.35)')}
            >
              <Heart size={13} style={{ fill: '#ffffff' }} aria-hidden="true" />
              Give
            </Link>

            <button
  onClick={handleOpenSupport}
  className="hidden md:inline-flex items-center active:scale-95 hover:-translate-y-0.5"
  style={{
    padding: '10px 18px', borderRadius: 10, fontWeight: 800,
    fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.07em',
    color: T.saffron, cursor: 'pointer',
    border: `1.5px solid rgba(22,163,74,0.35)`,
    background: 'transparent',
    transition: 'transform 250ms, background 200ms, border-color 200ms',
  }}
  onMouseEnter={e => {
    (e.currentTarget as HTMLElement).style.background = 'rgba(22,163,74,0.06)';
    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(22,163,74,0.60)';
  }}
  onMouseLeave={e => {
    (e.currentTarget as HTMLElement).style.background = 'transparent';
    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(22,163,74,0.35)';
  }}
>
  Support Us
</button>

            <button onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-drawer"
              className="xl:hidden p-2 rounded-lg transition-all duration-200 active:scale-90"
              style={{ color: T.navMuted, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Menu size={25} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════ MOBILE DRAWER ══════════ */}
      <div id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation menu"
        className="fixed inset-0 xl:hidden"
        style={{
          zIndex: 9999,
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
        }}
      >
        <div aria-hidden onClick={closeMobile} style={{
          position: 'absolute', inset: 0,
          background: 'rgba(10,28,10,0.50)',
          opacity: isMobileMenuOpen ? 1 : 0,
          transition: 'opacity 300ms ease',
        }} />

        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: '85%', maxWidth: 380,
          background: T.mobileBg,
          borderLeft: `1px solid rgba(22,163,74,0.12)`,
          boxShadow: '-16px 0 48px rgba(20,83,45,0.15)',
          display: 'flex', flexDirection: 'column',
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 460ms cubic-bezier(0.32,0.72,0,1)',
        }}>
          <div aria-hidden style={{
            height: 3, flexShrink: 0,
            background: `linear-gradient(90deg,${T.saffron},${T.goldLight},${T.gold})`,
          }} />

          <div style={{
            padding: '16px 20px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexShrink: 0,
            borderBottom: `1px solid rgba(22,163,74,0.10)`,
          }}>
            <Link href="/" onClick={closeMobile}
              style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(22,163,74,0.08)',
                border: '1.5px solid rgba(22,163,74,0.20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <DiyaIcon size={22} />
              </div>
              <div>
                <p style={{ fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: 0 }}>
                  <span style={{ color: '#0a1c0a' }}>Aram </span>
                  <span style={{ color: T.saffron }}>Trust</span>
                </p>
                <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.gold, margin: 0 }}>
                  Serving The Community
                </p>
              </div>
            </Link>
            <button onClick={closeMobile} aria-label="Close navigation menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: '50%', color: T.navMuted }}>
              <X size={21} aria-hidden="true" />
            </button>
          </div>

          <div role="navigation" aria-label="Mobile navigation"
            style={{ flex: 1, overflowY: 'auto', padding: '8px 20px' }}>
            {NAV_ITEMS.map((item) => (
              <MobileAccordion key={item.key} title={`${item.topText} ${item.bottomText}`}>
                {item.links.map((link) => (
                  <DropdownLink key={link.href}
                    label={link.label} href={link.href} onClick={closeMobile} />
                ))}
              </MobileAccordion>
            ))}
          </div>

          <div style={{
            padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12,
            flexShrink: 0, borderTop: `1px solid rgba(22,163,74,0.10)`,
          }}>
            <Link href="/donate" onClick={closeMobile}
              className="active:scale-95 hover:-translate-y-0.5"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px', borderRadius: 14, fontWeight: 800,
                fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em',
                color: '#ffffff', textDecoration: 'none',
                background: `linear-gradient(135deg,${T.saffron},${T.saffronDeep})`,
                boxShadow: '0 2px 12px rgba(22,163,74,0.30)',
                transition: 'transform 250ms',
              }}>
              <Heart size={15} style={{ fill: '#ffffff' }} aria-hidden="true" />
              Give Now
            </Link>
           <button onClick={() => { handleOpenSupport(); closeMobile(); }}
  className="active:scale-95 hover:-translate-y-0.5"
  style={{
    display: 'block', textAlign: 'center', width: '100%',
    padding: '13px', borderRadius: 14, fontWeight: 800,
    fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em',
    color: T.saffron, cursor: 'pointer',
    border: `1.5px solid rgba(22,163,74,0.30)`,
    background: 'rgba(22,163,74,0.05)',
    transition: 'transform 250ms',
  }}>
  Support Us
</button>
          </div>
        </div>
      </div>
<SupportModal key={showSupportModal ? 'open' : 'closed'} isOpen={showSupportModal} onClose={handleCloseSupport} />    </>
  );
};

export default Header;