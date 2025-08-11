import type { SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Base = styled.select`
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Select = (props: SelectProps) => <Base {...props} />;

export default Select;


