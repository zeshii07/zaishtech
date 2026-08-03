'use client';

import { useEffect } from 'react';

export default function Testimonials() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }); },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
  }, []);

  const testimonials = [
    { initials: 'AK', name: 'Ahmed Khan', role: 'CEO, PropTech Solutions', text: 'NexaFlow built our WhatsApp auto-reply system in 3 weeks. It handles 500+ inquiries daily and has saved us 40 hours per week in manual responses.' },
    { initials: 'SR', name: 'Sarah Rodriguez', role: 'COO, MFG Distribution', text: 'Our inventory management system went from Excel sheets to a real-time web app. The NexaFlow team understood our warehouse chaos and made it simple.' },
    { initials: 'MJ', name: 'Mike Johnson', role: 'Founder, QuickCart', text: 'They delivered our Android app on time and on budget. The UI is clean, performance is smooth, and we hit 50K downloads in the first month.' },
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="reveal text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Client Love</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight leading-[1.1]">
            Don&apos;t take our word.<br />
            <span className="font-serif italic text-stone-400">Take theirs.</span>
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="reveal bg-white rounded-2xl p-8 border border-stone-200/50 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map((i) => (
                  <span key={i} className="iconify text-amber-400" data-icon="mdi:star" data-width="18" />
                ))}
              </div>
              <p className="text-stone-600 leading-relaxed text-sm italic">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-brand-600">{t.initials}</span>
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-stone-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}