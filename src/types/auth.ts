export interface User {
  id: number;
  email: string;
  user_type: string;
  role: string;
  user_name?: string;
  permissions?: string[];
}

export interface LoginResponse {
  success: boolean;
  message: string;
  access_token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}