import React from 'react';

export default function WatermarkMaskBadge({ className = '' }) {
  return (
    <div
      className={`absolute bottom-8 right-5 sm:bottom-12 sm:right-8 z-30 pointer-events-auto select-none ${className}`}
      aria-label="Aerospace Study Status"
    >
      {/* Solid high-contrast pill that completely covers the video watermark */}
      <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#17191C] border border-[#FF9A28]/50 shadow-[0_12px_35px_rgba(23,25,28,0.6)] text-[#FFF8EE]">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9A28] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF9A28]" />
        </span>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase font-bold text-[#FFF8EE]">
            SKY LANCE // AERO 2026
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.18em] uppercase text-[#C7C9CB]">
            MONOCOQUE DESIGN STUDY
          </span>
        </div>
      </div>
    </div>
  );
}
