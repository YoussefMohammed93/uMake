import { HeroSection } from "@/components/landing-page/hero-section";
import { TabsSection } from "@/components/landing-page/tabs-section";
import { VideoSection } from "@/components/landing-page/video-section";
import { FeaturesSection } from "@/components/landing-page/features-section";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <VideoSection />
      <FeaturesSection />
      <TabsSection />
    </main>
  );
}
