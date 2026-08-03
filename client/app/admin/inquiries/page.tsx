'use client';

import { useEffect, useState } from 'react';
import { getStatusColor, formatDate } from '@/lib/utils';
import type { Inquiry } from '@/types';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', page: '1' });
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [note, setNote] = useState('');

  const loadInquiries = async () => {
    const token = localStorage.getItem('nexaflow_token');
    if (!token) return;
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    const params: Record<string, string> = { page: filter.page, limit: '10' };
    if (filter.status) params.status = filter.status;

    try {
      const res = await fetch(`/api/inquiries?${new URLSearchParams(params)}`, { headers });
      const data = await res.json();
      if (data.success) setInquiries(data.data);
      if (data.pagination) setPagination(data.pagination);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadInquiries(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('nexaflow_token');
    if (!token) return;
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      loadInquiries();
      if (selected?._id === id) setSelected({ ...selected, status: status as any });
    } catch (err) { console.error(err); }
  };

  const addNote = async (id: string) => {
    if (!note.trim()) return;
    const token = localStorage.getItem('nexaflow_token');
    if (!token) return;
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: note }),
      });
      setNote('');
      loadInquiries();
    } catch (err) { console.error(err); }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    const token = localStorage.getItem('nexaflow_token');
    if (!token) return;
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      loadInquiries();
      setSelected(null);
    } catch (err) { console.error(err); }
  };

  const statuses = ['new', 'contacted', 'in-progress', 'proposal-sent', 'closed-won', 'closed-lost'];

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inquiries</h1>
          <p className="text-stone-500 text-sm mt-1">{pagination.total} total inquiries</p>
        </div>
        <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value, page: '1' })} className="bg-white border border-stone-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-600">
          <option value="">All Status</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 bg-white rounded-2xl border border-stone-200/50 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left text-xs font-bold uppercase tracking-widest text-stone-400 px-6 py-4">Client</th>
                  <th className="text-left text-xs font-bold uppercase tracking-widest text-stone-400 px-6 py-4">Service</th>
                  <th className="text-left text-xs font-bold uppercase tracking-widest text-stone-400 px-6 py-4">Status</th>
                  <th className="text-left text-xs font-bold uppercase tracking-widest text-stone-400 px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry._id} className={`border-b border-stone-50 cursor-pointer hover:bg-stone-50 transition-colors ${selected?._id === inquiry._id ? 'bg-brand-50' : ''}`} onClick={() => setSelected(inquiry)}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium">{inquiry.name}</div>
                      <div className="text-xs text-stone-400">{inquiry.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">{inquiry.service}</td>
                    <td className="px-6 py-4"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(inquiry.status)}`}>{inquiry.status}</span></td>
                    <td className="px-6 py-4 text-sm text-stone-400">{formatDate(inquiry.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.pages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-stone-100">
              <button onClick={() => setFilter({ ...filter, page: String(Math.max(1, pagination.page - 1)) })} disabled={pagination.page <= 1} className="text-sm text-stone-600 hover:text-brand-600 disabled:opacity-30">← Previous</button>
              <span className="text-sm text-stone-400">Page {pagination.page} of {pagination.pages}</span>
              <button onClick={() => setFilter({ ...filter, page: String(Math.min(pagination.pages, pagination.page + 1)) })} disabled={pagination.page >= pagination.pages} className="text-sm text-stone-600 hover:text-brand-600 disabled:opacity-30">Next →</button>
            </div>
          )}
        </div>

        {selected && (
          <div className="w-96 bg-white rounded-2xl border border-stone-200/50 shadow-sm p-6 h-fit sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Inquiry Details</h3>
              <button onClick={() => setSelected(null)} className="text-stone-400 hover:text-stone-600">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Client</div>
                <div className="text-sm font-medium mt-1">{selected.name}</div>
                <div className="text-sm text-stone-500">{selected.email}</div>
                {selected.company && <div className="text-sm text-stone-500">{selected.company}</div>}
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Service</div>
                <div className="text-sm mt-1">{selected.service}</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Budget</div>
                <div className="text-sm mt-1">{selected.budget}</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Message</div>
                <div className="text-sm mt-1 text-stone-600 leading-relaxed">{selected.message}</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Update Status</div>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((s) => (
                    <button key={s} onClick={() => updateStatus(selected._id, s)} className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${selected.status === s ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-stone-600 border-stone-200 hover:border-brand-300'}`}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Add Note</div>
                <div className="flex gap-2">
                  <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note..." className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-600" />
                  <button onClick={() => addNote(selected._id)} className="bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-700">Add</button>
                </div>
              </div>
              {selected.notes && selected.notes.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Notes</div>
                  <div className="space-y-2">
                    {selected.notes.map((n, i) => (
                      <div key={i} className="bg-stone-50 rounded-xl p-3">
                        <div className="text-sm text-stone-600">{n.text}</div>
                        <div className="text-xs text-stone-400 mt-1">{n.addedBy} • {formatDate(n.addedAt)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button onClick={() => deleteInquiry(selected._id)} className="w-full text-sm text-red-600 border border-red-200 rounded-xl py-2 hover:bg-red-50 transition-all">Delete Inquiry</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}