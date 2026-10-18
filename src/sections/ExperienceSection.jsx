import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE_CONTENT } from '../data/productContent';
import SectionLabel from '../components/SectionLabel';
import SectionHeading from '../components/SectionHeading';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const [selectedMode, setSelectedMode] = useState(0);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const consoleRef = useRef(null);
  const benchmarksRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const flightModes = [
    {
      id: 'urban',
      num: '01',
      name: 'URBAN LOW-ALTITUDE HOVER',
      tagline: 'SUB-ACOUSTIC POINT-TO-POINT TRANSIT',
      description: 'Engineered for dense metropolitan airspace. Ducted perimeter nacelles redirect acoustic pressure downward while amber optical rings ensure continuous ground pedestrian awareness.',
      telemetry: {
        velocity: '45 KM/H',
        altitude: '150 M AGL',
        acoustic: '48 dBA',
        powerDraw: '28.4 kW',
        thrustVector: '90° VERTICAL',
        stability: 'AUTONOMOUS GYRO LOCK',
      },
    },
    {
      id: 'cruise',
      num: '02',
      name: 'HIGH-SPEED AERO CRUISE',
      tagline: 'MAXIMUM LAMINAR COHESION & EFFICIENCY',
      description: 'Forward aerodynamic tilt channels atmospheric airflow across the monocoque teardrop fuselage, utilizing aft stabilizers for passive high-speed directional poise.',
      telemetry: {
        velocity: '180 KM/H',
        altitude: '800 M AGL',
        acoustic: '58 dBA',
        powerDraw: '54.2 kW',
        thrustVector: '22° FORWARD PITCH',
        stability: 'LAMINAR ATTITUDE MATRIX',
      },
    },
    {
      id: 'dock',
      num: '03',
      name: 'AUTONOMOUS DOCK & TOUCHDOWN',
      tagline: 'FAIL-SAFE GROUND TOUCHDOWN RESILIENCE',
      description: 'Quad-redundant optical vision arrays compute sub-millimeter ground terrain topography, dampening touchdown forces through brushed titanium energy-absorption skids.',
      telemetry: {
        velocity: '0.5 M/S',
        altitude: '0 M CONTACT',
        acoustic: '38 dBA',
        powerDraw: '12.1 kW',
        thrustVector: 'BALANCED RETRACTION',
        stability: 'QUAD REDUNDANT LOCK',
      },
    },
  ];

  const current = flightModes[selectedMode];

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
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.from(consoleRef.current, {
        scrollTrigger: {
          trigger: consoleRef.current,
          start: 'top 90%',
          once: true,
        },
        scale: 0.98,
        duration: 0.8,
        ease: 'power2.out',
      });

      const cards = benchmarksRef.current?.querySelectorAll('.benchmark-tile');
      if (cards && cards.length) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: benchmarksRef.current,
            start: 'top 90%',
            once: true,
          },
          y: 20,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="05 The Experience"
      className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FF7900] border-t border-[#17191C]/15"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="max-w-3xl mb-8 sm:mb-12">
          <SectionLabel index={EXPERIENCE_CONTENT.index} label={EXPERIENCE_CONTENT.label} className="mb-4" />
          <SectionHeading className="mb-6">{EXPERIENCE_CONTENT.headline}</SectionHeading>
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-[#17191C] leading-relaxed font-semibold max-w-2xl">
            {EXPERIENCE_CONTENT.copy}
          </p>
        </div>

        {/* Interactive Flight Mission Profiles Console (Zero Dead Space) */}
        <div
          ref={consoleRef}
          className="rounded-3xl bg-[#17191C] text-[#FFF8EE] p-6 sm:p-10 lg:p-12 border border-[#FFF8EE]/10 shadow-2xl mb-12 overflow-hidden relative"
        >
          {/* Subtle Ambient Grid & Radial Glow */}
          <div className="absolute inset-0 aerospace-grid opacity-20 pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#FF7900]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Console Bar */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#FFF8EE]/15 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF9A28] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-[#FFF8EE]">
                INTERACTIVE FLIGHT SIMULATION // FLIGHT MODES
              </span>
            </div>
            <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#C7C9CB]">
              AUTONOMOUS ATTITUDE MATRIX ACTIVE
            </div>
          </div>

          {/* Main Console Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Mode Selectors */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {flightModes.map((mode, idx) => {
                const isActive = selectedMode === idx;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setSelectedMode(idx)}
                    className={`text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#FF9A28] text-[#17191C] border-[#FF9A28] shadow-lg scale-[1.02]'
                        : 'bg-[#FFF8EE]/5 text-[#FFF8EE] border-[#FFF8EE]/10 hover:bg-[#FFF8EE]/10'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase mb-2 opacity-80">
                      <span className={isActive ? 'font-bold text-[#17191C]' : 'text-[#FF9A28]'}>
                        MODE // {mode.num}
                      </span>
                      <span className="font-bold">ACTIVE CONFIG</span>
                    </div>
                    <h4 className="font-display font-bold text-lg uppercase tracking-tight mb-1">
                      {mode.name}
                    </h4>
                    <p className={`font-sans text-xs leading-relaxed ${isActive ? 'text-[#17191C]/90 font-medium' : 'text-[#C7C9CB]'}`}>
                      {mode.tagline}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right: Live Flight Envelope Telemetry HUD */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#FFF8EE]/5 border border-[#FFF8EE]/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-[#FF9A28] pb-4 border-b border-[#FFF8EE]/10 mb-4">
                  <span className="uppercase tracking-[0.2em] font-bold">
                    {current.name}
                  </span>
                  <span className="text-[#FFF8EE]">TELEMETRY FEED</span>
                </div>

                <p className="font-sans text-sm sm:text-base text-[#C7C9CB] leading-relaxed mb-8">
                  {current.description}
                </p>
              </div>

              {/* Real-Time Telemetry Specs Readout */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono">
                <div className="p-3.5 rounded-xl bg-[#17191C] border border-[#FFF8EE]/10">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C7C9CB] block mb-1">
                    CRUISE VELOCITY
                  </span>
                  <span className="font-bold text-base text-[#FF9A28] block">
                    {current.telemetry.velocity}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#17191C] border border-[#FFF8EE]/10">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C7C9CB] block mb-1">
                    FLIGHT CEILING
                  </span>
                  <span className="font-bold text-base text-[#FFF8EE] block">
                    {current.telemetry.altitude}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#17191C] border border-[#FFF8EE]/10">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C7C9CB] block mb-1">
                    ACOUSTIC EMISSION
                  </span>
                  <span className="font-bold text-base text-[#FF9A28] block">
                    {current.telemetry.acoustic}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#17191C] border border-[#FFF8EE]/10">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C7C9CB] block mb-1">
                    POWER BUS DRAW
                  </span>
                  <span className="font-bold text-base text-[#FFF8EE] block">
                    {current.telemetry.powerDraw}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#17191C] border border-[#FFF8EE]/10">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C7C9CB] block mb-1">
                    THRUST VECTOR
                  </span>
                  <span className="font-bold text-base text-[#FF9A28] block">
                    {current.telemetry.thrustVector}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#17191C] border border-[#FFF8EE]/10">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C7C9CB] block mb-1">
                    STABILITY STATUS
                  </span>
                  <span className="font-bold text-base text-[#FFF8EE] block">
                    ACTIVE LOCK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Tile Flight Envelope Benchmarks Bar filling the bottom */}
        <div ref={benchmarksRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="benchmark-tile p-6 rounded-2xl bg-[#17191C] text-[#FFF8EE] border border-[#FFF8EE]/10 flex flex-col justify-between">
            <span className="font-mono text-[10px] text-[#FF9A28] tracking-[0.2em] uppercase mb-4 font-bold">
              BENCHMARK // 01
            </span>
            <div>
              <h5 className="font-display font-bold text-lg text-[#FFF8EE] uppercase mb-1">
                HOVER EQUILIBRIUM
              </h5>
              <p className="font-sans text-xs text-[#C7C9CB]">
                Sub-millisecond gyroscopic attitude lock against 35-knot crosswinds.
              </p>
            </div>
          </div>

          <div className="benchmark-tile p-6 rounded-2xl bg-[#17191C] text-[#FFF8EE] border border-[#FFF8EE]/10 flex flex-col justify-between">
            <span className="font-mono text-[10px] text-[#FF9A28] tracking-[0.2em] uppercase mb-4 font-bold">
              BENCHMARK // 02
            </span>
            <div>
              <h5 className="font-display font-bold text-lg text-[#FFF8EE] uppercase mb-1">
                ALL-WEATHER ENVELOPE
              </h5>
              <p className="font-sans text-xs text-[#C7C9CB]">
                IP67 hermetically sealed avionics & internal propulsion bearings.
              </p>
            </div>
          </div>

          <div className="benchmark-tile p-6 rounded-2xl bg-[#17191C] text-[#FFF8EE] border border-[#FFF8EE]/10 flex flex-col justify-between">
            <span className="font-mono text-[10px] text-[#FF9A28] tracking-[0.2em] uppercase mb-4 font-bold">
              BENCHMARK // 03
            </span>
            <div>
              <h5 className="font-display font-bold text-lg text-[#FFF8EE] uppercase mb-1">
                AUTONOMOUS SENSING
              </h5>
              <p className="font-sans text-xs text-[#C7C9CB]">
                360° LiDAR, optical flow, and stereoscopic forward obstacle avoidance.
              </p>
            </div>
          </div>

          <div className="benchmark-tile p-6 rounded-2xl bg-[#17191C] text-[#FFF8EE] border border-[#FFF8EE]/10 flex flex-col justify-between">
            <span className="font-mono text-[10px] text-[#FF9A28] tracking-[0.2em] uppercase mb-4 font-bold">
              BENCHMARK // 04
            </span>
            <div>
              <h5 className="font-display font-bold text-lg text-[#FFF8EE] uppercase mb-1">
                ENERGY REDUNDANCY
              </h5>
              <p className="font-sans text-xs text-[#C7C9CB]">
                Dual-bus isolated solid-state battery cells with emergency autorotation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
