import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions<TData = unknown> extends Omit<AxiosRequestConfig, 'data'> {
  method?: HttpMethod;
  data?: TData;
}

interface UseFetchOptions<TData = unknown, TError = AxiosError> 
  extends Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> {
  enabled?: boolean;
}

// GET hook
export function useGet<TData = unknown>(
  endpoint: string,
  options?: UseFetchOptions<TData>
) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const response = await api.get<TData>(endpoint);
      return response.data;
    },
    ...options,
  });
}

// POST hook
export function usePost<TData = unknown, TVariables = unknown>() {
  return useMutation<TData, AxiosError, { endpoint: string; data: TVariables }>({
    mutationFn: async ({ endpoint, data }: { endpoint: string; data: TVariables }) => {
      const response = await api.post<TData>(endpoint, data);
      return response.data;
    },
  });
}

// PUT hook
export function usePut<TData = unknown, TVariables = unknown>() {
  return useMutation<TData, AxiosError, { endpoint: string; data: TVariables }>({
    mutationFn: async ({ endpoint, data }: { endpoint: string; data: TVariables }) => {
      const response = await api.put<TData>(endpoint, data);
      return response.data;
    },
  });
}

// DELETE hook
export function useDelete<TData = unknown>() {
  return useMutation<TData, AxiosError, string>({
    mutationFn: async (endpoint: string) => {
      const response = await api.delete<TData>(endpoint);
      return response.data;
    },
  });
}

// Generic fetch hook for all methods
export function useFetch<TData = unknown, TError = AxiosError>(
  endpoint: string,
  { method = 'GET', data, ...config }: FetchOptions<TData> = {},
  options?: UseFetchOptions<TData, TError>
) {
  const queryKey = [endpoint, method];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await api.request<TData>({
        url: endpoint,
        method,
        data,
        ...config,
      });
      return response.data;
    },
    ...options,
  });
}

// Request interceptor - you can add auth headers here
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Get token from localStorage or wherever you store it
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle unauthorized - maybe redirect to login
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api; // Export the axios instance for direct use if needed
