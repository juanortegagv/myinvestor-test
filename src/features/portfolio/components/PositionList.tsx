import { Table, THead, TBody, TR, TH, TD } from '../../../components/ui/Table.tsx';
import Button from '../../../components/ui/Button.tsx';
import { useOrders } from '../../orders/OrdersContext.tsx';
import type { PortfolioPosition } from '../../../shared/types/portfolio.ts';

type Props = Readonly<{ rows: ReadonlyArray<PortfolioPosition> }>;

const PositionList = ({ rows }: Props) => {
  const { openSell, openTransfer } = useOrders();
  return (
    <Table>
      <THead>
        <TR>
          <TH>Fondo</TH>
          <TH>Cantidad</TH>
          <TH>Valor total</TH>
          <TH>Acciones</TH>
        </TR>
      </THead>
      <TBody>
        {rows.map((p) => (
          <TR key={p.id}>
            <TD>{p.name}</TD>
            <TD>{p.quantity}</TD>
            <TD>{p.totalValue.toFixed(2)}</TD>
            <TD>
              <Button onClick={() => openSell(p)}>Vender</Button>
              <Button variant="ghost" onClick={() => openTransfer(p)}>
                Traspasar
              </Button>
            </TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
};

export default PositionList;


