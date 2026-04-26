import axios from 'axios';
import { getAuthHeaders } from './auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4200',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const authHeaders = getAuthHeaders();
  config.headers = {
    ...config.headers,
    ...authHeaders,
  };
  return config;
});

export async function fetcher<T>(url: string): Promise<T> {
  const response = await api.get<T>(url);
  return response.data;
}

export async function post<T>(url: string, payload: any, config?: any): Promise<T> {
  const response = await api.post<T>(url, payload, config);
  return response.data;
}

export default api;
