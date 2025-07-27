import { HeroSection } from "@/components/landing-page/hero-section";
import { VideoSection } from "@/components/landing-page/video-section";
import { FeaturesSection } from "@/components/landing-page/features-section";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <VideoSection />
      <FeaturesSection />
    </main>
  );
}
