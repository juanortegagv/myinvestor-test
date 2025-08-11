import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FundActions from './FundActions.tsx';

const fund = {
  id: '1',
  name: 'Global Equity Fund',
  currency: 'EUR',
  symbol: 'GEF',
  value: 120.45,
  category: 'GLOBAL',
  profitability: { YTD: 0.05, oneYear: 0.12, threeYears: 0.35, fiveYears: 0.5 },
} as const;

describe('FundActions', () => {
  it('fires onBuy with fund', () => {
    const onBuy = vi.fn();
    render(<FundActions fund={fund as any} onBuy={onBuy} />);
    fireEvent.click(screen.getByRole('button', { name: /comprar/i }));
    expect(onBuy).toHaveBeenCalledWith(fund);
  });
});


