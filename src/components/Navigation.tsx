'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
  ];

  return (
    <header className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-6 sm:pt-8">
      <nav
        aria-label="Main Navigation"
        className="flex items-center justify-between py-3"
      >
        {/* Brand Logo / Name in Apple's SF Pro Font */}
        <Link
          href="/"
          className="group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded-lg"
        >
          <span className="font-apple text-xl sm:text-2xl font-semibold tracking-[-0.025em] text-[#111315] group-hover:opacity-75 transition-opacity">
            Nashim Nazar
          </span>
        </Link>

        {/* Desktop Minimal Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#484F56]">
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
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            id="nav-cta-btn"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#111315] bg-white border border-[#E2E8F0] shadow-sm hover:border-lime-400 hover:bg-[#F9FCF2] transition-all duration-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
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
            className="md:hidden p-2.5 rounded-full bg-white border border-[#E2E8F0] text-[#111315] shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-xl flex flex-col gap-4 animate-fade-up">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#111315] py-2 border-b border-slate-100 last:border-b-0 hover:text-lime-600 transition-colors"
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
    </header>
  );
}
