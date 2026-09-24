'use client';

export default function StatusPill() {
  return (
    <div
      role="status"
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill text-xs sm:text-sm font-medium text-[#24292F] transition-all duration-300 select-none"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#84CC16]"></span>
      </span>
      <span>Available for new opportunities</span>
    </div>
  );
}
