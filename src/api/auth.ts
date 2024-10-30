import api from './axios';
import { LoginResponse, User } from '../types/auth';

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/login', { email, password });
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/user');
  return response.data;
};