import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Fund } from '../../shared/types/fund.ts';
import type { PortfolioPosition } from '../../shared/types/portfolio.ts';
import { useApi } from '../../app/ApiContext.tsx';
import { createFundsService } from '../../shared/api/fundsService.ts';
import { validateBuy, validateSell, validateTransfer } from '../../shared/utils/validators.ts';

export type OrderMode = 'buy' | 'sell' | 'transfer';

type ClosedOrder = Readonly<{ open: false }>;
type BuyOrder = Readonly<{ open: true; mode: 'buy'; fund: Fund; amount: number }>;
type SellOrder = Readonly<{ open: true; mode: 'sell'; from: PortfolioPosition; amount: number }>;
type TransferOrder = Readonly<{ open: true; mode: 'transfer'; from: PortfolioPosition; toFundId: string | null; amount: number }>;
type OrderState = ClosedOrder | BuyOrder | SellOrder | TransferOrder;

type OrdersApi = Readonly<{
  openBuy: (fund: Fund) => void;
  openSell: (position: PortfolioPosition) => void;
  openTransfer: (position: PortfolioPosition) => void;
  close: () => void;
  setAmount: (n: number) => void;
  setToFundId: (id: string | null) => void;
  submit: () => Promise<void>;
  open: boolean;
  mode: OrderMode | null;
  amount: number;
  fund: Fund | null;
  fromPosition: PortfolioPosition | null;
  toFundId: string | null;
  submitting: boolean;
  error: string | null;
  success: string | null;
  refreshToken: number;
}>;

const OrdersContext = createContext<OrdersApi | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const { http } = useApi();
  const service = useMemo(() => createFundsService(http), [http]);
  const [state, setState] = useState<OrderState>({ open: false });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  const openBuy = useCallback((f: Fund) => {
    setState({ open: true, mode: 'buy', fund: f, amount: 0 });
    setError(null);
    setSuccess(null);
  }, []);

  const openSell = useCallback((p: PortfolioPosition) => {
    setState({ open: true, mode: 'sell', from: p, amount: 0 });
    setError(null);
    setSuccess(null);
  }, []);

  const openTransfer = useCallback((p: PortfolioPosition) => {
    setState({ open: true, mode: 'transfer', from: p, toFundId: null, amount: 0 });
    setError(null);
    setSuccess(null);
  }, []);

  const close = useCallback(() => setState({ open: false }), []);

  const submit = useCallback(async () => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);
      if (!state.open) throw new Error('Orden no abierta');
      switch (state.mode) {
        case 'buy': {
          const msg = validateBuy(state.amount);
          if (msg) throw new Error(msg);
          await service.buy(state.fund.id, state.amount);
          setSuccess('Compra realizada');
          setRefreshToken((t) => t + 1);
          break;
        }
        case 'sell': {
          const msg = validateSell(state.amount, state.from.quantity);
          if (msg) throw new Error(msg);
          await service.sell(state.from.id, state.amount);
          setSuccess('Venta realizada');
          setRefreshToken((t) => t + 1);
          break;
        }
        case 'transfer': {
          if (!state.toFundId) throw new Error('Fondo destino requerido');
          const msg = validateTransfer(state.amount, state.from.quantity, state.from.id, state.toFundId, true);
          if (msg) throw new Error(msg);
          await service.transfer(state.from.id, state.toFundId, state.amount);
          setSuccess('Traspaso realizado');
          setRefreshToken((t) => t + 1);
          break;
        }
        default:
          throw new Error('Orden no abierta');
      }
      setState({ open: false });
    } catch (e) {
      setError((e as Error).message ?? 'Error');
    } finally {
      setSubmitting(false);
    }
  }, [service, state]);

  const setAmount = useCallback((n: number) => {
    setState((prev) => (prev.open ? { ...prev, amount: n } : prev));
  }, []);

  const setToFundId = useCallback((id: string | null) => {
    setState((prev) => (prev.open && prev.mode === 'transfer' ? { ...prev, toFundId: id } : prev));
  }, []);

  const selectors = useMemo(() => {
    const open = state.open;
    const mode: OrderMode | null = open ? state.mode : null;
    const amount = open ? state.amount : 0;
    const fund: Fund | null = open && state.mode === 'buy' ? state.fund : null;
    const fromPosition: PortfolioPosition | null = open && 'from' in state ? state.from : null;
    const toFundId: string | null = open && state.mode === 'transfer' ? state.toFundId : null;
    return { open, mode, amount, fund, fromPosition, toFundId };
  }, [state]);

  const value = useMemo(
    () => ({
      open: selectors.open,
      mode: selectors.mode,
      amount: selectors.amount,
      fund: selectors.fund,
      fromPosition: selectors.fromPosition,
      toFundId: selectors.toFundId,
      submitting,
      error,
      success,
      refreshToken,
      openBuy,
      openSell,
      openTransfer,
      close,
      setAmount,
      setToFundId,
      submit,
    }),
    [selectors, submitting, error, success, refreshToken, openBuy, openSell, openTransfer, close, setAmount, setToFundId, submit]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
};


