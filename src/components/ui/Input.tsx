import type { InputHTMLAttributes } from 'react';
import { BaseInput } from './Input/styles.ts';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => <BaseInput {...props} />;

export default Input;


