"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/styles';
import { X } from 'lucide-react';

export const fieldCardVariants = cva(
  'bg-white rounded-lg border transition-shadow hover:shadow-md',
  {
    variants: {
      variant: {
        'default': 'border-gray-200',
        'error': 'border-red-300',
        'success': 'border-green-300',
        'warning': 'border-yellow-300'
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

export interface FieldCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldCardVariants> {
  title?: React.ReactNode;
  onClose?: () => void;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

const FieldCard = React.forwardRef<HTMLDivElement, FieldCardProps>(
  ({ 
    className,
    variant,
    padding,
    title,
    onClose,
    icon,
    footer,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        className={cn(fieldCardVariants({ variant, padding, className }))}
        ref={ref}
        {...props}
      >
        {(title || onClose || icon) && (
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="text-primary">{icon}</div>
              )}
              {title && (
                <h3 className="text-lg font-medium">{title}</h3>
              )}
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
        
        <div className={cn(
          "p-4",
          footer && "border-b"
        )}>
          {children}
        </div>

        {footer && (
          <div className="p-4">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

FieldCard.displayName = 'FieldCard';

export default FieldCard;