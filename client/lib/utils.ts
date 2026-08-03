import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-amber-100 text-amber-700',
    'in-progress': 'bg-purple-100 text-purple-700',
    'proposal-sent': 'bg-cyan-100 text-cyan-700',
    'closed-won': 'bg-emerald-100 text-emerald-700',
    'closed-lost': 'bg-red-100 text-red-700',
    planning: 'bg-blue-100 text-blue-700',
    review: 'bg-amber-100 text-amber-700',
    delivered: 'bg-emerald-100 text-emerald-700',
    maintenance: 'bg-stone-100 text-stone-700',
  };
  return colors[status] || 'bg-stone-100 text-stone-700';
}