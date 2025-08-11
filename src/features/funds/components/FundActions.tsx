import type { Fund } from '../../../shared/types/fund.ts';
import { Actions } from './FundActions/styles.ts';

type Props = Readonly<{ fund: Fund; onBuy: (fund: Fund) => void }>;

const FundActions = ({ fund, onBuy }: Props) => (
  <Actions>
    <button type="button" onClick={() => onBuy(fund)}>Comprar</button>
  </Actions>
);

export default FundActions;


