"use client";

import LandingNavbar from "./landing/LandingNavbar";
import HeroSection from "./landing/HeroSection";
import FeaturesGrid from "./landing/FeaturesGrid";
import HowItWorks from "./landing/HowItWorks";
import HowToUse from "./landing/HowToUse";
import TechStack from "./landing/TechStack";
import AboutDeveloper from "./landing/AboutDeveloper";
import Footer from "./landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <HeroSection />
      <FeaturesGrid />
      <HowItWorks />
      <HowToUse />
      <TechStack />
      <AboutDeveloper />
      <Footer />
    </div>
  );
}
