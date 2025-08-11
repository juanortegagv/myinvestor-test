import { useMemo, useState } from 'react';
import Dialog from '../../components/ui/Dialog.tsx';
import MoneyInput from '../../components/MoneyInput.tsx';
import Button from '../../components/ui/Button.tsx';
import type { Fund } from '../../shared/types/fund.ts';
import { validateBuy } from '../../shared/utils/validators.ts';
import { useApi } from '../../app/ApiContext.tsx';
import { createFundsService } from '../../shared/api/fundsService.ts';

type Props = Readonly<{
  open: boolean;
  fund: Fund | null;
  onClose: () => void;
}>;

const OrderDialog = ({ open, fund, onClose }: Props) => {
  const { http } = useApi();
  const service = useMemo(() => createFundsService(http), [http]);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!fund) return;
    const v = validateBuy(amount);
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setSubmitting(true);
    setSuccess(null);
    try {
      await service.buy(fund.id, amount);
      setSuccess('Compra realizada');
      onClose();
    } catch (e) {
      setError((e as Error).message ?? 'Error al comprar');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title={fund ? `Comprar ${fund.name}` : 'Comprar'}>
      <div style={{ display: 'grid', gap: 12 }}>
        <label htmlFor="qty">Cantidad</label>
        <MoneyInput id="qty" value={amount} onChange={setAmount} currency={fund?.currency ?? 'EUR'} />
        {error ? (
          <p role="alert" style={{ color: 'crimson' }}>
            {error}
          </p>
        ) : null}
        {success ? <p style={{ color: 'green' }}>{success}</p> : null}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={onClose} disabled={submitting}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            Confirmar
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default OrderDialog;


