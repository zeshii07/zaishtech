import type { ApiResponse, Inquiry, Subscriber, Project, InquiryStats, User } from '@/types';

// In development, /api/* is proxied to Express via next.config.js
// In production, we'll change this to the actual backend URL
const API_URL = '/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('nexaflow_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') localStorage.setItem('nexaflow_token', token);
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') localStorage.removeItem('nexaflow_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;

    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Something went wrong');
    return data;
  }

  // Auth
  async login(email: string, password: string) {
    const res = await this.request<{ token: string; user: User }>('/auth/login', {
      method: 'POST', body: JSON.stringify({ email, password }),
    });
    if (res.data?.token) this.setToken(res.data.token);
    return res;
  }

  async register(name: string, email: string, password: string) {
    const res = await this.request<{ token: string; user: User }>('/auth/register', {
      method: 'POST', body: JSON.stringify({ name, email, password }),
    });
    if (res.data?.token) this.setToken(res.data.token);
    return res;
  }

  async getMe() { return this.request<User>('/auth/me'); }

  // Inquiries
  async submitInquiry(data: Partial<Inquiry>) {
    return this.request<Inquiry>('/inquiries', { method: 'POST', body: JSON.stringify(data) });
  }

  async getInquiries(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request<Inquiry[]>(`/inquiries${query}`);
  }

  async getInquiryStats() { return this.request<InquiryStats>('/inquiries/stats'); }

  async updateInquiry(id: string, data: Partial<Inquiry>) {
    return this.request<Inquiry>(`/inquiries/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
  }

  async deleteInquiry(id: string) {
    return this.request<null>(`/inquiries/${id}`, { method: 'DELETE' });
  }

  // Subscribers
  async subscribe(email: string) {
    return this.request<Subscriber>('/subscribers', { method: 'POST', body: JSON.stringify({ email }) });
  }

  async getSubscribers(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request<Subscriber[]>(`/subscribers${query}`);
  }

  async deleteSubscriber(id: string) {
    return this.request<null>(`/subscribers/${id}`, { method: 'DELETE' });
  }

  // Projects
  async getFeaturedProjects() { return this.request<Project[]>('/projects/featured'); }
  async getProjects() { return this.request<Project[]>('/projects'); }
  async createProject(data: Partial<Project>) {
    return this.request<Project>('/projects', { method: 'POST', body: JSON.stringify(data) });
  }
  async updateProject(id: string, data: Partial<Project>) {
    return this.request<Project>(`/projects/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
  }
  async deleteProject(id: string) {
    return this.request<null>(`/projects/${id}`, { method: 'DELETE' });
  }
}

export const api = new ApiClient();