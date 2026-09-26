import HeroSection from '@/components/HeroSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import { DemoVariant1 } from '@/components/ui/demo';
import ServicesSection from '@/components/ServicesSection';
import WhyWorkWithMe from '@/components/WhyWorkWithMe';
import ProcessSection from '@/components/ProcessSection';
import HeroSectionDemo from '@/components/ui/hero-section-2-demo';
import TestimonialsSection from '@/components/TestimonialsSection';
import InsightsSection from '@/components/InsightsSection';
import FaqSection from '@/components/FaqSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#121417]">
      {/* 01 — Hero Section */}
      <HeroSection />

      {/* 02 — Expertise Section */}
      <ExpertiseSection />

      {/* 03 — Selected Work (Animated 3D Carousel) */}
      <DemoVariant1 />

      {/* 05 — Services Section */}
      <ServicesSection />

      {/* 07 — Process Section */}
      <ProcessSection />

      {/* 08 — About Section */}
      <HeroSectionDemo />

      {/* 06 — Why Work With Me Section */}
      <WhyWorkWithMe />

      {/* 09 — Testimonials Section */}
      <TestimonialsSection />

      {/* 10 — Insights Section */}
      <InsightsSection />

      {/* 11 — FAQ Section */}
      <FaqSection />
    </div>
  );
}
