import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: 'ZaishTech — Custom Software Development, AI Automation & Android Apps',
  description: 'ZaishTech builds custom software, AI-powered WhatsApp automation, web apps, native Android apps, and inventory management systems for businesses worldwide. Free consultation.',
  keywords: ['custom software development', 'AI automation', 'WhatsApp auto reply', 'web app development', 'Android app development', 'inventory management system', 'business automation', 'SaaS development'],
  openGraph: {
    title: 'ZaishTech — Software That Scales Business',
    description: 'Custom software, AI automation, and enterprise solutions for modern business.',
    url: 'https://zaishtech.vercel.app',
    siteName: 'ZaishTech',
    type: 'website',
  },
};

export default function Home() {
  return <HomeContent />;
}