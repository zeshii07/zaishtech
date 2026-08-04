import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: 'ZaishTech — Software House for Web, Mobile & AI Solutions',
  description: 'ZaishTech builds websites, web platforms, React Native mobile apps, AI chatbots, WhatsApp automation, and business software.',
  keywords: ['software house', 'custom software development', 'AI automation', 'WhatsApp automation', 'web app development', 'mobile app development', 'React Native development', 'business automation'],
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
