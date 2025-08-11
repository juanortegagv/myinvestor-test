import styled, { css } from 'styled-components';

export const BaseButton = styled.button<{ $variant: 'primary' | 'ghost' }>`
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  ${(p) =>
    p.$variant === 'primary'
      ? css`
          background: #111;
          color: #fff;
          border: 0;
        `
      : css`
          background: transparent;
          color: #111;
          border: 1px solid #ddd;
        `}
`;


