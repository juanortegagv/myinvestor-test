import type { HttpClient } from './httpClient.ts';
import type { Fund } from '../types/fund.ts';
import type { PagedResponse } from '../types/pagination.ts';

export type ListFundsParams = Readonly<{ page?: number; limit?: number }>;

export const createFundsService = (http: HttpClient) => {
  const list = async (params: ListFundsParams = {}): Promise<PagedResponse<Fund>> => {
    const { page = 1, limit = 10 } = params;
    return await http.get<PagedResponse<Fund>>(`/api/funds?page=${page}&limit=${limit}`);
  };

  const detail = async (id: string): Promise<Fund> => {
    const res = await http.get<{ data: Fund }>(`/api/funds/${id}`);
    return res.data;
  };

  const buy = async (id: string, quantity: number) => {
    return await http.post(`/api/funds/${id}/buy`, { quantity });
  };

  const sell = async (id: string, quantity: number) => {
    return await http.post(`/api/funds/${id}/sell`, { quantity });
  };

  const transfer = async (fromFundId: string, toFundId: string, quantity: number) => {
    return await http.post(`/api/funds/transfer`, { fromFundId, toFundId, quantity });
  };

  return { list, detail, buy, sell, transfer } as const;
};


