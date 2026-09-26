'use client';

import React from 'react';
import { cn } from "@/lib/utils";
import { motion, Variants } from 'framer-motion';

export interface AboutSectionProps {
  className?: string;
  sectionLabel?: string;
  heading?: string;
  paragraphs?: string[];
  cta?: {
    text: string;
    href: string;
  };
  imageSrc?: string;
}

export const HeroSection = React.forwardRef<HTMLElement, AboutSectionProps>(
  (
    {
      className,
      sectionLabel = "ABOUT",
      heading = "The person behind the work.",
      paragraphs = [
        "I'm Nashim Nazar — a UI/UX designer, performance marketer, and CEO & Founder of Manzio Creative Studio Pvt Ltd.",
        "My work brings together design, technology, and marketing. I help businesses understand what their customers need and turn those insights into websites and digital products that are clear, useful, and easy to navigate.",
        "As a designer, I focus on how an experience works, from the first interaction to the final action. As a founder, I also consider the business behind it: its goals, priorities, and opportunities for growth.",
        "Through Manzio, I lead a creative team working across design, software and app development, marketing, and digital security. Depending on your project, we can support you from the initial idea through launch and ongoing improvement.",
      ],
      cta = {
        text: "Let's Work Together →",
        href: "#contact",
      },
      imageSrc = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    },
    ref
  ) => {
    // Animation container orchestration
    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.1,
        },
      },
    };

    // Editorial item entrance variant
    const itemVariants: Variants = {
      hidden: { y: 16, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    };

    // Extract arrow from CTA text if present for separate hover animation
    const ctaTextClean = cta.text.replace(/→$/, '').trim();

    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex w-full flex-col overflow-hidden bg-[#FAFAF9]/90 border border-black/5 rounded-2xl sm:rounded-3xl text-[#111111] lg:flex-row min-h-[460px] lg:min-h-[500px] shadow-[0_8px_30px_rgba(0,0,0,0.03)]",
          className
        )}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {/* Soft lime ambient lighting backdrop */}
        <div
          aria-hidden="true"
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#84CC16]/5 blur-2xl pointer-events-none"
        />

        {/* Left Side: About Content (~52–54% on desktop) */}
        <div className="flex w-full flex-col justify-center p-5 sm:p-7 md:p-8 lg:w-[54%] xl:w-[52%] lg:p-8 xl:p-9 z-10">
          {/* Section Label */}
          <motion.div variants={itemVariants} className="mb-2.5 sm:mb-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-black/5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
              <span className="font-sans text-[10.5px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#64748B]">
                {sectionLabel}
              </span>
            </div>
          </motion.div>

          {/* Main Heading: refined, compact editorial size */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-[2.1rem] lg:text-[2.25rem] xl:text-[2.45rem] font-light text-[#111111] leading-[1.16] tracking-[-0.03em] mb-3.5 sm:mb-4"
          >
            {heading}
          </motion.h2>

          {/* Body Text: 4 approved paragraphs, compact & readable */}
          <motion.div
            variants={itemVariants}
            className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 max-w-[560px]"
          >
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[13px] sm:text-[13.5px] lg:text-[14px] xl:text-[14.5px] text-[#4B5563] leading-[1.58] font-normal"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Subtle CTA with hover arrow movement */}
          <motion.div variants={itemVariants}>
            <a
              href={cta.href}
              className="inline-flex items-center gap-1.5 text-[13.5px] sm:text-[14.5px] font-medium text-[#111111] hover:text-[#84CC16] transition-colors duration-300 group"
            >
              <span>{ctaTextClean}</span>
              <span className="text-base transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Authentic Image with controlled proportions and organic clip path */}
        <motion.div
          className="w-full relative overflow-hidden lg:w-[46%] xl:w-[48%] min-h-[260px] sm:min-h-[300px] lg:min-h-full"
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="w-full h-full min-h-[260px] sm:min-h-[300px] lg:min-h-[500px] bg-cover bg-center transition-transform duration-700 hover:scale-[1.02]"
            style={{
              backgroundImage: `url(${imageSrc})`,
              clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)',
            }}
          />
          {/* Subtle atmospheric vignette for mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none lg:hidden" />
        </motion.div>
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";
export default HeroSection;
