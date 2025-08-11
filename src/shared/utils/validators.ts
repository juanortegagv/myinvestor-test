export const isPositive = (value: number): boolean => value > 0;

export const isNotExceeding = (value: number, max: number): boolean => value <= max;

export const validateBuy = (quantity: number): string | null => {
  if (!isPositive(quantity)) return 'La cantidad debe ser mayor que 0';
  if (!isNotExceeding(quantity, 10000)) return 'No puedes comprar más de 10.000 €';
  return null;
};

export const validateSell = (quantity: number, position: number): string | null => {
  if (!isPositive(quantity)) return 'La cantidad debe ser mayor que 0';
  if (!isNotExceeding(quantity, position)) return 'No puedes vender más de tu posición actual';
  return null;
};

export const validateTransfer = (
  quantity: number,
  position: number,
  fromFundId: string,
  toFundId: string,
  isToFundInPortfolio: boolean
): string | null => {
  if (!isPositive(quantity)) return 'La cantidad debe ser mayor que 0';
  if (!isNotExceeding(quantity, position)) return 'No puedes traspasar más de tu posición actual';
  if (fromFundId === toFundId) return 'No puedes traspasar al mismo fondo';
  if (!isToFundInPortfolio) return 'Sólo puedes traspasar entre fondos ya comprados';
  return null;
};


