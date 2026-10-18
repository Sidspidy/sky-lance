import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONCEPT_CONTENT } from '../data/productContent';
import SectionLabel from '../components/SectionLabel';
import SectionHeading from '../components/SectionHeading';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function ProductRevealSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsRef = useRef(null);
  const specBannerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      gsap.from(headlineRef.current, {
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 90%',
          once: true,
        },
        y: 25,
        duration: 0.7,
        ease: 'power2.out',
      });

      const cards = cardsRef.current?.querySelectorAll('.concept-card');
      if (cards && cards.length) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 90%',
            once: true,
          },
          y: 25,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
        });
      }

      gsap.from(specBannerRef.current, {
        scrollTrigger: {
          trigger: specBannerRef.current,
          start: 'top 92%',
          once: true,
        },
        y: 15,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="concept"
      aria-label="01 The Concept"
      className="relative min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Section Header */}
        <div ref={headlineRef} className="max-w-3xl mb-8">
          <SectionLabel index={CONCEPT_CONTENT.index} label={CONCEPT_CONTENT.label} className="mb-4" />
          <SectionHeading className="mb-4">{CONCEPT_CONTENT.headline}</SectionHeading>
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#17191C] leading-relaxed font-semibold max-w-2xl">
            {CONCEPT_CONTENT.copy}
          </p>
        </div>

        {/* 3 Floating Concept Annotation Cards with True Frosted Glassmorphism Effect */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 my-auto py-8"
        >
          {CONCEPT_CONTENT.annotations.map((item) => (
            <div
              key={item.id}
              className="concept-card group relative p-6 sm:p-8 rounded-3xl frosted-glass-card text-[#17191C] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(23,25,28,0.2)]"
            >
              {/* Card Header with Glowing Beacon */}
              <div className="flex items-center justify-between font-mono text-xs text-[#17191C] mb-4 pb-3 border-b border-[#17191C]/15 font-bold">
                <span className="tracking-[0.22em] uppercase">TAG // {item.tag}</span>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#17191C] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#17191C]" />
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight mb-3 text-[#17191C]">
                {item.title}
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#17191C]/90 font-medium leading-relaxed">
                {item.description}
              </p>

              {/* Inset Aerospace Tag */}
              <div className="mt-6 pt-3 border-t border-[#17191C]/15 flex items-center justify-between font-mono text-[9px] tracking-[0.25em] uppercase text-[#17191C]/70 font-semibold">
                <span>SPECIFICATION // {item.tag}</span>
                <span>VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
