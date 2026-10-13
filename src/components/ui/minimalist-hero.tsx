'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LucideIcon, ChevronRight, Play, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: React.ReactNode;
    part2?: React.ReactNode;
  };
  socialLinks: { icon: LucideIcon | React.ComponentType<{ className?: string }>; href: string }[];
  locationText: string;
  className?: string;
  mobileOverlayText?: React.ReactNode;
}

// Helper component for social media icons on desktop
const DesktopSocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon | React.ComponentType<{ className?: string }> }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
  mobileOverlayText,
}: MinimalistHeroProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      id="home"
      className={cn(
        'relative w-full overflow-hidden bg-white font-sans selection:bg-lime-300 scroll-mt-24 sm:scroll-mt-28 min-h-screen min-h-[100dvh] min-h-[100svh] md:min-h-0',
        className
      )}
    >
      {/* =========================================================================
          1. DEDICATED MOBILE HERO (< 768px): Fills full viewport (100svh)
             Order & Geometry:
             1. Fixed Header clearance (safe-area aware)
             2. Ambient green atmosphere & glow across full viewport
             3. Centered, responsively scaled portrait with grounded contact shadow
             4. Balanced typography below portrait (CEO and Founder / Manzio Studio)
             5. Next section (Expertise) stays completely below the fold
         ========================================================================= */}
      <div
        className="md:hidden relative w-full flex flex-col justify-between overflow-hidden bg-white min-h-screen min-h-[100dvh] min-h-[100svh]"
        style={{
          minHeight: '100svh',
        }}
      >
        {/* Rich Ambient Lime-Green Studio Light & Gradient Atmosphere (matching desktop hero) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 100% 70% at 50% 38%, rgba(162, 246, 36, 0.62) 0%, rgba(184, 252, 60, 0.42) 30%, rgba(214, 255, 115, 0.20) 55%, transparent 82%),
              radial-gradient(circle 350px at 15% 42%, rgba(150, 245, 30, 0.32) 0%, transparent 70%),
              radial-gradient(circle 350px at 85% 32%, rgba(150, 245, 30, 0.32) 0%, transparent 70%),
              radial-gradient(ellipse 110% 85% at 50% 38%, rgba(210, 250, 140, 0.22) 0%, transparent 78%)
            `,
            maskImage: "linear-gradient(to bottom, black 0%, black 65%, rgba(0, 0, 0, 0.7) 80%, rgba(0, 0, 0, 0.2) 92%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 65%, rgba(0, 0, 0, 0.7) 80%, rgba(0, 0, 0, 0.2) 92%, transparent 100%)",
          }}
        >
          {/* Concentrated Soft Depth Glow Behind Portrait */}
          <div
            className="absolute"
            style={{
              width: "70%",
              height: "45%",
              left: "50%",
              top: "38%",
              transform: "translate(-50%, -50%)",
              background: "rgba(162, 246, 36, 0.30)",
              filter: "blur(60px)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Soft Organic Green Dome Contour SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 390 844"
          preserveAspectRatio="xMidYMin slice"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 65%, rgba(0, 0, 0, 0.6) 80%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 65%, rgba(0, 0, 0, 0.6) 80%, transparent 95%)",
          }}
        >
          <defs>
            <radialGradient id="mobileHeroDomeGradient" cx="50%" cy="46%" r="56%">
              <stop offset="0%" stopColor="#A3E635" stopOpacity="0.48" />
              <stop offset="35%" stopColor="#BEF264" stopOpacity="0.32" />
              <stop offset="70%" stopColor="#D9F99D" stopOpacity="0.18" />
              <stop offset="90%" stopColor="#D9F99D" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft Organic Green Dome behind Nashim */}
          <path
            d="M 10 740 C 10 320, 95 210, 195 210 C 295 210, 380 320, 380 740 Z"
            fill="url(#mobileHeroDomeGradient)"
          />
        </svg>

        {/* Continuous Soft Ambient Seam Blend — Bottom of Hero (Feathers seamlessly into Expertise) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 sm:h-72 z-0 overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 110% 100% at 50% 100%, rgba(162, 246, 36, 0.22) 0%, rgba(184, 252, 60, 0.14) 35%, rgba(214, 255, 115, 0.05) 65%, transparent 85%),
              radial-gradient(circle 280px at 20% 90%, rgba(150, 245, 30, 0.10) 0%, transparent 70%),
              radial-gradient(circle 280px at 80% 90%, rgba(150, 245, 30, 0.08) 0%, transparent 70%)
            `,
          }}
        />

        {/* Content Flow Container in Normal Document Flow */}
        <div
          className="relative z-10 w-full flex-1 min-h-0 flex flex-col justify-between px-5 sm:px-6"
          style={{
            paddingTop: 'max(4.25rem, calc(env(safe-area-inset-top, 0px) + 3.25rem))',
            paddingBottom: 'max(3.85rem, calc(env(safe-area-inset-bottom, 0px) + 3.25rem))',
          }}
        >
          {/* 1. NASHIM PORTRAIT — Centered & Responsively Sized (Larger Mobile Presence) */}
          <div className="relative w-full flex-1 min-h-0 flex flex-col justify-center items-center z-10 py-1">
            <motion.div
              initial={{ y: shouldReduceMotion ? '0vh' : '100vh' }}
              animate={{ y: '0vh' }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                delay: shouldReduceMotion ? 0 : 0.15,
              }}
              className="relative flex flex-col items-center justify-end will-change-transform max-h-full"
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                loading="eager"
                fetchPriority="high"
                className="w-auto h-auto max-h-[500px] max-w-[92vw] sm:max-w-[460px] object-contain select-none will-change-transform"
                style={{
                  maxHeight: 'min(58svh, 510px)',
                  filter: 'grayscale(100%) contrast(1.05) drop-shadow(0 16px 28px rgba(0, 0, 0, 0.14))',
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/images/projects/ChatGPT Image Sep 28, 2026, 03_14_07 PM.png';
                }}
              />

              {/* Floor Contact Shadow Grounded Directly Below Image */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 w-[82%] max-w-[340px] h-6 rounded-[100%] opacity-35 -z-10"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 100%, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.12) 50%, transparent 80%)',
                  filter: 'blur(10px)',
                }}
              />
            </motion.div>
          </div>

          {/* 2. PRIMARY HEADLINE — CEO and Founder / Manzio Studio */}
          <div className="w-full text-left relative z-20 shrink-0 px-1 pt-1">
            <h1
              suppressHydrationWarning
              className="text-left font-extrabold text-[#111111] leading-[0.92] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(28px, 8.2vw, 42px)' }}
            >
              {mobileOverlayText || overlayText.part1}
            </h1>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. DESKTOP HERO (>= 768px): 100% UNCHANGED, preserved exactly as before
         ========================================================================= */}
      <div className="hidden md:flex relative h-screen w-full flex-col items-center justify-between overflow-hidden">
        {/* Saturated Ambient Diffused Lime-Green Studio Light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 65% at 50% 50%, rgba(162, 246, 36, 0.65) 0%, rgba(184, 252, 60, 0.45) 28%, rgba(214, 255, 115, 0.22) 52%, transparent 80%),
              radial-gradient(circle 600px at 15% 55%, rgba(150, 245, 30, 0.35) 0%, transparent 70%),
              radial-gradient(circle 600px at 85% 55%, rgba(150, 245, 30, 0.35) 0%, transparent 70%),
              radial-gradient(ellipse 110% 85% at 50% 45%, rgba(210, 250, 140, 0.25) 0%, transparent 75%)
            `,
            maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
          }}
        >
          {/* Concentrated Soft Depth Glow Behind Portrait */}
          <div
            className="absolute"
            style={{
              width: "55%",
              height: "55%",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(162, 246, 36, 0.28)",
              filter: "blur(90px)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Top spacing reserved for floating glass navbar */}
        <div className="h-16 sm:h-20 w-full pointer-events-none shrink-0" aria-hidden="true" />

        {/* Main Content Area - 3-Column Grid without middle image container locking */}
        <div className="relative z-20 grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3 px-6 sm:px-10 lg:px-14 pointer-events-none">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="order-2 md:order-1 text-center md:text-left pointer-events-auto"
          >
            <p className="mx-auto max-w-sm sm:max-w-md text-base sm:text-lg lg:text-xl leading-relaxed text-foreground/90 md:mx-0 font-normal">
              {mainText}
            </p>
            <a
              href={readMoreLink}
              className="mt-4 sm:mt-5 inline-block text-base sm:text-lg font-medium text-foreground underline decoration-from-font underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Read More
            </a>
          </motion.div>

          {/* Center Grid Spacer: Keeps Left and Right Columns balanced on their thirds */}
          <div className="order-1 md:order-2 h-44 sm:h-64 md:h-auto pointer-events-none" aria-hidden="true" />

          {/* Right Text */}
          <div className="order-3 flex items-center justify-center md:justify-end text-left pointer-events-auto md:-translate-y-8 lg:-translate-y-12">
            <h1
              suppressHydrationWarning
              className="text-left font-extrabold text-foreground leading-[1.02] tracking-tight"
              style={{ fontSize: 'clamp(32px, 3.3vw, 54px)' }}
            >
              {overlayText.part1}
              {overlayText.part2 ? (
                <>
                  {typeof overlayText.part1 === 'string' && <br />}
                  {overlayText.part2}
                </>
              ) : null}
            </h1>
          </div>
        </div>

        {/* =========================================================================
            HERO PORTRAIT: Grounded Flush to bottom-0
           ========================================================================= */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center justify-end">
          {/* Contact Shadow on floor */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 w-[80%] h-12 rounded-[100%] opacity-35 -z-10"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 50%, transparent 80%)',
              filter: 'blur(14px)',
            }}
          />

          {/* Main Portrait grounded flush at bottom */}
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            style={{
              filter: 'drop-shadow(0 25px 40px rgba(0, 0, 0, 0.22)) drop-shadow(0 10px 16px rgba(0, 0, 0, 0.12))',
            }}
            className="relative z-10 h-[58vh] sm:h-[64vh] md:h-[68vh] lg:h-[74vh] xl:h-[78vh] max-h-[720px] w-auto object-contain object-bottom select-none will-change-transform"
            initial={{ y: shouldReduceMotion ? '0vh' : '100vh' }}
            animate={{ y: '0vh' }}
            transition={{
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/images/projects/ChatGPT Image Sep 28, 2026, 03_14_07 PM.png';
            }}
          />
        </div>

        {/* Footer Elements */}
        <footer className="relative z-20 flex w-full max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-14 pb-6 sm:pb-8 pointer-events-none shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center space-x-4 pointer-events-auto"
          >
            {socialLinks.map((link, index) => (
              <DesktopSocialIcon key={index} href={link.href} icon={link.icon} />
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="text-sm font-medium text-foreground/80 pointer-events-auto"
          >
            {locationText}
          </motion.div>
        </footer>
      </div>
    </div>
  );
};
