import React from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS, BRAND, CREATOR } from '../data/productContent';

export default function MobileMenu({ isOpen, onClose, onNavClick }) {
  if (!isOpen) return null;

  const handleLink = (e, href) => {
    onClose();
    if (onNavClick) {
      onNavClick(e, href);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 bg-[#FF7900] flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-200"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#17191C]/15 pb-4">
        <img
          src="/assets/brand/skylance-logo.svg"
          alt="SKY LANCE Aerospace Study"
          className="h-8 w-auto object-contain select-none"
        />
        <button
          onClick={onClose}
          type="button"
          aria-label="Close menu"
          className="w-10 h-10 rounded-full border border-[#17191C]/25 flex items-center justify-center text-[#17191C] hover:bg-[#17191C]/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex flex-col gap-6 my-auto py-8">
        {NAV_LINKS.map((link, idx) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleLink(e, link.href)}
            className="group flex items-baseline justify-between border-b border-[#17191C]/10 pb-3"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-[#17191C]/50">0{idx + 1}</span>
              <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#17191C] group-hover:translate-x-2 transition-transform duration-200">
                {link.label}
              </span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-[#17191C]/40 group-hover:text-[#17191C] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </a>
        ))}
      </div>

      {/* Bottom CTA & Concept Info */}
      <div className="flex flex-col gap-4 border-t border-[#17191C]/15 pt-6">
        <button
          type="button"
          onClick={(e) => handleLink(e, '#design')}
          className="w-full py-4 rounded-full bg-[#17191C] text-[#FFF8EE] font-mono text-xs tracking-[0.2em] uppercase font-bold text-center hover:bg-black transition-colors"
        >
          EXPLORE SKY LANCE
        </button>
        <div className="flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-wider text-[#17191C]/75 pt-1">
          <span>BY {CREATOR.name}</span>
          <span>•</span>
          <a href={CREATOR.github} target="_blank" rel="noopener noreferrer" className="underline font-bold">GitHub</a>
          <span>•</span>
          <a href={CREATOR.linkedin} target="_blank" rel="noopener noreferrer" className="underline font-bold">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}
