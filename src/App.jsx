import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import SmoothVideoStage from './components/SmoothVideoStage';
import HeroSection from './sections/HeroSection';
import ProductRevealSection from './sections/ProductRevealSection';
import DesignSection from './sections/DesignSection';
import EngineeringSection from './sections/EngineeringSection';
import DetailsSection from './sections/DetailsSection';
import ExperienceSection from './sections/ExperienceSection';
import FinalSection from './sections/FinalSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    window.addEventListener('resize', ScrollTrigger.refresh);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', ScrollTrigger.refresh);
    };
  }, []);
  return (
    <div className="relative min-h-screen bg-[#FF7900] text-[#171717] selection:bg-[#17191C] selection:text-[#FFF8EE] flex flex-col font-sans">
      {/* Top Fixed Minimal Navigation */}
      <Navbar />

      {/* Main Single-Page Content Flow */}
      <main id="main-content" className="flex-1">
        {/* 1. CINEMATIC EXPLODED ASSEMBLY SCROLL STAGE (Hero + 01 / The Concept)
            Powered by skylance-exploded.mp4 with fluid scroll scrubbing. */}
        <SmoothVideoStage
          id="stage-rotation"
          videoSrc="/assets/video/skylance-exploded.mp4"
          maxTime={10.0}
        >
          {/* Section 1: Hero */}
          <HeroSection />

          {/* Section 2: 01 / The Concept */}
          <ProductRevealSection />
        </SmoothVideoStage>

        {/* 2. SOLID ORANGE EDITORIAL SECTIONS (Zero Empty Space) */}
        <div className="relative z-10 bg-[#FF7900]">
          {/* Section 3: 02 / Design ("FORM FOLLOWS FLIGHT" — Minimalist, No Clunky Cards) */}
          <DesignSection />

          {/* Section 4: 03 / Engineering ("EVERY COMPONENT. A PURPOSE." — Dedicated Exploded View Showcase) */}
          <EngineeringSection />

          {/* Section 5: 04 / Details ("BUILT TO BE DISCOVERED" — Dense Macro Cards + Material Matrix Table) */}
          <DetailsSection />

          {/* Section 6: 05 / The Experience ("A NEW WAY TO IMAGINE FLIGHT" — Interactive Flight Mode Console) */}
          <ExperienceSection />

          {/* Section 7: Final Call to Action */}
          <FinalSection />
        </div>
      </main>

      {/* Editorial Footer */}
      <div className="relative z-10 bg-[#FF7900]">
        <Footer />
      </div>
    </div>
  );
}
