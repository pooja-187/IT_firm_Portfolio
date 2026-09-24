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
  const sectionRef = useRef<HTMLElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const portraitLayerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    // Scroll-driven Parallax (matching the exact theconsultant7.in scroll interaction)
    const ctx = gsap.context(() => {
      // Image scroll parallax: moves slightly upward (-50px) and fades out smoothly on scroll
      if (portraitLayerRef.current) {
        gsap.to(portraitLayerRef.current, {
          y: -50,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=450',
            scrub: true,
          },
        });
      }

      // Background typography parallax: moves downward (+120px) creating deep 3D separation
      if (textLayerRef.current) {
        gsap.to(textLayerRef.current, {
          y: 120,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=450',
            scrub: true,
          },
        });
      }

      // Backlight glow parallax
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.2,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=450',
            scrub: true,
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
      className="relative h-screen w-full overflow-hidden bg-[#FCFDF9] flex flex-col justify-between items-center selection:bg-lime-300 hero-glow-container"
    >
      {/* Saturated Ambient Lime Studio Glow System */}
      <div className="hero-glow-layer" aria-hidden="true" />

      {/* Top Header / Navigation (Z-50) */}
      <Navigation />

      {/* Background Central Headline & Authority Layer (Z-10) */}
      <div
        ref={textLayerRef}
        className="absolute top-[22%] sm:top-[20%] md:top-[18%] inset-x-0 mx-auto max-w-5xl px-6 text-center z-10 pointer-events-none select-none will-change-transform"
      >
        {/* Top Authority Laurel Badge */}
        <div className="flex justify-center mb-2 sm:mb-4">
          <AuthorityBadge />
        </div>

        {/* Headline */}
        <h1 className="flex flex-col items-center justify-center text-[#111315]">
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-bold tracking-tight leading-[1.05] text-[#0E1113]">
            Hi I&apos;m Nashim
          </span>
          <span className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[1.02] text-[#111315] mt-1 sm:mt-2">
            Best UI UX Designer
          </span>
        </h1>

        {/* Location & Credibility Anchor */}
        <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-[#525B64]">
          <span>in Kottayam, Kerala</span>
          <span className="text-lime-500 font-bold">•</span>
          <span>Founder @ Manzio</span>
        </div>
      </div>

      {/* Central Portrait Figure — Exactly Matching TheConsultant7 Layout, Sizing & Motion (Z-30) */}
      <div
        ref={portraitLayerRef}
        className="relative z-30 h-[60vh] sm:h-[75vh] md:h-[84vh] w-full max-w-5xl flex items-end justify-center pointer-events-none mb-12 sm:mb-8"
      >
        {/* Dynamic Backlight Aura Synchronized with Entrance */}
        <div
          ref={glowRef}
          className="consultant7-glow-arrive absolute bottom-12 inset-x-0 mx-auto w-3/5 h-3/5 rounded-full bg-gradient-to-t from-lime-400/60 via-lime-300/40 to-transparent blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* TheConsultant7 Arriving Picture Motion Container (Scale 1.1 -> 1.0, Y: 100px -> 0, Blur: 10px -> 0 over 1.5s) */}
        <div className="consultant7-arriving-picture w-full h-full flex items-end justify-center relative">
          
          {/* Portrait Image or Branded Editorial Placeholder */}
          <div className="relative h-full w-auto aspect-[3/4] max-w-[440px] sm:max-w-[500px] md:max-w-[560px] flex items-end justify-center">
            
            {/* Cutout Silhouette / Portrait Graphic */}
            <div className="relative w-full h-full flex flex-col items-center justify-end">
              <div className="relative w-full h-[440px] sm:h-[500px] md:h-[560px] rounded-t-[140px] sm:rounded-t-[180px] bg-gradient-to-b from-[#2B3035] via-[#1E2226] to-[#121518] shadow-2xl flex flex-col items-center justify-between p-8 text-center border-t border-x border-slate-700/30">
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
                <div className="relative z-10 pb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                    CEO &amp; Founder • Manzio
                  </span>
                </div>
              </div>
            </div>

            {/* TheConsultant7 Bottom Gradient Fade (Blends subject seamlessly into the canvas) */}
            <div className="absolute bottom-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-t from-[#FCFDF9] via-[#FCFDF9]/85 to-transparent pointer-events-none z-20" />
          </div>

        </div>
      </div>

      {/* Bottom Controls & Flanking Content Layer (Z-40) */}
      <div className="relative z-40 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-6 sm:pb-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 items-center pt-4 border-t border-slate-200/50">
          
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
      </div>

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
