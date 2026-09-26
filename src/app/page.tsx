import HeroSection from '@/components/HeroSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import { DemoVariant1 } from '@/components/ui/demo';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import HeroSectionDemo from '@/components/ui/hero-section-2-demo';
import FeatureCarouselDemo from '@/components/ui/feature-carousel-demo';

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

      {/* 09 — Feature Highlights Carousel */}
      <FeatureCarouselDemo />
    </div>
  );
}
