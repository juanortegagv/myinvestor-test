import { Table, THead, TBody, TR, TH, TD } from '../../../components/ui/Table.tsx';
import type { PortfolioPosition } from '../../../shared/types/portfolio.ts';

type Props = Readonly<{ rows: ReadonlyArray<PortfolioPosition> }>;

const PositionList = ({ rows }: Props) => (
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
            <button type="button">Vender</button>
            <button type="button" style={{ marginLeft: 8 }}>
              Traspasar
            </button>
          </TD>
        </TR>
      ))}
    </TBody>
  </Table>
);

export default PositionList;


