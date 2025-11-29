import { api } from '@/api/api';

export interface AuthRequest {
  name?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  status: number;
  message: string;
  data: {
    id: string;
    email: string;
    name: string;
  };
}

export interface getOauthResponse {
  status: number;
  message: string;
  data: {
    url: string;
  };
}

export interface confirmOauthRequest {
  code: string;
}

export const loginUser = (credentials: AuthRequest) => api.post<AuthResponse>(credentials, 'auth', 'login');
export const registerUser = (credentials: AuthRequest) => api.post<AuthResponse>(credentials, 'auth', 'register');
export const getOauthUrl = () => api.get<getOauthResponse>('auth', 'get-oauth-url');
export const confirmOauth = (credentials: confirmOauthRequest) => api.post<AuthResponse>(credentials, 'auth', 'confirm-oauth');
export const logoutUser = () => api.post<void>({}, 'auth', 'logout');
