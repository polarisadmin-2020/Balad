import { VariantProps } from 'class-variance-authority';
import { buttonVariantsStyles } from '../../components/Button/ButtonVariants';

export interface ButtonVariantsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariantsStyles> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}