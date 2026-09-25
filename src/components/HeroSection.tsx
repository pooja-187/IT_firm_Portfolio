'use client';

import React from 'react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';

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
  const navLinks = [
    { label: 'EXPERTISE', href: '#expertise' },
    { label: 'WORK', href: '#work' },
    { label: 'PROCESS', href: '#process' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com' },
    { icon: Twitter, href: 'https://twitter.com' },
    { icon: Instagram, href: 'https://instagram.com' },
    { icon: Facebook, href: 'https://facebook.com' },
  ];

  return (
    <MinimalistHero
      logoText="Nashim Nazar"
      navLinks={navLinks}
      mainText="UI/UX Designer, Software & Digital Product Professional. Crafting high-conversion digital experiences and scalable interfaces."
      readMoreLink="#expertise"
      imageSrc="https://cdn.21st.dev/assets/mirror/21/2172cd84238bbee1a57a87b64322655b09c2ffa4ea89acaef7e9989c3abd272d.png"
      imageAlt="Nashim Nazar - UI/UX Designer"
      overlayText={{
        part1: "Kerala's Best",
        part2: (
          <span>
            <span className="font-serif italic font-normal tracking-normal text-[#111315]">UI/UX</span> Designer
          </span>
        ),
      }}
      socialLinks={socialLinks}
      locationText="Kottayam, Kerala"
    />
  );
}
