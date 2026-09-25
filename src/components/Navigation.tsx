'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state threshold
      if (currentScrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Subtle scroll direction detection
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-500 ease-out">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-3 sm:pt-5 pointer-events-auto">
        <nav
          aria-label="Main Navigation"
          className={`relative flex items-center justify-between transition-all duration-500 ease-out ${
            isScrolled
              ? 'bg-white/75 sm:bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)] px-5 sm:px-7 py-2.5 sm:py-3 rounded-full'
              : 'bg-white/35 sm:bg-white/25 backdrop-blur-md border border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] px-5 sm:px-7 py-3 sm:py-3.5 rounded-full'
          } ${isScrollingDown ? '-translate-y-1' : 'translate-y-0'}`}
        >
          {/* Brand Logo / Name in Apple's SF Pro Font */}
          <Link
            href="/"
            className="group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded-lg shrink-0"
          >
            <span className="font-apple text-lg sm:text-xl font-semibold tracking-[-0.025em] text-[#111315] group-hover:opacity-75 transition-opacity">
              Nashim Nazar
            </span>
          </Link>

          {/* Desktop Minimal Navigation Links */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9 text-[13px] sm:text-sm font-medium text-[#484F56]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="transition-colors hover:text-[#111315] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded px-1 py-0.5"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right CTA / Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="#contact"
              id="nav-cta-btn"
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold text-[#111315] bg-white/90 border border-[#E2E8F0] shadow-sm hover:border-lime-400 hover:bg-[#F9FCF2] transition-all duration-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#111315]" />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 sm:p-2.5 rounded-full bg-white/90 border border-[#E2E8F0] text-[#111315] shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown with Matching Apple Glass Styling */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2.5 p-6 rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col gap-4 animate-fade-up">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#111315] py-2 border-b border-slate-100/80 last:border-b-0 hover:text-lime-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#111315] text-white text-sm font-semibold hover:bg-black transition-colors"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
