import { Table, THead, TBody, TR, TH, TD } from '../../../components/ui/Table.tsx';
import type { Fund } from '../../../shared/types/fund.ts';
import type { SortKey, SortOrder } from '../hooks/useFunds.ts';
import FundActions from './FundActions.tsx';
import { SortButton, Arrow } from './FundListTable.styles.ts';

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
            <SortButton type="button" onClick={() => onSort('name')}>
              Nombre <Arrow $state={ariaFor('name') as any} />
            </SortButton>
          </TH>
          <TH>Símbolo</TH>
          <TH>Categoría</TH>
          <TH role="columnheader" aria-sort={ariaFor('value')}>
            <SortButton type="button" onClick={() => onSort('value')}>
              Valor <Arrow $state={ariaFor('value') as any} />
            </SortButton>
          </TH>
          <TH role="columnheader" aria-sort={ariaFor('profitability.YTD')}>
            <SortButton type="button" onClick={() => onSort('profitability.YTD')}>
              YTD <Arrow $state={ariaFor('profitability.YTD') as any} />
            </SortButton>
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


