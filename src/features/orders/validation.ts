import { validateBuy, validateSell, validateTransfer } from '../../shared/utils/validators.ts';
import type { PortfolioPosition } from '../../shared/types/portfolio.ts';

export type OrderMode = 'buy' | 'sell' | 'transfer';

type Args = Readonly<{
  mode: OrderMode;
  amount: number;
  fromPosition: PortfolioPosition | null;
  toFundId: string | null;
}>;

const strategies: Record<OrderMode, (a: Args) => string | null> = {
  buy: ({ amount }) => validateBuy(amount),
  sell: ({ amount, fromPosition }) =>
    fromPosition ? validateSell(amount, fromPosition.quantity) : 'Posición inválida',
  transfer: ({ amount, fromPosition, toFundId }) => {
    if (!toFundId || toFundId.length === 0) return 'Selecciona un fondo destino';
    return fromPosition
      ? validateTransfer(amount, fromPosition.quantity, fromPosition.id, toFundId, true)
      : 'Posición inválida';
  },
};

export const getOrderValidationError = (args: Args): string | null => strategies[args.mode](args);


