import type { Fund } from '../../../shared/types/fund.ts';
import { Actions, BuyButton } from './FundActions/styles.ts';

type Props = Readonly<{ fund: Fund; onBuy: (fund: Fund) => void }>;

const FundActions = ({ fund, onBuy }: Props) => (
  <Actions>
    <BuyButton type="button" onClick={() => onBuy(fund)}>Comprar</BuyButton>
  </Actions>
);

export default FundActions;


