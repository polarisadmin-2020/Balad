import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '../../components/Button/Button';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}