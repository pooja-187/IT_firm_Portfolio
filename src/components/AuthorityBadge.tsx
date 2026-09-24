import React from 'react';

export default function AuthorityBadge() {
  return (
    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-xs font-medium text-[#2D3339] tracking-normal transition-all duration-300 select-none">
      {/* Editorial Laurel Leaves Icon */}
      <svg
        className="w-5 h-5 text-[#65A30D] shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 20c-2.5-3-3-8 0-14" />
        <path d="M4 14c1-2 3-3 4-3" />
        <path d="M5 9c1-1.5 2.5-2 4-2" />
        <path d="M6 18c1-1 3-1.5 4-1" />
        <path d="M17 20c2.5-3 3-8 0-14" />
        <path d="M20 14c-1-2-3-3-4-3" />
        <path d="M19 9c-1-1.5-2.5-2-4-2" />
        <path d="M18 18c-1-1-3-1.5-4-1" />
      </svg>
      <span className="font-semibold text-[#111315] text-[13px] sm:text-sm tracking-tight">
        CEO &amp; Founder • Manzio Creative Studio
      </span>
    </div>
  );
}
