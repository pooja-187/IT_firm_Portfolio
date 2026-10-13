import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found — 404 | Nashim Nazar',
  description: 'The requested page could not be found.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold uppercase tracking-wider mb-4">
        Error 404
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
        Page Not Found
      </h1>
      <p className="text-sm text-neutral-500 mt-2 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center px-4 py-2.5 rounded-xl bg-[#84CC16] hover:bg-[#72b312] text-[#111] text-sm font-bold transition-all shadow-xs"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
