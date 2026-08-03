import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact NexaFlow — Free Consultation for Custom Software & AI Automation',
  description: 'Contact NexaFlow for a free consultation on custom software development, web apps, Android apps, AI automation, WhatsApp bots, and inventory management systems.',
  keywords: ['contact software developer', 'free consultation', 'hire software team', 'custom software quote'],
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactContent />
      <Footer />
    </main>
  );
}