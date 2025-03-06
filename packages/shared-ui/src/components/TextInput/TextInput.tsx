"use client";

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/styles';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

export const textInputVariants = cva(
  'flex items-center relative rounded-md border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
  {
    variants: {
      size: {
        'sm': 'h-8 text-xs',
        'md': 'h-10 text-sm',
        'lg': 'h-12 text-base'
      },
      style: {
        'default': 'bg-background border-input',
        'lighter': 'bg-gray-50 border-gray-200',
        'darker': 'bg-gray-100 border-gray-300'
      },
      error: {
        true: 'border-destructive',
        false: ''
      }
    },
    defaultVariants: {
      size: 'md',
      style: 'default',
      error: false
    }
  }
);

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof textInputVariants> {
  feedbackIcon?: boolean;
  feedbackIconType?: 'success' | 'error' | 'warning';
  prefix?: boolean;
  suffix?: boolean;
  icon?: React.ReactNode;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ 
    className,
    size,
    style,
    error,
    feedbackIcon,
    feedbackIconType,
    prefix,
    suffix,
    icon,
    type = 'text',
    disabled,
    readOnly,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    
    const actualType = type === 'password' && showPassword ? 'text' : type;
    
    const feedbackIconMap = {
      success: <Check className="h-4 w-4 text-green-500" />,
      error: <AlertCircle className="h-4 w-4 text-red-500" />,
      warning: <AlertCircle className="h-4 w-4 text-amber-500" />
    };
    
    return (
      <div className="space-y-2">
        <div
          className={cn(textInputVariants({ 
            size,
            style,
            error: !!error,
            className 
          }))}
        >
          {prefix && icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {icon}
            </div>
          )}
          
          <input
            type={actualType}
            className={cn(
              "w-full h-full bg-transparent border-none focus:outline-none focus:ring-0",
              prefix ? 'pl-10' : 'pl-4',
              (suffix || type === 'password' || feedbackIcon) ? 'pr-10' : 'pr-4',
              disabled ? 'cursor-not-allowed opacity-50' : '',
              readOnly ? 'cursor-not-allowed' : ''
            )}
            disabled={disabled}
            readOnly={readOnly}
            ref={ref}
            {...props}
          />
          
          {type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
          
          {suffix && icon && type !== 'password' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {icon}
            </div>
          )}
          
          {feedbackIcon && feedbackIconType && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {feedbackIconMap[feedbackIconType]}
            </div>
          )}
        </div>
        
        {error && typeof error === 'string' && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;