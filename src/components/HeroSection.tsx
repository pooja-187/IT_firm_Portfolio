'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './Navigation';
import AuthorityBadge from './AuthorityBadge';
import StatusPill from './StatusPill';
import HeroCTA from './HeroCTA';

export default function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const portraitTargetRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !trackRef.current || !portraitTargetRef.current) {
      if (portraitTargetRef.current) {
        gsap.set(portraitTargetRef.current, { y: 0, scale: 1, opacity: 1 });
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
        // (starts below, travels upward into the dedicated hero frame without overlapping the headline)
        const startY = isDesktop ? 220 : isTablet ? 150 : 90;
        const startScale = isDesktop ? 0.94 : 0.96;

        // Set initial lower position (State A: before scroll)
        gsap.set(portraitTargetRef.current, {
          y: startY,
          scale: startScale,
          opacity: 0.85,
          force3D: true,
        });

        if (glowRef.current) {
          gsap.set(glowRef.current, {
            y: startY * 0.6,
            scale: 0.8,
            opacity: 0.4,
            force3D: true,
          });
        }

        // Scrubbed scroll animation pulling portrait into its exact final hero destination (State B: after scroll)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top top',
            end: '+=450',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        tl.to(portraitTargetRef.current, {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power1.out',
          duration: 1,
        });

        if (glowRef.current) {
          tl.to(
            glowRef.current,
            {
              y: 0,
              scale: 1.05,
              opacity: 1,
              ease: 'power1.out',
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
      id="hero-track-container"
      className="relative w-full min-h-[145vh] bg-[#FCFDF9]"
    >
      {/* Pinned Sticky Hero Viewport (Keeps composition locked during the transition) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden selection:bg-lime-300 hero-glow-container">
        
        {/* Saturated Ambient Diffused Lime-Green Studio Light */}
        <div className="hero-glow-layer" aria-hidden="true" />

        {/* Top Header / Navigation (Z-40) */}
        <Navigation />

        {/* Main Hero Visual Composition Container (Z-20) */}
        <main className="relative z-20 flex-1 flex flex-col justify-between w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-2 sm:pt-4 pb-6 sm:pb-8">
          
          {/* Top Prestige / Authority Laurel Badge */}
          <div className="flex justify-center mb-1 sm:mb-3">
            <AuthorityBadge />
          </div>

          {/* Central Headline Block (Stable Editorial Anchor — 100% Legible & Uncovered) */}
          <div className="text-center relative z-30 max-w-5xl mx-auto select-none">
            <h1 className="flex flex-col items-center justify-center text-[#111315]">
              {/* Greeting */}
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.08] text-[#0E1113]">
                Hi I&apos;m Nashim
              </span>

              {/* Editorial Serif Italic Accent */}
              <span className="font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[6.2rem] leading-[1.03] text-[#111315] mt-0.5 sm:mt-1">
                Best UI UX Designer
              </span>
            </h1>

            {/* Clean, Subtle Location & Credibility Anchor */}
            <div className="mt-2 sm:mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-[#525B64]">
              <span>in Kottayam, Kerala</span>
              <span className="text-lime-500 font-bold">•</span>
              <span>Founder @ Manzio</span>
            </div>
          </div>

          {/* Dedicated Portrait Stage — Framed Directly Below the Headline without Covering Text */}
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[480px] mx-auto aspect-[3/4] flex items-end justify-center z-20 my-auto">
            
            {/* Synchronized Ambient Studio Backlight Aura */}
            <div
              ref={glowRef}
              className="absolute bottom-4 inset-x-0 mx-auto w-4/5 h-4/5 rounded-full bg-gradient-to-t from-lime-400/60 via-lime-300/40 to-transparent blur-3xl pointer-events-none -z-10 will-change-transform"
              aria-hidden="true"
            />

            {/* Scroll-Driven Moving Portrait Wrapper */}
            <div
              ref={portraitTargetRef}
              className="w-full h-full flex items-end justify-center will-change-transform"
            >
              {/* Editorial Cutout Silhouette / Portrait Graphic with Arch Mask */}
              <div className="relative w-full h-full flex flex-col items-center justify-end portrait-fade-mask">
                <div className="relative w-full max-w-[420px] h-[360px] sm:h-[440px] md:h-[490px] rounded-t-[140px] sm:rounded-t-[180px] bg-gradient-to-b from-[#2B3035] via-[#1E2226] to-[#121518] shadow-2xl flex flex-col items-center justify-between p-6 sm:p-8 text-center border-t border-x border-slate-700/30">
                  {/* Inner highlight */}
                  <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-white/10 to-transparent rounded-t-[140px] sm:rounded-t-[180px] pointer-events-none" />

                  {/* Silhouette graphics */}
                  <div className="mt-4 sm:mt-6 relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-slate-300 mb-3 shadow-inner">
                      <svg
                        className="w-12 h-12 sm:w-14 sm:h-14 text-slate-300/80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-lime-400">
                      Official Portrait Area
                    </span>
                    <h3 className="text-white text-base sm:text-lg font-medium mt-1 font-apple">
                      Nashim Nazar
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-1 max-w-[220px]">
                      Drop <code className="text-lime-300 font-mono">nashim-portrait.png</code> into <code className="text-lime-300 font-mono">public/images/</code>
                    </p>
                  </div>

                  {/* Credential pill */}
                  <div className="relative z-10 pb-2 sm:pb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                      CEO &amp; Founder • Manzio
                    </span>
                  </div>
                </div>

                {/* Bottom Gradient Fade Layer */}
                <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-t from-[#FCFDF9] via-[#FCFDF9]/80 to-transparent pointer-events-none z-20" />
              </div>
            </div>

          </div>

          {/* Bottom Flanking Controls & Supporting Narrative (Z-30) */}
          <div className="relative z-30 w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 items-center pt-3 sm:pt-4 border-t border-slate-200/50 mt-1 sm:mt-2">
            
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
