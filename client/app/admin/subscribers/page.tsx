'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';
import type { Subscriber } from '@/types';

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const loadSubscribers = async () => {
    const token = localStorage.getItem('ZaishTech_token');
    if (!token) return;
    try {
      const res = await fetch('/api/subscribers', { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      const data = await res.json();
      if (data.success) { setSubscribers(data.data); setTotal(data.pagination?.total || 0); }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadSubscribers(); }, []);

  const deleteSubscriber = async (id: string) => {
    if (!confirm('Remove this subscriber?')) return;
    const token = localStorage.getItem('ZaishTech_token');
    if (!token) return;
    try {
      await fetch(`/api/subscribers/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      loadSubscribers();
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Subscribers</h1>
        <p className="text-stone-500 text-sm mt-1">{total} total subscribers</p>
      </div>

      {subscribers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-stone-200/50 shadow-sm text-center">
          <span className="iconify text-stone-300 mb-4" data-icon="mdi:email-outline" data-width="48" />
          <h3 className="text-lg font-medium text-stone-400">No subscribers yet</h3>
          <p className="text-sm text-stone-400 mt-2">Newsletter subscribers will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-200/50 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left text-xs font-bold uppercase tracking-widest text-stone-400 px-6 py-4">Email</th>
                <th className="text-left text-xs font-bold uppercase tracking-widest text-stone-400 px-6 py-4">Source</th>
                <th className="text-left text-xs font-bold uppercase tracking-widest text-stone-400 px-6 py-4">Subscribed</th>
                <th className="text-left text-xs font-bold uppercase tracking-widest text-stone-400 px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub._id} className="border-b border-stone-50">
                  <td className="px-6 py-4 text-sm font-medium">{sub.email}</td>
                  <td className="px-6 py-4 text-sm text-stone-500">{sub.source}</td>
                  <td className="px-6 py-4 text-sm text-stone-400">{formatDate(sub.createdAt)}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => deleteSubscriber(sub._id)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}