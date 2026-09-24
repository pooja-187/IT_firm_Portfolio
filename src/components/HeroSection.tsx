'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './Navigation';
import AuthorityBadge from './AuthorityBadge';
import StatusPill from './StatusPill';
import HeroCTA from './HeroCTA';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !portraitRef.current) return;

    // Smooth subtle scroll parallax
    const ctx = gsap.context(() => {
      gsap.to(portraitRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative min-h-screen w-full bg-[#FCFDF9] flex flex-col justify-between selection:bg-lime-300 hero-glow-container overflow-hidden"
    >
      {/* Saturated Ambient Diffused Lime-Green Studio Glow */}
      <div className="hero-glow-layer" aria-hidden="true" />

      {/* Top Header / Navigation (Z-30) */}
      <Navigation />

      {/* Main Hero Visual Composition (Z-20) */}
      <main className="relative z-20 flex-1 flex flex-col justify-between w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3 sm:py-6">
        
        {/* Top Prestige / Authority Laurel Badge */}
        <div className="flex justify-center mb-1 sm:mb-2">
          <AuthorityBadge />
        </div>

        {/* Central Headline Block (Crisp, High-Impact & 100% Uncovered) */}
        <div className="text-center relative z-20 max-w-4xl mx-auto select-none">
          <h1 className="flex flex-col items-center justify-center text-[#111315]">
            {/* Greeting Line */}
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] font-bold tracking-tight leading-[1.08] text-[#0E1113]">
              Hi I&apos;m Nashim
            </span>

            {/* Editorial Serif Italic Accent */}
            <span className="font-serif italic font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[5.4rem] leading-[1.02] text-[#111315] mt-0.5 sm:mt-1">
              Best UI UX Designer
            </span>
          </h1>

          {/* Clean Location & Credibility Subtitle */}
          <div className="mt-2 sm:mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-[#525B64]">
            <span>in Kottayam, Kerala</span>
            <span className="text-lime-500 font-bold">•</span>
            <span>Founder @ Manzio</span>
          </div>
        </div>

        {/* Central Subject Portrait Stage (Proportionally Scaled with TheConsultant7 Arrival & Studio Glow) */}
        <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[390px] lg:max-w-[430px] mx-auto flex items-end justify-center z-10 my-2 sm:my-3">
          
          {/* Synchronized Ambient Studio Backlight Aura */}
          <div
            ref={glowRef}
            className="consultant7-glow-arrive absolute bottom-4 inset-x-0 mx-auto w-4/5 h-4/5 rounded-full bg-gradient-to-t from-lime-400/60 via-lime-300/40 to-transparent blur-3xl pointer-events-none -z-10"
            aria-hidden="true"
          />

          {/* Arriving Picture Container */}
          <div
            ref={portraitRef}
            className="consultant7-arriving-picture w-full flex items-end justify-center relative"
          >
            {/* Cutout Silhouette / Portrait Graphic */}
            <div className="relative w-full h-[260px] sm:h-[320px] md:h-[370px] lg:h-[400px] rounded-t-[130px] sm:rounded-t-[170px] bg-gradient-to-b from-[#2B3035] via-[#1E2226] to-[#121518] shadow-2xl flex flex-col items-center justify-between p-5 sm:p-7 text-center border-t border-x border-slate-700/30 portrait-fade-mask">
              
              {/* Inner highlight */}
              <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-white/10 to-transparent rounded-t-[130px] sm:rounded-t-[170px] pointer-events-none" />

              {/* Silhouette graphics */}
              <div className="mt-2 sm:mt-4 relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-slate-300 mb-2 shadow-inner">
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300/80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-lime-400">
                  Official Portrait Area
                </span>
                <h3 className="text-white text-sm sm:text-base font-medium mt-0.5 font-apple">
                  Nashim Nazar
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 max-w-[200px]">
                  Drop <code className="text-lime-300 font-mono">nashim-portrait.png</code> into <code className="text-lime-300 font-mono">public/images/</code>
                </p>
              </div>

              {/* Credential pill */}
              <div className="relative z-10 pb-1 sm:pb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[10px] sm:text-[11px] text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  CEO &amp; Founder • Manzio
                </span>
              </div>

              {/* Bottom Gradient Fade */}
              <div className="absolute bottom-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-t from-[#FCFDF9] via-[#FCFDF9]/80 to-transparent pointer-events-none z-20" />
            </div>
          </div>

        </div>

        {/* Bottom Flanking Controls & Supporting Narrative (Z-30) */}
        <div className="relative z-30 w-full grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 items-center pt-3 sm:pt-4 border-t border-slate-200/50 mt-1 sm:mt-2">
          
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
            <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-[#1F2429] mb-0.5">
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

    </section>
  );
}
