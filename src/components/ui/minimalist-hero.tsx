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
          1. DEDICATED MOBILE HERO (< 768px): Matches Reference Image 2 Precisely
             - Split 2-column composition: Portrait on LEFT (~58%), Typography on RIGHT (~42%)
             - Concentrated vibrant lime-green glow behind portrait on the left
             - Clean, soft warm off-white/pale lime background (#F2F8E7)
             - Prominent sharp Nashim portrait with bottom-only gradual feather fade
             - Typography aligned with face & upper chest:
                 • CEO (large, black, heavy sans-serif, uppercase)
                 • and (smaller, thin sans-serif, lowercase)
                 • Founder (large, black, heavy sans-serif)
                 • Manzio Studio (elegant italic serif)
                 • Short lime-green accent bar directly beneath subtitle
             - Seamless blend at bottom into the page
         ========================================================================= */}
      <div
        className="md:hidden relative w-full flex flex-col justify-between overflow-hidden min-h-screen min-h-[100dvh] min-h-[100svh]"
        style={{
          minHeight: '100svh',
          background: 'linear-gradient(180deg, #E6F5C9 0%, #E3F2C2 35%, #E9F6D0 68%, #F2F8E7 100%)',
        }}
      >
        {/* Rich Saturated Ambient Lime-Green Glow & Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          style={{
            background: `
              /* Top ambient light wrapping navigation and upper card */
              radial-gradient(ellipse 110% 55% at 50% 10%, rgba(163, 230, 53, 0.45) 0%, rgba(190, 242, 100, 0.28) 35%, transparent 75%),
              /* Core saturated lime glow directly behind portrait */
              radial-gradient(ellipse 85% 68% at 28% 38%, rgba(162, 246, 36, 0.88) 0%, rgba(184, 252, 60, 0.62) 32%, rgba(214, 255, 115, 0.32) 58%, transparent 84%),
              /* High-intensity lime sphere centered at shoulder/neck */
              radial-gradient(circle 360px at 20% 40%, rgba(150, 245, 30, 0.52) 0%, transparent 70%),
              /* Soft right-side ambient fill */
              radial-gradient(circle 380px at 80% 30%, rgba(190, 242, 100, 0.32) 0%, transparent 72%),
              /* Bottom ambient grounding */
              radial-gradient(ellipse 95% 50% at 50% 92%, rgba(163, 230, 53, 0.28) 0%, transparent 75%)
            `,
          }}
        >
          {/* Intense Concentrated Core Glow */}
          <div
            className="absolute"
            style={{
              width: "75%",
              height: "58%",
              left: "28%",
              top: "38%",
              transform: "translate(-50%, -50%)",
              background: "rgba(162, 246, 36, 0.48)",
              filter: "blur(65px)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Soft Organic Green Dome / Curved Shape behind portrait (matching Image 2) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 390 844"
          preserveAspectRatio="none"
          style={{
            opacity: 0.82,
            maskImage: "linear-gradient(to bottom, black 0%, black 78%, transparent 98%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 78%, transparent 98%)",
          }}
        >
          <defs>
            <radialGradient id="mobileOrganicGlow" cx="24%" cy="40%" r="58%">
              <stop offset="0%" stopColor="#84CC16" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#A3E635" stopOpacity="0.42" />
              <stop offset="68%" stopColor="#BEF264" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#E6F5C9" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M -30 800 C -30 290, 80 170, 230 190 C 330 205, 370 270, 350 510 C 330 710, 200 800, -30 800 Z"
            fill="url(#mobileOrganicGlow)"
          />
        </svg>

        {/* Continuous Soft Ambient Seam Blend — Bottom of Hero (feathers cleanly into next section) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 sm:h-56 z-0 overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(230, 245, 201, 0.35) 30%, rgba(255, 255, 255, 0.82) 75%, #FFFFFF 100%)',
          }}
        />

        {/* Main Content Area: Top clearance for fixed navigation, Left/Right split */}
        <div
          className="relative z-10 w-full flex-1 min-h-0 flex flex-col justify-start"
          style={{
            paddingTop: 'max(4.75rem, calc(env(safe-area-inset-top, 0px) + 3.75rem))',
            paddingBottom: 'max(2rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem))',
          }}
        >
          {/* 2-Column Split Composition: Left Portrait + Right Typography */}
          <div className="relative w-full flex items-start pl-0 pr-1 xs:pr-2 sm:pr-4">
            {/* 1. LEFT COLUMN: NASHIM PORTRAIT (Prominent scale matching reference) */}
            <div className="relative w-[48%] xs:w-[50%] shrink-0 flex flex-col justify-start items-start pointer-events-none overflow-visible pt-4 xs:pt-6 sm:pt-8">
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: shouldReduceMotion ? 0 : 0.1,
                }}
                className="relative w-full flex justify-start items-start will-change-transform"
              >
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  loading="eager"
                  fetchPriority="high"
                  className="w-auto select-none will-change-transform"
                  style={{
                    height: 'min(78svh, 625px)',
                    maxHeight: 'min(78svh, 625px)',
                    maxWidth: 'none',
                    transform: 'translateX(-30%)', // Shifted further to the left
                    filter: 'grayscale(100%) contrast(1.08) drop-shadow(0 14px 24px rgba(0, 0, 0, 0.10))',
                    maskImage: 'linear-gradient(to bottom, black 0%, black 72%, rgba(0, 0, 0, 0.70) 84%, rgba(0, 0, 0, 0.15) 94%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 72%, rgba(0, 0, 0, 0.70) 84%, rgba(0, 0, 0, 0.15) 94%, transparent 100%)',
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/images/projects/ChatGPT Image Sep 28, 2026, 03_14_07 PM.png';
                  }}
                />
              </motion.div>
            </div>

            {/* 2. RIGHT COLUMN: TYPOGRAPHY (Shifted further right and downward matching reference) */}
            <div className="flex-1 min-w-0 flex flex-col items-start justify-start z-20 pt-28 xs:pt-32 sm:pt-36 pl-9 xs:pl-12 sm:pl-16">
              <motion.div
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: shouldReduceMotion ? 0 : 0.25,
                }}
                className="w-full"
              >
                {mobileOverlayText ? (
                  mobileOverlayText
                ) : (
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
                )}
              </motion.div>
            </div>
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
