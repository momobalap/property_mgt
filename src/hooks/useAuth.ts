import { useState, useCallback } from 'react';
import { login as apiLogin, getCurrentUser } from '../services/api';
import type { User } from '../types/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiLogin(email, password);
      localStorage.setItem('token', response.access_token);
      setUser(response.user);
      setIsAuthenticated(true);
      return response.user;
    } catch (err: any) {
      const message = err.message || 'An error occurred during login';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    setIsLoading(true);
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuth
  };
}