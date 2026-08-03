'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '',
    service: '', budget: 'Not sure yet', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.submitInquiry(formData);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="py-32 md:py-40 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Contact Us</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-medium tracking-tight leading-[1.1]">
            Let&apos;s build<br />
            <span className="font-serif italic text-stone-400">your next solution</span>
          </h1>
          <p className="mt-8 text-lg text-stone-400 leading-relaxed max-w-2xl mx-auto">
            Free consultation. No commitment. We&apos;ll respond within 24 hours with a detailed proposal and timeline tailored to your business.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left — Contact Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Get in Touch</h2>
              <p className="mt-4 text-stone-500 leading-relaxed">
                Whether you need a <Link href="/services" className="text-brand-600 hover:underline">custom web app</Link>, a <Link href="/services" className="text-brand-600 hover:underline">WhatsApp automation system</Link>, or a <Link href="/services" className="text-brand-600 hover:underline">native Android application</Link>, we&apos;re ready to help.
              </p>

              <div className="mt-12 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="iconify text-brand-600" data-icon="mdi:email-outline" data-width="22" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Email</h3>
                    <a href="mailto:zaishtech@gmail.com" className="text-stone-500 text-sm mt-1 hover:text-brand-600 transition-colors">zaishtech@gmail.com</a>
                    <p className="text-xs text-stone-400 mt-1">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="iconify text-brand-600" data-icon="mdi:whatsapp" data-width="22" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">WhatsApp / Phone</h3>
                    <a href="tel:03019299608" className="text-stone-500 text-sm mt-1 hover:text-brand-600 transition-colors">0301-9299608</a>
                    <p className="text-xs text-stone-400 mt-1">Quick responses for urgent projects</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="iconify text-brand-600" data-icon="mdi:map-marker-outline" data-width="22" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Based Globally</h3>
                    <p className="text-stone-500 text-sm mt-1">We work with clients across US, UK, Middle East &amp; Asia</p>
                    <p className="text-xs text-stone-400 mt-1">Remote-first, async communication</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="iconify text-brand-600" data-icon="mdi:clock-outline" data-width="22" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Working Hours</h3>
                    <p className="text-stone-500 text-sm mt-1">Mon–Sat: 9AM–6PM PKT</p>
                    <p className="text-xs text-stone-400 mt-1">WhatsApp available 24/7 for urgent requests</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-12 bg-stone-50 rounded-2xl p-6 border border-stone-200/50">
                <h3 className="text-sm font-semibold mb-4">Before You Contact Us</h3>
                <div className="space-y-3">
                  <Link href="/services" className="flex items-center gap-3 text-sm text-stone-600 hover:text-brand-600 transition-colors">
                    <span className="iconify" data-icon="mdi:arrow-right" data-width="16" />
                    View our services &amp; pricing
                  </Link>
                  <Link href="/about" className="flex items-center gap-3 text-sm text-stone-600 hover:text-brand-600 transition-colors">
                    <span className="iconify" data-icon="mdi:arrow-right" data-width="16" />
                    Learn about our team &amp; values
                  </Link>
                  <Link href="/services#ai-automation" className="flex items-center gap-3 text-sm text-stone-600 hover:text-brand-600 transition-colors">
                    <span className="iconify" data-icon="mdi:arrow-right" data-width="16" />
                    Explore AI &amp; WhatsApp automation
                  </Link>
                  <Link href="/pricing" className="flex items-center gap-3 text-sm text-stone-600 hover:text-brand-600 transition-colors">
                    <span className="iconify" data-icon="mdi:arrow-right" data-width="16" />
                    See our pricing tiers
                  </Link>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div>
              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                  <span className="iconify text-emerald-500 mb-4" data-icon="mdi:check-circle" data-width="48" />
                  <h2 className="text-lg font-medium text-emerald-800">Inquiry Submitted!</h2>
                  <p className="mt-2 text-sm text-emerald-600 leading-relaxed">
                    We&apos;ve received your inquiry and will respond within 24 hours with a detailed proposal and timeline.
                  </p>
                  <p className="mt-4 text-xs text-emerald-500">A confirmation email has been sent to {formData.email}</p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/services" className="text-sm font-medium text-emerald-600 hover:text-emerald-800 border border-emerald-200 px-6 py-3 rounded-full hover:bg-emerald-100 transition-all">
                      View Our Services
                    </Link>
                    <button onClick={() => setSubmitted(false)} className="text-sm font-medium text-emerald-600 hover:text-emerald-800">
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-stone-50 rounded-2xl p-8 border border-stone-200/50">
                  <h2 className="text-lg font-semibold mb-6">Project Inquiry Form</h2>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">{error}</div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Full Name *</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Email Address *</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600" placeholder="you@company.com" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Company</label>
                      <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600" placeholder="Company name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Phone / WhatsApp</label>
                      <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600" placeholder="+92 301 9299608" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Service Required *</label>
                    <select required value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 text-stone-600">
                      <option value="">Select a service</option>
                      <option>Custom Software Development</option>
                      <option>Website / Web App Development</option>
                      <option>Native Android App</option>
                      <option>AI & Automation (WhatsApp Bot, Auto-Booking)</option>
                      <option>Portal / Inventory Management</option>
                      <option>Multiple Services</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Estimated Budget</label>
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
                    <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 resize-none" placeholder="Describe your project, goals, timeline, and any specific requirements..." />
                  </div>

                  <button type="submit" disabled={loading} className="mt-6 w-full bg-brand-600 text-white text-sm font-semibold px-6 py-4 rounded-full hover:bg-brand-700 transition-all disabled:opacity-50 shadow-lg shadow-brand-600/20">
                    {loading ? 'Sending...' : 'Request Free Proposal'}
                  </button>

                  <p className="mt-4 text-xs text-stone-400 text-center">
                    Free consultation • No commitment • Reply within 24 hours • <Link href="/about" className="text-brand-600 hover:underline">Your data is secure</Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}