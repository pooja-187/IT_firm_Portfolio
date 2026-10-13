'use client';

import React from 'react';
import Image from 'next/image';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import { EditorialGridLines, EditorialRule } from '@/components/ui/EditorialGrid';

const aboutContent = [
  {
    tag: "01 / Founder & Creative Lead",
    title: "The person behind the work.",
    description:
      "I'm Nashim Nazar — a UI/UX designer, performance marketer, and CEO & Founder of Manzio Creative Studio Pvt Ltd. Dedicated to crafting digital experiences that perform, inspire, and drive real business growth.",
    content: (
      <div className="h-full w-full relative group">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          alt="Nashim Nazar & Manzio Creative Studio"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-6 lg:p-7">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#A3E635] text-black text-[10.5px] font-semibold tracking-wider uppercase w-fit mb-2 shadow-sm">
            Founder &amp; CEO
          </span>
          <h4 className="text-white text-lg sm:text-xl font-semibold tracking-tight">Nashim Nazar</h4>
          <p className="text-white/80 text-[11px] sm:text-xs mt-0.5 font-normal">Manzio Creative Studio Pvt Ltd</p>
        </div>
      </div>
    ),
  },
  {
    tag: "02 / Multidisciplinary Perspective",
    title: "Design, Technology & Marketing",
    description:
      "My work brings together design, technology, and marketing. I help businesses understand what their customers need and turn those insights into websites and digital products that are clear, useful, and easy to navigate.",
    content: (
      <div className="h-full w-full relative group">
        <Image
          src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          alt="Design and Technology Systems"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-6 lg:p-7">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#A3E635] text-black text-[10.5px] font-semibold tracking-wider uppercase w-fit mb-2 shadow-sm">
            Design Systems
          </span>
          <h4 className="text-white text-lg sm:text-xl font-semibold tracking-tight">Intuitive User Experiences</h4>
          <p className="text-white/80 text-[11px] sm:text-xs mt-0.5 font-normal">High-fidelity UI/UX &amp; responsive architectures</p>
        </div>
      </div>
    ),
  },
  {
    tag: "03 / User & Business Alignment",
    title: "User-Centered & Business Strategy",
    description:
      "As a designer, I focus on how an experience works, from the first interaction to the final action. As a founder, I also consider the business behind it: its goals, priorities, and opportunities for sustainable growth.",
    content: (
      <div className="h-full w-full relative group">
        <Image
          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          alt="Strategic Business Growth"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-6 lg:p-7">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#A3E635] text-black text-[10.5px] font-semibold tracking-wider uppercase w-fit mb-2 shadow-sm">
            Growth Strategy
          </span>
          <h4 className="text-white text-lg sm:text-xl font-semibold tracking-tight">Business-Driven Outcomes</h4>
          <p className="text-white/80 text-[11px] sm:text-xs mt-0.5 font-normal">Conversion optimization &amp; marketing scale</p>
        </div>
      </div>
    ),
  },
  {
    tag: "04 / End-to-End Execution",
    title: "Full-Cycle Team Delivery",
    description:
      "Through Manzio, I lead a creative team working across design, software and app development, marketing, and digital security. Depending on your project, we can support you from the initial idea through launch and ongoing improvement.",
    content: (
      <div className="h-full w-full relative group">
        <Image
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          alt="Engineering and Software Execution"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-6 lg:p-7">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#A3E635] text-black text-[10.5px] font-semibold tracking-wider uppercase w-fit mb-2 shadow-sm">
            Team Execution
          </span>
          <h4 className="text-white text-lg sm:text-xl font-semibold tracking-tight">Full-Cycle Engineering</h4>
          <p className="text-white/80 text-[11px] sm:text-xs mt-0.5 font-normal">Web apps, mobile solutions &amp; cybersecurity</p>
        </div>
      </div>
    ),
  },
];

import { contentService } from "@/services/ContentService";
import { STORAGE_KEYS } from "@/services/StorageService";
import { AboutCardItem } from "@/types/portfolio";
import { INITIAL_PORTFOLIO_DATA } from "@/services/seedData";

export function HeroSectionDemo() {
  const [aboutData, setAboutData] = React.useState<AboutCardItem[]>(INITIAL_PORTFOLIO_DATA.about);

  React.useEffect(() => {
    const loadAbout = () => {
      setAboutData(contentService.getAbout());
    };
    loadAbout();

    const unsubscribe = contentService.subscribe((key) => {
      if (key === STORAGE_KEYS.ABOUT) {
        loadAbout();
      }
    });

    return () => unsubscribe();
  }, []);

  const dynamicContent = React.useMemo(() => {
    if (!aboutData || aboutData.length === 0) {
      return aboutContent;
    }
    const defaultImages = [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    ];

    return aboutData.map((card: AboutCardItem, idx: number) => ({
      tag: card.tag || `0${idx + 1} / Highlight`,
      title: card.title,
      description: card.description,
      content: (
        <div className="h-full w-full relative group">
          <Image
            src={card.image || defaultImages[idx % defaultImages.length]}
            fill
            priority={idx === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            alt={card.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-6 lg:p-7">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#A3E635] text-black text-[10.5px] font-semibold tracking-wider uppercase w-fit mb-2 shadow-sm">
              {card.tag || "Leadership"}
            </span>
            <h4 className="text-white text-lg sm:text-xl font-semibold tracking-tight">{card.title}</h4>
            <p className="text-white/80 text-[11px] sm:text-xs mt-0.5 font-normal line-clamp-1">{card.description}</p>
          </div>
        </div>
      ),
    }));
  }, [aboutData]);

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-14 sm:pb-20 lg:pb-24 selection:bg-lime-200 scroll-mt-24 sm:scroll-mt-28"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `
          radial-gradient(
            ellipse 80% 50% at 50% 45%,
            rgba(163, 230, 53, 0.16) 0%,
            rgba(190, 242, 100, 0.08) 38%,
            rgba(217, 249, 157, 0.02) 65%,
            transparent 78%
          ),
          radial-gradient(
            ellipse 85% 55% at 75% 35%,
            rgba(163, 230, 53, 0.10) 0%,
            transparent 70%
          ),
          radial-gradient(
            ellipse 70% 45% at 25% 40%,
            rgba(132, 204, 22, 0.08) 0%,
            transparent 65%
          )
        `,
      }}
    >
      {/* Centered ambient lime glow orbs */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-[#A3E635]/12 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Level 3 Structural Editorial Grid Lines Foundation (Seamless across sections) */}
      <EditorialGridLines
        level={3}
        maxWidth="max-w-[1240px]"
        fadeEdges={false}
        className="z-0"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/5 mb-2.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              06 — ABOUT
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl lg:text-[42px] font-light text-[#111111] tracking-[-0.03em] leading-tight mb-2">
            The person behind the work.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#64748B] font-normal max-w-md mx-auto">
            Scroll through to explore the background, leadership philosophy, and multi-disciplinary capabilities behind Manzio.
          </p>
        </div>

        {/* Subtle Horizontal Rule framing the About card */}
        <div className="max-w-2xl mx-auto mb-7 sm:mb-8">
          <EditorialRule level={3} withCorners={true} />
        </div>

        {/* Scaled & Balanced Sticky Scroll Container */}
        <div className="w-full max-w-[980px] mx-auto">
          <StickyScroll
            content={dynamicContent}
            theme="light"
            panelHeight="h-[27rem] sm:h-[29rem] lg:h-[31rem]"
            className="bg-white/95 backdrop-blur-xl border border-lime-200/70 shadow-[0_20px_50px_rgba(163,230,53,0.07),0_3px_20px_rgba(0,0,0,0.025)]"
          />
        </div>

      </div>
    </section>
  );
}

export default HeroSectionDemo;
