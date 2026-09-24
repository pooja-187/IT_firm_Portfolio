'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PortraitDisplayProps {
  imageSrc?: string;
  altText?: string;
}

export default function PortraitDisplay({
  imageSrc = '/images/nashim-portrait.png',
  altText = 'Nashim Nazar — Best UI UX Designer in Kottayam, Kerala & CEO of Manzio Creative Studio',
}: PortraitDisplayProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] mx-auto aspect-[3/4] flex items-end justify-center">
      {/* Dynamic Backlight Aura (Synchronized 1.5s Arrival) */}
      <div 
        className="consultant7-glow-arrive absolute bottom-8 inset-x-0 mx-auto w-4/5 h-4/5 rounded-full bg-gradient-to-t from-lime-400/60 via-lime-300/40 to-transparent blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      {/* TheConsultant7 Style Arriving Picture Wrapper (Scale 1.1 -> 1.0, Y: 100px -> 0, Blur: 10px -> 0) */}
      <div className="w-full h-full flex items-end justify-center consultant7-arriving-picture">
        {!imageError ? (
          <div className="relative w-full h-full portrait-fade-mask flex items-end justify-center">
            <Image
              src={imageSrc}
              alt={altText}
              width={600}
              height={800}
              priority
              quality={95}
              onError={() => setImageError(true)}
              className="w-full h-auto max-h-full object-contain object-bottom select-none filter contrast-[1.03] drop-shadow-[0_0_40px_rgba(168,246,34,0.35)] drop-shadow-[0_20px_35px_rgba(0,0,0,0.1)]"
            />
            {/* Bottom Gradient Blend Layer */}
            <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#FCFDF9] via-[#FCFDF9]/70 to-transparent pointer-events-none z-10" />
          </div>
        ) : (
          /* Editorial Cutout Silhouette Placeholder with TheConsultant7 Arriving Motion */
          <div className="relative w-full h-full flex flex-col items-center justify-end portrait-fade-mask">
            <div className="relative w-full max-w-[420px] h-[480px] sm:h-[540px] rounded-t-[140px] sm:rounded-t-[180px] bg-gradient-to-b from-[#2B3035] via-[#1E2226] to-[#121518] shadow-2xl flex flex-col items-center justify-between p-8 text-center border-t border-x border-slate-700/30">
              {/* Inner highlight */}
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/10 to-transparent rounded-t-[140px] sm:rounded-t-[180px] pointer-events-none" />

              {/* Silhouette graphics */}
              <div className="mt-8 relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-slate-300 mb-4 shadow-inner">
                  <svg
                    className="w-14 h-14 text-slate-300/80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-xs uppercase tracking-widest font-semibold text-lime-400">
                  Official Portrait Area
                </span>
                <h3 className="text-white text-base sm:text-lg font-medium mt-1 font-apple">
                  Nashim Nazar
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
                  Drop <code className="text-lime-300 font-mono">nashim-portrait.png</code> into <code className="text-lime-300 font-mono">public/images/</code>
                </p>
              </div>

              {/* Credential pill */}
              <div className="relative z-10 pb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  CEO &amp; Founder • Manzio
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
