import { describe, it, expect } from 'vitest';
import { createHttpClient } from './httpClient.ts';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/msw/server.ts';

describe('httpClient', () => {
  it('performs GET and parses JSON', async () => {
    server.use(http.get('/ok', () => HttpResponse.json({ hello: 'world' })));
    const httpClient = createHttpClient('');
    const res = await httpClient.get<{ hello: string }>('/ok');
    expect(res.hello).toBe('world');
  });

  it('throws on non-OK with message', async () => {
    server.use(http.get('/err', () => HttpResponse.json({ error: 'boom' }, { status: 400 })));
    const httpClient = createHttpClient('');
    await expect(httpClient.get('/err')).rejects.toThrow('boom');
  });
});


