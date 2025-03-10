"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/styles';

export const typographyVariants = cva(
  'text-foreground',
  {
    variants: {
      variant: {
        'display-2xl': 'text-display-2xl',
        'display-xl': 'text-display-xl',
        'display-lg': 'text-display-lg',
        'display-md': 'text-display-md',
        'display-sm': 'text-display-sm',
        'display-xs': 'text-display-xs',
        'text-xl': 'text-text-xl',
        'text-lg': 'text-text-lg',
        'text-md': 'text-text-md',
        'text-sm': 'text-text-sm',
        'text-xs': 'text-text-xs',
      },
      weight: {
        regular: 'font-regular',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      tracking: {
        normal: 'tracking-normal',
        tight: 'tracking-[-0.02em]',
      },
    },
    defaultVariants: {
      variant: 'text-md',
      weight: 'regular',
      tracking: 'normal',
    },
  }
);

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, weight, tracking, as = 'p', children, ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        className={cn(
          typographyVariants({ variant, weight, tracking, className })
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

export default Typography;