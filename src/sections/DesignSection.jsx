import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DESIGN_CONTENT } from '../data/productContent';
import SectionLabel from '../components/SectionLabel';
import SectionHeading from '../components/SectionHeading';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function DesignSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const droneWrapperRef = useRef(null);
  const [activeCallout, setActiveCallout] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 90%',
          once: true,
        },
        y: 25,
        duration: 0.7,
        ease: 'power2.out',
      });

      gsap.from(droneWrapperRef.current, {
        scrollTrigger: {
          trigger: droneWrapperRef.current,
          start: 'top 90%',
          once: true,
        },
        scale: 0.98,
        duration: 0.8,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Integrated callouts flanking the drone with precision coordinates
  const calloutsLeft = [
    {
      id: 'canopy',
      idx: 0,
      num: '01',
      title: 'AERODYNAMIC CANOPY',
      subtitle: 'SMOKED OPTICAL SHIELD',
      desc: 'Seamless dual-curvature canopy housing forward LiDAR arrays and optical guidance sensors with zero boundary disruption.',
      coord: 'LAT: 01.4 // NOSE CONE',
    },
    {
      id: 'shell',
      idx: 1,
      num: '02',
      title: 'CARBON MONOCOQUE SHELL',
      subtitle: 'T1000 GRAPHITE WEAVE',
      desc: 'Autoclave-cured graphite composite fairing sculpted for continuous laminar cohesion and minimal parasitic drag.',
      coord: 'AIR: 02.1 // FUSELAGE',
    },
  ];

  const calloutsRight = [
    {
      id: 'nacelle',
      idx: 2,
      num: '03',
      title: 'ENCLOSED PROPULSION',
      subtitle: '360° AMBER OPTICAL DUCT',
      desc: 'Four ducted perimeter nacelles with continuous amber navigation illumination shielding counter-rotating carbon aerofoils.',
      coord: 'RAD: 04.2 // VECTOR DUCTS',
    },
    {
      id: 'skids',
      idx: 3,
      num: '04',
      title: 'TITANIUM LANDING SPARS',
      subtitle: 'GRADE 5 HIGH-G ABSORBER',
      desc: 'Brushed aerospace titanium tubular struts engineered to dissipate dynamic ground touchdown forces across any surface.',
      coord: 'GEO: 03.8 // STRUTS & SKIDS',
    },
  ];

  const allCallouts = [...calloutsLeft, ...calloutsRight];
  const activeItem = allCallouts[activeCallout] || allCallouts[0];

  return (
    <section
      ref={sectionRef}
      id="design"
      aria-label="02 Design and Sculpted Precision"
      className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FF7900] border-t border-[#17191C]/15 overflow-hidden"
    >
      {/* Monumental Typographic Watermark embedded into the background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.06]">
        <span className="font-display font-black text-[16vw] tracking-tighter text-[#17191C] uppercase leading-none whitespace-nowrap">
          AERODYNAMICS
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Header */}
        <div ref={headingRef} className="max-w-3xl mb-8 sm:mb-12">
          <SectionLabel index={DESIGN_CONTENT.index} label={DESIGN_CONTENT.label} className="mb-4" />
          <SectionHeading className="mb-6">{DESIGN_CONTENT.headline}</SectionHeading>
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-[#17191C] leading-relaxed font-semibold max-w-2xl">
            {DESIGN_CONTENT.copy}
          </p>
        </div>

        {/* Unified Aerospace Blueprint Spread (Drone integrated with flanking annotations) */}
        <div ref={droneWrapperRef} className="relative my-8 sm:my-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column Annotations */}
            <div className="lg:col-span-3 flex flex-col gap-10 z-20 order-2 lg:order-1">
              {calloutsLeft.map((item) => {
                const isSelected = activeCallout === item.idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveCallout(item.idx)}
                    onMouseEnter={() => setActiveCallout(item.idx)}
                    className={`text-left group cursor-pointer transition-all duration-300 pb-3 border-b-2 ${
                      isSelected
                        ? 'border-[#17191C] translate-x-1'
                        : 'border-[#17191C]/20 hover:border-[#17191C]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#17191C]/70 uppercase mb-2 font-semibold">
                      <span>{item.coord}</span>
                      <span className="font-bold text-[#17191C]">0{item.idx + 1}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-tight text-[#17191C] mb-1 group-hover:text-black">
                      {item.title}
                    </h3>
                    <h4 className="font-mono text-xs tracking-[0.16em] uppercase text-[#17191C]/80 font-medium mb-2">
                      {item.subtitle}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#17191C]/85 leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Center: Hero Drone Specimen with Interactive Inspection Reticle Dots */}
            <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2">
              {/* Radial Light Diffusion behind drone */}
              <div className="absolute inset-0 aerospace-radial opacity-60 pointer-events-none" />

              {/* Bounded Drone Image Container for Exact Relative Coordinates */}
              <div className="relative w-full max-w-[620px] mx-auto flex items-center justify-center">
                <img
                  src="/assets/images/skylance-drone.webp"
                  alt="SKY LANCE Drone Sculpted Aerodynamic Form"
                  className="w-full h-auto object-contain filter drop-shadow-[0_25px_45px_rgba(23,25,28,0.3)] select-none"
                />

                {/* Interactive Hotspot Reticle 01: AERODYNAMIC CANOPY */}
                <button
                  type="button"
                  onClick={() => setActiveCallout(0)}
                  onMouseEnter={() => setActiveCallout(0)}
                  aria-label="Inspect 01 Aerodynamic Canopy"
                  style={{ top: '48%', left: '54%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30 focus:outline-none"
                >
                  <span className={`absolute -inset-2 rounded-full border ${activeCallout === 0 ? 'border-[#17191C] animate-ping opacity-75' : 'border-[#17191C]/40 opacity-0 group-hover:opacity-100 transition-opacity'}`} />
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold transition-all duration-300 shadow-lg ${
                      activeCallout === 0
                        ? 'bg-[#17191C] text-[#FFF8EE] scale-110 ring-2 ring-[#17191C]'
                        : 'bg-[#FF7900] text-[#17191C] border-2 border-[#17191C] hover:bg-[#17191C] hover:text-[#FFF8EE]'
                    }`}
                  >
                    01
                  </div>
                  {activeCallout === 0 && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap px-2.5 py-1 rounded bg-[#17191C] text-[#FFF8EE] font-mono text-[9px] uppercase tracking-wider font-semibold pointer-events-none shadow-md z-40 hidden sm:block">
                      CANOPY
                    </div>
                  )}
                </button>

                {/* Interactive Hotspot Reticle 02: CARBON MONOCOQUE SHELL */}
                <button
                  type="button"
                  onClick={() => setActiveCallout(1)}
                  onMouseEnter={() => setActiveCallout(1)}
                  aria-label="Inspect 02 Carbon Monocoque Shell"
                  style={{ top: '35%', left: '46%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30 focus:outline-none"
                >
                  <span className={`absolute -inset-2 rounded-full border ${activeCallout === 1 ? 'border-[#17191C] animate-ping opacity-75' : 'border-[#17191C]/40 opacity-0 group-hover:opacity-100 transition-opacity'}`} />
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold transition-all duration-300 shadow-lg ${
                      activeCallout === 1
                        ? 'bg-[#17191C] text-[#FFF8EE] scale-110 ring-2 ring-[#17191C]'
                        : 'bg-[#FF7900] text-[#17191C] border-2 border-[#17191C] hover:bg-[#17191C] hover:text-[#FFF8EE]'
                    }`}
                  >
                    02
                  </div>
                  {activeCallout === 1 && (
                    <div className="absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap px-2.5 py-1 rounded bg-[#17191C] text-[#FFF8EE] font-mono text-[9px] uppercase tracking-wider font-semibold pointer-events-none shadow-md z-40 hidden sm:block">
                      FUSELAGE SHELL
                    </div>
                  )}
                </button>

                {/* Interactive Hotspot Reticle 03: ENCLOSED PROPULSION */}
                <button
                  type="button"
                  onClick={() => setActiveCallout(2)}
                  onMouseEnter={() => setActiveCallout(2)}
                  aria-label="Inspect 03 Enclosed Propulsion"
                  style={{ top: '37%', left: '20%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30 focus:outline-none"
                >
                  <span className={`absolute -inset-2 rounded-full border ${activeCallout === 2 ? 'border-[#17191C] animate-ping opacity-75' : 'border-[#17191C]/40 opacity-0 group-hover:opacity-100 transition-opacity'}`} />
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold transition-all duration-300 shadow-lg ${
                      activeCallout === 2
                        ? 'bg-[#17191C] text-[#FFF8EE] scale-110 ring-2 ring-[#17191C]'
                        : 'bg-[#FF7900] text-[#17191C] border-2 border-[#17191C] hover:bg-[#17191C] hover:text-[#FFF8EE]'
                    }`}
                  >
                    03
                  </div>
                  {activeCallout === 2 && (
                    <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap px-2.5 py-1 rounded bg-[#17191C] text-[#FFF8EE] font-mono text-[9px] uppercase tracking-wider font-semibold pointer-events-none shadow-md z-40 hidden sm:block">
                      DUCTED NACELLE
                    </div>
                  )}
                </button>

                {/* Interactive Hotspot Reticle 04: TITANIUM LANDING SPARS */}
                <button
                  type="button"
                  onClick={() => setActiveCallout(3)}
                  onMouseEnter={() => setActiveCallout(3)}
                  aria-label="Inspect 04 Titanium Landing Spars"
                  style={{ top: '75%', left: '44%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30 focus:outline-none"
                >
                  <span className={`absolute -inset-2 rounded-full border ${activeCallout === 3 ? 'border-[#17191C] animate-ping opacity-75' : 'border-[#17191C]/40 opacity-0 group-hover:opacity-100 transition-opacity'}`} />
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold transition-all duration-300 shadow-lg ${
                      activeCallout === 3
                        ? 'bg-[#17191C] text-[#FFF8EE] scale-110 ring-2 ring-[#17191C]'
                        : 'bg-[#FF7900] text-[#17191C] border-2 border-[#17191C] hover:bg-[#17191C] hover:text-[#FFF8EE]'
                    }`}
                  >
                    04
                  </div>
                  {activeCallout === 3 && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap px-2.5 py-1 rounded bg-[#17191C] text-[#FFF8EE] font-mono text-[9px] uppercase tracking-wider font-semibold pointer-events-none shadow-md z-40 hidden sm:block">
                      TITANIUM SKIDS
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column Annotations */}
            <div className="lg:col-span-3 flex flex-col gap-10 z-20 order-3">
              {calloutsRight.map((item) => {
                const isSelected = activeCallout === item.idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveCallout(item.idx)}
                    onMouseEnter={() => setActiveCallout(item.idx)}
                    className={`text-left group cursor-pointer transition-all duration-300 pb-3 border-b-2 ${
                      isSelected
                        ? 'border-[#17191C] translate-x-1'
                        : 'border-[#17191C]/20 hover:border-[#17191C]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#17191C]/70 uppercase mb-2 font-semibold">
                      <span>{item.coord}</span>
                      <span className="font-bold text-[#17191C]">0{item.idx + 1}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-tight text-[#17191C] mb-1 group-hover:text-black">
                      {item.title}
                    </h3>
                    <h4 className="font-mono text-xs tracking-[0.16em] uppercase text-[#17191C]/80 font-medium mb-2">
                      {item.subtitle}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#17191C]/85 leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Integrated Technical Caliper Ruler & Telemetry Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#17191C]/80 pt-8 border-t border-[#17191C]/15 mt-10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#17191C]" />
            <span className="font-bold tracking-[0.2em] uppercase">
              AERODYNAMIC COEFFICIENT // 0.18 CD
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-[11px] tracking-[0.16em] uppercase">
            <span>DRONE AIRFRAME: T1000 MONOCOQUE</span>
            <span>PRESSURE RECOVERY: 98.4%</span>
            <span>BOUNDARY REGIME: LAMINAR COHESION</span>
          </div>
        </div>
      </div>
    </section>
  );
}
