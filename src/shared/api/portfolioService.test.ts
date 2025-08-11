import { describe, it, expect } from 'vitest';
import { createHttpClient } from './httpClient.ts';
import { createPortfolioService } from './portfolioService.ts';

describe('portfolioService', () => {
  const http = createHttpClient('');
  const portfolio = createPortfolioService(http);

  it('gets portfolio positions', async () => {
    const res = await portfolio.get();
    expect(Array.isArray(res)).toBe(true);
  });
});


