import { useState } from 'react';
import Button from '../../components/ui/Button.tsx';
import Input from '../../components/ui/Input.tsx';
import Dialog from '../../components/ui/Dialog.tsx';
import MoneyInput from '../../components/MoneyInput.tsx';

const FundsPage = () => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  return (
    <section>
      <h2>Listado de fondos</h2>
      <p>Preview de UI primitives:</p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Input placeholder="Buscar" aria-label="Buscar" />
        <MoneyInput value={amount} onChange={setAmount} />
        <Button onClick={() => setOpen(true)}>Abrir diálogo</Button>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} title="Diálogo de ejemplo">
        <p>Cantidad: {amount}</p>
        <Button onClick={() => setOpen(false)}>Cerrar</Button>
      </Dialog>
    </section>
  );
};

export default FundsPage;


