import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { loginUser, getCurrentUser } from '../api/auth';
import { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser()
        .then(userData => {
          setState(prev => ({
            ...prev,
            user: userData,
            isAuthenticated: true,
            isLoading: false
          }));
        })
        .catch(() => {
          localStorage.removeItem('token');
          setState(prev => ({
            ...prev,
            isLoading: false
          }));
        });
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false
      }));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await loginUser(email, password);
      
      if (response.success) {
        localStorage.setItem('token', response.access_token);
        const userData = await getCurrentUser();
        
        setState({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      });
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  }, []);

  const value = {
    ...state,
    login,
    logout
  };

  if (state.isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};