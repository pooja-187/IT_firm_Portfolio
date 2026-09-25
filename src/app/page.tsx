import HeroSection from '@/components/HeroSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import { DemoVariant1 } from '@/components/ui/demo';
import ProcessSection from '@/components/ProcessSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#121417]">
      {/* 01 — Hero Section */}
      <HeroSection />

      {/* 02 — Expertise Section */}
      <ExpertiseSection />

      {/* 03 — Selected Work (Animated Gallery) */}
      <DemoVariant1 />

      {/* 07 — Process Section */}
      <ProcessSection />
    </div>
  );
}
