export type PortfolioItem = Readonly<{
  id: string;
  quantity: number;
}>;

export type PortfolioPosition = Readonly<{
  id: string;
  name?: string;
  quantity: number;
  totalValue: number;
}>;


