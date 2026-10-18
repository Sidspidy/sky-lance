import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { HERO_CONTENT, BRAND } from '../data/productContent';
import PrimaryButton from '../components/PrimaryButton';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function HeroSection() {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const ctaRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
      })
        .from(
          headlineRef.current?.querySelectorAll('.headline-line'),
          {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
          },
          '-=0.4'
        )
        .from(
          copyRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          ctaRef.current?.children,
          {
            y: 15,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
          },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Sky Lance Hero Presentation"
      className="relative min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between z-10"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Top Aerospace HUD Row: Mission Beacon & Live Coordinates */}
        <div ref={badgeRef} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Main Status Pill with Frosted Glass Styling */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full frosted-glass-card text-[#17191C] shadow-md self-start">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#17191C] opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#17191C]" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase">
              {HERO_CONTENT.badge}
            </span>
          </div>

          {/* Right Aerospace CAD Registration Telemetry */}
          <div className="hidden md:flex items-center gap-6 font-mono text-[10px] tracking-[0.22em] text-[#17191C]/80 uppercase font-semibold">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17191C]" />
              PROPULSION: 4X DUCTED VTOL
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17191C]" />
              AIRFRAME: T1000 MONOCOQUE
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#17191C]/10 border border-[#17191C]/15">
              SYS: ARMED
            </span>
          </div>
        </div>

        {/* Central Monumental Headline — Unobstructed, Framing the Drone Behind */}
        <div ref={headlineRef} className="my-auto py-12 sm:py-20 text-center sm:text-left">
          <div className="flex items-center gap-3 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#17191C]/75 font-bold mb-3 sm:mb-4">
            <span>01 // THE NEXT FRONTIER IN PERSONAL FLIGHT</span>
            <span className="hidden sm:inline-block w-8 h-[1px] bg-[#17191C]/40" />
          </div>

          <h1 className="font-display font-extrabold uppercase tracking-tight text-[#17191C] text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.88] select-none">
            <span className="block headline-line">{HERO_CONTENT.headlineLine1}</span>
            <span className="block headline-line text-transparent bg-clip-text bg-gradient-to-r from-[#17191C] via-[#2D3035] to-[#17191C]">
              {HERO_CONTENT.headlineLine2}
            </span>
          </h1>
        </div>

        {/* Bottom Supporting Copy & Dual Action Buttons */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 sm:gap-10 pt-4">
          <div ref={copyRef} className="max-w-xl">
            <p className="font-sans text-base sm:text-lg md:text-xl text-[#17191C] font-semibold leading-relaxed drop-shadow-sm">
              {HERO_CONTENT.copy}
            </p>
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-[#17191C]/75 mt-2 font-medium">
              {BRAND.supportingStatement}
            </p>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <PrimaryButton href="#concept" variant="primary" className="flex-1 sm:flex-initial">
              {HERO_CONTENT.primaryCta}
            </PrimaryButton>
            <PrimaryButton href="#engineering" variant="secondary" className="flex-1 sm:flex-initial">
              {HERO_CONTENT.secondaryCta}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
