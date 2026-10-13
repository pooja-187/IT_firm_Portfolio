import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import { DemoVariant1 } from '@/components/ui/demo';
import ClientsSection from '@/components/ClientsSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import HeroSectionDemo from '@/components/ui/hero-section-2-demo';
import WhyWorkWithMe from '@/components/WhyWorkWithMe';
import TestimonialsSection from '@/components/TestimonialsSection';
import InsightsSection from '@/components/InsightsSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

import type { Metadata } from 'next';
import { SEOServerService } from '@/services/SEOServerService';

export async function generateMetadata(): Promise<Metadata> {
  return SEOServerService.resolveMetadataForRoute('/');
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#121417]">
      {/* Floating Glass Navigation */}
      <Navigation />

      {/* 01 — Hero Section */}
      <HeroSection />

      {/* 02 — Expertise Section */}
      <ExpertiseSection />

      {/* 03 — Selected Work (Animated 3D Carousel) */}
      <DemoVariant1 />

      {/* 04 — Clients Section */}
      <ClientsSection />

      {/* 05 — Services Section */}
      <ServicesSection />

      {/* 05 — Process Section */}
      <ProcessSection />

      {/* 06 — About Section */}
      <HeroSectionDemo />

      {/* 07 — Why Work With Me Section */}
      <WhyWorkWithMe />

      {/* 08 — Testimonials Section */}
      <TestimonialsSection />

      {/* 09 — Insights Section */}
      <InsightsSection />

      {/* 10 — FAQ Section */}
      <FaqSection />

      {/* 11 — Contact Section */}
      <ContactSection />

      {/* 12 — Global Footer */}
      <Footer />
    </div>
  );
}
