import type { PropsWithChildren } from 'react';
import { Tbl, Thead, Tbody, Tr, Th, Td } from './Table/styles.ts';

export const Table = ({ children }: PropsWithChildren) => <Tbl>{children}</Tbl>;
export const THead = ({ children }: PropsWithChildren) => <Thead>{children}</Thead>;
export const TBody = ({ children }: PropsWithChildren) => <Tbody>{children}</Tbody>;
export const TR = ({ children }: PropsWithChildren) => <Tr>{children}</Tr>;
export const TH = ({ children }: PropsWithChildren) => <Th>{children}</Th>;
export const TD = ({ children }: PropsWithChildren) => <Td>{children}</Td>;


