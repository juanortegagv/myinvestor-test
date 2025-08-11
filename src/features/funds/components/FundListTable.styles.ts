import styled from 'styled-components';

export const SortButton = styled.button`
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const Arrow = styled.span<{ $state: 'none' | 'asc' | 'desc' }>`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  ${({ $state }) =>
    $state === 'asc'
      ? 'border-bottom: 6px solid currentColor;'
      : $state === 'desc'
      ? 'border-top: 6px solid currentColor;'
      : 'opacity: 0.3; border-top: 6px solid currentColor;'}
`;


