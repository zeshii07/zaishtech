'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDebugInfo('Starting login...');
    setLoading(true);

    try {
      setDebugInfo('Calling API...');

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || 'Login failed');
        setDebugInfo(`Error: ${data.message}`);
        setLoading(false);
        return;
      }

      setDebugInfo('Saving token...');
      if (data.token) {
        localStorage.setItem('nexaflow_token', data.token);
        api.setToken(data.token);
      }

      setDebugInfo('Redirecting...');
      window.location.href = '/admin';
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setDebugInfo(`Error: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
              <path d="M6 7h20L6 25h20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin Login</h1>
          <p className="text-stone-500 text-sm mt-2">Sign in to Zaishtech dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-stone-200/50 shadow-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">{error}</div>
          )}
          {debugInfo && (
            <div className="bg-stone-100 border border-stone-200 text-stone-600 text-xs rounded-xl px-4 py-3 mb-6 font-mono">{debugInfo}</div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600" placeholder="admin@zaishtech.com" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600" placeholder="••••••••" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full mt-6 bg-brand-600 text-white text-sm font-semibold px-6 py-4 rounded-full hover:bg-brand-700 transition-all disabled:opacity-50 shadow-lg shadow-brand-600/20">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-xs text-stone-400 mt-6"><a href="/" className="hover:text-brand-600">← Back to website</a></p>
      </div>
    </div>
  );
}