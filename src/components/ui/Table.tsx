import type {
  PropsWithChildren,
  HTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
  TableHTMLAttributes,
} from 'react';
import { Tbl, Thead, Tbody, Tr, Th, Td } from './Table/styles.ts';

export const Table = ({ children, ...rest }: PropsWithChildren<TableHTMLAttributes<HTMLTableElement>>) => (
  <Tbl {...rest}>{children}</Tbl>
);
export const THead = ({ children, ...rest }: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>) => (
  <Thead {...rest}>{children}</Thead>
);
export const TBody = ({ children, ...rest }: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>) => (
  <Tbody {...rest}>{children}</Tbody>
);
export const TR = ({ children, ...rest }: PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>) => (
  <Tr {...rest}>{children}</Tr>
);
export const TH = ({ children, ...rest }: PropsWithChildren<ThHTMLAttributes<HTMLTableCellElement>>) => (
  <Th {...rest}>{children}</Th>
);
export const TD = ({ children, ...rest }: PropsWithChildren<TdHTMLAttributes<HTMLTableCellElement>>) => (
  <Td {...rest}>{children}</Td>
);


