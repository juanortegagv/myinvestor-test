import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Bar = styled.header`
  padding: 12px;
  border-bottom: 1px solid #eee;
  margin-bottom: 16px;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 12px;
`;

export const A = styled(Link)`
  color: #111;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

 