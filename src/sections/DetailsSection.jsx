import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Activity, Compass, Cpu } from 'lucide-react';
import { DETAILS_CONTENT } from '../data/productContent';
import SectionLabel from '../components/SectionLabel';
import SectionHeading from '../components/SectionHeading';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function DetailsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bentoRef = useRef(null);
  const tableRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger to ensure accurate position after sticky elements
      ScrollTrigger.refresh();

      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 92%',
          once: true,
        },
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      });

      const bentoItems = bentoRef.current?.querySelectorAll('.bento-item');
      if (bentoItems && bentoItems.length) {
        gsap.from(bentoItems, {
          scrollTrigger: {
            trigger: bentoRef.current,
            start: 'top 90%',
            once: true,
          },
          y: 20,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all',
        });
      }

      gsap.from(tableRef.current, {
        scrollTrigger: {
          trigger: tableRef.current,
          start: 'top 90%',
          once: true,
        },
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const materialSpecs = [
    { component: 'Airframe Keel Structure', material: 'T1000 Carbon Fiber Pre-Preg', tensile: '5,800 MPa', thermal: '220°C', safety: '2.5x Aero Spec' },
    { component: 'Propulsion Ring Cowlings', material: 'RTM Carbon Polymer Composite', tensile: '3,400 MPa', thermal: '190°C', safety: '2.8x Shroud Rating' },
    { component: 'Touchdown Landing Skids', material: 'Ti-6Al-4V Grade 5 Titanium', tensile: '1,100 MPa', thermal: '400°C', safety: '3.2x Ground Dynamic' },
    { component: 'Cockpit Optical Canopy', material: 'Smoked High-Impact Polycarbonate', tensile: '90 MPa', thermal: '140°C', safety: '4.0x Impact Margin' },
  ];

  return (
    <section
      ref={sectionRef}
      id="details"
      aria-label="04 Details and Technical Specifications"
      className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FF7900] border-t border-[#17191C]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="max-w-3xl mb-8 sm:mb-12">
          <SectionLabel index={DETAILS_CONTENT.index} label={DETAILS_CONTENT.label} className="mb-4" />
          <SectionHeading className="mb-6">{DETAILS_CONTENT.headline}</SectionHeading>
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-[#17191C] leading-relaxed font-semibold">
            {DETAILS_CONTENT.copy}
          </p>
        </div>

        {/* Asymmetrical Aerospace Bento Blueprint Matrix with Static Zoom and Perfect Alignment */}
        <div ref={bentoRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-14 items-stretch">
          {/* Module 01: Wide Hero (7 Columns) - Side Profile Background (Swapped) */}
          <div className="bento-item lg:col-span-7 rounded-3xl bg-[#FF7900] text-[#FFF8EE] p-6 sm:p-8 shadow-2xl border border-white/25 flex flex-col justify-between relative overflow-hidden min-h-[460px] sm:min-h-[500px] h-full">
            {/* Drone Side Profile Background - Fixed in Zoom Size (No Hover Jitter) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img
                src="/assets/images/detail-side-profile.png"
                alt="SKY LANCE Side Profile Attitude"
                className="w-full h-full object-cover object-center scale-105 select-none"
              />
              {/* Ultra-subtle bottom shadow only for telemetry readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Foreground */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Top Bar Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/20 mb-6">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#FFF8EE]" />
                  <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#FFF8EE] drop-shadow-sm">
                    01 // COMPOSITE ARCHITECTURE
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#FFF8EE] px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 shadow-sm">
                  AS9100D QUALIFIED
                </span>
              </div>

              {/* Light Translucent Text Block (No Heavy Black Box) */}
              <div className="max-w-xl p-4 sm:p-5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/15 shadow-lg my-auto">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#FFF8EE] mb-1.5 drop-shadow-md">
                  T1000 NANOCARBON WEAVE
                </h3>
                <h4 className="font-mono text-xs sm:text-sm tracking-[0.18em] uppercase text-[#FFF8EE]/90 mb-3 font-semibold drop-shadow-sm">
                  CONTINUOUS PRE-PREG / SMOKED CANOPY
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#FFF8EE]/90 leading-relaxed drop-shadow-sm">
                  Hand-laid high-modulus continuous carbon pre-preg fused with anti-glare aerospace clearcoat to resist extreme atmospheric sheer, ultraviolet radiation, and aerodynamic friction.
                </p>
              </div>

              {/* Dual High-Contrast Light Glass Meters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/20 mt-6">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 shadow-lg">
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#FFF8EE]/80 block mb-1">
                    TENSILE STRENGTH
                  </span>
                  <span className="font-mono font-bold text-xl sm:text-2xl text-[#FF9A28] block mb-2 drop-shadow-sm">
                    4,900 MPA
                  </span>
                  <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FF7900] to-[#FF9A28] rounded-full w-[96%]" />
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 shadow-lg">
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#FFF8EE]/80 block mb-1">
                    MATERIAL DENSITY
                  </span>
                  <span className="font-mono font-bold text-xl sm:text-2xl text-[#FFF8EE] block mb-2 drop-shadow-sm">
                    1.55 G/CM³
                  </span>
                  <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FFF8EE]/60 to-[#FFF8EE] rounded-full w-[85%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Module 02: Tall Stack (5 Columns) - Rotor Macro Background */}
          <div className="bento-item lg:col-span-5 rounded-3xl bg-[#FF7900] text-[#FFF8EE] p-6 sm:p-8 shadow-2xl border border-white/25 flex flex-col justify-between relative overflow-hidden min-h-[460px] sm:min-h-[500px] h-full">
            {/* Rotor Macro Background - Fixed in Zoom Size */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img
                src="/assets/images/detail-rotor-macro.png"
                alt="SKY LANCE Ducted Rotor Shroud Macro"
                className="w-full h-full object-cover object-center scale-105 select-none"
              />
              {/* Ultra-subtle bottom shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Foreground */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Top Bar Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/20 mb-6">
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-[#FFF8EE]" />
                  <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#FFF8EE] drop-shadow-sm">
                    02 // ACOUSTIC SHROUDS
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#FFF8EE] px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 shadow-sm">
                  FAR PART 27
                </span>
              </div>

              {/* Light Translucent Text Block (No Heavy Black Box) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/15 shadow-lg my-auto">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-[#FFF8EE] mb-1.5 drop-shadow-md">
                  DUCTED VECTOR COWLS
                </h3>
                <h4 className="font-mono text-xs tracking-[0.18em] uppercase text-[#FFF8EE]/90 mb-3 font-semibold drop-shadow-sm">
                  TORQUE-BALANCED QUAD NACELLES
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#FFF8EE]/90 leading-relaxed drop-shadow-sm">
                  Precision ducted perimeter cowlings engineered to eliminate rotor tip vortices, suppress high-frequency acoustics, and safely protect surrounding personnel.
                </p>
              </div>

              {/* Light Glass Metrics Box */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 shadow-lg mt-6">
                <div className="flex justify-between items-center mb-2 font-mono">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#FFF8EE]/80">ACOUSTIC DAMPING</span>
                  <span className="text-sm font-bold text-[#FF9A28] drop-shadow-sm">-18 DBA REDUCTION</span>
                </div>
                <div className="flex justify-between items-center font-mono">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#FFF8EE]/80">MAX VELOCITY</span>
                  <span className="text-sm font-bold text-[#FFF8EE] drop-shadow-sm">8,500 RPM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Module 03: Tall Stack (5 Columns) - Top-Down Architecture Background (Swapped) */}
          <div className="bento-item lg:col-span-5 rounded-3xl bg-[#FF7900] text-[#FFF8EE] p-6 sm:p-8 shadow-2xl border border-white/25 flex flex-col justify-between relative overflow-hidden min-h-[460px] sm:min-h-[500px] h-full">
            {/* Top-Down Architecture Background - Fixed in Zoom Size */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img
                src="/assets/images/detail-top-architecture.png"
                alt="SKY LANCE Top-Down Architecture"
                className="w-full h-full object-cover object-center scale-105 select-none"
              />
              {/* Ultra-subtle bottom shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Foreground */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Top Bar Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/20 mb-6">
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-[#FFF8EE]" />
                  <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#FFF8EE] drop-shadow-sm">
                    03 // LAMINAR DYNAMICS
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#FFF8EE] px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 shadow-sm">
                  WIND TUNNEL
                </span>
              </div>

              {/* Light Translucent Text Block (No Heavy Black Box) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/15 shadow-lg my-auto">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-[#FFF8EE] mb-1.5 drop-shadow-md">
                  SCULPTED ATTITUDE
                </h3>
                <h4 className="font-mono text-xs tracking-[0.18em] uppercase text-[#FFF8EE]/90 mb-3 font-semibold drop-shadow-sm">
                  DIHEDRAL AERO STABILIZERS
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#FFF8EE]/90 leading-relaxed drop-shadow-sm">
                  Continuous aerodynamic monocoque channeling natural airflow downward across aft stabilizers for passive high-speed equilibrium.
                </p>
              </div>

              {/* Light Glass Metrics Box */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20 font-mono mt-6">
                <div className="p-3.5 rounded-xl bg-black/30 backdrop-blur-md border border-white/20 shadow-lg">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-[#FFF8EE]/80 block mb-1">DRAG RATING</span>
                  <span className="font-bold text-lg text-[#FF9A28] drop-shadow-sm">0.18 CD</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/30 backdrop-blur-md border border-white/20 shadow-lg">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-[#FFF8EE]/80 block mb-1">LAMINAR COHESION</span>
                  <span className="font-bold text-lg text-[#FFF8EE] drop-shadow-sm">94%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Module 04: Wide Hero (7 Columns) - Front Elevation Background (Fixed Vertical Alignment) */}
          <div className="bento-item lg:col-span-7 rounded-3xl bg-[#FF7900] text-[#FFF8EE] p-6 sm:p-8 shadow-2xl border border-white/25 flex flex-col justify-between relative overflow-hidden min-h-[460px] sm:min-h-[500px] h-full">
            {/* Front Elevation Background - Fixed in Zoom Size and Raised Up Centered */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img
                src="/assets/images/detail-front-elevation.png"
                alt="SKY LANCE Front Elevation Stance"
                className="w-full h-full object-cover object-[center_35%] scale-105 select-none"
              />
              {/* Ultra-subtle bottom shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Foreground */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Top Bar Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/20 mb-6">
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-[#FFF8EE]" />
                  <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#FFF8EE] drop-shadow-sm">
                    04 // OPTICAL TELEMETRY
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#FFF8EE] px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 shadow-sm">
                  ICAO ANNEX 14
                </span>
              </div>

              {/* Light Translucent Text Block (No Heavy Black Box) */}
              <div className="max-w-xl p-4 sm:p-5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/15 shadow-lg my-auto">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#FFF8EE] mb-1.5 drop-shadow-md">
                  360° AMBER OPTICAL BANDS
                </h3>
                <h4 className="font-mono text-xs sm:text-sm tracking-[0.18em] uppercase text-[#FFF8EE]/90 mb-3 font-semibold drop-shadow-sm">
                  FULL-PERIMETER GUIDANCE LIGHT-PIPES
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#FFF8EE]/90 leading-relaxed drop-shadow-sm">
                  Recessed continuous amber navigation light-pipes calibrated to ensure instantaneous multi-axis attitude recognition through dense atmospheric conditions and night maneuvers.
                </p>
              </div>

              {/* Bottom Telemetry Metrics */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-white/20 font-mono mt-6">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-[#FFF8EE]/80 block mb-1">WAVELENGTH</span>
                    <span className="font-bold text-lg text-[#FF9A28] drop-shadow-sm">592 NM AMBER</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-[#FFF8EE]/80 block mb-1">TOTAL FLUX</span>
                    <span className="font-bold text-lg text-[#FFF8EE] drop-shadow-sm">3,200 LUMENS</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-[10px] tracking-[0.18em] text-[#FFF8EE] uppercase font-bold self-start sm:self-center shadow-sm">
                  <span>ACTIVE NAVIGATION TRACK</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High-Density Aerospace Material Specification Table */}
        <div
          ref={tableRef}
          className="rounded-3xl bg-[#17191C] text-[#FFF8EE] p-6 sm:p-10 border border-[#FFF8EE]/10 shadow-2xl overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#FFF8EE]/15 mb-6">
            <div>
              <span className="font-mono text-xs text-[#FF9A28] tracking-[0.2em] uppercase font-bold block mb-1">
                STRUCTURAL INTEGRITY MATRIX
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-[#FFF8EE]">
                AEROSPACE ALLOY & COMPOSITE SPECIFICATIONS
              </h3>
            </div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#C7C9CB] self-start sm:self-center">
              ISO 9001 / AS9100 STUDY PROTOCOL
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#FFF8EE]/15 text-[#FF9A28] text-[10px] tracking-[0.2em] uppercase">
                  <th className="py-3 px-4">SUBSYSTEM</th>
                  <th className="py-3 px-4">MATERIAL SPECIFICATION</th>
                  <th className="py-3 px-4">TENSILE RATING</th>
                  <th className="py-3 px-4">THERMAL LIMIT</th>
                  <th className="py-3 px-4">SAFETY FACTOR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FFF8EE]/10 text-[#C7C9CB]">
                {materialSpecs.map((row) => (
                  <tr key={row.component} className="hover:bg-[#FFF8EE]/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#FFF8EE]">{row.component}</td>
                    <td className="py-3.5 px-4">{row.material}</td>
                    <td className="py-3.5 px-4 text-[#FF9A28]">{row.tensile}</td>
                    <td className="py-3.5 px-4">{row.thermal}</td>
                    <td className="py-3.5 px-4 text-[#FFF8EE]">{row.safety}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
