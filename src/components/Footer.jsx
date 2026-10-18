import React from 'react';
import { ArrowUp, Mail, Globe, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { BRAND, NAV_LINKS, CREATOR } from '../data/productContent';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#17191C]/20 bg-[#FF7900] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#17191C]">
      <div className="max-w-7xl mx-auto">
        {/* Main Product Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#17191C]/15">
          {/* Column 1: Brand & Overview (2 cols wide on desktop) */}
          <div className="lg:col-span-2 flex flex-col justify-between pr-0 lg:pr-8">
            <div>
              <img
                src="/assets/brand/skylance-logo.svg"
                alt="SKY LANCE Aerospace Study"
                className="h-9 w-auto object-contain mb-4 select-none"
              />
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#17191C]/80 font-bold mb-3">
                {BRAND.tagline}
              </p>
              <p className="font-sans text-sm text-[#17191C]/75 leading-relaxed max-w-sm">
                An advanced aerospace design study exploring aerodynamic monocoque profiles, enclosed ducted propulsion, and intuitive personal flight telemetry.
              </p>
            </div>

          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col">
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-[#17191C] mb-4">
              EXPLORE
            </span>
            <ul className="flex flex-col gap-2.5 font-mono text-xs tracking-wider text-[#17191C]/80">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#17191C] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Engineering Specs */}
          <div className="flex flex-col">
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-[#17191C] mb-4">
              SPECIFICATIONS
            </span>
            <ul className="flex flex-col gap-2.5 font-mono text-xs tracking-wider text-[#17191C]/80">
              <li>QUAD COAXIAL DUCTED</li>
              <li>CARBON MONOCOQUE</li>
              <li>360° AMBER OPTICAL BANDS</li>
              <li>HIGH-G TITANIUM SPARS</li>
              <li>SUB-SECOND AVIONICS</li>
            </ul>
          </div>

          {/* Column 4: Creator & Lead */}
          <div className="flex flex-col">
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-[#17191C] mb-4">
              CREATOR & LEAD
            </span>
            <div className="flex flex-col gap-2 font-mono text-xs text-[#17191C]/85">
              <span className="font-display text-base font-bold tracking-tight text-[#17191C]">
                {CREATOR.name}
              </span>
              <span className="text-[11px] text-[#17191C]/70 -mt-1 tracking-wider uppercase font-semibold">
                {CREATOR.role}
              </span>

              <div className="flex flex-col gap-2.5 pt-2">
                <a
                  href={`mailto:${CREATOR.email}`}
                  className="inline-flex items-center gap-2 hover:text-black transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#17191C]/70" />
                  <span className="truncate">{CREATOR.email}</span>
                </a>
                <a
                  href={CREATOR.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-black transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-[#17191C]/70" />
                  <span>github.com/Sidspidy</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
                <a
                  href={CREATOR.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-black transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#17191C]/70" />
                  <span>LinkedIn Connect</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] tracking-[0.14em] text-[#17191C]/75">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="font-bold text-[#17191C]">
              {BRAND.footerNotice}
            </span>
            <span className="hidden sm:inline text-[#17191C]/40">•</span>
            <span>
              DESIGNED & DEVELOPED BY {CREATOR.name.toUpperCase()}
            </span>
            <span className="hidden sm:inline text-[#17191C]/40">•</span>
            <span>
              © {new Date().getFullYear()} ALL RIGHTS RESERVED
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#17191C]/30 hover:border-[#17191C] hover:bg-[#17191C] hover:text-[#FFF8EE] font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer self-start sm:self-auto"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
