'use client';

import React from 'react';
import { HeroSection } from '@/components/ui/hero-section-2';

export function HeroSectionDemo() {
  return (
    <section
      id="about"
      aria-label="About Nashim Nazar"
      className="relative w-full text-[#111111] pt-6 sm:pt-10 lg:pt-14 pb-20 sm:pb-28 lg:pb-36 overflow-hidden selection:bg-lime-200"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `
          radial-gradient(
            ellipse 65% 45% at 50% 50%,
            rgba(163, 230, 53, 0.26) 0%,
            rgba(190, 242, 100, 0.12) 40%,
            rgba(217, 249, 157, 0.04) 65%,
            transparent 78%
          ),
          radial-gradient(
            ellipse 85% 55% at 50% 50%,
            rgba(163, 230, 53, 0.10) 0%,
            transparent 70%
          )
        `,
      }}
    >
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1180px] mx-auto">
          <HeroSection
            className="bg-white/90 backdrop-blur-md border border-black/[0.07] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(163,230,53,0.18)] hover:border-[#A3E635]/60 transition-all duration-300"
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
      </div>
    </section>
  );
}

export default HeroSectionDemo;
