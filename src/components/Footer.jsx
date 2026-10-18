import React from 'react';
import { ArrowUp } from 'lucide-react';
import { BRAND } from '../data/productContent';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#17191C]/18 bg-[#FF7900] pt-8 pb-12 px-4 sm:px-6 lg:px-8 text-[#17191C]">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top Editorial Row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-[#17191C]/15 pb-8">
          <div>
            <img
              src="/assets/brand/skylance-logo.svg"
              alt="SKY LANCE Aerospace Study"
              className="h-9 sm:h-10 w-auto object-contain mb-3 select-none"
            />
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#17191C]/75">
              {BRAND.tagline}
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#17191C]/30 hover:border-[#17191C] hover:bg-[#17191C] hover:text-[#FFF8EE] font-mono text-xs uppercase tracking-[0.18em] transition-all duration-300"
          >
            <span>TOP OF FLIGHT</span>
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Bottom Credits & Legal Notice */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] tracking-[0.14em] text-[#17191C]/65">
          <p className="font-semibold text-[#17191C]/90">
            {BRAND.footerNotice}
          </p>
          <p>
            {BRAND.disclaimer}
          </p>
          <p>
            © {new Date().getFullYear()} SKY LANCE AEROSPACE STUDY.
          </p>
        </div>
      </div>
    </footer>
  );
}
