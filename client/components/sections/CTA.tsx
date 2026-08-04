'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function CTA() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '',
    service: '', budget: 'Not sure yet', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }); },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.submitInquiry(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', service: '', budget: 'Not sure yet', message: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div className="reveal">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Let&apos;s Talk</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight leading-[1.1]">
              Ready to build<br />
              <span className="font-serif italic text-stone-400">something great?</span>
            </h2>
            <p className="mt-6 text-lg text-stone-500 leading-relaxed">
              Tell us about your project and we&apos;ll get back within 24 hours with a free proposal and timeline.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center">
                  <span className="iconify text-brand-600" data-icon="mdi:email-outline" data-width="22" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Email</div>
                  <div className="text-sm font-medium mt-1">hello@ZaishTech.dev</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center">
                  <span className="iconify text-brand-600" data-icon="mdi:whatsapp" data-width="22" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-stone-400">WhatsApp</div>
                  <div className="text-sm font-medium mt-1">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center">
                  <span className="iconify text-brand-600" data-icon="mdi:clock-outline" data-width="22" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Response Time</div>
                  <div className="text-sm font-medium mt-1">Within 24 hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                <span className="iconify text-emerald-500 mb-4" data-icon="mdi:check-circle" data-width="48" />
                <h3 className="text-lg font-medium text-emerald-800">Inquiry Submitted!</h3>
                <p className="mt-2 text-sm text-emerald-600">We&apos;ll get back within 24 hours with a detailed proposal.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-medium text-emerald-600 hover:text-emerald-800">
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-stone-50 rounded-2xl p-8 border border-stone-200/50">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">{error}</div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600" placeholder="you@company.com" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Service Needed *</label>
                  <select required value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 text-stone-600">
                    <option value="">Select a service</option>
                    <option>Custom Software Development</option>
                    <option>Website / Web App Development</option>
                    <option>Native Android App</option>
                    <option>AI & Automation</option>
                    <option>Portal / Inventory Management</option>
                    <option>Multiple Services</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Budget Range</label>
                  <select value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 text-stone-600">
                    <option>Not sure yet</option>
                    <option>$2,500 - $5,000</option>
                    <option>$5,000 - $10,000</option>
                    <option>$10,000 - $25,000</option>
                    <option>$25,000+</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Project Details *</label>
                  <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 resize-none" placeholder="Tell us about your project, goals, and timeline..." />
                </div>
                <button type="submit" disabled={loading} className="mt-6 w-full bg-brand-600 text-white text-sm font-semibold px-6 py-4 rounded-full hover:bg-brand-700 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand-600/20 disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Proposal Request'}
                </button>
                <p className="mt-4 text-xs text-stone-400 text-center">Free consultation • No commitment • Reply within 24 hours</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}