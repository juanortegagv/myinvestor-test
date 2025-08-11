import { Table, THead, TBody, TR, TH, TD } from '../../../components/ui/Table.tsx';
import type { Fund } from '../../../shared/types/fund.ts';
import type { SortKey, SortOrder } from '../hooks/useFunds.ts';
import FundActions from './FundActions.tsx';

type Props = Readonly<{
  rows: ReadonlyArray<Fund>;
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSort: (key: SortKey) => void;
  onBuy: (fund: Fund) => void;
}>;

const FundListTable = ({ rows, sortKey, sortOrder, onSort, onBuy }: Props) => {
  const ariaFor = (key: SortKey): 'ascending' | 'descending' | 'none' =>
    sortKey === key ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none';

  return (
    <Table>
      <THead>
        <TR>
          <TH role="columnheader" aria-sort={ariaFor('name')}>
            <button type="button" onClick={() => onSort('name')}>Nombre</button>
          </TH>
          <TH>Símbolo</TH>
          <TH>Categoría</TH>
          <TH role="columnheader" aria-sort={ariaFor('value')}>
            <button type="button" onClick={() => onSort('value')}>Valor</button>
          </TH>
          <TH role="columnheader" aria-sort={ariaFor('profitability.YTD')}>
            <button type="button" onClick={() => onSort('profitability.YTD')}>YTD</button>
          </TH>
          <TH>Acciones</TH>
        </TR>
      </THead>
      <TBody>
        {rows.map((f) => (
          <TR key={f.id}>
            <TD>{f.name}</TD>
            <TD>{f.symbol}</TD>
            <TD>{f.category}</TD>
            <TD>{f.value.toFixed(2)}</TD>
            <TD>{(f.profitability.YTD * 100).toFixed(2)}%</TD>
            <TD>
              <FundActions fund={f} onBuy={onBuy} />
            </TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
};

export default FundListTable;


