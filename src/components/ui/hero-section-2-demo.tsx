'use client';

import React from 'react';
import { HeroSection } from '@/components/ui/hero-section-2';

export function HeroSectionDemo() {
  return (
    <div id="about" className="w-full bg-white relative py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection
          className="rounded-3xl border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden"
          logo={{
            url: "https://cdn.21st.dev/assets/mirror/c9/c9babfd70e9056d8223e9d2eda28c4c7cc6c3555d666e10ef656b70a49f67a48.png",
            alt: "Manzio Creative Studio Logo",
            text: "Manzio Creative Studio",
          }}
          slogan="DIGITAL PRODUCT & DESIGN LEADERSHIP"
          title={
            <>
              Every Project <br />
              <span className="font-serif italic font-normal text-[#84CC16]">Shapes Tomorrow</span>
            </>
          }
          subtitle="Delivering high-impact UI/UX design, modern software engineering, and strategic brand experiences for forward-thinking enterprises worldwide."
          callToAction={{
            text: "DISCUSS YOUR VISION",
            href: "#contact",
          }}
          backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
          contactInfo={{
            website: "manziostudio.com",
            phone: "+91 94950 00000",
            address: "Kottayam, Kerala, India",
          }}
        />
      </div>
    </div>
  );
}

export default HeroSectionDemo;
