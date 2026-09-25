'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles, Layers, CheckCircle2, X } from 'lucide-react';
import { IMAGES_1, IMAGES_2, IMAGES_3, ProjectItem } from '@/data/projects';

export default function SelectedWorkSection() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyTrackRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !stickyTrackRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Sticky Scroll Parallax Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=180%',
            pin: stickyTrackRef.current,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        // Left Column: Moves Vertically DOWNWARD
        if (col1Ref.current) {
          tl.fromTo(
            col1Ref.current,
            { yPercent: -15 },
            { yPercent: 15, ease: 'none' },
            0
          );
        }

        // Center Column: Moves Vertically UPWARD (Dominant Visual Axis)
        if (col2Ref.current) {
          tl.fromTo(
            col2Ref.current,
            { yPercent: 20 },
            { yPercent: -20, ease: 'none' },
            0
          );
        }

        // Right Column: Moves Vertically DOWNWARD
        if (col3Ref.current) {
          tl.fromTo(
            col3Ref.current,
            { yPercent: -18 },
            { yPercent: 18, ease: 'none' },
            0
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="work"
      aria-labelledby="selected-work-title"
      className="relative w-full bg-white text-[#111315] selection:bg-lime-300"
    >
      {/* ===================================================
          STICKY GALLERY CONTAINER (DESKTOP)
         =================================================== */}
      <div
        ref={stickyTrackRef}
        className="w-full min-h-screen flex flex-col justify-between pt-16 sm:pt-20 pb-12 overflow-hidden relative"
      >
        {/* Ambient Lime Studio Glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(162,246,36,0.14)_0%,rgba(184,252,60,0.06)_45%,transparent_75%)] blur-3xl pointer-events-none -z-10"
        />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">
          
          {/* Section Intro Header */}
          <div className="max-w-4xl mb-8 lg:mb-12">
            
            {/* Small Editorial Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
              <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
                03 — SELECTED WORK
              </span>
            </div>

            {/* Main Refined Statement */}
            <h2
              id="selected-work-title"
              className="font-sans font-normal tracking-[-0.03em] text-[#0E1113] text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.12]"
            >
              Selected work where{' '}
              <span className="font-serif italic font-normal text-[#111315]">
                design
              </span>
              , technology and{' '}
              <span className="text-[#64748B]">business come together.</span>
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#525B64] font-normal">
              <span>A curated selection of digital experiences shaped through design, technology and business-focused thinking.</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="font-medium text-[#1E242B] hidden sm:inline">Design expertise. Marketing perspective. Founder-led execution.</span>
            </div>
          </div>

          {/* Desktop 3-Column Parallax Gallery */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_1.24fr_1fr] gap-7 xl:gap-9 items-center relative flex-1 min-h-[520px] max-h-[620px] overflow-visible py-4">
            
            {/* Left Column (IMAGES_1) */}
            <div
              ref={col1Ref}
              className="flex flex-col gap-8 will-change-transform"
            >
              {IMAGES_1.map((project) => (
                <GalleryCard
                  key={project.id}
                  project={project}
                  isDimmed={hoveredId !== null && hoveredId !== project.id}
                  isHovered={hoveredId === project.id}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveProject(project)}
                />
              ))}
            </div>

            {/* Center Column (IMAGES_2 - Dominant Visual Axis) */}
            <div
              ref={col2Ref}
              className="flex flex-col gap-8 will-change-transform"
            >
              {IMAGES_2.map((project) => (
                <GalleryCard
                  key={project.id}
                  project={project}
                  isDominant
                  isDimmed={hoveredId !== null && hoveredId !== project.id}
                  isHovered={hoveredId === project.id}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveProject(project)}
                />
              ))}
            </div>

            {/* Right Column (IMAGES_3) */}
            <div
              ref={col3Ref}
              className="flex flex-col gap-8 will-change-transform"
            >
              {IMAGES_3.map((project) => (
                <GalleryCard
                  key={project.id}
                  project={project}
                  isDimmed={hoveredId !== null && hoveredId !== project.id}
                  isHovered={hoveredId === project.id}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveProject(project)}
                />
              ))}
            </div>

          </div>

          {/* Mobile Vertical Editorial Layout */}
          <div className="lg:hidden flex flex-col gap-10 mt-6">
            {[...IMAGES_1, ...IMAGES_2, ...IMAGES_3].map((project) => (
              <div
                key={`mobile-${project.id}`}
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.04)] overflow-hidden"
              >
                <div
                  className="relative w-full aspect-[16/10] overflow-hidden cursor-pointer"
                  onClick={() => setActiveProject(project)}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.category}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-medium">
                    <span className="font-mono text-lime-400">{project.number}</span>
                    <span>{project.title}</span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111315] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525B64] font-normal leading-relaxed mb-4">
                    {project.tagline}
                  </p>

                  <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-700 mb-5">
                    <div>
                      <span className="font-semibold uppercase tracking-wider text-[#111315] text-[10px] block mb-0.5">
                        Challenge
                      </span>
                      <p className="text-slate-600 font-normal leading-relaxed">{project.challenge}</p>
                    </div>
                    <div>
                      <span className="font-semibold uppercase tracking-wider text-[#111315] text-[10px] block mb-0.5">
                        Contribution
                      </span>
                      <p className="text-slate-600 font-normal leading-relaxed">{project.contribution}</p>
                    </div>
                    <div>
                      <span className="font-semibold uppercase tracking-wider text-[#111315] text-[10px] block mb-0.5">
                        Outcome
                      </span>
                      <p className="text-slate-600 font-normal leading-relaxed">{project.outcome}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#111315] text-white text-xs font-semibold hover:bg-black transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-lime-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ===================================================
          ACTIVE PROJECT CASE STUDY MODAL
         =================================================== */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/60 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveProject(null)}
        >
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 max-w-4xl max-h-[80vh] m-auto bg-[radial-gradient(ellipse_at_center,rgba(162,246,36,0.30)_0%,rgba(184,252,60,0.10)_50%,transparent_75%)] blur-2xl pointer-events-none -z-10"
          />

          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.25)] border border-slate-200/80 overflow-y-auto flex flex-col md:flex-row animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close Case Study"
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md transition-transform hover:scale-105"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Project Image */}
            <div className="relative w-full md:w-1/2 min-h-[280px] sm:min-h-[360px] md:min-h-[500px] bg-slate-100 shrink-0">
              <Image
                src={activeProject.image}
                alt={`${activeProject.title} case study presentation`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            {/* Right: Structured Case Study Highlights */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {activeProject.number}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {activeProject.category}
                  </span>
                </div>

                <h3
                  id="modal-project-title"
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111315] mb-2"
                >
                  {activeProject.title}
                </h3>
                <p className="text-sm text-[#525B64] font-normal leading-relaxed mb-6">
                  {activeProject.tagline}
                </p>

                {/* Challenge, Contribution, Outcome */}
                <div className="space-y-4 text-xs sm:text-sm text-slate-700 pt-4 border-t border-slate-100">
                  <div>
                    <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[#111315] flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-lime-600" />
                      Client Challenge
                    </h4>
                    <p className="text-slate-600 font-normal leading-relaxed pl-5">
                      {activeProject.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[#111315] flex items-center gap-1.5 mb-1">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      Nashim&apos;s Contribution
                    </h4>
                    <p className="text-slate-600 font-normal leading-relaxed pl-5">
                      {activeProject.contribution}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[#111315] flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Outcome
                    </h4>
                    <p className="text-slate-600 font-normal leading-relaxed pl-5">
                      {activeProject.outcome}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <a
                  href="#contact"
                  onClick={() => setActiveProject(null)}
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#111315] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all hover:scale-[1.02]"
                >
                  <span>Discuss Project</span>
                  <ArrowUpRight className="w-4 h-4 text-lime-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Back to Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// =========================================================================
// Individual Desktop Gallery Card
// =========================================================================
interface GalleryCardProps {
  project: ProjectItem;
  isDominant?: boolean;
  isDimmed: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function GalleryCard({
  project,
  isDominant = false,
  isDimmed,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: GalleryCardProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out select-none ${
        isDimmed ? 'opacity-30 blur-[1px] scale-[0.98]' : 'opacity-100 scale-100'
      } ${
        isHovered
          ? 'z-20 scale-[1.04] shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
          : 'shadow-[0_8px_25px_rgba(0,0,0,0.04)]'
      } ${
        isDominant
          ? project.aspectRatio === 'portrait'
            ? 'aspect-[3/4] min-h-[380px]'
            : 'aspect-[4/3] min-h-[300px]'
          : project.aspectRatio === 'portrait'
          ? 'aspect-[3/4] min-h-[320px]'
          : 'aspect-[4/3] min-h-[260px]'
      } bg-slate-50 border border-slate-200/70`}
    >
      {/* Ambient Green Glow on Hover */}
      <div
        aria-hidden="true"
        className={`absolute -inset-4 rounded-3xl pointer-events-none transition-opacity duration-500 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(162,246,36,0.40)_0%,rgba(184,252,60,0.16)_48%,transparent_72%)] blur-xl ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Project Image */}
      <Image
        src={project.image}
        alt={`${project.title} — ${project.category}`}
        fill
        sizes="(max-width: 1280px) 33vw, 420px"
        className={`object-cover object-center transition-transform duration-700 ease-out ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
      />

      {/* Floating Index Tag */}
      <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm text-xs font-medium text-[#181C20] transition-transform duration-300 group-hover:scale-105">
        <span className="font-mono font-semibold text-slate-500">{project.number}</span>
        <span className="w-1 h-1 rounded-full bg-lime-500" />
        <span className="font-semibold tracking-tight">{project.title}</span>
      </div>

      {/* Bottom Floating Info Preview on Hover */}
      <div
        className={`absolute inset-x-3.5 bottom-3.5 z-10 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out flex items-center justify-between gap-3 ${
          isHovered
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block truncate">
            {project.category}
          </span>
          <span className="text-xs font-medium text-slate-800 truncate block">
            {project.tagline}
          </span>
        </div>

        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#111315] text-white shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-colors">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}
