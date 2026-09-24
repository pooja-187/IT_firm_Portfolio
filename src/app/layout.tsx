import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const serifFont = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nashimnazar.in'),
  title: 'Nashim Nazar — Best UI UX Designer in Kottayam, Kerala | CEO & Founder, Manzio',
  description:
    'Nashim Nazar is the Best UI UX Designer in Kottayam, Kerala and CEO & Founder of Manzio Creative Studio. Turning complex business ideas into intuitive websites and digital products through UI/UX design and performance marketing.',
  keywords: [
    'Best UI UX Designer in Kottayam',
    'UI UX Designer Kerala',
    'Nashim Nazar',
    'Manzio Creative Studio',
    'Product Designer Kerala',
    'Digital Product Design Kottayam',
    'Performance Marketing Kerala',
    'Web Design Kottayam',
  ],
  authors: [{ name: 'Nashim Nazar', url: 'https://nashimnazar.in' }],
  creator: 'Nashim Nazar',
  publisher: 'Manzio Creative Studio Pvt Ltd',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nashimnazar.in',
    siteName: 'Nashim Nazar — Portfolio & Personal Brand',
    title: 'Nashim Nazar — Best UI UX Designer in Kottayam, Kerala',
    description:
      'Thoughtful design. Clear experiences. Business-focused results. CEO & Founder of Manzio Creative Studio.',
  },
  alternates: {
    canonical: 'https://nashimnazar.in',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nashim Nazar',
    jobTitle: 'Best UI UX Designer in Kottayam & CEO / Founder',
    worksFor: {
      '@type': 'Organization',
      name: 'Manzio Creative Studio Pvt Ltd',
      url: 'https://manzio.marketing',
    },
    url: 'https://nashimnazar.in',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kottayam',
      addressRegion: 'Kerala',
      addressCountry: 'India',
    },
    description:
      'UI/UX Designer, Performance Marketer, and Founder of Manzio Creative Studio specializing in intuitive digital products and business-focused results.',
    sameAs: [
      'https://www.linkedin.com/in/nashimnazar',
      'https://twitter.com/nashimnazar',
    ],
  };

  return (
    <html lang="en" className={`${sansFont.variable} ${serifFont.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FCFDF9] text-[#111315] antialiased selection:bg-lime-300 selection:text-black">
        {children}
      </body>
    </html>
  );
}
