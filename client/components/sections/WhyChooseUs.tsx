'use client';

import { useEffect } from 'react';

export default function WhyChooseUs() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }); },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
  }, []);

  const items = [
    { icon: 'mdi:clock-fast', title: 'Fast Delivery', desc: 'MVP in 4-6 weeks. Full production in 8-12. We move fast without cutting corners.' },
    { icon: 'mdi:source-branch', title: 'Clean Architecture', desc: 'Modular, testable, maintainable code. Your future team will thank you.' },
    { icon: 'mdi:shield-lock-outline', title: 'Security First', desc: 'OWASP-compliant, JWT auth, rate limiting, data encryption — baked in from day one.' },
    { icon: 'mdi:headset', title: '30-Day Free Support', desc: 'Post-launch support included. We fix bugs, optimize performance, and don\'t ghost you.' },
    { icon: 'mdi:scale-balance', title: 'Built to Scale', desc: 'From 10 users to 10 million — our architecture scales horizontally with your growth.' },
    { icon: 'mdi:handshake-outline', title: 'You Own Everything', desc: 'Full source code, IP rights, and documentation. No vendor lock-in, ever.' },
  ];

  return (
    <section className="py-24 md:py-32 bg-stone-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="reveal text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Why NexaFlow</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight leading-[1.1]">
            We don&apos;t just code.<br />
            <span className="font-serif italic text-stone-400">We engineer outcomes.</span>
          </h2>
        </div>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.title} className="reveal glass-card rounded-2xl p-8">
              <span className="iconify text-brand-400 mb-4" data-icon={item.icon} data-width="32" />
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="mt-3 text-stone-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}