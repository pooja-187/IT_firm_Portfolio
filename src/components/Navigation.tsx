'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { contentService } from '@/services/ContentService';
import { STORAGE_KEYS } from '@/services/StorageService';
import { PortfolioSettings } from '@/types/portfolio';

interface NavItem {
  name: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavItem[] = [
  { name: 'WORK', href: '#selected-work', id: 'selected-work' },
  { name: 'SERVICES', href: '#services', id: 'services' },
  { name: 'PROCESS', href: '#process', id: 'process' },
  { name: 'ABOUT', href: '#about', id: 'about' },
  { name: 'CONTACT', href: '#contact', id: 'contact' },
];

const SECTION_TO_NAV_MAP: Record<string, string> = {
  'home': '',
  'expertise': '',
  'selected-work': 'selected-work',
  'clients': 'selected-work',
  'services': 'services',
  'process': 'process',
  'about': 'about',
  'why-work-with-me': 'about',
  'testimonials': '',
  'insights': '',
  'faq': '',
  'contact': 'contact',
};

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [activeNav, setActiveNav] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('Nashim Nazar');
  const [mousePos, setMousePos] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loaded = contentService.getSettings();
    if (loaded?.brandName) setBrandName(loaded.brandName);

    const unsubscribe = contentService.subscribe(STORAGE_KEYS.SETTINGS, (updated: PortfolioSettings) => {
      if (updated?.brandName) setBrandName(updated.brandName);
    });

    return () => unsubscribe();
  }, []);

  // Scroll appearance and direction detection
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        setIsScrolled(false);
        setIsScrollingDown(false);
      } else {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY && currentScrollY > 30) {
          setIsScrollingDown(true);
        } else if (currentScrollY < lastScrollY) {
          setIsScrollingDown(false);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const sectionIds = Object.keys(SECTION_TO_NAV_MAP);
    const visibleRatios: Record<string, number> = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id) {
            if (entry.isIntersecting) {
              visibleRatios[entry.target.id] = entry.intersectionRatio;
            } else {
              delete visibleRatios[entry.target.id];
            }
          }
        });

        let maxRatio = 0;
        let activeSectionId = '';

        for (const [id, ratio] of Object.entries(visibleRatios)) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            activeSectionId = id;
          }
        }

        if (activeSectionId && SECTION_TO_NAV_MAP[activeSectionId] !== undefined) {
          setActiveNav(SECTION_TO_NAV_MAP[activeSectionId]);
        }
      },
      {
        rootMargin: '-15% 0px -40% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Pointer glass reflection tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, visible: false }));
  };

  const shouldHideBrand = isScrollingDown && !mobileMenuOpen;

  return (
    <header className="fixed top-4 sm:top-5 lg:top-6 inset-x-0 z-50 pointer-events-none px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Left Brand: Nashim Nazar (Hides while scrolling down) */}
        <div
          className={`flex-1 flex justify-start items-center pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            shouldHideBrand
              ? '-translate-y-12 opacity-0 pointer-events-none'
              : 'translate-y-0 opacity-100 pointer-events-auto'
          }`}
        >
          <Link
            href="#home"
            className="group/brand relative z-10 flex items-center py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
          >
            <span
              className={`text-[#111111] group-hover/brand:opacity-80 transition-all whitespace-nowrap ${
                isScrolled
                  ? 'md:bg-transparent bg-white/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/[0.06] shadow-xs'
                  : ''
              } font-italianno text-[34px] xs:text-[38px] sm:text-[42px] md:text-[46px] lg:text-[48px] tracking-normal leading-none select-none`}
              style={{
                fontFamily: "'Italianno', cursive",
                color: '#111111',
              }}
            >
              {brandName || 'Nashim Nazar'}
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Dock */}
        <div className="flex-initial hidden md:flex justify-center items-center pointer-events-auto">
          <nav
            ref={navRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            aria-label="Main navigation"
            className={`group relative flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled
                ? 'bg-white/[0.72] backdrop-blur-[28px] saturate-[140%] border border-white/75 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.85)] py-2 px-3 sm:px-3.5 rounded-full'
                : 'bg-white/[0.58] backdrop-blur-[20px] saturate-[125%] border border-white/60 shadow-[0_8px_24px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.75)] py-2.5 px-3.5 sm:px-4 rounded-full'
            } ${
              isScrollingDown
                ? '-translate-y-1.5 opacity-95 scale-[0.99]'
                : 'translate-y-0 opacity-100 scale-100'
            }`}
            style={{
              boxShadow: isScrolled
                ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), 0 14px 36px -6px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.02)'
                : 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.8), 0 8px 24px -4px rgba(0, 0, 0, 0.03)',
            }}
          >
            {/* Subtle Ambient Lime Tint Influence */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full opacity-60 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(162, 246, 36, 0.08) 0%, rgba(255, 255, 255, 0.02) 60%, transparent 100%)',
              }}
            />

            {/* Mouse / Pointer Glass Reflection Overlay (Desktop only) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 hidden md:block"
              style={{
                opacity: mousePos.visible ? 1 : 0,
                background: `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.7) 0%, rgba(162, 246, 36, 0.12) 35%, transparent 70%)`,
              }}
            />

            {/* Desktop Nav Links */}
            <div className="relative z-10 flex items-center gap-1 sm:gap-1.5 lg:gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeNav === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] lg:text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 ${
                      isActive
                        ? 'text-[#111111] bg-lime-400/[0.18] shadow-[inset_0_0_0_1px_rgba(132,204,22,0.3)]'
                        : 'text-[#4B5563] hover:text-[#111111] hover:bg-black/[0.035] hover:scale-[1.02]'
                    }`}
                  >
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full bg-[#65a30d] shrink-0 animate-fade-in"
                      />
                    )}
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Right: Perfect symmetry balance spacer on desktop, Hamburger on mobile */}
        <div className="flex-1 flex justify-end items-center pointer-events-auto">
          {/* Mobile Menu Toggle Button (52px circular minimal button matching reference) */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="w-[52px] h-[52px] rounded-full bg-white border border-black/[0.08] text-[#111111] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:bg-[#FAFAFA] active:scale-95 transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 stroke-[2.2]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2.5 max-w-sm mx-auto w-full p-4 rounded-3xl bg-white/[0.88] backdrop-blur-[24px] saturate-[130%] border border-white/85 shadow-[0_20px_40px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col gap-1.5 animate-fade-up pointer-events-auto">
          {NAV_LINKS.map((link) => {
            const isActive = activeNav === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-semibold tracking-[0.12em] uppercase transition-all ${
                  isActive
                    ? 'text-[#111111] bg-lime-400/[0.22] font-bold shadow-[inset_0_0_0_1px_rgba(132,204,22,0.3)]'
                    : 'text-[#4B5563] hover:text-[#111111] hover:bg-black/[0.04]'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
                )}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
