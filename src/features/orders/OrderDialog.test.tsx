import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ApiProvider } from '../../app/ApiContext.tsx';
import OrderDialog from './OrderDialog.tsx';

const fund = {
  id: '1',
  name: 'Global Equity Fund',
  currency: 'EUR',
  symbol: 'GEF',
  value: 120.45,
  category: 'GLOBAL',
  profitability: { YTD: 0.05, oneYear: 0.12, threeYears: 0.35, fiveYears: 0.5 },
} as const;

describe('OrderDialog (buy)', () => {
  it('validates amount and submits', async () => {
    const onClose = vi.fn();
    render(
      <ApiProvider>
        <OrderDialog open fund={fund as any} onClose={onClose} />
      </ApiProvider>
    );

    const input = screen.getByLabelText(/cantidad/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '0' } });
    const confirm = screen.getByRole('button', { name: /confirmar/i });
    fireEvent.click(confirm);
    expect(await screen.findByRole('alert')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.click(confirm);
    
    await new Promise((r) => setTimeout(r, 10));
    expect(onClose).toHaveBeenCalled();
  });
});


