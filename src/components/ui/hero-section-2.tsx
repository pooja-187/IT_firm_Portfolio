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
          staggerChildren: 0.1,
          delayChildren: 0.15,
        },
      },
    };

    // Editorial item entrance variant: soft fade + translateY (20-30px, 0.6-0.8s)
    const itemVariants: Variants = {
      hidden: { y: 24, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.7,
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
          "relative flex w-full flex-col overflow-hidden bg-[#FAFAF9]/80 border border-black/5 rounded-3xl text-[#111111] lg:flex-row min-h-[620px] lg:min-h-[680px] lg:max-h-[760px] shadow-[0_12px_40px_rgba(0,0,0,0.03)]",
          className
        )}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
      >
        {/* Soft lime ambient lighting backdrop */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#84CC16]/5 blur-3xl pointer-events-none"
        />

        {/* Left Side: About Content (~50–52% on desktop) */}
        <div className="flex w-full flex-col justify-center p-6 sm:p-9 md:p-11 lg:w-[52%] xl:w-[50%] lg:p-12 xl:p-14 z-10">
          {/* Section Label */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
              <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
                {sectionLabel}
              </span>
            </div>
          </motion.div>

          {/* Main Heading: 56–72px responsive clamp desktop, light & editorial */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[2.85rem] xl:text-[3.25rem] font-light text-[#111111] leading-[1.15] tracking-[-0.03em] mb-5 sm:mb-6"
          >
            {heading}
          </motion.h2>

          {/* Body Text: 4 approved paragraphs, readable line-height and max-width */}
          <motion.div
            variants={itemVariants}
            className="space-y-3.5 sm:space-y-4 mb-7 sm:mb-8 max-w-[620px]"
          >
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[14.5px] sm:text-[15.5px] lg:text-[16.5px] text-[#4B5563] leading-[1.68] font-normal"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Subtle CTA with hover arrow movement */}
          <motion.div variants={itemVariants}>
            <a
              href={cta.href}
              className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-medium text-[#111111] hover:text-[#84CC16] transition-colors duration-300 group"
            >
              <span>{ctaTextClean}</span>
              <span className="text-lg transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Authentic Image with controlled proportions and organic clip path (~44–48%) */}
        <motion.div
          className="w-full relative overflow-hidden lg:w-[48%] xl:w-[50%] min-h-[320px] sm:min-h-[400px] lg:min-h-full"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="w-full h-full min-h-[320px] sm:min-h-[400px] lg:min-h-[640px] bg-cover bg-center transition-transform duration-700 hover:scale-[1.02]"
            style={{
              backgroundImage: `url(${imageSrc})`,
              clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)',
            }}
          />
          {/* Subtle atmospheric vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none lg:hidden" />
        </motion.div>
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";
export default HeroSection;
