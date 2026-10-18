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
          y: 25,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
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

        {/* Asymmetrical Aerospace Bento Blueprint Matrix (No Horizontal Scroll) */}
        <div ref={bentoRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-14">
          {/* Module 01: Wide Hero (7 Columns) - Surface Materials */}
          <div className="bento-item lg:col-span-7 rounded-3xl bg-[#17191C] text-[#FFF8EE] p-7 sm:p-10 shadow-2xl border border-[#FFF8EE]/10 flex flex-col justify-between relative overflow-hidden group hover:border-[#FF9A28]/50 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#FFF8EE]/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#FF9A28]" />
                  <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#FF9A28]">
                    01 // COMPOSITE ARCHITECTURE
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#C7C9CB] px-3 py-1 rounded-full bg-[#FFF8EE]/5 border border-[#FFF8EE]/10">
                  AS9100D QUALIFIED
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-[#FFF8EE] mb-2">
                T1000 NANOCARBON WEAVE
              </h3>
              <h4 className="font-mono text-xs sm:text-sm tracking-[0.18em] uppercase text-[#FF9A28] mb-5 font-semibold">
                CONTINUOUS PRE-PREG / SMOKED OPTICAL ACRYLIC
              </h4>

              <p className="font-sans text-sm sm:text-base text-[#C7C9CB] leading-relaxed mb-8 max-w-xl">
                Hand-laid high-modulus continuous carbon pre-preg fused with anti-glare aerospace clearcoat to resist extreme atmospheric sheer, ultraviolet radiation, and aerodynamic friction.
              </p>
            </div>

            {/* Dual High-Contrast Meters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#FFF8EE]/10">
              <div className="p-4 rounded-2xl bg-[#FFF8EE]/5 border border-[#FFF8EE]/10">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C7C9CB] block mb-1">
                  TENSILE STRENGTH
                </span>
                <span className="font-mono font-bold text-xl sm:text-2xl text-[#FF9A28] block mb-2">
                  4,900 MPA
                </span>
                <div className="w-full h-1.5 rounded-full bg-[#FFF8EE]/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#FF7900] to-[#FF9A28] rounded-full w-[96%]" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF8EE]/5 border border-[#FFF8EE]/10">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C7C9CB] block mb-1">
                  MATERIAL DENSITY
                </span>
                <span className="font-mono font-bold text-xl sm:text-2xl text-[#FFF8EE] block mb-2">
                  1.55 G/CM³
                </span>
                <div className="w-full h-1.5 rounded-full bg-[#FFF8EE]/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#FFF8EE]/60 to-[#FFF8EE] rounded-full w-[85%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Module 02: Tall Stack (5 Columns) - Propulsion Rings */}
          <div className="bento-item lg:col-span-5 rounded-3xl bg-[#17191C] text-[#FFF8EE] p-7 sm:p-10 shadow-2xl border border-[#FFF8EE]/10 flex flex-col justify-between relative overflow-hidden group hover:border-[#FF9A28]/50 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#FFF8EE]/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-[#FF9A28]" />
                  <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#FF9A28]">
                    02 // ACOUSTIC SHROUDS
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#C7C9CB] px-3 py-1 rounded-full bg-[#FFF8EE]/5 border border-[#FFF8EE]/10">
                  FAR PART 27
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-[#FFF8EE] mb-2">
                DUCTED VECTOR COWLS
              </h3>
              <h4 className="font-mono text-xs tracking-[0.18em] uppercase text-[#FF9A28] mb-4 font-semibold">
                TORQUE-BALANCED QUAD NACELLES
              </h4>

              <p className="font-sans text-sm text-[#C7C9CB] leading-relaxed mb-6">
                Precision ducted perimeter cowlings engineered to eliminate rotor tip vortices, suppress high-frequency acoustics, and safely protect surrounding personnel.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF8EE]/5 border border-[#FFF8EE]/10 mt-auto">
              <div className="flex justify-between items-center mb-2 font-mono">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#C7C9CB]">ACOUSTIC DAMPING</span>
                <span className="text-sm font-bold text-[#FF9A28]">-18 DBA REDUCTION</span>
              </div>
              <div className="flex justify-between items-center font-mono">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#C7C9CB]">MAX VELOCITY</span>
                <span className="text-sm font-bold text-[#FFF8EE]">8,500 RPM</span>
              </div>
            </div>
          </div>

          {/* Module 03: Balanced Stack (5 Columns) - Shell Geometry */}
          <div className="bento-item lg:col-span-5 rounded-3xl bg-[#17191C] text-[#FFF8EE] p-7 sm:p-10 shadow-2xl border border-[#FFF8EE]/10 flex flex-col justify-between relative overflow-hidden group hover:border-[#FF9A28]/50 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#FFF8EE]/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-[#FF9A28]" />
                  <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#FF9A28]">
                    03 // LAMINAR DYNAMICS
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#C7C9CB] px-3 py-1 rounded-full bg-[#FFF8EE]/5 border border-[#FFF8EE]/10">
                  WIND TUNNEL
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-[#FFF8EE] mb-2">
                SCULPTED ATTITUDE
              </h3>
              <h4 className="font-mono text-xs tracking-[0.18em] uppercase text-[#FF9A28] mb-4 font-semibold">
                DIHEDRAL AERO STABILIZERS
              </h4>

              <p className="font-sans text-sm text-[#C7C9CB] leading-relaxed mb-6">
                Continuous aerodynamic monocoque channeling natural airflow downward across aft stabilizers for passive high-speed equilibrium.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#FFF8EE]/10 font-mono">
              <div className="p-3 rounded-xl bg-[#FFF8EE]/5 border border-[#FFF8EE]/10">
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#C7C9CB] block mb-1">DRAG RATING</span>
                <span className="font-bold text-lg text-[#FF9A28]">0.18 CD</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FFF8EE]/5 border border-[#FFF8EE]/10">
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#C7C9CB] block mb-1">LAMINAR COHESION</span>
                <span className="font-bold text-lg text-[#FFF8EE]">94%</span>
              </div>
            </div>
          </div>

          {/* Module 04: Wide Stack (7 Columns) - Integrated Lighting */}
          <div className="bento-item lg:col-span-7 rounded-3xl bg-[#17191C] text-[#FFF8EE] p-7 sm:p-10 shadow-2xl border border-[#FFF8EE]/10 flex flex-col justify-between relative overflow-hidden group hover:border-[#FF9A28]/50 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#FFF8EE]/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-[#FF9A28]" />
                  <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#FF9A28]">
                    04 // OPTICAL TELEMETRY
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#C7C9CB] px-3 py-1 rounded-full bg-[#FFF8EE]/5 border border-[#FFF8EE]/10">
                  ICAO ANNEX 14
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-[#FFF8EE] mb-2">
                360° AMBER OPTICAL BANDS
              </h3>
              <h4 className="font-mono text-xs sm:text-sm tracking-[0.18em] uppercase text-[#FF9A28] mb-5 font-semibold">
                FULL-PERIMETER GUIDANCE LIGHT-PIPES
              </h4>

              <p className="font-sans text-sm sm:text-base text-[#C7C9CB] leading-relaxed mb-6 max-w-xl">
                Recessed continuous amber navigation light-pipes calibrated to ensure instantaneous multi-axis attitude recognition through dense atmospheric conditions and night maneuvers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-[#FFF8EE]/10 font-mono">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.18em] text-[#C7C9CB] block mb-1">WAVELENGTH</span>
                  <span className="font-bold text-lg text-[#FF9A28]">592 NM AMBER</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.18em] text-[#C7C9CB] block mb-1">TOTAL FLUX</span>
                  <span className="font-bold text-lg text-[#FFF8EE]">3,200 LUMENS</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF7900]/15 border border-[#FF7900]/30 text-[10px] tracking-[0.18em] text-[#FF9A28] uppercase font-bold self-start sm:self-center">
                <span>ACTIVE NAVIGATION TRACK</span>
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
