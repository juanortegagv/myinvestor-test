import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { BaseButton } from './Button/styles.ts';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & Readonly<{ variant?: 'primary' | 'ghost' }>
>;

const Button = ({ variant = 'primary', children, ...rest }: ButtonProps) => (
  <BaseButton $variant={variant} {...rest}>
    {children}
  </BaseButton>
);

export default Button;


