'use client';

import { ArrowRight } from 'lucide-react';

interface HeroCTAProps {
  label?: string;
  href?: string;
}

export default function HeroCTA({
  label = 'Discuss Your Project',
  href = '#contact',
}: HeroCTAProps) {
  return (
    <a
      href={href}
      id="hero-main-cta"
      className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#111315] text-white font-medium text-sm sm:text-base transition-all duration-300 hover:bg-black hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(0,0,0,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 select-none"
    >
      <span className="font-semibold tracking-tight">{label}</span>
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/15 text-lime-300 group-hover:bg-lime-400 group-hover:text-black transition-all duration-300">
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
