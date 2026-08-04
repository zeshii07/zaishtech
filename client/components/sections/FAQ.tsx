'use client';

import { useState, useEffect } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }); },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
  }, []);

  const faqs = [
    { q: 'How long does a typical project take?', a: 'Focused websites and prototypes may take 2-4 weeks. Full-stack web and mobile products commonly take 6-14 weeks, while larger platforms and AI workflows depend on integrations and scope. We provide a milestone-based estimate after discovery.' },
    { q: 'Do you work with international clients?', a: 'Absolutely. We work with clients across the US, UK, Middle East, and Asia. We use async communication tools (Slack, Notion, Loom) and schedule calls in your timezone.' },
    { q: 'What tech stack do you use?', a: 'Our core stack includes Next.js and React for web products, React Native for mobile apps, Express.js and Node.js for APIs, MongoDB and PostgreSQL for data, and modern AI and WhatsApp integrations for automation.' },
    { q: 'How does the WhatsApp auto-reply system work?', a: 'We integrate with the WhatsApp Business API, connect it to an AI model trained on your business data (FAQs, product catalog, pricing), and set up intelligent routing. It can handle inquiries, book appointments, and escalate to humans when needed. You get a dashboard to monitor all conversations.' },
    { q: 'Do I own the source code?', a: 'Yes, 100%. You receive full source code, documentation, deployment guides, and all intellectual property rights. We never lock you in — you\'re free to maintain, modify, or scale the project with any team.' },
  ];

  return (
    <section className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="reveal text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">FAQ</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight">Common questions</h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="reveal bg-white rounded-xl border border-stone-200/50 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-medium text-sm pr-4">{faq.q}</span>
                <span className={`iconify text-stone-400 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`} data-icon="mdi:plus" data-width="20" />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-stone-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
