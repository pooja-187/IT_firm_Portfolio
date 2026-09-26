'use client';

import React from 'react';
import { HeroSection } from '@/components/ui/hero-section-2';

export function HeroSectionDemo() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-22 lg:pb-28 selection:bg-lime-200"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `
          radial-gradient(
            ellipse 75% 50% at 50% 0%,
            rgba(163, 230, 53, 0.36) 0%,
            rgba(190, 242, 100, 0.22) 38%,
            rgba(217, 249, 157, 0.08) 65%,
            transparent 82%
          ),
          radial-gradient(
            ellipse 85% 65% at 50% 50%,
            rgba(163, 230, 53, 0.45) 0%,
            rgba(190, 242, 100, 0.28) 35%,
            rgba(217, 249, 157, 0.16) 60%,
            transparent 85%
          ),
          radial-gradient(
            ellipse 75% 55% at 75% 25%,
            rgba(163, 230, 53, 0.38) 0%,
            rgba(190, 242, 100, 0.22) 38%,
            transparent 75%
          ),
          radial-gradient(
            ellipse 70% 55% at 20% 25%,
            rgba(132, 204, 22, 0.35) 0%,
            rgba(190, 242, 100, 0.20) 38%,
            transparent 75%
          ),
          radial-gradient(
            ellipse 65% 50% at 85% 75%,
            rgba(163, 230, 53, 0.30) 0%,
            transparent 70%
          )
        `,
      }}
    >
      {/* Prominent atmospheric lime glow orbs across all quadrants */}
      <div
        aria-hidden="true"
        className="absolute -top-12 right-4 sm:right-16 w-[580px] h-[480px] bg-[#A3E635]/30 rounded-full blur-[115px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-16 left-1/3 w-[520px] h-[440px] bg-[#84CC16]/26 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-12 -left-20 w-[540px] h-[520px] bg-[#84CC16]/28 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -right-20 w-[560px] h-[560px] bg-[#A3E635]/28 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[920px] h-[580px] bg-[#A3E635]/22 rounded-full blur-[130px] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection
          className="bg-white/95 backdrop-blur-md border border-lime-200/50 shadow-[0_20px_60px_rgba(132,204,22,0.12),0_4px_20px_rgba(0,0,0,0.03)]"
          sectionLabel="ABOUT"
          heading="The person behind the work."
          paragraphs={[
            "I'm Nashim Nazar — a UI/UX designer, performance marketer, and CEO & Founder of Manzio Creative Studio Pvt Ltd.",
            "My work brings together design, technology, and marketing. I help businesses understand what their customers need and turn those insights into websites and digital products that are clear, useful, and easy to navigate.",
            "As a designer, I focus on how an experience works, from the first interaction to the final action. As a founder, I also consider the business behind it: its goals, priorities, and opportunities for growth.",
            "Through Manzio, I lead a creative team working across design, software and app development, marketing, and digital security. Depending on your project, we can support you from the initial idea through launch and ongoing improvement.",
          ]}
          cta={{
            text: "Let's Work Together →",
            href: "#contact",
          }}
          imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
        />
      </div>
    </section>
  );
}

export default HeroSectionDemo;
