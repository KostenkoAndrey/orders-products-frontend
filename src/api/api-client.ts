const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const buildUrl = (...paths: string[]) => `${BASE_URL}/${paths.join('/')}`;

const sendRequest = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  if (res.status === 401) {
    window.location.href = '/login';
    throw new Error('Unauthorized');
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

export const apiClient = {
  get: <T>(...paths: string[]) => sendRequest<T>(buildUrl(...paths)),

  post: <T>(body: unknown, ...paths: string[]) =>
    sendRequest<T>(buildUrl(...paths), {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
