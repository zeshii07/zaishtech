'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

 const links = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },          // ← ADD THIS LINE
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo — always visible on both backgrounds */}
          <Link href="/" className="flex items-center gap-2.5">
            <svg viewBox="0 0 40 40" className="w-9 h-9 flex-shrink-0" fill="none">
              {/* Circular orbit arc */}
              <circle cx="20" cy="20" r="17" stroke={scrolled ? '#dc2626' : '#f87171'} strokeWidth="2" strokeDasharray="80 27" strokeLinecap="round"/>
              <circle cx="20" cy="20" r="17" stroke={scrolled ? '#3b82f6' : '#60a5fa'} strokeWidth="2" strokeDasharray="27 80" strokeDashoffset="-80" strokeLinecap="round"/>
              {/* Z letter */}
              <path d="M8 14h9l-9 12h9" stroke={scrolled ? '#dc2626' : '#f87171'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              {/* T letter */}
              <path d="M20 14h8M24 14v12" stroke={scrolled ? '#3b82f6' : '#60a5fa'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="flex flex-col leading-tight">
              <span className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${scrolled ? 'text-stone-900' : 'text-white'}`}>Zaishtech</span>
              <span className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${scrolled ? 'text-brand-600' : 'text-brand-400'}`}>Solutions</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={`text-sm font-medium transition-colors ${scrolled ? 'text-stone-600 hover:text-brand-600' : 'text-white/70 hover:text-white'}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className={`text-xs font-medium transition-colors opacity-50 hover:opacity-100 ${scrolled ? 'text-stone-500' : 'text-white/60'}`}>Admin</Link>
            <Link href="/contact" className={`text-sm font-medium px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-lg ${scrolled ? 'bg-stone-900 text-white shadow-stone-900/10' : 'bg-brand-600 text-white shadow-brand-600/30'}`}>
              Start a Project
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={scrolled ? '#1c1917' : '#ffffff'} strokeWidth={2}>
              {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 shadow-lg">
          <div className="px-6 py-4 space-y-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="block text-sm font-medium text-stone-600 hover:text-brand-600 py-2" onClick={() => setMobileOpen(false)}>{l.label}</Link>
            ))}
            <Link href="/contact" className="block bg-brand-600 text-white text-sm font-medium px-6 py-3 rounded-full text-center mt-4" onClick={() => setMobileOpen(false)}>Start a Project</Link>
            <Link href="/login" className="block text-xs text-stone-400 text-center py-2" onClick={() => setMobileOpen(false)}>Admin Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}