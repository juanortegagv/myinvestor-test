import { useState } from 'react';
import Input from './ui/Input.tsx';

type MoneyInputProps = Readonly<{
  value: number;
  onChange: (next: number) => void;
  currency?: 'EUR' | 'USD';
  id?: string;
}>;

const MoneyInput = ({ value, onChange, currency = 'EUR', id }: MoneyInputProps) => {
  const [raw, setRaw] = useState(String(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    setRaw(e.target.value);
    const num = Number(v);
    if (!Number.isNaN(num)) onChange(Number(num.toFixed(2)));
  };

  const symbol = currency === 'EUR' ? '€' : '$';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Input id={id} inputMode="decimal" value={raw} onChange={handleChange} />
      <span aria-hidden>{symbol}</span>
    </div>
  );
};

export default MoneyInput;


