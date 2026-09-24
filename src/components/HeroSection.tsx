import React from 'react';
import Navigation from './Navigation';
import AuthorityBadge from './AuthorityBadge';
import StatusPill from './StatusPill';
import PortraitDisplay from './PortraitDisplay';
import HeroCTA from './HeroCTA';

export default function HeroSection() {
  return (
    <div className="hero-glow-container min-h-screen flex flex-col justify-between relative selection:bg-lime-300">
      {/* Saturated Ambient Diffused Lime-Green Studio Light */}
      <div className="hero-glow-layer" aria-hidden="true" />

      {/* Top Header / Navigation */}
      <Navigation />

      {/* Main Hero Content Area with Generous Editorial Whitespace */}
      <main className="relative z-10 flex-1 flex flex-col justify-between w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-4 sm:pt-8 pb-12 sm:pb-16">
        
        {/* Top Prestige / Authority Laurel Badge */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <AuthorityBadge />
        </div>

        {/* Central Headline Block (Clean, Airy & Classy) */}
        <div className="text-center relative z-20 max-w-5xl mx-auto">
          <h1 className="flex flex-col items-center justify-center text-[#111315]">
            {/* Greeting */}
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-bold tracking-tight leading-[1.05] text-[#0E1113]">
              Hi I&apos;m Nashim
            </span>

            {/* Editorial Serif Italic Accent */}
            <span className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[1.02] text-[#111315] mt-1 sm:mt-2">
              Best UI UX Designer
            </span>
          </h1>

          {/* Clean, Subtle Location & Credibility Anchor */}
          <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-[#525B64]">
            <span>in Kottayam, Kerala</span>
            <span className="text-lime-500 font-bold">•</span>
            <span>Founder @ Manzio</span>
          </div>
        </div>

        {/* Central Subject Portrait with Refined Depth & Soft Feather Fade */}
        <div className="relative mt-2 sm:-mt-6 md:-mt-10 mb-0 z-10">
          <PortraitDisplay />
        </div>

        {/* Bottom Flanking Controls & Supporting Narrative with Balanced Breathing Room */}
        <div className="relative z-20 w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center pt-8 border-t border-slate-200/50 mt-4 sm:mt-8">
          
          {/* Left: Availability Status Indicator */}
          <div className="flex justify-center md:justify-start">
            <StatusPill />
          </div>

          {/* Center: Primary Call to Action */}
          <div className="flex justify-center">
            <HeroCTA label="Discuss Your Project" href="#contact" />
          </div>

          {/* Right: Editorial Supporting Narrative */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-[#1F2429] mb-1">
              Thoughtful design • Clear experiences • Results
            </p>
            <p className="text-xs text-[#525B64] max-w-xs leading-relaxed font-normal">
              Turning complex ideas into intuitive websites and high-converting digital products.
            </p>
          </div>

        </div>

      </main>

      {/* Hidden Rich Semantic Structure for Search Engines */}
      <section className="sr-only" aria-label="SEO Information">
        <h2>Nashim Nazar — Best UI UX Designer in Kottayam, Kerala</h2>
        <p>
          CEO &amp; Founder of Manzio Creative Studio Pvt Ltd. Specializing in UI/UX Design, Software Development, App Development, Performance Marketing, and Ethical Hacking. Delivering business-focused digital experiences.
        </p>
      </section>

    </div>
  );
}
