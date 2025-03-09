"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/styles';

export const switchVariants = cva(
  'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
  {
    variants: {
      color: {
        'default': '',
        'brand': 'data-[state=checked]:bg-sa-600',
        'neutral': 'data-[state=checked]:bg-gray-600'
      }
    },
    defaultVariants: {
      color: 'default'
    }
  }
);

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  alertMessage?: boolean;
  alertText?: string;
  color?: 'default' | 'brand' | 'neutral';
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ 
    className,
    label,
    helperText,
    alertMessage,
    alertText,
    color,
    checked,
    onChange,
    disabled,
    ...props 
  }, ref) => {
    return (
      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2 space-x-reverse">
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            data-state={checked ? 'checked' : 'unchecked'}
            className={cn(
              switchVariants({ color, className }),
              'relative'
            )}
            onClick={(e) => {
              if (!disabled && onChange) {
                const event = {
                  target: {
                    checked: !checked
                  }
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(event);
              }
            }}
            disabled={disabled}
          >
            <span
              data-state={checked ? 'checked' : 'unchecked'}
              className={cn(
                "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
                checked ? "translate-x-5" : "-translate-x-5",
                "rtl:translate-x-reverse"
              )}
            />
          </button>
          {label && (
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </span>
          )}
        </label>
        
        {helperText && !alertMessage && (
          <p className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
        
        {alertMessage && alertText && (
          <p className="text-sm text-destructive">
            {alertText}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;