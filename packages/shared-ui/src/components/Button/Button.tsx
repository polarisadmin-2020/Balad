"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/styles';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      size: {
        'sm': 'h-8 px-3 text-xs',
        'md': 'h-10 px-4 text-sm',
        'lg': 'h-12 px-6 text-base'
      },
      variant: {
        'primary': 'bg-primary text-primary-foreground hover:bg-primary/90',
        'secondary': 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        'outline': 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        'ghost': 'hover:bg-accent hover:text-accent-foreground',
        'link': 'text-primary underline-offset-4 hover:underline',
        'destructive': 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
      },
      iconOnly: {
        true: 'p-0 aspect-square',
        false: ''
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
      iconOnly: false
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className,
    size,
    variant,
    iconOnly,
    startIcon,
    endIcon,
    children,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ 
          size,
          variant,
          iconOnly,
          className 
        }))}
        ref={ref}
        {...props}
      >
        {startIcon && (
          <span className="mr-2 -ml-1">{startIcon}</span>
        )}
        {children}
        {endIcon && (
          <span className="ml-2 -mr-1">{endIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;