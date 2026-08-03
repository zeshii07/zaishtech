'use client';

import { useEffect } from 'react';

export default function Pricing() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }); },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
  }, []);

  return (
    <section id="pricing" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="reveal text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Pricing</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight leading-[1.1]">
            Transparent pricing.<br />
            <span className="font-serif italic text-stone-400">No surprises.</span>
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="reveal bg-stone-50 rounded-2xl p-8 border border-stone-200/50 hover:border-brand-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Starter</div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-semibold">$2,500</span>
              <span className="text-stone-400 text-sm">starting</span>
            </div>
            <p className="mt-3 text-stone-500 text-sm">Perfect for MVPs, landing pages, and small business tools.</p>
            <div className="mt-6 space-y-3">
              {[
                { t: 'Single-page website or MVP', c: true },
                { t: 'Responsive design', c: true },
                { t: 'Basic CMS integration', c: true },
                { t: '2 revision rounds', c: true },
                { t: '15-day post-launch support', c: true },
                { t: 'Custom AI/automation', c: false },
              ].map((item) => (
                <div key={item.t} className="flex items-center gap-3 text-sm">
                  <span className={`iconify ${item.c ? 'text-emerald-500' : 'text-stone-300'}`} data-icon={item.c ? 'mdi:check-circle' : 'mdi:close-circle'} data-width="18" />
                  <span className={item.c ? '' : 'text-stone-400'}>{item.t}</span>
                </div>
              ))}
            </div>
            <a href="/contact" className="mt-8 block text-center bg-white border border-stone-200 text-stone-900 text-sm font-semibold px-6 py-3 rounded-full hover:bg-stone-100 transition-all duration-300">
              Get Started
            </a>
          </div>

          {/* Professional */}
          <div className="reveal relative bg-stone-900 text-white rounded-2xl p-8 border border-stone-800 hover:border-brand-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">Most Popular</div>
            <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Professional</div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-semibold">$8,000</span>
              <span className="text-stone-400 text-sm">starting</span>
            </div>
            <p className="mt-3 text-stone-400 text-sm">Full-stack web apps, AI automation, and custom portals.</p>
            <div className="mt-6 space-y-3">
              {[
                { t: 'Full-stack web application', c: true },
                { t: 'Custom UI/UX design', c: true },
                { t: 'AI & automation integration', c: true },
                { t: 'Admin dashboard & analytics', c: true },
                { t: 'API development', c: true },
                { t: '30-day post-launch support', c: true },
              ].map((item) => (
                <div key={item.t} className="flex items-center gap-3 text-sm">
                  <span className="iconify text-brand-400" data-icon="mdi:check-circle" data-width="18" />
                  <span>{item.t}</span>
                </div>
              ))}
            </div>
            <a href="/contact" className="mt-8 block text-center bg-brand-600 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-brand-700 transition-all duration-300 shadow-lg shadow-brand-600/20">
              Start a Project
            </a>
          </div>

          {/* Enterprise */}
          <div className="reveal bg-stone-50 rounded-2xl p-8 border border-stone-200/50 hover:border-brand-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Enterprise</div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-semibold">Custom</span>
            </div>
            <p className="mt-3 text-stone-500 text-sm">Large-scale platforms, native apps, and enterprise ecosystems.</p>
            <div className="mt-6 space-y-3">
              {[
                { t: 'Everything in Professional', c: true },
                { t: 'Native Android app', c: true },
                { t: 'Multi-tenant architecture', c: true },
                { t: 'DevOps & CI/CD setup', c: true },
                { t: 'Dedicated project manager', c: true },
                { t: '90-day support & SLA', c: true },
              ].map((item) => (
                <div key={item.t} className="flex items-center gap-3 text-sm">
                  <span className="iconify text-emerald-500" data-icon="mdi:check-circle" data-width="18" />
                  <span>{item.t}</span>
                </div>
              ))}
            </div>
            <a href="/contact" className="mt-8 block text-center bg-white border border-stone-200 text-stone-900 text-sm font-semibold px-6 py-3 rounded-full hover:bg-stone-100 transition-all duration-300">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}