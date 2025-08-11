import { useEffect, useMemo, useState } from 'react';
import type { Fund } from '../../../shared/types/fund.ts';
import type { PagedResponse } from '../../../shared/types/pagination.ts';
import { useApi } from '../../../app/ApiContext.tsx';
import { createFundsService } from '../../../shared/api/fundsService.ts';

export type SortKey = 'name' | 'value' | 'profitability.YTD';
export type SortOrder = 'asc' | 'desc';

export const useFunds = () => {
  const { http } = useApi();
  const service = useMemo(() => createFundsService(http), [http]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<PagedResponse<Fund> | null>(null);

  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    service
      .list({ page, limit })
      .then((res) => {
        if (cancelled) return;
        setResponse(res);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError((err as Error).message ?? 'Error');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [page, limit, service]);

  const sortedData = useMemo(() => {
    const items = response?.data ?? [];
    const accessor = (f: Fund): number | string => {
      if (sortKey === 'name') return f.name;
      if (sortKey === 'value') return f.value;
      return f.profitability.YTD;
    };
    const sorted = [...items].sort((a, b) => {
      const va = accessor(a);
      const vb = accessor(b);
      if (typeof va === 'string' && typeof vb === 'string') {
        return va.localeCompare(vb, 'es');
      }
      return Number(va) - Number(vb);
    });
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }, [response, sortKey, sortOrder]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return {
    page,
    limit,
    setPage,
    setLimit,
    loading,
    error,
    pagination: response?.pagination,
    data: sortedData,
    sortKey,
    sortOrder,
    toggleSort,
  } as const;
};


