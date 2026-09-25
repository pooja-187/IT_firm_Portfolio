'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: React.ReactNode;
    part2: React.ReactNode;
  };
  socialLinks: { icon: LucideIcon | React.ComponentType<{ className?: string }>; href: string }[];
  locationText: string;
  className?: string;
}

// Helper component for navigation links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon | React.ComponentType<{ className?: string }> }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-white p-8 font-sans md:p-12 selection:bg-lime-300',
        className
      )}
    >
      {/* Saturated Ambient Diffused Lime-Green Studio Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 65% at 50% 50%, rgba(162, 246, 36, 0.65) 0%, rgba(184, 252, 60, 0.45) 28%, rgba(214, 255, 115, 0.22) 52%, transparent 80%),
            radial-gradient(circle 600px at 15% 55%, rgba(150, 245, 30, 0.35) 0%, transparent 70%),
            radial-gradient(circle 600px at 85% 55%, rgba(150, 245, 30, 0.35) 0%, transparent 70%),
            radial-gradient(ellipse 110% 85% at 50% 45%, rgba(210, 250, 140, 0.25) 0%, transparent 75%)
          `,
          maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
        }}
      >
        {/* Concentrated Soft Depth Glow Behind Portrait */}
        <div
          className="absolute"
          style={{
            width: "55%",
            height: "55%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(162, 246, 36, 0.28)",
            filter: "blur(90px)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-wider text-foreground"
        >
          {logoText}
        </motion.div>
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col space-y-1.5 p-2 rounded-lg md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-0.5 w-6 bg-foreground transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </motion.button>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-3 w-56 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-2xl flex flex-col gap-3 md:hidden z-50"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider text-[#111315] hover:text-lime-600 py-1.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 md:order-1 text-center md:text-left"
        >
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">{mainText}</p>
          <a href={readMoreLink} className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font">
            Read More
          </a>
        </motion.div>

        {/* Center Image */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
            <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 h-auto w-56 object-cover md:w-64 scale-150 lg:w-72 drop-shadow-sm"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://cdn.21st.dev/assets/mirror/69/69f133c713200aa29789f9f07a83f105cc28793926179eb4a224b0454a743a00.svg`;
                }}
            />
        </div>

        {/* Right Text (Right Aligned) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center md:justify-end text-right"
        >
          <h1 className="text-right text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.08] tracking-tight">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-foreground/80"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
