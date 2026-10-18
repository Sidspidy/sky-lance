import React from 'react';

export default function ScrollIndicator({ target = '#concept' }) {
  return (
    <a
      href={target}
      aria-label="Scroll to explore concept"
      className="group inline-flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#17191C]/70 hover:text-[#17191C] transition-colors duration-300"
    >
      <span className="uppercase font-medium">SCROLL TO DISCOVER</span>
      <div className="w-[18px] h-[32px] rounded-full border border-[#17191C]/35 group-hover:border-[#17191C] flex items-start justify-center p-1 transition-colors duration-300">
        <span className="w-1 h-2 bg-[#17191C] rounded-full animate-bounce mt-0.5" />
      </div>
    </a>
  );
}
