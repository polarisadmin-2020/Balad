"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/styles';

export const cardVariants = cva(
  'rounded-lg',
  {
    variants: {
      variant: {
        'default': 'bg-card text-card-foreground',
        'elevated': 'bg-card text-card-foreground shadow-md',
        'outlined': 'bg-card text-card-foreground border border-border',
        'interactive': 'bg-card text-card-foreground hover:bg-accent/50 cursor-pointer transition-colors'
      },
      padding: {
        'none': '',
        'sm': 'p-3',
        'md': 'p-4',
        'lg': 'p-6'
      }
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md'
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  selectable?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className,
    variant,
    padding,
    selectable,
    selected,
    disabled,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        className={cn(
          cardVariants({ 
            variant: selectable ? 'interactive' : variant,
            padding,
            className 
          }),
          selected && 'ring-2 ring-primary',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;