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

// Новая функция для отправки FormData
const sendFormDataRequest = async <T>(
  url: string,
  formData: FormData,
): Promise<T> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('sessionId');

  const headers: HeadersInit = {};

  if (sessionCookie) {
    headers['Cookie'] = `${sessionCookie.name}=${sessionCookie.value}`;
  }

  // НЕ устанавливаем Content-Type для FormData - браузер сам установит с boundary

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: formData,
    cache: 'no-store',
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

  postFormData: <T>(formData: FormData, ...paths: string[]) =>
    sendFormDataRequest<T>(buildUrl(...paths), formData),

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
