import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact ZaishTech — Free Consultation for Custom Software & AI Automation',
  description: 'Contact ZaishTech for a consultation on custom software, websites, mobile apps, AI assistants, WhatsApp automation, and business platforms.',
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
