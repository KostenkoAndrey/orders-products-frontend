import { apiClient } from '@/api/api-client';

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

export const registerUser = (credentials: AuthRequest) =>
  apiClient.post<AuthResponse>(credentials, 'auth', 'register');

export const loginUser = (credentials: AuthRequest) =>
  apiClient.post<AuthResponse>(credentials, 'auth', 'login');

export const logoutUser = () => apiClient.post<void>({}, 'auth', 'logout');

export const getOauthUrl = () =>
  apiClient.get<getOauthResponse>('auth', 'get-oauth-url');

export const confirmOauth = (credentials: confirmOauthRequest) =>
  apiClient.post<AuthResponse>(credentials, 'auth', 'confirm-oauth');
