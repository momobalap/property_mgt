import axios, { AxiosError } from 'axios';
import type { LoginResponse } from '../types/auth';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('Response error:', error.response.data);
      throw error.response.data;
    }
    if (error.request) {
      console.error('Request error:', 'No response received');
      throw new Error('Network error - please check your connection');
    }
    console.error('Error:', error.message);
    throw new Error('An unexpected error occurred');
  }
);

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Unable to connect to the server');
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    console.error('Get user error:', error);
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || 'Failed to get user data');
    }
    throw new Error('Unable to connect to the server');
  }
};

export default api;