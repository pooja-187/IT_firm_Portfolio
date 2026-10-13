'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MinimalistHero } from '@/components/ui/minimalist-hero';
import { contentService } from "@/services/ContentService";
import { STORAGE_KEYS } from "@/services/StorageService";
import { INITIAL_PORTFOLIO_DATA } from "@/services/seedData";
import { HeroData } from "@/types/portfolio";

import { FlipLine } from '@/components/ui/FlipText';

// Lucide-compatible social icons
const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData>(INITIAL_PORTFOLIO_DATA.hero);

  useEffect(() => {
    const loadHero = () => {
      setHeroData(contentService.getHero());
    };
    loadHero();

    const unsubscribe = contentService.subscribe((key) => {
      if (key === STORAGE_KEYS.HERO) {
        loadHero();
      }
    });

    return () => unsubscribe();
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#selected-work' },
    { label: 'SERVICES', href: '#services' },
    { label: 'PROCESS', href: '#process' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com' },
    { icon: Twitter, href: 'https://twitter.com' },
    { icon: Instagram, href: 'https://instagram.com' },
    { icon: Facebook, href: 'https://facebook.com' },
  ];



  return (
    <MinimalistHero
      logoText={heroData?.name || "Nashim Nazar"}
      navLinks={navLinks}
      mainText={
        heroData?.bio ||
        heroData?.mainText ||
        "UI/UX Designer, Software & Digital Product Professional. Crafting high-conversion digital experiences and scalable interfaces."
      }
      readMoreLink={heroData?.ctaUrl || "#expertise"}
      imageSrc={
        heroData?.portraitImage ||
        heroData?.imageSrc ||
        "/images/projects/ChatGPT Image Sep 28, 2026, 03_14_07 PM.png"
      }
      imageAlt={`${heroData?.name || "Nashim Nazar"} - UI/UX Designer`}
      overlayText={{
        part1: (
          <span className="flex flex-col items-start text-left">
            <FlipLine text="CEO and Founder" baseDelay={100} className="leading-[0.95] tracking-tight font-sans font-extrabold" />
            <FlipLine
              text="of"
              isSerif
              baseDelay={220}
              className="leading-[1.12] mt-0.5 sm:mt-1 font-canela"
              style={{
                fontFamily: "'Canela', 'Canela Italic', var(--font-canela-fallback), var(--font-serif), serif",
                fontStyle: 'italic',
                fontWeight: 350,
                letterSpacing: '-0.01em',
              }}
            />
            <FlipLine
              text="Manzio Studio"
              isSerif
              baseDelay={340}
              className="leading-[1.12] mt-0.5 sm:mt-1 font-canela"
              style={{
                fontFamily: "'Canela', 'Canela Italic', var(--font-canela-fallback), var(--font-serif), serif",
                fontStyle: 'italic',
                fontWeight: 350,
                letterSpacing: '-0.01em',
              }}
            />
          </span>
        ),
      }}
      mobileOverlayText={
        <span className="flex flex-col items-start text-left">
          <FlipLine text="CEO and Founder" baseDelay={100} className="leading-[0.95] tracking-tight font-sans font-extrabold" />
          <FlipLine
            text="of"
            isSerif
            baseDelay={220}
            className="leading-[1.12] mt-0.5 font-canela"
            style={{
              fontFamily: "'Canela', 'Canela Italic', var(--font-canela-fallback), var(--font-serif), serif",
              fontStyle: 'italic',
              fontWeight: 350,
              letterSpacing: '-0.01em',
            }}
          />
          <FlipLine
            text="Manzio Studio"
            isSerif
            baseDelay={340}
            className="leading-[1.12] mt-0.5 font-canela"
            style={{
              fontFamily: "'Canela', 'Canela Italic', var(--font-canela-fallback), var(--font-serif), serif",
              fontStyle: 'italic',
              fontWeight: 350,
              letterSpacing: '-0.01em',
            }}
          />
        </span>
      }
      socialLinks={socialLinks}
      locationText={heroData?.location || heroData?.locationText || "Kottayam, Kerala"}
    />
  );
}
