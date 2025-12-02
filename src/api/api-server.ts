import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const buildUrl = (...paths: string[]) => `${BASE_URL}/${paths.join('/')}`;

const sendRequest = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('sessionId');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (sessionCookie) {
    headers['Cookie'] = `${sessionCookie.name}=${sessionCookie.value}`;
  }

  const res = await fetch(url, {
    headers,
    cache: 'no-store',
    ...init,
  });

  if (res.status === 401) {
    redirect('/login');
  }

  if (res.status === 204) {
    return {} as T;
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message);
  }

  return res.json();
};

export const apiServer = {
  get: <T>(...paths: string[]) => sendRequest<T>(buildUrl(...paths)),

  post: <T>(body: unknown, ...paths: string[]) =>
    sendRequest<T>(buildUrl(...paths), {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T>(body: unknown, ...paths: string[]) =>
    sendRequest<T>(buildUrl(...paths), {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  patch: <T>(body: unknown, ...paths: string[]) =>
    sendRequest<T>(buildUrl(...paths), {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(...paths: string[]) =>
    sendRequest<T>(buildUrl(...paths), { method: 'DELETE' }),
};
