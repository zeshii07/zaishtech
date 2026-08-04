'use client';

import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
          setStatsAnimated(true);
          animateCounter('stat-projects', 4, '+');
          animateCounter('stat-clients', 2, '');
          animateCounter('stat-uptime', 3, '');
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    // Scroll reveal for hero elements
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => revealObserver.observe(el));
  }, [statsAnimated]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-stone-900">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=85"
          alt="Software team collaborating in a modern workspace"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/60 to-stone-900" />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* Floating dots */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-brand-500 rounded-full animate-pulse-dot hidden md:block" />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-brand-400 rounded-full animate-pulse-dot hidden md:block" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse-dot hidden md:block" style={{ animationDelay: '0.5s' }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 md:pt-40 md:pb-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-dot" />
                <span className="text-xs font-bold uppercase tracking-widest text-stone-300">Now Accepting Projects</span>
              </div>
            </div>

            <h1 className="animate-fade-in-up text-4xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.05] tracking-tight">
              We Build <br />
              <span className="font-serif italic gradient-text">Software</span> That<br />
              Scales Business
            </h1>

            <p className="animate-fade-in-up mt-8 text-lg text-stone-400 leading-relaxed max-w-xl" style={{ animationDelay: '200ms' }}>
              Websites, mobile apps, AI assistants, and business automation built by one focused software team—from discovery to launch.
            </p>

            <div className="animate-fade-in-up mt-10 flex flex-col sm:flex-row gap-4" style={{ animationDelay: '300ms' }}>
              <a href="/contact" className="bg-brand-600 text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-brand-700 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand-600/30 text-center">
                Book a Free Consultation
              </a>
              <a href="#work" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 text-center">
                View Our Work
              </a>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="animate-fade-in-up mt-14 flex gap-10" style={{ animationDelay: '400ms' }}>
              <div>
                <div className="text-3xl font-semibold text-white" id="stat-projects">0</div>
                <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mt-1">Live Solutions</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-white" id="stat-clients">0</div>
                <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mt-1">Active Builds</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-white" id="stat-uptime">0</div>
                <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mt-1">Core Platforms</div>
              </div>
            </div>
          </div>

          {/* Right - Terminal */}
          <div className="animate-fade-in-up hidden lg:block animate-float" style={{ animationDelay: '300ms' }}>
            <div className="terminal-window">
              <div className="bg-[#16213e] p-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-stone-400 ml-2 font-mono">ZaishTech — dev server</span>
              </div>
              <div className="p-6 font-mono text-sm leading-7">
                <div className="text-stone-500">$ ZaishTech init --project new-client</div>
                <div className="text-emerald-400 mt-2">✓ Project scaffolded successfully</div>
                <div className="text-stone-500 mt-3">$ ZaishTech deploy --env production</div>
                <div className="text-amber-400 mt-2">⟳ Building optimized bundles...</div>
                <div className="text-emerald-400 mt-1">✓ Deployed to production</div>
                <div className="text-stone-500 mt-3">$ ZaishTech ai --enable whatsapp-bot</div>
                <div className="text-brand-400 mt-2">⚡ AI model loaded &amp; active</div>
                <div className="text-emerald-400 mt-1">✓ WhatsApp auto-reply running</div>
                <div className="text-stone-500 mt-3">$ <span className="animate-pulse-dot">|</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-stone-500 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function animateCounter(elementId: string, target: number, suffix: string) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}
