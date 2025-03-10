"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/styles';
import { CheckIcon, MinusIcon } from 'lucide-react';

export const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        'default': 'border-primary text-primary-foreground',
        'error': 'border-destructive text-destructive-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  helperText?: string;
  error?: boolean;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className,
    variant,
    label,
    helperText,
    error,
    indeterminate,
    checked,
    ...props 
  }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked);
    const [isIndeterminate, setIsIndeterminate] = React.useState(indeterminate);
    
    React.useEffect(() => {
      setIsChecked(checked);
    }, [checked]);
    
    React.useEffect(() => {
      setIsIndeterminate(indeterminate);
    }, [indeterminate]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
      setIsIndeterminate(false);
      props.onChange?.(e);
    };
    
    return (
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              className={cn(
                checkboxVariants({ 
                  variant: error ? 'error' : 'default',
                  className 
                }),
                'appearance-none'
              )}
              ref={ref}
              checked={isChecked}
              onChange={handleChange}
              {...props}
            />
            {(isChecked || isIndeterminate) && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-sm bg-primary">
                {isIndeterminate ? (
                  <MinusIcon className="h-3 w-3 text-primary-foreground" />
                ) : (
                  <CheckIcon className="h-3 w-3 text-primary-foreground" />
                )}
              </div>
            )}
          </div>
          {label && (
            <label 
              htmlFor={props.id} 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
        </div>
        {helperText && (
          <p className={cn(
            "text-sm",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;