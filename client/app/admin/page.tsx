'use client';

import { useEffect, useState } from 'react';
import { getStatusColor, formatCurrency } from '@/lib/utils';
import type { InquiryStats, Project, Inquiry } from '@/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState<InquiryStats | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem('ZaishTech_token');
      if (!token) return;
      const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

      try {
        const [statsRes, projectsRes] = await Promise.all([
          fetch('/api/inquiries/stats', { headers }),
          fetch('/api/projects', { headers }),
        ]);
        const statsData = await statsRes.json();
        const projectsData = await projectsRes.json();
        if (statsData.success) setStats(statsData.data);
        if (projectsData.success) setProjects(projectsData.data);
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const totalRevenue = projects.reduce((sum, p) => sum + p.paid, 0);
  const activeProjects = projects.filter(p => p.status === 'in-progress').length;
  const newInquiries = stats?.byStatus?.new || 0;

  const statCards = [
    { label: 'Total Inquiries', value: stats?.total || 0, icon: '📧', color: 'bg-blue-50 text-blue-600' },
    { label: 'New Inquiries', value: newInquiries, icon: '✨', color: 'bg-amber-50 text-amber-600' },
    { label: 'Active Projects', value: activeProjects, icon: '🚀', color: 'bg-purple-50 text-purple-600' },
    { label: 'Revenue', value: formatCurrency(totalRevenue), icon: '💰', color: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-stone-500 text-sm mt-1">Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-6 border border-stone-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{card.icon}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${card.color}`}>Live</span>
            </div>
            <div className="mt-4 text-2xl font-semibold">{card.value}</div>
            <div className="text-xs text-stone-400 mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-2xl p-6 border border-stone-200/50 shadow-sm">
          <h3 className="font-semibold text-sm mb-4">Recent Inquiries</h3>
          <div className="space-y-3">
            {stats?.recent && stats.recent.length > 0 ? (
              stats.recent.map((inquiry: Inquiry) => (
                <div key={inquiry._id} className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0">
                  <div>
                    <div className="text-sm font-medium">{inquiry.name}</div>
                    <div className="text-xs text-stone-400">{inquiry.service}</div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(inquiry.status)}`}>{inquiry.status}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-stone-400 text-center py-4">No inquiries yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200/50 shadow-sm">
          <h3 className="font-semibold text-sm mb-4">Active Projects</h3>
          <div className="space-y-4">
            {projects.filter(p => p.status === 'in-progress').length > 0 ? (
              projects.filter(p => p.status === 'in-progress').map((project) => (
                <div key={project._id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{project.title}</div>
                    <span className="text-xs text-stone-400">{project.progress}%</span>
                  </div>
                  <div className="text-xs text-stone-400">{project.client}</div>
                  <div className="w-full bg-stone-100 rounded-full h-2">
                    <div className="bg-brand-600 h-2 rounded-full" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-stone-400 text-center py-4">No active projects</p>
            )}
          </div>
        </div>
      </div>

      {stats?.byService && Object.keys(stats.byService).length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-stone-200/50 shadow-sm mt-6">
          <h3 className="font-semibold text-sm mb-4">Inquiries by Service</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(stats.byService).map(([service, count]) => (
              <div key={service} className="flex items-center justify-between bg-stone-50 rounded-xl p-4">
                <span className="text-sm text-stone-600 truncate pr-4">{service}</span>
                <span className="text-sm font-semibold text-brand-600">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}