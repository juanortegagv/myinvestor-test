export type Profitability = Readonly<{
  YTD: number;
  oneYear: number;
  threeYears: number;
  fiveYears: number;
}>;

export type Category = 'GLOBAL' | 'TECH' | 'HEALTH' | 'MONEY_MARKET';

export type Fund = Readonly<{
  id: string;
  name: string;
  currency: 'USD' | 'EUR';
  symbol: string;
  value: number;
  category: Category;
  profitability: Profitability;
}>;


