'use client';

import React from 'react';
import { HeroSection } from '@/components/ui/hero-section-2';

export function HeroSectionDemo() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden py-12 sm:py-16 lg:py-20 selection:bg-lime-200"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `
          radial-gradient(
            ellipse 70% 50% at 50% 50%,
            rgba(163, 230, 53, 0.22) 0%,
            rgba(190, 242, 100, 0.12) 35%,
            rgba(217, 249, 157, 0.05) 60%,
            transparent 75%
          ),
          radial-gradient(
            ellipse 90% 70% at 50% 45%,
            rgba(163, 230, 53, 0.10) 0%,
            transparent 75%
          )
        `,
      }}
    >
      {/* Additional ambient atmospheric glow elements */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-[#A3E635]/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection
          className="bg-white/95 backdrop-blur-md border border-black/5 shadow-[0_12px_45px_rgba(0,0,0,0.04)]"
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
