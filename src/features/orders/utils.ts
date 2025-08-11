import type { Fund } from '../../shared/types/fund.ts';
import type { PortfolioPosition } from '../../shared/types/portfolio.ts';

export const getOrderTitle = (
  mode: 'buy' | 'sell' | 'transfer',
  fund: Fund | null,
  from: PortfolioPosition | null
): string => {
  switch (mode) {
    case 'buy':
      return fund ? `Comprar ${fund.name}` : 'Comprar';
    case 'sell':
      return from ? `Vender ${from.name}` : 'Vender';
    case 'transfer':
    default:
      return 'Traspasar';
  }
};


