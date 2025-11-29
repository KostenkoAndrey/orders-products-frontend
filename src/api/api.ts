import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  },
);

const buildUrl = (...paths: string[]) => `/${paths.join('/')}`;

export const api = {
  get: <T>(...paths: string[]) => axiosInstance.get<T>(buildUrl(...paths)).then((res) => res.data),
  post: <T>(body: unknown, ...paths: string[]) => axiosInstance.post<T>(buildUrl(...paths), body).then((res) => res.data),
  put: <T>(body: unknown, ...paths: string[]) => axiosInstance.put<T>(buildUrl(...paths), body).then((res) => res.data),
  patch: <T>(body: unknown, ...paths: string[]) => axiosInstance.patch<T>(buildUrl(...paths), body).then((res) => res.data),
  delete: <T>(...paths: string[]) => axiosInstance.delete<T>(buildUrl(...paths)).then((res) => res.data),
};
