type HttpMethod = 'GET' | 'POST';

export type HttpClient = Readonly<{
  get: <T>(path: string) => Promise<T>;
  post: <T>(path: string, body?: unknown) => Promise<T>;
}>;

export const createHttpClient = (baseUrl = ''): HttpClient => {
  const request = async <T>(method: HttpMethod, path: string, body?: unknown): Promise<T> => {
    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body === undefined ? null : JSON.stringify(body),
    });
    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await res.json() : undefined;

    if (!res.ok) {
      const message = (data && (data.error || data.message)) || res.statusText;
      throw new Error(message);
    }
    return (data as T) ?? (undefined as T);
  };

  return {
    get: <T>(path: string) => request<T>('GET', path),
    post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
  } as const;
};


