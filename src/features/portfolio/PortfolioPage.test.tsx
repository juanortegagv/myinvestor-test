import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ApiProvider } from '../../app/ApiContext.tsx';
import PortfolioPage from './PortfolioPage.tsx';

const renderWithProviders = (ui: React.ReactElement) => render(<ApiProvider>{ui}</ApiProvider>);

describe('PortfolioPage', () => {
  it('renders empty state with mocked MSW response', async () => {
    renderWithProviders(<PortfolioPage />);
    expect(await screen.findByText(/Cartera/i)).toBeInTheDocument();
    expect(await screen.findByText(/No hay posiciones/i)).toBeInTheDocument();
  });
});


