'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUp, MapPin } from 'lucide-react';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaWhatsapp, FaFacebook, FaGithub, FaGlobe } from 'react-icons/fa';
import FooterIllustration from '@/components/ui/FooterIllustration';
import { contentService } from '@/services/ContentService';
import { STORAGE_KEYS } from '@/services/StorageService';
import { PortfolioSettings, SocialLinkItem, ServiceItemData } from '@/types/portfolio';

const defaultSettings: PortfolioSettings = {
  brandName: 'Nashim Nazar',
  contactEmail: 'hello@nashimnazar.in',
  contactPhone: '+91 99999 99999',
  whatsappNumber: '+91 99999 99999',
  location: 'Kottayam, Kerala, India',
  availability: 'Available Worldwide',
  footerBio:
    'UI/UX Designer, Software & Digital Product Professional. Turning complex business ideas into intuitive digital interfaces and high-conversion experiences.',
  copyrightText: '© 2026 Nashim Nazar. All rights reserved.',
};

const defaultServices = [
  'UI/UX & Product Design',
  'Web & App Development',
  'Design Systems & Branding',
  'Performance Marketing',
];

const defaultSocials: SocialLinkItem[] = [
  { id: '1', platform: 'LinkedIn', url: 'https://www.linkedin.com/in/nashimnazar', isActive: true, displayOrder: 1 },
  { id: '2', platform: 'Twitter / X', url: 'https://twitter.com/nashimnazar', isActive: true, displayOrder: 2 },
  { id: '3', platform: 'Instagram', url: 'https://instagram.com', isActive: true, displayOrder: 3 },
  { id: '4', platform: 'WhatsApp', url: 'https://wa.me/', isActive: true, displayOrder: 4 },
];

function getSocialIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p.includes('linkedin')) return FaLinkedinIn;
  if (p.includes('twitter') || p.includes('x')) return FaTwitter;
  if (p.includes('instagram')) return FaInstagram;
  if (p.includes('whatsapp')) return FaWhatsapp;
  if (p.includes('facebook')) return FaFacebook;
  if (p.includes('github')) return FaGithub;
  return FaGlobe;
}

export default function Footer() {
  const [settings, setSettings] = useState<PortfolioSettings>(defaultSettings);
  const [socials, setSocials] = useState<SocialLinkItem[]>(defaultSocials);
  const [servicesList, setServicesList] = useState<string[]>(defaultServices);

  useEffect(() => {
    // Hydrate client-side
    const loadedSettings = contentService.getSettings();
    if (loadedSettings) setSettings(loadedSettings);

    const loadedSocials = contentService.getSocialLinks(true);
    if (loadedSocials && loadedSocials.length > 0) setSocials(loadedSocials);

    const loadedServices = contentService.getServices(true);
    if (loadedServices && loadedServices.length > 0) {
      setServicesList(loadedServices.map((s) => s.name));
    }

    const unsubSettings = contentService.subscribe(STORAGE_KEYS.SETTINGS, (updated: PortfolioSettings) => {
      if (updated) setSettings(updated);
    });

    const unsubSocials = contentService.subscribe(STORAGE_KEYS.SOCIALS, (updated: SocialLinkItem[]) => {
      if (updated && Array.isArray(updated)) {
        setSocials(updated.filter((s) => s.isActive));
      }
    });

    const unsubServices = contentService.subscribe(STORAGE_KEYS.SERVICES, (updated: ServiceItemData[]) => {
      if (updated && Array.isArray(updated)) {
        setServicesList(updated.filter((s) => s.isPublished !== false).map((s) => s.name));
      }
    });

    return () => {
      unsubSettings();
      unsubSocials();
      unsubServices();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Work', href: '#selected-work' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#111620] via-[#0C0F15] to-[#080A0E] text-white border-t border-white/[0.12] pt-14 sm:pt-16 pb-10">
      {/* Specular glass top border highlight */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" 
      />

      {/* Creative Technology Blueprint Illustration System (Full-width responsive vector environment) */}
      <FooterIllustration />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/[0.10]">
          
          {/* Column 1: Brand & Bio (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-3.5">
            <Link
              href="#home"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded-lg group w-fit"
            >
              <span className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-lime-400 transition-colors">
                {settings.brandName || 'Nashim Nazar'}
              </span>
            </Link>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-sm">
              {settings.footerBio ||
                'UI/UX Designer, Software & Digital Product Professional. Turning complex business ideas into intuitive digital interfaces and high-conversion experiences.'}
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>
                {settings.location} &bull; {settings.availability}
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <h3 className="text-xs font-bold tracking-[0.14em] uppercase text-zinc-200">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-300 hover:text-white transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (3 cols) */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h3 className="text-xs font-bold tracking-[0.14em] uppercase text-zinc-200">
              Services
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
              {servicesList.slice(0, 6).map((service, idx) => (
                <li key={idx}>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect / Socials (2 cols) */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <h3 className="text-xs font-bold tracking-[0.14em] uppercase text-zinc-200">
              Connect
            </h3>
            <div className="flex flex-col space-y-2">
              {socials.map((social) => {
                const Icon = getSocialIcon(social.platform);
                return (
                  <a
                    key={social.id || social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-300 hover:text-white transition-colors group"
                  >
                    <Icon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-lime-400 transition-colors" />
                    <span>{social.platform}</span>
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>
            {settings.copyrightText || `© ${new Date().getFullYear()} Nashim Nazar. All rights reserved.`}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 hover:border-white/25 text-zinc-200 hover:text-white text-xs font-medium backdrop-blur-md transition-all shadow-[0_4px_16px_rgba(0,0,0,0.2)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-lime-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
