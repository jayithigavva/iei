import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ChallengeSection from "@/components/ChallengeSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import StatsSection from "@/components/StatsSection";
import DashboardCTASection from "@/components/DashboardCTASection";
import ResearchInsightsSection from "@/components/ResearchInsightsSection";
import PartnershipsSection from "@/components/PartnershipsSection";
import FounderSection from "@/components/FounderSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  // Handle hash navigation from dashboard
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="animated-stripes"></div>
      <Navigation />
      <main>
        <div id="hero">
          <HeroSection />
        </div>
        <ChallengeSection />
        <AboutSection />
        <WorkSection />
        <StatsSection />
        <DashboardCTASection />
        <PartnershipsSection />
        <FounderSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
