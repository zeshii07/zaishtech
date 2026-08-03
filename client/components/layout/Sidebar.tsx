'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { User } from '@/types';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/admin/inquiries', label: 'Inquiries', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { href: '/admin/projects', label: 'Projects', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { href: '/admin/subscribers', label: 'Subscribers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('nexaflow_token');
      if (!token) return;
      try {
        const res = await fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
        const data = await res.json();
        if (data.success && data.data) setUser(data.data);
      } catch {}
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('nexaflow_token');
    window.location.href = '/login';
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-stone-200 z-40 hidden lg:flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-stone-100">
        <Link href="/" className="flex items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="w-9 h-9 flex-shrink-0" fill="none">
            <circle cx="20" cy="20" r="17" stroke="#dc2626" strokeWidth="2" strokeDasharray="80 27" strokeLinecap="round"/>
            <circle cx="20" cy="20" r="17" stroke="#3b82f6" strokeWidth="2" strokeDasharray="27 80" strokeDashoffset="-80" strokeLinecap="round"/>
            <path d="M8 14h9l-9 12h9" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 14h8M24 14v12" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight text-stone-900">Zaishtech</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-600 font-medium">Solutions</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn('flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all', isActive ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'text-stone-600 hover:bg-stone-100')}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-stone-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 bg-brand-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-brand-600">{user?.name?.charAt(0) || 'A'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{user?.name || 'Admin'}</div>
            <div className="text-xs text-stone-400 truncate">{user?.email || 'admin@zaishtech.com'}</div>
          </div>
          <button onClick={handleLogout} className="p-1.5 text-stone-400 hover:text-brand-600 transition-colors" title="Logout">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </div>
    </aside>
  );
}