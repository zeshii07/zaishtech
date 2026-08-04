'use client';

import { useEffect, useState } from 'react';
import { getStatusColor, formatDate, formatCurrency } from '@/lib/utils';
import type { Project } from '@/types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    const token = localStorage.getItem('ZaishTech_token');
    if (!token) return;
    try {
      const res = await fetch('/api/projects', { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      const data = await res.json();
      if (data.success) setProjects(data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadProjects(); }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="text-stone-500 text-sm mt-1">{projects.length} total projects</p>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-stone-200/50 shadow-sm text-center">
          <span className="iconify text-stone-300 mb-4" data-icon="mdi:folder-open-outline" data-width="48" />
          <h3 className="text-lg font-medium text-stone-400">No projects yet</h3>
          <p className="text-sm text-stone-400 mt-2">Projects will appear here when you convert inquiries.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-white rounded-2xl p-6 border border-stone-200/50 shadow-sm hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(project.status)}`}>{project.status}</span>
                {project.featured && <span className="text-xs font-bold text-brand-600">★ Featured</span>}
              </div>
              <h3 className="text-lg font-medium">{project.title}</h3>
              <p className="text-sm text-stone-500 mt-1">{project.client}</p>
              <p className="text-sm text-stone-400 mt-2 line-clamp-2">{project.description}</p>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                  <span>Progress</span><span>{project.progress}%</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2">
                  <div className="bg-brand-600 h-2 rounded-full" style={{ width: `${project.progress}%` }} />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-stone-400">
                <span>Budget: {formatCurrency(project.budget)}</span>
                <span>Paid: {formatCurrency(project.paid)}</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-1">
                {project.techStack.slice(0, 3).map((t) => (
                  <span key={t} className="text-xs bg-stone-100 rounded-full px-2 py-0.5 text-stone-600">{t}</span>
                ))}
                {project.techStack.length > 3 && <span className="text-xs text-stone-400">+{project.techStack.length - 3}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}