'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('nexaflow_token');
      if (!token) {
        router.replace('/login');
        return;
      }
      try {
        const response = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          localStorage.removeItem('nexaflow_token');
          router.replace('/login');
          return;
        }
        setAuthorized(true);
      } catch {
        localStorage.removeItem('nexaflow_token');
        router.replace('/login');
      } finally {
        setChecking(false);
      }
    };
    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-sm text-stone-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-64 p-6 lg:p-10 pt-20 lg:pt-10">{children}</main>
    </div>
  );
}