import { describe, it, expect } from 'vitest';
import { formatCurrency } from './currency.ts';

describe('formatCurrency', () => {
  it('formats EUR correctly', () => {
    expect(formatCurrency(10.5, 'EUR')).toMatch(/10,50\s€|€\s10,50/);
  });
  it('formats USD correctly', () => {
    expect(formatCurrency(10.5, 'USD')).toMatch(/\$\s?10.50|10.50\sUS\$/);
  });
});


