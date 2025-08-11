import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ApiProvider } from '../../../app/ApiContext.tsx';
import { useFunds } from './useFunds.ts';

describe('useFunds', () => {
  it('fetches first page and toggles sort', async () => {
    const { result } = renderHook(() => useFunds(), {
      wrapper: ({ children }) => <ApiProvider>{children}</ApiProvider>,
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.data.length).toBeGreaterThan(0);

    const prevKey = result.current.sortKey;
    const prevOrder = result.current.sortOrder;
    act(() => result.current.toggleSort('name'));
    if (prevKey === 'name') {
      expect(result.current.sortOrder).toBe(prevOrder === 'asc' ? 'desc' : 'asc');
    } else {
      expect(result.current.sortOrder).toBe('asc');
    }
  });
});


