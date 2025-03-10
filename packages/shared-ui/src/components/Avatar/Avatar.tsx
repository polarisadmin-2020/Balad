"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/styles';
import { User } from 'lucide-react';

export const avatarVariants = cva(
  'inline-flex items-center justify-center overflow-hidden',
  {
    variants: {
      size: {
        'xs': 'h-6 w-6 text-xs',
        'sm': 'h-8 w-8 text-sm',
        'md': 'h-10 w-10 text-base',
        'lg': 'h-12 w-12 text-lg',
        'xl': 'h-16 w-16 text-xl'
      },
      variant: {
        'circle': 'rounded-full',
        'square': 'rounded-md'
      },
      background: {
        'default': 'bg-muted',
        'colored': 'bg-primary'
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'circle',
      background: 'default'
    }
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  initials?: string;
  fallback?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    className,
    size,
    variant,
    background,
    src,
    alt,
    initials,
    fallback,
    ...props 
  }, ref) => {
    const [hasError, setHasError] = React.useState(false);
    
    const handleError = () => {
      setHasError(true);
    };
    
    return (
      <div
        className={cn(avatarVariants({ 
          size,
          variant,
          background,
          className 
        }))}
        ref={ref}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="h-full w-full object-cover"
            onError={handleError}
          />
        ) : initials ? (
          <span className="font-medium text-foreground">{initials}</span>
        ) : fallback ? (
          fallback
        ) : (
          <User className="h-1/2 w-1/2 text-foreground" />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;