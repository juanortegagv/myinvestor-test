import { describe, it, expect } from 'vitest';
import { createHttpClient } from './httpClient.ts';
import { createFundsService } from './fundsService.ts';

describe('fundsService', () => {
  const http = createHttpClient('');
  const funds = createFundsService(http);

  it('lists funds with pagination', async () => {
    const res = await funds.list({ page: 1, limit: 2 });
    expect(res.pagination.page).toBe(1);
    expect(res.data.length).toBeGreaterThan(0);
  });

  it('gets fund detail', async () => {
    const f = await funds.detail('1');
    expect(f.id).toBe('1');
  });
});


