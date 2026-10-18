import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause } from 'lucide-react';
import { ENGINEERING_CONTENT, BRAND } from '../data/productContent';
import SectionLabel from '../components/SectionLabel';
import SectionHeading from '../components/SectionHeading';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function EngineeringSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const videoRef = useRef(null);
  const videoStageRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="engineering"
      aria-label="03 Engineering and Exploded Disassembly"
      className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FF7900] border-t border-[#17191C]/15"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="max-w-3xl mb-8 sm:mb-12">
          <SectionLabel index={ENGINEERING_CONTENT.index} label={ENGINEERING_CONTENT.label} className="mb-4" />
          <SectionHeading className="mb-6">{ENGINEERING_CONTENT.headline}</SectionHeading>
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-[#17191C] leading-relaxed font-semibold mb-4">
            {ENGINEERING_CONTENT.copy}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#17191C]/10 border border-[#17191C]/20 font-mono text-[11px] uppercase tracking-[0.15em] text-[#17191C]">
            <span className="font-bold">STUDY NOTICE:</span>
            <span>{BRAND.disclaimer}</span>
          </div>
        </div>

        {/* Side-by-Side Layout: Editorial Typography on Left, Sticky Exploded Video on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start my-8 sm:my-12">
          {/* Left Column: Pure Editorial Typography (No Box Cards) */}
          <div className="lg:col-span-6 flex flex-col gap-12 sm:gap-16 order-2 lg:order-1 py-2">
            {ENGINEERING_CONTENT.features.map((feat) => (
              <div
                key={feat.number}
                className="group text-left text-[#17191C] pb-8 border-b border-[#17191C]/25 last:border-b-0"
              >
                <div className="flex items-center justify-between font-mono text-xs tracking-[0.25em] mb-3 pb-2 border-b border-[#17191C]/15 font-bold uppercase">
                  <span>SUBSYSTEM // {feat.number}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#17191C]" />
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-[#17191C] mb-3">
                  {feat.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#17191C]/90 font-medium leading-relaxed mb-6 max-w-xl">
                  {feat.description}
                </p>

                <div className="pt-3 border-t border-[#17191C]/15 font-mono text-xs leading-normal">
                  <span className="text-[#17191C] font-bold block mb-1">DESIGN EMPHASIS:</span>
                  <span className="text-[#17191C]/80 font-medium">{feat.highlight}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Video Stage that moves alongside user scroll */}
          <div
            ref={videoStageRef}
            className="lg:col-span-6 sticky top-24 sm:top-28 order-1 lg:order-2 self-start"
          >
            {/* Ambient Backlight Diffusion */}
            <div className="absolute inset-0 aerospace-radial opacity-60 pointer-events-none" />

            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(23,25,28,0.3)] border border-[#17191C]/20 bg-[#FF7900]">
              <video
                ref={videoRef}
                src="/assets/video/skylance-rotate.mp4"
                autoPlay
                muted
                playsInline
                loop
                className="w-full h-full object-cover select-none"
              />

              {/* Play/Pause Button - Icon ONLY, positioned a little bit more top in bottom-right corner over the watermark */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause assembly film' : 'Play assembly film'}
                className="absolute bottom-6 right-5 sm:bottom-7 sm:right-7 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#17191C] text-[#FFF8EE] hover:bg-black border border-[#FFF8EE]/20 shadow-2xl flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-[#FF9A28]" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5 text-[#FF9A28]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
