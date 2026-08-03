import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: 'NexaFlow — Custom Software Development, AI Automation & Android Apps',
  description: 'NexaFlow builds custom software, AI-powered WhatsApp automation, web apps, native Android apps, and inventory management systems for businesses worldwide. Free consultation.',
  keywords: ['custom software development', 'AI automation', 'WhatsApp auto reply', 'web app development', 'Android app development', 'inventory management system', 'business automation', 'SaaS development'],
  openGraph: {
    title: 'NexaFlow — Software That Scales Business',
    description: 'Custom software, AI automation, and enterprise solutions for modern business.',
    url: 'https://nexaflow.dev',
    siteName: 'NexaFlow',
    type: 'website',
  },
};

export default function Home() {
  return <HomeContent />;
}