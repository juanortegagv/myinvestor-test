import { useEffect, useMemo, useState } from 'react';
import { useApi } from '../../../app/ApiContext.tsx';
import { createPortfolioService } from '../../../shared/api/portfolioService.ts';
import type { PortfolioPosition } from '../../../shared/types/portfolio.ts';

export const usePortfolio = () => {
  const { http } = useApi();
  const service = useMemo(() => createPortfolioService(http), [http]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [positions, setPositions] = useState<ReadonlyArray<PortfolioPosition>>([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    service
      .get()
      .then((res) => {
        if (cancelled) return;
        const sorted = [...res].sort((a, b) => (a.name ?? '').localeCompare(b.name ?? '', 'es'));
        setPositions(sorted);
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
  }, [service]);

  return { loading, error, positions } as const;
};


