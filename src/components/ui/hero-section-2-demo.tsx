'use client';

import React from 'react';
import { HeroSection } from '@/components/ui/hero-section-2';

export function HeroSectionDemo() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden py-14 sm:py-20 lg:py-28 selection:bg-lime-200"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `
          linear-gradient(
            to bottom,
            #FFFFFF 0%,
            rgba(244, 250, 235, 0.4) 12%,
            rgba(244, 250, 235, 0.95) 28%,
            rgba(244, 250, 235, 1) 50%,
            rgba(244, 250, 235, 0.95) 72%,
            rgba(244, 250, 235, 0.4) 88%,
            #FFFFFF 100%
          ),
          radial-gradient(
            ellipse 80% 60% at 50% 50%,
            rgba(163, 230, 53, 0.45) 0%,
            rgba(190, 242, 100, 0.28) 40%,
            rgba(217, 249, 157, 0.15) 65%,
            transparent 90%
          ),
          radial-gradient(
            ellipse 65% 50% at 15% 40%,
            rgba(132, 204, 22, 0.30) 0%,
            transparent 70%
          ),
          radial-gradient(
            ellipse 65% 50% at 85% 60%,
            rgba(163, 230, 53, 0.30) 0%,
            transparent 70%
          )
        `,
      }}
    >
      {/* Seamless feathering transitions for top and bottom edges */}
      <div className="absolute top-0 inset-x-0 h-24 sm:h-36 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-[1]" />
      <div className="absolute bottom-0 inset-x-0 h-24 sm:h-36 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-[1]" />

      {/* Prominent atmospheric lime glow orbs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#84CC16]/22 rounded-full blur-[110px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 -right-20 w-[540px] h-[540px] bg-[#A3E635]/26 rounded-full blur-[110px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-[#A3E635]/18 rounded-full blur-[120px] pointer-events-none"
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
