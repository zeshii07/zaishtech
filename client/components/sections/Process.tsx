'use client';

import { useEffect } from 'react';

export default function Process() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }); },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
  }, []);

  const steps = [
    { num: '01', title: 'Discovery Call', desc: 'We listen to your vision, understand pain points, and define the MVP scope — all in a free 30-minute call.' },
    { num: '02', title: 'Design & Architecture', desc: 'Wireframes, UI/UX design, and technical architecture — you approve everything before a single line of code is written.' },
    { num: '03', title: 'Development & Testing', desc: 'Agile sprints with weekly demos. Every feature tested, every edge case handled. You see progress in real-time.' },
    { num: '04', title: 'Launch & Support', desc: 'Zero-downtime deployment, monitoring setup, and 30 days of free post-launch support. We don\'t disappear after delivery.' },
  ];

  return (
    <section id="process" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="reveal text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Our Process</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight leading-[1.1]">
            From idea to launch<br />
            <span className="font-serif italic text-stone-400">in 4 clear steps</span>
          </h2>
        </div>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.num} className="reveal relative">
              <div className="text-6xl font-semibold text-stone-200">{step.num}</div>
              <h3 className="mt-4 text-lg font-medium tracking-tight">{step.title}</h3>
              <p className="mt-3 text-stone-500 text-sm leading-relaxed">{step.desc}</p>
              {i < 3 && (
                <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2">
                  <span className="iconify text-stone-300" data-icon="mdi:arrow-right" data-width="24" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}