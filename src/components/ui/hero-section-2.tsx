'use client';

import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

// Icon component for contact details
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
  const icons = {
    website: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-lime-500"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" x2="22" y1="12" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    phone: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-lime-500"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    address: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-lime-500"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  };
  return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

// Prop types for the HeroSection component
export interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  logo?: {
    url: string;
    alt: string;
    text?: string;
  };
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
  };
  backgroundImage: string;
  contactInfo: {
    website: string;
    phone: string;
    address: string;
  };
}

export const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      logo,
      slogan,
      title,
      subtitle,
      callToAction,
      backgroundImage,
      contactInfo,
    },
    ref
  ) => {
    // Animation variants for the container to orchestrate children animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

    // Animation variants for individual text/UI elements
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut" as const,
        },
      },
    };

    return (
      <motion.section
        ref={ref as React.Ref<HTMLElement>}
        className={cn(
          "relative flex w-full flex-col overflow-hidden bg-white text-[#111111] md:flex-row min-h-[600px] lg:min-h-[680px]",
          className
        )}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-between p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16 z-10">
          {/* Top Section: Logo & Main Content */}
          <div>
            <motion.header className="mb-10 sm:mb-12" variants={itemVariants}>
              {logo && (
                <div className="flex items-center">
                  {logo.url && (
                    <img src={logo.url} alt={logo.alt} className="mr-3 h-8" />
                  )}
                  <div>
                    {logo.text && (
                      <p className="text-lg font-bold text-[#111111] tracking-tight">{logo.text}</p>
                    )}
                    {slogan && (
                      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
                        {slogan}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.header>
            <motion.main variants={containerVariants}>
              <motion.h2
                className="text-4xl font-normal leading-[1.15] text-[#111111] md:text-5xl lg:text-6xl tracking-[-0.03em]"
                variants={itemVariants}
              >
                {title}
              </motion.h2>
              <motion.div
                className="my-6 h-1 w-20 bg-[#84CC16] rounded-full"
                variants={itemVariants}
              ></motion.div>
              <motion.p
                className="mb-8 max-w-md text-base text-[#64748B] leading-relaxed font-normal"
                variants={itemVariants}
              >
                {subtitle}
              </motion.p>
              <motion.a
                href={callToAction.href}
                className="inline-flex items-center gap-2 text-base sm:text-lg font-bold tracking-widest uppercase text-[#111111] hover:text-[#84CC16] transition-colors group"
                variants={itemVariants}
              >
                <span>{callToAction.text}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </motion.a>
            </motion.main>
          </div>
          {/* Bottom Section: Footer Info */}
          <motion.footer className="mt-12 w-full pt-8 border-t border-slate-100" variants={itemVariants}>
            <div className="grid grid-cols-1 gap-6 text-xs font-medium text-[#64748B] sm:grid-cols-3">
              <div className="flex items-center">
                <InfoIcon type="website" /> <span>{contactInfo.website}</span>
              </div>
              <div className="flex items-center">
                <InfoIcon type="phone" /> <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <InfoIcon type="address" /> <span>{contactInfo.address}</span>
              </div>
            </div>
          </motion.footer>
        </div>
        {/* Right Side: Image with Clip Path Animation */}
        <motion.div
          className="w-full min-h-[350px] bg-cover bg-center md:w-1/2 md:min-h-full lg:w-2/5 relative"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          whileInView={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";
export default HeroSection;
