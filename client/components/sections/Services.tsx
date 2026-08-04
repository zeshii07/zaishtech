'use client';

import { useEffect } from 'react';

export default function Services() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }); },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
  }, []);

  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="reveal max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">What We Build</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight leading-[1.1]">
            End-to-end development<br />
            <span className="font-serif italic text-stone-400">for modern business</span>
          </h2>
          <p className="mt-6 text-lg text-stone-500 leading-relaxed">
            From custom web apps to AI-powered automation, we deliver production-grade solutions that drive real business outcomes.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Custom Software */}
          <div className="reveal group bg-stone-50 rounded-2xl p-8 border border-stone-200/50 hover:border-brand-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="w-14 h-14 bg-brand-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-5 transition-transform">
              <span className="iconify text-brand-600" data-icon="mdi:code-braces-box" data-width="28" />
            </div>
            <h3 className="text-xl font-medium tracking-tight">Custom Software Development</h3>
            <p className="mt-3 text-stone-500 leading-relaxed text-sm">
              Bespoke software solutions tailored to your unique business logic, workflows, and growth targets. Built for scale from day one.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['SaaS Platforms', 'CRM Systems', 'ERP Tools'].map((t) => (
                <span key={t} className="text-xs font-medium bg-white border border-stone-200 rounded-full px-3 py-1 text-stone-600">{t}</span>
              ))}
            </div>
          </div>

          {/* Web & Web App */}
          <div className="reveal group bg-stone-50 rounded-2xl p-8 border border-stone-200/50 hover:border-brand-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="w-14 h-14 bg-brand-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-5 transition-transform">
              <span className="iconify text-brand-600" data-icon="mdi:web" data-width="28" />
            </div>
            <h3 className="text-xl font-medium tracking-tight">Website & Web App Development</h3>
            <p className="mt-3 text-stone-500 leading-relaxed text-sm">
              High-performance websites and progressive web applications using React, Next.js, and modern cloud architecture.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Next.js', 'React', 'Node.js'].map((t) => (
                <span key={t} className="text-xs font-medium bg-white border border-stone-200 rounded-full px-3 py-1 text-stone-600">{t}</span>
              ))}
            </div>
          </div>

          {/* Android Native */}
          <div className="reveal group bg-stone-50 rounded-2xl p-8 border border-stone-200/50 hover:border-brand-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="w-14 h-14 bg-brand-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-5 transition-transform">
              <span className="iconify text-brand-600" data-icon="mdi:android" data-width="28" />
            </div>
            <h3 className="text-xl font-medium tracking-tight">Mobile App Development</h3>
            <p className="mt-3 text-stone-500 leading-relaxed text-sm">
              Cross-platform mobile products built with React Native, backed by secure APIs and designed around real user workflows.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['React Native', 'iOS & Android', 'App APIs'].map((t) => (
                <span key={t} className="text-xs font-medium bg-white border border-stone-200 rounded-full px-3 py-1 text-stone-600">{t}</span>
              ))}
            </div>
          </div>

          {/* AI & Automation — Featured */}
          <div className="reveal group md:col-span-2 lg:col-span-2 relative overflow-hidden rounded-2xl p-8 bg-stone-900 text-white border border-stone-800 hover:border-brand-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 bg-brand-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-5 transition-transform">
                  <span className="iconify text-brand-400" data-icon="mdi:robot-excited-outline" data-width="28" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-600/20 px-3 py-1 rounded-full">Most Popular</span>
              </div>
              <h3 className="text-2xl font-medium tracking-tight">AI & Business Automation</h3>
              <p className="mt-3 text-stone-400 leading-relaxed max-w-2xl">
                Deploy intelligent automation that handles repetitive tasks, responds to customers 24/7, and books appointments while you sleep.
              </p>
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <span className="iconify text-brand-400 mb-2" data-icon="mdi:whatsapp" data-width="24" />
                  <div className="text-sm font-medium">WhatsApp Auto-Reply</div>
                  <div className="text-xs text-stone-500 mt-1">Instant customer responses 24/7</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <span className="iconify text-brand-400 mb-2" data-icon="mdi:calendar-check-outline" data-width="24" />
                  <div className="text-sm font-medium">Auto Booking System</div>
                  <div className="text-xs text-stone-500 mt-1">Smart scheduling &amp; reminders</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <span className="iconify text-brand-400 mb-2" data-icon="mdi:brain" data-width="24" />
                  <div className="text-sm font-medium">AI Chatbots</div>
                  <div className="text-xs text-stone-500 mt-1">Custom-trained on your data</div>
                </div>
              </div>
            </div>
          </div>

          {/* Portals & Inventory */}
          <div className="reveal group bg-stone-50 rounded-2xl p-8 border border-stone-200/50 hover:border-brand-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="w-14 h-14 bg-brand-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-5 transition-transform">
              <span className="iconify text-brand-600" data-icon="mdi:warehouse" data-width="28" />
            </div>
            <h3 className="text-xl font-medium tracking-tight">Portals & Inventory Management</h3>
            <p className="mt-3 text-stone-500 leading-relaxed text-sm">
              Multi-role dashboards, vendor portals, and real-time inventory systems with barcode scanning, alerts, and analytics.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Admin Panels', 'Multi-tenant', 'Real-time'].map((t) => (
                <span key={t} className="text-xs font-medium bg-white border border-stone-200 rounded-full px-3 py-1 text-stone-600">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
