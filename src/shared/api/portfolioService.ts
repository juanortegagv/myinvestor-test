import type { HttpClient } from './httpClient.ts';
import type { PortfolioPosition } from '../types/portfolio.ts';

export const createPortfolioService = (http: HttpClient) => {
  const get = async (): Promise<ReadonlyArray<PortfolioPosition>> => {
    const res = await http.get<{ data: ReadonlyArray<PortfolioPosition> }>(`/api/portfolio`);
    return res.data;
  };
  return { get } as const;
};


