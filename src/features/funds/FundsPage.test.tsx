import { describe, it, expect } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import { ApiProvider } from '../../app/ApiContext.tsx';
import FundsPage from './FundsPage.tsx';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ApiProvider>{ui}</ApiProvider>);
};

describe('FundsPage', () => {
  it('renders list and supports sorting by YTD', async () => {
    renderWithProviders(<FundsPage />);

    const anyCells = await screen.findAllByText(/Global Equity Fund|Tech Growth Fund|Healthcare Opportunities/);
    expect(anyCells.length).toBeGreaterThan(0);

    const table = screen.getByRole('table') as HTMLTableElement;
    const rows = within(table!).getAllByRole('row');
    expect(rows.length).toBeGreaterThan(1);

    const ytdHeaderBtn = screen.getByRole('button', { name: /ytd/i });
    fireEvent.click(ytdHeaderBtn);

    const dataRows = within(table!).getAllByRole('row').slice(1);
    const ytdValues = dataRows.map((r) => {
      const cells = within(r).getAllByRole('cell');
      const ytdText = (cells[4]?.textContent ?? '0').replace('%', '').trim();
      return Number(ytdText);
    });
    const sorted = [...ytdValues].sort((a, b) => a - b);
    expect(ytdValues).toEqual(sorted);
  });
});


