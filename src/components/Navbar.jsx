import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../data/productContent';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FF7900]/90 backdrop-blur-md border-b border-[#17191C]/15 py-3 shadow-[0_4px_20px_rgba(23,25,28,0.06)]'
            : 'bg-transparent py-5 sm:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark & Official Aerospace Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C] rounded-sm transition-transform duration-200 hover:scale-[1.02]"
            aria-label={`${BRAND.name} Home`}
          >
            <img
              src="/assets/brand/skylance-logo.svg"
              alt="SKY LANCE Aerospace Study"
              className="h-8 sm:h-9 w-auto object-contain select-none"
            />
          </a>

          {/* Desktop Nav Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-8 font-mono text-xs font-semibold tracking-[0.2em] text-[#17191C]/80"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative py-1 hover:text-[#17191C] transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#17191C]"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#17191C] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Compact CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#design"
              onClick={(e) => handleNavClick(e, '#design')}
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-full bg-[#17191C] text-[#FFF8EE] font-mono text-xs font-semibold tracking-[0.18em] uppercase hover:bg-black transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C]"
            >
              EXPLORE SKY LANCE
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden w-10 h-10 rounded-full border border-[#17191C]/25 flex items-center justify-center text-[#17191C] hover:bg-[#17191C]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17191C]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavClick={handleNavClick}
      />
    </>
  );
}
