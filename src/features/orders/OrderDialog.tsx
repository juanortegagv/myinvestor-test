import { useMemo } from 'react';
import Dialog from '../../components/ui/Dialog.tsx';
import MoneyInput from '../../components/MoneyInput.tsx';
import Button from '../../components/ui/Button.tsx';
import type { Fund } from '../../shared/types/fund.ts';
import { useApi } from '../../app/ApiContext.tsx';
import { createFundsService } from '../../shared/api/fundsService.ts';
import { Grid, Row, Actions } from './OrderDialog.styles.ts';
import type { PortfolioPosition } from '../../shared/types/portfolio.ts';
import { useOrders } from './OrdersContext.tsx';
import { getOrderTitle } from './utils.ts';
import Select from '../../components/ui/Select.tsx';
import { usePortfolio } from '../portfolio/hooks/usePortfolio.ts';

type Props = Readonly<{
  open: boolean;
  fund: Fund | null;
  fromPosition?: PortfolioPosition | null;
  mode?: 'buy' | 'sell' | 'transfer';
  onClose: () => void;
}>;

const OrderDialog = ({ open, fund, fromPosition = null, mode = 'buy', onClose }: Props) => {
  const { http } = useApi();
  const service = useMemo(() => createFundsService(http), [http]);
  const { amount, setAmount, submitting, error, success, submit, toFundId, setToFundId } =
    useOrders();
  const { positions } = usePortfolio();
  const transferOptions =
    mode === 'transfer' ? positions.filter((p) => !fromPosition || p.id !== fromPosition.id) : [];

  const handleSubmit = async () => {
    await submit();
  };

  return (
    <Dialog open={open} onClose={onClose} title={getOrderTitle(mode, fund, fromPosition)}>
      <Grid>
        <label htmlFor="qty">Cantidad</label>
        <Row>
          <MoneyInput
            id="qty"
            value={amount}
            onChange={setAmount}
            currency={fund?.currency ?? 'EUR'}
          />
        </Row>
        {mode === 'transfer' ? (
          <>
            <label htmlFor="to">Fondo destino</label>
            <Select id="to" value={toFundId ?? ''} onChange={(e) => setToFundId(e.target.value)}>
              <option value="" disabled>
                Selecciona un fondo
              </option>
              {transferOptions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (ID: {p.id})
                </option>
              ))}
            </Select>
          </>
        ) : null}
        {error ? (
          <p role="alert" style={{ color: 'crimson' }}>
            {error}
          </p>
        ) : null}
        {success ? <p style={{ color: 'green' }}>{success}</p> : null}
        <Actions>
          <Button variant="ghost" onClick={onClose} disabled={submitting}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            Confirmar
          </Button>
        </Actions>
      </Grid>
    </Dialog>
  );
};

export default OrderDialog;
