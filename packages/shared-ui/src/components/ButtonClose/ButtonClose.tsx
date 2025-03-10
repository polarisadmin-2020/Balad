"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/styles';
import { X } from 'lucide-react';

export const buttonCloseVariants = cva(
  'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      size: {
        'xs': 'h-6 w-6',
        'sm': 'h-8 w-8',
        'md': 'h-10 w-10',
        'lg': 'h-12 w-12'
      },
      variant: {
        'default': 'bg-transparent hover:bg-muted',
        'onColor': 'bg-white/10 hover:bg-white/20 text-white'
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'default'
    }
  }
);

export interface ButtonCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonCloseVariants> {}

const ButtonClose = React.forwardRef<HTMLButtonElement, ButtonCloseProps>(
  ({ 
    className,
    size,
    variant,
    ...props 
  }, ref) => {
    return (
      <button
        type="button"
        className={cn(buttonCloseVariants({ 
          size,
          variant,
          className 
        }))}
        ref={ref}
        aria-label="Close"
        {...props}
      >
        <X className={cn(
          size === 'xs' ? 'h-3 w-3' : 
          size === 'sm' ? 'h-4 w-4' : 
          size === 'lg' ? 'h-6 w-6' : 
          'h-5 w-5'
        )} />
      </button>
    );
  }
);

ButtonClose.displayName = 'ButtonClose';

export default ButtonClose;