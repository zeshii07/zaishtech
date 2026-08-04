import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing — Transparent Software Development Costs | ZaishTech',
  description: 'ZaishTech pricing: Starter from $2,500, Professional from $8,000, Enterprise custom. Transparent costs, no hidden fees, 30-day free support included.',
  keywords: ['software development pricing', 'custom software cost', 'web app development price', 'AI automation pricing'],
};

export default function PricingPage() {
  return (
    <main>
      <Navbar />

      <section className="py-32 md:py-40 bg-stone-900 text-white relative overflow-hidden bg-cover bg-center" style={{backgroundImage:"linear-gradient(rgba(28,25,23,.9),rgba(28,25,23,.9)),url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1800&q=85')"}}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Pricing</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-medium tracking-tight leading-[1.1]">
            Transparent pricing.<br />
            <span className="font-serif italic text-stone-400">No hidden fees.</span>
          </h1>
          <p className="mt-8 text-lg text-stone-400 leading-relaxed max-w-2xl mx-auto">
            Every project is unique. <Link href="/contact" className="text-brand-400 hover:underline">Contact us</Link> for a custom quote.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200/50 hover:border-brand-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Starter</div>
              <div className="mt-4 flex items-baseline gap-1"><span className="text-4xl font-semibold">$2,500</span><span className="text-stone-400 text-sm">starting</span></div>
              <p className="mt-3 text-stone-500 text-sm leading-relaxed">Perfect for MVPs and landing pages. <Link href="/services#web-app" className="text-brand-600 hover:underline">See Web App service</Link>.</p>
              <div className="mt-6 space-y-3">
                {[{t:'Single-page website or MVP',c:true},{t:'Responsive design',c:true},{t:'Basic CMS integration',c:true},{t:'2 revision rounds',c:true},{t:'15-day support',c:true},{t:'Custom AI/automation',c:false}].map((item)=>(
                  <div key={item.t} className="flex items-center gap-3 text-sm">
                    <span className={`iconify ${item.c?'text-emerald-500':'text-stone-300'}`} data-icon={item.c?'mdi:check-circle':'mdi:close-circle'} data-width="18" />
                    <span className={item.c?'':'text-stone-400'}>{item.t}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="mt-8 block text-center bg-white border border-stone-200 text-stone-900 text-sm font-semibold px-6 py-3 rounded-full hover:bg-stone-100 transition-all">Get Started</Link>
            </div>

            {/* Professional */}
            <div className="relative bg-stone-900 text-white rounded-2xl p-8 border border-stone-800 hover:border-brand-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">Most Popular</div>
              <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Professional</div>
              <div className="mt-4 flex items-baseline gap-1"><span className="text-4xl font-semibold">$8,000</span><span className="text-stone-400 text-sm">starting</span></div>
              <p className="mt-3 text-stone-400 text-sm leading-relaxed">Full-stack apps, <Link href="/services#ai-automation" className="text-brand-400 hover:underline">AI automation</Link>, and portals.</p>
              <div className="mt-6 space-y-3">
                {['Full-stack web application','Custom UI/UX design','AI & automation integration','Admin dashboard & analytics','API development','30-day post-launch support'].map((item)=>(
                  <div key={item} className="flex items-center gap-3 text-sm">
                    <span className="iconify text-brand-400" data-icon="mdi:check-circle" data-width="18" /><span>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="mt-8 block text-center bg-brand-600 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20">Start a Project</Link>
            </div>

            {/* Enterprise */}
            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200/50 hover:border-brand-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Enterprise</div>
              <div className="mt-4 flex items-baseline gap-1"><span className="text-4xl font-semibold">Custom</span></div>
              <p className="mt-3 text-stone-500 text-sm leading-relaxed">Large platforms, <Link href="/services#mobile-apps" className="text-brand-600 hover:underline">mobile apps</Link>, and connected business ecosystems.</p>
              <div className="mt-6 space-y-3">
                {['Everything in Professional','Mobile app development','Multi-tenant architecture','DevOps & CI/CD setup','Dedicated project manager','90-day support & SLA'].map((item)=>(
                  <div key={item} className="flex items-center gap-3 text-sm">
                    <span className="iconify text-emerald-500" data-icon="mdi:check-circle" data-width="18" /><span>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="mt-8 block text-center bg-white border border-stone-200 text-stone-900 text-sm font-semibold px-6 py-3 rounded-full hover:bg-stone-100 transition-all">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h2 className="text-2xl font-medium tracking-tight text-center">Pricing FAQ</h2>
          <div className="mt-12 space-y-6">
            {[
              {q:'What happens after I submit an inquiry?',a:'We review your project details and respond within 24 hours with a detailed proposal — including scope, tech stack, timeline, milestones, and exact pricing.'},
              {q:'Can I start with Starter and upgrade later?',a:'Absolutely. Many clients start with a Starter MVP to validate their idea, then upgrade to Professional when they\'re ready to add features or scale.'},
              {q:'What if my project needs are between two tiers?',a:'We\'ll create a custom proposal that fits your exact needs. Our pricing tiers are frameworks — the final quote reflects your specific requirements.'},
              {q:'Is there a money-back guarantee?',a:'We offer a satisfaction guarantee. If the delivered product doesn\'t match the agreed specification, we\'ll fix it at no extra cost.'},
            ].map((faq,i)=>(
              <div key={i} className="bg-white rounded-xl border border-stone-200/50 p-6">
                <h3 className="font-medium text-sm">{faq.q}</h3>
                <p className="mt-3 text-stone-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
