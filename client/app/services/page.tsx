import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services — Custom Software, Web Apps, Android, AI Automation & Inventory Systems',
  description: 'NexaFlow provides custom software development, web application development, native Android apps, AI & WhatsApp automation, and portal/inventory management systems.',
  keywords: ['custom software development services', 'web app development', 'Android app development', 'AI automation services', 'WhatsApp auto reply bot', 'inventory management system'],
};

export default function ServicesPage() {
  const services = [
    {
      slug: 'custom-software',
      icon: 'mdi:code-braces-box',
      title: 'Custom Software Development',
      subtitle: 'Bespoke solutions built for your unique business logic',
      description: 'We build custom software from the ground up — designed around your workflows, integrated with your existing tools, and engineered to scale as your business grows. No off-the-shelf limitations.',
      features: ['SaaS platform development', 'CRM & ERP systems', 'Business process automation', 'API integrations & microservices', 'Multi-tenant architecture', 'Real-time analytics dashboards'],
      tech: ['Next.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS'],
      price: 'From $8,000',
      timeline: '8-16 weeks',
    },
    {
      slug: 'web-app',
      icon: 'mdi:web',
      title: 'Website & Web App Development',
      subtitle: 'High-performance web experiences that convert visitors into clients',
      description: 'From marketing websites to complex progressive web applications, we build fast, responsive, SEO-optimized web experiences using modern frameworks and cloud infrastructure.',
      features: ['Marketing & landing pages', 'Progressive web apps (PWA)', 'E-commerce platforms', 'Client portals & dashboards', 'SEO optimization & analytics', 'CMS integration'],
      tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'Vercel', 'Cloudflare'],
      price: 'From $2,500',
      timeline: '2-8 weeks',
    },
    {
      slug: 'android',
      icon: 'mdi:android',
      title: 'Native Android App Development',
      subtitle: 'Production-quality apps with buttery-smooth UX',
      description: 'We build native Android applications using Kotlin and Jetpack Compose — delivering apps that feel fast, integrate deeply with device hardware, and rank well on the Play Store.',
      features: ['Native Kotlin development', 'Jetpack Compose UI', 'Firebase integration', 'Play Store optimization', 'Push notifications & deep links', 'Offline-first architecture'],
      tech: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Room DB', 'Coroutines', 'Play Console'],
      price: 'From $10,000',
      timeline: '8-14 weeks',
    },
    {
      slug: 'ai-automation',
      icon: 'mdi:robot-excited-outline',
      title: 'AI & Business Automation',
      subtitle: 'Intelligent systems that work 24/7 while you sleep',
      description: 'Our most popular service. We deploy AI-powered automation that handles customer inquiries, books appointments, processes orders, and manages workflows — reducing manual work by up to 80%.',
      features: ['WhatsApp auto-reply bots', 'Auto booking & scheduling', 'AI customer support chatbots', 'Lead qualification automation', 'Email & notification automation', 'Custom AI models on your data'],
      tech: ['OpenAI', 'LangChain', 'WhatsApp API', 'Node.js', 'Redis', 'Custom NLP'],
      price: 'From $5,000',
      timeline: '3-8 weeks',
      featured: true,
    },
    {
      slug: 'portal-inventory',
      icon: 'mdi:warehouse',
      title: 'Portal & Inventory Management',
      subtitle: 'Multi-role dashboards and real-time inventory tracking',
      description: 'Enterprise-grade portals for vendors, employees, and administrators — combined with real-time inventory systems featuring barcode scanning, low-stock alerts, and automated purchase orders.',
      features: ['Multi-role admin dashboards', 'Vendor & employee portals', 'Barcode & QR scanning', 'Low-stock alerts & auto POs', 'Real-time sync across locations', 'Reporting & analytics engine'],
      tech: ['React', 'Express.js', 'MongoDB', 'Socket.io', 'Redis', 'PDF/Excel export'],
      price: 'From $12,000',
      timeline: '10-20 weeks',
    },
  ];

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="py-32 md:py-40 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Our Services</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-medium tracking-tight leading-[1.1]">
            Full-stack development<br />
            <span className="font-serif italic text-stone-400">for every business need</span>
          </h1>
          <p className="mt-8 text-lg text-stone-400 leading-relaxed max-w-2xl mx-auto">
            Five core service areas, one unified approach: engineer software that delivers measurable business results. <Link href="/contact" className="text-brand-400 hover:underline">Free consultation available</Link>.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          {services.map((service) => (
            <div key={service.slug} id={service.slug} className={`rounded-2xl p-8 md:p-12 border ${service.featured ? 'bg-stone-900 text-white border-stone-800' : 'bg-stone-50 border-stone-200/50'}`}>
              {service.featured && (
                <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-600/20 px-3 py-1 rounded-full mb-6 inline-block">Most Popular</span>
              )}

              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.featured ? 'bg-brand-600/20' : 'bg-brand-600/10'}`}>
                    <span className={`iconify ${service.featured ? 'text-brand-400' : 'text-brand-600'}`} data-icon={service.icon} data-width="28" />
                  </div>

                  <h2 className={`text-2xl md:text-3xl font-medium tracking-tight ${service.featured ? 'text-white' : 'text-stone-900'}`}>
                    {service.title}
                  </h2>
                  <p className={`mt-1 text-sm font-medium ${service.featured ? 'text-brand-400' : 'text-brand-600'}`}>
                    {service.subtitle}
                  </p>
                  <p className={`mt-4 leading-relaxed ${service.featured ? 'text-stone-400' : 'text-stone-600'}`}>
                    {service.description}
                  </p>

                  <div className="mt-8 flex gap-6">
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-widest ${service.featured ? 'text-stone-500' : 'text-stone-400'}`}>Starting Price</div>
                      <div className={`mt-1 text-lg font-semibold ${service.featured ? 'text-white' : 'text-stone-900'}`}>{service.price}</div>
                    </div>
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-widest ${service.featured ? 'text-stone-500' : 'text-stone-400'}`}>Timeline</div>
                      <div className={`mt-1 text-lg font-semibold ${service.featured ? 'text-white' : 'text-stone-900'}`}>{service.timeline}</div>
                    </div>
                  </div>

                  <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 bg-brand-600 text-white shadow-lg shadow-brand-600/20">
                    Get a Quote <span className="iconify" data-icon="mdi:arrow-right" data-width="16" />
                  </Link>
                </div>

                <div>
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${service.featured ? 'text-stone-500' : 'text-stone-400'}`}>What You Get</h3>
                  <div className="space-y-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <span className={`iconify ${service.featured ? 'text-brand-400' : 'text-emerald-500'}`} data-icon="mdi:check-circle" data-width="18" />
                        <span className={`text-sm ${service.featured ? 'text-stone-300' : 'text-stone-600'}`}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className={`text-xs font-bold uppercase tracking-widest mt-8 mb-4 ${service.featured ? 'text-stone-500' : 'text-stone-400'}`}>Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.tech.map((t) => (
                      <span key={t} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${service.featured ? 'bg-white/5 border-white/10 text-stone-300' : 'bg-white border-stone-200 text-stone-600'}`}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">How We Work With You</h2>
          <p className="mt-4 text-stone-500 leading-relaxed">
            A clear, transparent process from first call to launch. <Link href="/#process" className="text-brand-600 hover:underline">See the full process</Link>.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 gap-8">
            {[
              { num: '1', title: 'Free Discovery Call', desc: '30 minutes to understand your vision, scope, and goals.' },
              { num: '2', title: 'Proposal & Timeline', desc: 'Detailed scope, tech stack, milestones, and pricing — within 24 hours.' },
              { num: '3', title: 'Agile Development', desc: 'Weekly demos, shared Slack channel, transparent progress tracking.' },
              { num: '4', title: 'Launch & 30-Day Support', desc: 'Zero-downtime deployment + 30 days of free post-launch support.' },
            ].map((step) => (
              <div key={step.num} className="bg-white rounded-2xl p-6 border border-stone-200/50 shadow-sm">
                <div className="text-3xl font-semibold text-brand-600">{step.num}</div>
                <h3 className="mt-2 text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-stone-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Need a custom solution?</h2>
          <p className="mt-4 text-lg text-stone-400 leading-relaxed">Tell us what you need and we&apos;ll craft a proposal that fits your exact requirements, budget, and timeline.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-brand-600 text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-brand-700 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand-600/30">Request Free Proposal</Link>
            <Link href="/about" className="bg-white/10 border border-white/20 text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300">About Our Team</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}