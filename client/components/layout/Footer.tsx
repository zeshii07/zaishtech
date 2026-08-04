"use client";

import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.subscribe(email);
      setSubscribed(true);
      setEmail("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <footer className="bg-stone-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <svg
                viewBox="0 0 40 40"
                className="w-9 h-9 flex-shrink-0"
                fill="none"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="17"
                  stroke="#f87171"
                  strokeWidth="2"
                  strokeDasharray="80 27"
                  strokeLinecap="round"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="17"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  strokeDasharray="27 80"
                  strokeDashoffset="-80"
                  strokeLinecap="round"
                />
                <path
                  d="M8 14h9l-9 12h9"
                  stroke="#f87171"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 14h8M24 14v12"
                  stroke="#60a5fa"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-semibold">Zaishtech</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-400 font-medium">
                  Solutions
                </span>
              </div>
            </Link>
            <p className="mt-4 text-stone-400 text-sm leading-relaxed">
              Custom software, AI automation, and enterprise solutions —
              engineered for growth.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-stone-400">
                <span
                  className="iconify"
                  data-icon="mdi:email-outline"
                  data-width="16"
                />
                <a
                  href="mailto:zaishtech@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  zaishtech@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-400">
                <span
                  className="iconify"
                  data-icon="mdi:whatsapp"
                  data-width="16"
                />
                <a
                  href="tel:03019299608"
                  className="hover:text-white transition-colors"
                >
                  0301-9299608
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">
              Services
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services#custom-software"
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Custom Software Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services#web-app"
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Web App Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services#mobile-apps"
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-sm text-stone-400 hover:text-white transition-colors">Our Work</Link>
              </li>
              <li>
                <Link href="/industries" className="text-sm text-stone-400 hover:text-white transition-colors">Industries</Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-stone-400 hover:text-white transition-colors">Careers</Link>
              </li>
              <li>
                <Link
                  href="/services#ai-automation"
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  AI & Automation
                </Link>
              </li>
              <li>
                <Link
                  href="/services#portal-inventory"
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Portal & Inventory
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">
              Company
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>{" "}
              {/* ← ADD THIS LINE */}
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">
              Stay Updated
            </h2>
            <p className="text-sm text-stone-400">
              Get tech insights and project updates.
            </p>
            {subscribed ? (
              <p className="mt-4 text-sm text-emerald-400">✓ Subscribed!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-brand-600/50"
                />
                <button
                  type="submit"
                  className="bg-brand-600 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-brand-700 transition-all"
                >
                  →
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-500">
            &copy; 2025 Zaishtech Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-xs text-stone-500 hover:text-stone-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-stone-500 hover:text-stone-300"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
