import React from 'react';

export default function SectionHeading({ children, className = '', as = 'h2' }) {
  const Component = as;
  return (
    <Component
      className={`font-display font-bold uppercase tracking-tight text-[#17191C] leading-[0.95] text-3xl sm:text-5xl md:text-6xl lg:text-7xl ${className}`}
    >
      {children}
    </Component>
  );
}
