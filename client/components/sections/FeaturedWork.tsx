'use client';

import { useEffect } from 'react';

export default function FeaturedWork() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }); },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
  }, []);

  const projects = [
    {
      type: 'Web App', industry: 'Healthcare', title: 'MediFlow — Patient Management Portal',
      desc: 'Multi-tenant patient management system serving 200+ clinics with real-time scheduling, billing, and telehealth.',
      tech: ['Next.js', 'Express.js', 'PostgreSQL'], img: 'project-dashboard',
    },
    {
      type: 'AI Automation', industry: 'Real Estate', title: 'PropBot — WhatsApp Auto-Reply for Realtors',
      desc: 'AI-powered WhatsApp bot that handles property inquiries, schedules site visits, and qualifies leads — 24/7.',
      tech: ['OpenAI', 'WhatsApp API', 'Node.js'], img: 'project-whatsapp',
    },
    {
      type: 'Android', industry: 'E-Commerce', title: 'QuickCart — Native Shopping App',
      desc: 'High-performance native Android shopping app with 50K+ downloads, real-time inventory sync, and one-tap checkout.',
      tech: ['Kotlin', 'Jetpack Compose', 'Firebase'], img: 'project-android',
    },
    {
      type: 'Inventory', industry: 'Manufacturing', title: 'StockPulse — Warehouse Management System',
      desc: 'Real-time inventory tracking across 12 warehouses with barcode scanning, low-stock alerts, and automated POs.',
      tech: ['React', 'Express.js', 'MongoDB'], img: 'project-inventory',
    },
  ];

  return (
    <section id="work" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="reveal max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Featured Work</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight leading-[1.1]">
            Real solutions,<br />
            <span className="font-serif italic text-stone-400">real results</span>
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <div key={p.title} className="reveal group">
              <div className="overflow-hidden rounded-2xl border border-stone-200/50">
                <img
                  src={`https://picsum.photos/seed/${p.img}/800/600.jpg`}
                  alt={p.title}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-600">{p.type}</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs text-stone-400">{p.industry}</span>
                </div>
                <h3 className="mt-2 text-xl font-medium tracking-tight">{p.title}</h3>
                <p className="mt-2 text-stone-500 text-sm leading-relaxed">{p.desc}</p>
                <div className="mt-4 flex gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs font-medium bg-stone-100 rounded-full px-3 py-1 text-stone-600">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}