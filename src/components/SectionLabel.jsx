import React from 'react';

export default function SectionLabel({ index, label, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-3 text-xs md:text-sm font-mono tracking-[0.25em] uppercase text-[#17191C]/75 font-semibold ${className}`}>
      <span className="w-6 h-[1.5px] bg-[#17191C]/30" />
      <span>{index ? `${index} / ${label}` : label}</span>
    </div>
  );
}
