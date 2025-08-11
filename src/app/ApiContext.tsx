import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { createHttpClient, type HttpClient } from '../shared/api/httpClient.ts';

type ApiContextValue = Readonly<{ http: HttpClient }>;

const ApiContext = createContext<ApiContextValue | undefined>(undefined);

type ApiProviderProps = Readonly<{
  children: ReactNode;
  baseUrl?: string;
}>;

export const ApiProvider = ({ children, baseUrl = '' }: ApiProviderProps) => {
  const value = useMemo<ApiContextValue>(() => ({ http: createHttpClient(baseUrl) }), [baseUrl]);
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = (): ApiContextValue => {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error('useApi must be used within ApiProvider');
  return ctx;
};


