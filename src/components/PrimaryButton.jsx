import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function PrimaryButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  icon = true,
  ariaLabel,
}) {
  const baseStyles =
    'group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-mono text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#17191C] cursor-pointer select-none';

  const variants = {
    primary:
      'bg-[#17191C] text-[#FFF8EE] hover:bg-[#25282D] hover:shadow-[0_8px_25px_rgba(23,25,28,0.25)] hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'bg-transparent text-[#17191C] border border-[#17191C]/35 hover:border-[#17191C] hover:bg-[#17191C]/10 active:bg-[#17191C]/20',
    light:
      'bg-[#FFF8EE] text-[#17191C] hover:bg-white hover:shadow-[0_8px_20px_rgba(255,248,238,0.3)] hover:-translate-y-0.5',
    pill:
      'glass-pill text-[#FFF8EE] hover:bg-[#17191C] hover:border-[#FF9A28]/40 hover:shadow-[0_0_20px_rgba(255,154,40,0.2)]',
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-current opacity-85 group-hover:opacity-100" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel || (typeof children === 'string' ? children : 'Action')}
        className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || (typeof children === 'string' ? children : 'Action')}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {content}
    </button>
  );
}
