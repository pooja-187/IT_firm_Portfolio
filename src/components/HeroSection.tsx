'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './Navigation';
import AuthorityBadge from './AuthorityBadge';
import StatusPill from './StatusPill';
import HeroCTA from './HeroCTA';

export default function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !trackRef.current || !portraitRef.current) {
      if (portraitRef.current) {
        gsap.set(portraitRef.current, { y: 0, scale: 1, opacity: 1 });
      }
      return;
    }

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isTablet: '(min-width: 640px) and (max-width: 1023px)',
        isMobile: '(max-width: 639px)',
      },
      (context) => {
        const { isDesktop, isTablet } = context.conditions as {
          isDesktop: boolean;
          isTablet: boolean;
          isMobile: boolean;
        };

        // Tuned distance from lower starting position to final hero destination
        const startY = isDesktop ? 320 : isTablet ? 220 : 140;
        const startScale = isDesktop ? 0.94 : 0.96;

        // Set initial lower position (starts below headline / lower viewport area)
        gsap.set(portraitRef.current, {
          y: startY,
          scale: startScale,
          opacity: 0.88,
          force3D: true,
        });

        if (glowRef.current) {
          gsap.set(glowRef.current, {
            y: startY * 0.7,
            scale: 0.8,
            opacity: 0.45,
            force3D: true,
          });
        }

        // Scrubbed transition timeline pinned through hero track
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top top',
            end: '+=480',
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        // Pull portrait up from lower position INTO final hero composition
        tl.to(portraitRef.current, {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          duration: 1,
        });

        if (glowRef.current) {
          tl.to(
            glowRef.current,
            {
              y: 0,
              scale: 1.05,
              opacity: 1,
              ease: 'power2.out',
              duration: 1,
            },
            0
          );
        }
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={trackRef}
      id="hero-section-track"
      className="relative w-full min-h-[145vh] bg-[#FCFDF9]"
    >
      {/* Pinned Sticky Hero Viewport */}
      <div
        ref={viewportRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden selection:bg-lime-300 hero-glow-container"
      >
        {/* Saturated Ambient Diffused Lime-Green Studio Light */}
        <div className="hero-glow-layer" aria-hidden="true" />

        {/* Top Header / Navigation */}
        <Navigation />

        {/* Main Hero Content Composition Area */}
        <main className="relative z-10 flex-1 flex flex-col justify-between w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-2 sm:pt-4 pb-8 sm:pb-12">
          
          {/* Top Prestige / Authority Laurel Badge */}
          <div className="flex justify-center mb-2 sm:mb-4">
            <AuthorityBadge />
          </div>

          {/* Central Headline Block (Stable Editorial Anchor) */}
          <div className="text-center relative z-20 max-w-5xl mx-auto pointer-events-none select-none">
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
            <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-[#525B64]">
              <span>in Kottayam, Kerala</span>
              <span className="text-lime-500 font-bold">•</span>
              <span>Founder @ Manzio</span>
            </div>
          </div>

          {/* Dedicated Portrait Stage (Final Hero Destination Layer) */}
          <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] mx-auto aspect-[3/4] flex items-end justify-center z-10 -mt-8 sm:-mt-16 md:-mt-24 mb-0">
            
            {/* Dynamic Synchronized Backlight Aura */}
            <div
              ref={glowRef}
              className="absolute bottom-4 inset-x-0 mx-auto w-4/5 h-4/5 rounded-full bg-gradient-to-t from-lime-400/60 via-lime-300/40 to-transparent blur-3xl pointer-events-none -z-10 will-change-transform"
              aria-hidden="true"
            />

            {/* Scroll-Driven Moving Portrait Figure */}
            <div
              ref={portraitRef}
              className="w-full h-full flex items-end justify-center will-change-transform"
            >
              {/* Refined Editorial Silhouette / Portrait Placeholder with Preserved Arch Mask */}
              <div className="relative w-full h-full flex flex-col items-center justify-end portrait-fade-mask">
                <div className="relative w-full max-w-[420px] h-[440px] sm:h-[500px] md:h-[540px] rounded-t-[140px] sm:rounded-t-[180px] bg-gradient-to-b from-[#2B3035] via-[#1E2226] to-[#121518] shadow-2xl flex flex-col items-center justify-between p-8 text-center border-t border-x border-slate-700/30">
                  {/* Inner highlight */}
                  <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/10 to-transparent rounded-t-[140px] sm:rounded-t-[180px] pointer-events-none" />

                  {/* Silhouette graphics */}
                  <div className="mt-8 relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-slate-300 mb-4 shadow-inner">
                      <svg
                        className="w-14 h-14 text-slate-300/80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span className="text-xs uppercase tracking-widest font-semibold text-lime-400">
                      Official Portrait Area
                    </span>
                    <h3 className="text-white text-base sm:text-lg font-medium mt-1 font-apple">
                      Nashim Nazar
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
                      Drop <code className="text-lime-300 font-mono">nashim-portrait.png</code> into <code className="text-lime-300 font-mono">public/images/</code>
                    </p>
                  </div>

                  {/* Credential pill */}
                  <div className="relative z-10 pb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                      CEO &amp; Founder • Manzio
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Flanking Controls & Supporting Narrative with Balanced Breathing Room */}
          <div className="relative z-20 w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 items-center pt-4 sm:pt-6 border-t border-slate-200/50 mt-2 sm:mt-4">
            
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

        {/* Hidden Rich Semantic Structure for Search Crawlers */}
        <section className="sr-only" aria-label="SEO Information">
          <h2>Nashim Nazar — Best UI UX Designer in Kottayam, Kerala</h2>
          <p>
            CEO &amp; Founder of Manzio Creative Studio Pvt Ltd. Specializing in UI/UX Design, Software Development, App Development, Performance Marketing, and Ethical Hacking. Delivering business-focused digital experiences.
          </p>
        </section>

      </div>
    </div>
  );
}
