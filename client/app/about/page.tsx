import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Zaishtech Solutions — Our Story, Team & Mission",
  description:
    "Learn about Zaishtech Solutions, a custom software development and AI automation company founded by developers who ship production-grade solutions.",
  keywords: [
    "about Zaishtech",
    "software development company",
    "AI automation company",
    "custom software team",
    "Zaishtech founder",
  ],
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="py-32 md:py-40 bg-stone-900 text-white relative overflow-hidden bg-cover bg-center" style={{backgroundImage:"linear-gradient(rgba(28,25,23,.88),rgba(28,25,23,.88)),url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85')"}}>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
            About Us
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-medium tracking-tight leading-[1.1]">
            We engineer software
            <br />
            <span className="font-serif italic text-stone-400">
              that moves business forward
            </span>
          </h1>
          <p className="mt-8 text-lg text-stone-400 leading-relaxed max-w-2xl mx-auto">
            Zaishtech Solutions was founded on a simple belief: businesses
            deserve software that works as hard as they do. No fluff, no broken
            promises — just production-grade solutions that deliver measurable
            results.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/50">
                {/* Founder photo — add your image to public/founder.jpg */}
                <img
                  src="/founder.jpeg"
                  alt="Zeeshan Sultan — Founder & CEO of Zaishtech Solutions"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-600/10 rounded-2xl -z-10 hidden lg:block"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-2xl -z-10 hidden lg:block"></div>
            </div>

            {/* Story */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                Founder & CEO
              </span>
              <h2 className="mt-3 text-2xl md:text-3xl font-medium tracking-tight">
                Muhammad Zeeshan
              </h2>
              <p className="mt-1 text-sm text-blue-600 font-medium">
                Full-Stack Developer & AI Engineer
              </p>

              <div className="mt-8 space-y-5 text-stone-600 leading-relaxed">
                <p>
                  I started coding when most people were still figuring out what
                  they wanted to do with their lives. What began as curiosity —
                  breaking apart websites to see how they worked — quickly
                  became an obsession with building things that{" "}
                  <strong>actually matter</strong>.
                </p>
                <p>
                  After years of working as a full-stack developer, building
                  everything from SaaS platforms to WhatsApp automation systems,
                  I noticed a pattern: businesses were paying top dollar for
                  software that was over-engineered, under-delivered, and
                  impossible to maintain. Agencies would vanish after the final
                  payment. Code would break under real load. Deadlines were
                  always "next week."
                </p>
                <p>
                  <strong>I founded Zaishtech Solutions to fix that.</strong> We
                  build software the way I'd want it built for my own business —
                  clean architecture, honest timelines, transparent pricing, and
                  code that your next team can actually understand and scale.
                </p>
                <p>
                  Whether it's a{" "}
                  <Link
                    href="/services#ai-automation"
                    className="text-brand-600 hover:underline"
                  >
                    WhatsApp bot that saves 40 hours a week
                  </Link>
                  , a{" "}
                  <Link
                    href="/services#portal-inventory"
                    className="text-brand-600 hover:underline"
                  >
                    real-time inventory system
                  </Link>{" "}
                  across multiple warehouses, or a{" "}
                  <Link
                    href="/services#mobile-apps"
                    className="text-brand-600 hover:underline"
                  >
                    mobile app
                  </Link>{" "}
                  with 50K+ downloads — we ship production-grade software, not
                  prototypes.
                </p>
                <p>
                  Every project we take on gets the same promise:{" "}
                  <strong>
                    you own everything, you see everything, and we don't
                    disappear after delivery.
                  </strong>
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="text-xs font-medium bg-stone-100 rounded-full px-3 py-1.5 text-stone-600">
                  Next.js
                </span>
                <span className="text-xs font-medium bg-stone-100 rounded-full px-3 py-1.5 text-stone-600">
                  Express.js
                </span>
                <span className="text-xs font-medium bg-stone-100 rounded-full px-3 py-1.5 text-stone-600">
                  Kotlin
                </span>
                <span className="text-xs font-medium bg-stone-100 rounded-full px-3 py-1.5 text-stone-600">
                  OpenAI / LangChain
                </span>
                <span className="text-xs font-medium bg-stone-100 rounded-full px-3 py-1.5 text-stone-600">
                  MongoDB
                </span>
                <span className="text-xs font-medium bg-stone-100 rounded-full px-3 py-1.5 text-stone-600">
                  AWS / Cloud
                </span>
              </div>

              <div className="mt-8 flex gap-4">
                <Link
                  href="/contact"
                  className="bg-brand-600 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-brand-700 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand-600/20"
                >
                  Work With Me
                </Link>
                <a
                  href="https://wa.me/923019299608"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-emerald-700 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-emerald-600/20 flex items-center gap-2"
                >
                  <span
                    className="iconify"
                    data-icon="mdi:whatsapp"
                    data-width="16"
                  />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
              What Drives Us
            </h2>
            <p className="mt-4 text-stone-500 leading-relaxed">
              Six principles that shape every project we deliver.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "mdi:target",
                title: "Outcome Over Output",
                desc: "We measure success by business impact — revenue generated, hours saved, customers retained — not by lines of code written.",
              },
              {
                icon: "mdi:lock-outline",
                title: "You Own Everything",
                desc: "Full source code, IP rights, deployment guides. No vendor lock-in, no hostage situations. Your project is yours forever.",
              },
              {
                icon: "mdi:speedometer",
                title: "Speed With Substance",
                desc: "MVP in 4 weeks, production in 8. We move fast because we plan thoroughly, not because we cut corners.",
              },
              {
                icon: "mdi:shield-check",
                title: "Security Is Non-Negotiable",
                desc: "OWASP compliance, JWT authentication, rate limiting, data encryption. Security is baked in, not bolted on.",
              },
              {
                icon: "mdi:chart-timeline-variant",
                title: "Built to Scale",
                desc: "Our architecture handles 10 users today and 10 million tomorrow. Horizontal scaling, caching, queue systems — ready when you grow.",
              },
              {
                icon: "mdi:handshake",
                title: "Transparent Partnership",
                desc: "Weekly demos, shared Slack channels, honest timelines. You see everything, question anything, and approve before we proceed.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 border border-stone-200/50 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <span
                  className="iconify text-brand-600 mb-4"
                  data-icon={value.icon}
                  data-width="28"
                />
                <h3 className="text-lg font-medium tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-3 text-stone-500 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
            The Team
          </h2>
          <p className="mt-4 text-stone-500 leading-relaxed">
            A focused team covering product development, search visibility,
            intelligent automation, and user-centered design.
          </p>

          <div className="mt-16 grid sm:grid-cols-2 gap-8">
            {[
              {
                name: "Zeeshan Ahmed ",
                role: "Founder & Full-Stack Developer",
                image: "/team-placeholder-1.svg",
                desc: "Leads product strategy and builds dependable web applications from polished interfaces to scalable backend systems.",
              },
              {
                name: "Ishfaq Freed",
                role: "SEO Expert",
                image: "/team-placeholder-2.svg",
                desc: "Plans technical and content SEO strategies that improve search visibility and bring qualified customers to your business.",
              },
              {
                name: "Muhammad Zeeshan",
                role: "AI Automation Expert",
                image: "/team-placeholder-3.svg",
                desc: "Creates practical AI workflows, assistants, and integrations that reduce repetitive work and keep operations moving.",
              },
              {
                name: "Arooj Fatima",
                role: "UI/UX Designer",
                image: "/team-placeholder-4.svg",
                desc: "Designs clear, attractive experiences that make complex products simple and enjoyable for customers to use.",
              },
            ].map((team) => (
              <div
                key={team.name}
                className="bg-stone-50 rounded-2xl p-8 border border-stone-200/50"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-white shadow-md">
                  <Image
                    src={team.image}
                    alt={`${team.name}, ${team.role}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">{team.name}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-600">
                  {team.role}
                </p>
                <p className="mt-3 text-stone-500 text-sm leading-relaxed">
                  {team.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
            Ready to work with us?
          </h2>
          <p className="mt-4 text-lg text-stone-400 leading-relaxed">
            Tell us about your project and we&apos;ll respond within 24 hours
            with a free proposal.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-brand-600 text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-brand-700 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand-600/30"
            >
              Start a Project
            </Link>
            <a
              href="https://wa.me/923019299608"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-emerald-700 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <span
                className="iconify"
                data-icon="mdi:whatsapp"
                data-width="18"
              />{" "}
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
