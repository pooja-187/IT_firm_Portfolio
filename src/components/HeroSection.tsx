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
            <FlipLine text="CEO and Founder" baseDelay={100} className="leading-[0.95] tracking-tight font-outfit font-extrabold" />
            <FlipLine
              text="Manzio Studio"
              isSerif
              baseDelay={320}
              className="leading-[1.12] mt-1 sm:mt-1.5 font-playfair"
              style={{
                fontStyle: 'italic',
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            />
          </span>
        ),
      }}
      mobileOverlayText={
        <div className="flex flex-col items-start text-left select-none">
          {/* Line 1: CEO */}
          <span className="font-outfit font-extrabold text-[#0D0F11] leading-[0.92] tracking-[-0.03em] uppercase text-[clamp(32px,8.5vw,46px)] whitespace-nowrap">
            CEO
          </span>

          {/* Line 2: and */}
          <span className="font-outfit font-light text-[#2A2E33] leading-[1.05] tracking-tight lowercase text-[clamp(17px,4.8vw,22px)] my-1 sm:my-1.5 select-none whitespace-nowrap">
            and
          </span>

          {/* Line 3: Founder */}
          <span className="font-outfit font-extrabold text-[#0D0F11] leading-[0.92] tracking-[-0.03em] text-[clamp(32px,8.5vw,46px)] whitespace-nowrap">
            Founder
          </span>

          {/* Line 4: Manzio Studio */}
          <span
            className="leading-[1.12] mt-1.5 sm:mt-2 font-playfair italic font-normal text-[#0D0F11] text-[clamp(22px,6vw,30px)] whitespace-nowrap"
            style={{
              letterSpacing: '-0.01em',
            }}
          >
            Manzio Studio
          </span>

          {/* Line 5: Short Lime-Green Accent Line */}
          <div
            className="h-[3.5px] w-16 sm:w-20 rounded-full mt-2.5 sm:mt-3 bg-[#84CC16] shadow-[0_0_10px_rgba(132,204,22,0.55)]"
            aria-hidden="true"
          />
        </div>
      }
      socialLinks={socialLinks}
      locationText={heroData?.location || heroData?.locationText || "Kottayam, Kerala"}
    />
  );
}
