'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X, Sparkles, Layers } from 'lucide-react';
import { projectsData, ProjectItem } from '@/data/projects';

export default function SelectedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const centerColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const leftProjects = projectsData.filter((p) => p.column === 'left');
  const centerProjects = projectsData.filter((p) => p.column === 'center');
  const rightProjects = projectsData.filter((p) => p.column === 'right');

  // GSAP 3-Column Scroll Parallax
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !galleryRef.current) return;

    const ctx = gsap.context(() => {
      // Intro Reveal
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Parallax scroll for columns only on desktop (lg: >= 1024px)
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Left Column: Moves vertically DOWNWARD as user scrolls
        if (leftColRef.current) {
          gsap.fromTo(
            leftColRef.current,
            { y: -60 },
            {
              y: 70,
              ease: 'none',
              scrollTrigger: {
                trigger: galleryRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }

        // Center Column: Moves vertically UPWARD (main visual axis)
        if (centerColRef.current) {
          gsap.fromTo(
            centerColRef.current,
            { y: 80 },
            {
              y: -80,
              ease: 'none',
              scrollTrigger: {
                trigger: galleryRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.4,
              },
            }
          );
        }

        // Right Column: Moves vertically DOWNWARD
        if (rightColRef.current) {
          gsap.fromTo(
            rightColRef.current,
            { y: -70 },
            {
              y: 80,
              ease: 'none',
              scrollTrigger: {
                trigger: galleryRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="selected-work-heading"
      className="relative w-full bg-white text-[#111315] py-24 sm:py-32 lg:py-40 overflow-hidden selection:bg-lime-300"
    >
      {/* Background Soft Ambient Light for depth */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(162,246,36,0.12)_0%,rgba(214,255,115,0.06)_45%,transparent_70%)] blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================================================
            1. SECTION INTRO (Editorial Minimalism)
           =================================================== */}
        <div ref={introRef} className="max-w-3xl mb-16 sm:mb-24 lg:mb-28">
          
          {/* Small Editorial Section Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/70 mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
            <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              03 — SELECTED WORK
            </span>
          </div>

          {/* Large Refined Statement */}
          <h2
            id="selected-work-heading"
            className="font-sans font-normal tracking-[-0.03em] text-[#0E1113] text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.14] sm:leading-[1.12]"
          >
            Selected work where{' '}
            <span className="font-serif italic font-normal text-[#111315] mr-1">
              design
            </span>
            , technology and{' '}
            <span className="text-[#64748B]">business come together.</span>
          </h2>
          
          <p className="mt-5 text-sm sm:text-base text-[#525B64] font-normal max-w-xl leading-relaxed">
            A curated collection of client acquisitions, digital product architectures, and brand platforms built with precision.
          </p>
        </div>

        {/* ===================================================
            2. DESKTOP THREE-COLUMN GALLERY (Parallax & Hover)
           =================================================== */}
        <div
          ref={galleryRef}
          className="hidden lg:grid lg:grid-cols-[1fr_1.22fr_1fr] gap-8 xl:gap-10 relative items-start"
        >
          {/* Left Column (Downward Motion) */}
          <div ref={leftColRef} className="flex flex-col gap-10 xl:gap-14 will-change-transform">
            {leftProjects.map((project) => (
              <ProjectCardItem
                key={project.id}
                project={project}
                isDimmed={hoveredProjectId !== null && hoveredProjectId !== project.id}
                isHovered={hoveredProjectId === project.id}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>

          {/* Center Column (Dominant Visual Axis - Upward Motion) */}
          <div ref={centerColRef} className="flex flex-col gap-10 xl:gap-14 will-change-transform pt-4">
            {centerProjects.map((project) => (
              <ProjectCardItem
                key={project.id}
                project={project}
                isDominant
                isDimmed={hoveredProjectId !== null && hoveredProjectId !== project.id}
                isHovered={hoveredProjectId === project.id}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>

          {/* Right Column (Downward Motion) */}
          <div ref={rightColRef} className="flex flex-col gap-10 xl:gap-14 will-change-transform pt-8">
            {rightProjects.map((project) => (
              <ProjectCardItem
                key={project.id}
                project={project}
                isDimmed={hoveredProjectId !== null && hoveredProjectId !== project.id}
                isHovered={hoveredProjectId === project.id}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            3. MOBILE & TABLET EDITORIAL EXPERIENCE (< 1024px)
           =================================================== */}
        <div className="lg:hidden flex flex-col gap-12 sm:gap-16">
          {projectsData.map((project) => (
            <div
              key={`mobile-${project.id}`}
              className="group bg-white rounded-3xl border border-slate-100/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300"
            >
              {/* Image Container */}
              <div
                className={`relative w-full overflow-hidden cursor-pointer ${
                  project.aspectRatio === 'portrait' ? 'aspect-[4/5]' : 'aspect-[16/10]'
                }`}
                onClick={() => setActiveProject(project)}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.category}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md text-white text-xs font-medium">
                  <span>{project.number}</span>
                  <span className="text-lime-400">•</span>
                  <span>{project.title}</span>
                </div>
              </div>

              {/* Editorial Details */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{project.year}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111315] mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-[#525B64] leading-relaxed mb-6 font-normal">
                  {project.tagline}
                </p>

                {/* Challenge & Contribution Preview */}
                <div className="space-y-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-700 mb-6">
                  <div>
                    <span className="font-semibold uppercase tracking-wider text-[#111315] text-[11px] block mb-1">
                      Challenge
                    </span>
                    <p className="text-slate-600 font-normal leading-relaxed">{project.challenge}</p>
                  </div>
                  <div>
                    <span className="font-semibold uppercase tracking-wider text-[#111315] text-[11px] block mb-1">
                      Contribution
                    </span>
                    <p className="text-slate-600 font-normal leading-relaxed">{project.contribution}</p>
                  </div>
                  <div>
                    <span className="font-semibold uppercase tracking-wider text-[#111315] text-[11px] block mb-1">
                      Outcome
                    </span>
                    <p className="text-slate-600 font-normal leading-relaxed">{project.outcome}</p>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 rounded-full bg-[#111315] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-colors"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-lime-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ===================================================
          4. ACTIVE PROJECT EXPANSION MODAL / MINI CASE STUDY
         =================================================== */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="active-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/60 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveProject(null)}
        >
          {/* Ambient Glow behind active dialog */}
          <div
            aria-hidden="true"
            className="absolute inset-0 max-w-4xl max-h-[85vh] m-auto bg-[radial-gradient(ellipse_at_center,rgba(162,246,36,0.35)_0%,rgba(184,252,60,0.12)_50%,transparent_75%)] blur-2xl pointer-events-none -z-10"
          />

          {/* Modal Container */}
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl sm:rounded-[2rem] shadow-[0_25px_70px_rgba(0,0,0,0.25)] border border-slate-200/80 overflow-y-auto overflow-x-hidden flex flex-col md:flex-row animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close Case Study"
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md transition-all duration-200 hover:scale-105"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left/Top: Large Project Artwork */}
            <div className="relative w-full md:w-1/2 min-h-[300px] sm:min-h-[380px] md:min-h-[520px] bg-slate-100 shrink-0">
              <Image
                src={activeProject.image}
                alt={`${activeProject.title} presentation`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />
              <div className="absolute bottom-4 left-4 md:hidden text-white">
                <span className="font-mono text-xs uppercase tracking-widest text-lime-400">
                  {activeProject.number}
                </span>
                <h3 className="text-2xl font-bold">{activeProject.title}</h3>
              </div>
            </div>

            {/* Right/Bottom: Mini Case Study Content */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {activeProject.number}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {activeProject.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-medium">{activeProject.year}</span>
                </div>

                {/* Title */}
                <h3
                  id="active-project-title"
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111315] mb-2"
                >
                  {activeProject.title}
                </h3>
                
                <p className="text-sm sm:text-base text-[#525B64] font-normal leading-relaxed mb-6">
                  {activeProject.tagline}
                </p>

                {/* Metadata Pill Grid */}
                <div className="grid grid-cols-2 gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-100 text-xs mb-6">
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] block">Client</span>
                    <span className="font-medium text-slate-800">{activeProject.client}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] block">Role</span>
                    <span className="font-medium text-slate-800">{activeProject.role}</span>
                  </div>
                </div>

                {/* Structured Case Study Highlights */}
                <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <div>
                    <h4 className="font-semibold uppercase tracking-wider text-[11px] text-[#111315] flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-lime-600" />
                      Challenge
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
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ml-0.5" />
                      Outcome
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

              {/* Modal Footer CTA */}
              <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <a
                  href="#contact"
                  onClick={() => setActiveProject(null)}
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#111315] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all duration-300 hover:scale-[1.02] shadow-sm"
                >
                  <span>Discuss Similar Project</span>
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
// Individual Desktop Project Card Item
// =========================================================================
interface ProjectCardItemProps {
  project: ProjectItem;
  isDominant?: boolean;
  isDimmed: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function ProjectCardItem({
  project,
  isDominant = false,
  isDimmed,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: ProjectCardItemProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`group relative rounded-[1.75rem] overflow-hidden cursor-pointer transition-all duration-500 ease-out select-none ${
        isDimmed ? 'opacity-30 blur-[1px] scale-[0.98]' : 'opacity-100 scale-100'
      } ${
        isHovered
          ? 'z-20 scale-[1.04] shadow-[0_20px_50px_rgba(0,0,0,0.14)]'
          : 'shadow-[0_8px_30px_rgba(0,0,0,0.05)]'
      } ${
        isDominant
          ? project.aspectRatio === 'portrait'
            ? 'aspect-[3/4] min-h-[460px]'
            : 'aspect-[4/3] min-h-[380px]'
          : project.aspectRatio === 'portrait'
          ? 'aspect-[3/4] min-h-[400px]'
          : 'aspect-[4/3] min-h-[320px]'
      } bg-slate-50 border border-slate-200/70`}
    >
      {/* Background Soft Ambient Hover Glow */}
      <div
        aria-hidden="true"
        className={`absolute -inset-4 rounded-[2rem] pointer-events-none transition-opacity duration-500 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(162,246,36,0.38)_0%,rgba(184,252,60,0.15)_48%,transparent_72%)] blur-xl ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Main Image */}
      <Image
        src={project.image}
        alt={`${project.title} — ${project.category}`}
        fill
        sizes="(max-width: 1280px) 33vw, 400px"
        className={`object-cover object-center transition-transform duration-700 ease-out ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
      />

      {/* Top Floating Glass Index Pill */}
      <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm text-xs font-medium text-[#181C20] transition-transform duration-300 group-hover:scale-105">
        <span className="font-mono font-semibold text-slate-500">{project.number}</span>
        <span className="w-1 h-1 rounded-full bg-lime-500" />
        <span className="font-semibold tracking-tight">{project.title}</span>
      </div>

      {/* Bottom Floating Glass Details Reveal */}
      <div
        className={`absolute inset-x-4 bottom-4 z-10 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition-all duration-400 ease-out flex items-center justify-between gap-3 ${
          isHovered
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block truncate">
            {project.category}
          </span>
          <span className="text-xs font-medium text-slate-800 line-clamp-1">
            {project.tagline}
          </span>
        </div>

        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#111315] text-white shrink-0 group-hover:bg-lime-400 group-hover:text-black transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}
