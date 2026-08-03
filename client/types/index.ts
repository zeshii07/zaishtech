export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'in-progress' | 'proposal-sent' | 'closed-won' | 'closed-lost';
  source: string;
  notes: { text: string; addedBy: string; addedAt: string }[];
  assignedTo?: User | string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscriber {
  _id: string;
  email: string;
  isActive: boolean;
  source: string;
  createdAt: string;
}

export interface Project {
  _id: string;
  title: string;
  client: string;
  description: string;
  service: string;
  techStack: string[];
  status: 'planning' | 'in-progress' | 'review' | 'delivered' | 'maintenance';
  progress: number;
  startDate: string;
  deadline?: string;
  budget: number;
  paid: number;
  featured: boolean;
  image?: string;
  liveUrl?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  pagination?: { page: number; limit: number; total: number; pages: number };
}

export interface InquiryStats {
  total: number;
  byStatus: Record<string, number>;
  byService: Record<string, number>;
  recent: Inquiry[];
}