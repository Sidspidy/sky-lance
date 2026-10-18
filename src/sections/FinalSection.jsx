import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FINAL_CONTENT, BRAND, CREATOR } from '../data/productContent';
import PrimaryButton from '../components/PrimaryButton';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function FinalSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const ctaRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      tl.from(headlineRef.current, {
        y: 25,
        duration: 0.8,
        ease: 'power2.out',
      })
        .from(
          copyRef.current,
          {
            y: 15,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .from(
          ctaRef.current?.children,
          {
            y: 15,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleBackToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="final"
      aria-label="Final Overview and Navigation"
      className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#17191C]/15 bg-[#FF7900] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Official Brand Logo */}
        <div className="mb-10 flex items-center justify-center">
          <img
            src="/assets/brand/skylance-logo.svg"
            alt="SKY LANCE Aerospace Study"
            className="h-10 sm:h-12 w-auto object-contain select-none filter drop-shadow-md"
          />
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="mb-6">
          <h2 className="font-display font-extrabold uppercase tracking-tight text-[#17191C] text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9]">
            {FINAL_CONTENT.headline}
          </h2>
        </div>

        {/* Supporting Copy */}
        <div ref={copyRef} className="max-w-xl mb-6">
          <p className="font-sans text-lg sm:text-2xl text-[#17191C]/90 font-medium">
            {FINAL_CONTENT.copy}
          </p>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#17191C]/65 mt-3">
            {BRAND.tagline}
          </p>
        </div>

        {/* Creator Credit Pill */}
        <div className="mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#17191C]/10 border border-[#17191C]/20 font-mono text-[11px] tracking-[0.18em] uppercase text-[#17191C]">
          <span>CONCEPT & ARCHITECTURE BY</span>
          <a
            href={CREATOR.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline hover:text-black transition-colors"
          >
            {CREATOR.name}
          </a>
        </div>

        {/* Action CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
          <PrimaryButton
            onClick={handleBackToTop}
            variant="primary"
            ariaLabel="Scroll back to the top"
          >
            {FINAL_CONTENT.primaryCta}
          </PrimaryButton>

          <PrimaryButton
            href="#concept"
            variant="secondary"
            ariaLabel="Navigate to concept reveal section"
          >
            {FINAL_CONTENT.secondaryCta}
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
