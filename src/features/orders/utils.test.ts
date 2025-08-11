import { describe, it, expect } from 'vitest';
import { getOrderTitle } from './utils.ts';

describe('getOrderTitle', () => {
  it('returns titles by mode', () => {
    expect(getOrderTitle('buy', { id: '1', name: 'A', currency: 'EUR', symbol: 'A', value: 1, category: 'GLOBAL', profitability: { YTD: 0, oneYear: 0, threeYears: 0, fiveYears: 0 } }, null)).toMatch(/Comprar A/);
    expect(getOrderTitle('sell', null, { id: '1', name: 'B', quantity: 1, totalValue: 1 })).toMatch(/Vender B/);
    expect(getOrderTitle('transfer', null, null)).toMatch(/Traspasar/);
  });
});


