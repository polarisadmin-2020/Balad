"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/styles';
import { ChevronRight } from 'lucide-react';

export const breadcrumbVariants = cva(
  'flex items-center',
  {
    variants: {
      size: {
        'sm': 'text-xs',
        'md': 'text-sm',
        'lg': 'text-base'
      },
      variant: {
        'default': 'text-muted-foreground',
        'onColor': 'text-white/70'
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'default'
    }
  }
);

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  separator?: React.ReactNode;
  rtl?: boolean;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ 
    className,
    size,
    variant,
    separator = <ChevronRight className="h-4 w-4" />,
    rtl = false,
    children,
    ...props 
  }, ref) => {
    const items = React.Children.toArray(children);
    const itemsWithSeparators = items.map((item, index) => {
      if (index === items.length - 1) {
        return (
          <li key={index} className="text-foreground font-medium">
            {item}
          </li>
        );
      }
      
      return (
        <React.Fragment key={index}>
          <li>{item}</li>
          <li className="mx-2 text-muted-foreground" aria-hidden>
            {separator}
          </li>
        </React.Fragment>
      );
    });
    
    return (
      <nav
        className={cn(breadcrumbVariants({ 
          size,
          variant,
          className 
        }))}
        ref={ref}
        aria-label="Breadcrumb"
        dir={rtl ? 'rtl' : 'ltr'}
        {...props}
      >
        <ol className="flex items-center">
          {rtl ? itemsWithSeparators.reverse() : itemsWithSeparators}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  active?: boolean;
}

export const BreadcrumbItem = React.forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  ({ className, href, active, children, ...props }, ref) => {
    if (!href || active) {
      return (
        <span className={cn("", className)}>
          {children}
        </span>
      );
    }
    
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          "transition-colors hover:text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export default Breadcrumb;