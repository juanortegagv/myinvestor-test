import styled, { css } from 'styled-components';

export const StyledDialog = styled.dialog<{ $fallback: boolean }>`
  padding: 0;
  border: 0;
  border-radius: 8px;
  ${({ $fallback }) =>
    $fallback &&
    css`
      display: block;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 1001;
    `}
  &::backdrop {
    background: rgba(0, 0, 0, 0.35);
  }
`;

export const DialogBody = styled.div`
  padding: 16px;
  min-width: 320px;
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1000;
`;


