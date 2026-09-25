import HeroSection from '@/components/HeroSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import SelectedWorkSection from '@/components/SelectedWorkSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#121417]">
      {/* 01 — Hero Section */}
      <HeroSection />

      {/* 02 — Expertise Section */}
      <ExpertiseSection />

      {/* 03 — Selected Work */}
      <SelectedWorkSection />
    </div>
  );
}
