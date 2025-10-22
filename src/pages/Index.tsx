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
        <ResearchInsightsSection />
        <PartnershipsSection />
        <FounderSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
