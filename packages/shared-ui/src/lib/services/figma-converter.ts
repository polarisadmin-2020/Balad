import { FigmaNode, FigmaComponent, FigmaComponentSet } from '../../types/figma';
import { FigmaParser } from './figma-parser';

/**
 * Service to convert Figma JSON to React components
 */
export class FigmaConverter {
  /**
   * Convert a Figma component set to React components
   */
  static convertComponentSet(componentSet: FigmaComponentSet): string {
    const componentName = this.formatComponentName(componentSet.name);
    const variants = this.extractVariantsFromSet(componentSet);
    
    return this.generateComponentCode(componentName, variants, componentSet);
  }

  /**
   * Format component name to PascalCase
   */
  private static formatComponentName(name: string): string {
    // Remove any variant information from the name
    const baseName = name.includes('=') ? name.split('=')[0].split(',')[0].trim() : name;
    
    return baseName
      .split(/[^a-zA-Z0-9]/)
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('');
  }

  /**
   * Extract variants from component set
   */
  private static extractVariantsFromSet(componentSet: FigmaComponentSet): Record<string, string[]> {
    const variantMap: Record<string, Set<string>> = {};
    
    componentSet.children.forEach(child => {
      const variants = FigmaParser.extractVariants(child.name);
      
      Object.entries(variants).forEach(([property, value]) => {
        if (!variantMap[property]) {
          variantMap[property] = new Set();
        }
        variantMap[property].add(value);
      });
    });

    return Object.fromEntries(
      Object.entries(variantMap).map(([key, value]) => [
        key,
        Array.from(value)
      ])
    );
  }

  /**
   * Extract size information from component
   */
  private static extractSizeInfo(componentSet: FigmaComponentSet): Record<string, any> {
    const sizes: Record<string, any> = {};
    
    componentSet.children.forEach(child => {
      const variants = FigmaParser.extractVariants(child.name);
      const size = variants['Size'] || 'default';
      
      if (!sizes[size]) {
        sizes[size] = {
          width: child.width || 0,
          height: child.height || 0,
          padding: this.extractPadding(child),
          cornerRadius: child.cornerRadius || 0
        };
      }
    });
    
    return sizes;
  }
  
  /**
   * Extract padding information from component
   */
  private static extractPadding(component: FigmaComponent): { x: number, y: number } {
    // This is a simplified approach - in a real implementation,
    // you would analyze the component's children and their positions
    return {
      x: 16, // Default horizontal padding
      y: 8   // Default vertical padding
    };
  }

  /**
   * Generate component code
   */
  private static generateComponentCode(
    componentName: string, 
    variants: Record<string, string[]>, 
    componentSet: FigmaComponentSet
  ): string {
    const sizes = this.extractSizeInfo(componentSet);
    const hasSize = variants['Size']?.length > 0;
    const hasStyle = variants['Style']?.length > 0 || variants['Variant']?.length > 0;
    const hasState = variants['State']?.length > 0;
    const hasDestructive = variants['Destructive']?.length > 0;
    const hasIconOnly = variants['Icon only']?.length > 0;
    const hasOnColor = variants['On-color']?.length > 0 || variants['OnColor']?.length > 0;
    const hasRTL = variants['RTL']?.length > 0;
    
    const variantProps = Object.entries(variants)
      .map(([key, values]) => {
        const propName = key.toLowerCase().replace(/\s+/g, '');
        return `${propName}?: ${values.map(v => `'${v.toLowerCase().replace(/\s+/g, '-')}'`).join(' | ')}`;
      })
      .join(';\n  ');

    return `"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/styles';

const ${componentName.toLowerCase()}Variants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      ${hasSize ? `size: {
        ${Object.entries(sizes).map(([size, info]) => `'${size.toLowerCase()}': 'h-[${info.height}px] min-w-[${info.width}px] text-sm px-${info.padding.x / 4} py-${info.padding.y / 4}'`).join(',\n        ')}
      },` : ''}
      ${hasStyle ? `variant: {
        ${(variants['Style'] || variants['Variant'] || []).map(style => `'${style.toLowerCase()}': '${this.getStyleClasses(style)}'`).join(',\n        ')}
      },` : ''}
      ${hasState ? `state: {
        ${variants['State'].map(state => `'${state.toLowerCase()}': '${this.getStateClasses(state)}'`).join(',\n        ')}
      },` : ''}
      ${hasDestructive ? `destructive: {
        true: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        false: ''
      },` : ''}
      ${hasIconOnly ? `iconOnly: {
        true: 'p-0 aspect-square',
        false: ''
      },` : ''}
      ${hasOnColor ? `onColor: {
        true: 'bg-white/10 text-white hover:bg-white/20',
        false: ''
      },` : ''}
      ${hasRTL ? `rtl: {
        true: 'flex-row-reverse',
        false: ''
      },` : ''}
    },
    defaultVariants: {
      ${hasSize ? `size: '${variants['Size']?.[0]?.toLowerCase() || 'medium'}',` : ''}
      ${hasStyle ? `variant: '${(variants['Style'] || variants['Variant'] || [])[0]?.toLowerCase() || 'default'}',` : ''}
      ${hasState ? `state: '${variants['State']?.[0]?.toLowerCase() || 'default'}',` : ''}
      ${hasDestructive ? `destructive: false,` : ''}
      ${hasIconOnly ? `iconOnly: false,` : ''}
      ${hasOnColor ? `onColor: false,` : ''}
      ${hasRTL ? `rtl: false,` : ''}
    }
  }
);

export interface ${componentName}Props
  extends React.${componentName === 'Button' ? 'ButtonHTMLAttributes<HTMLButtonElement>' : 'HTMLAttributes<HTMLDivElement>'},
    VariantProps<typeof ${componentName.toLowerCase()}Variants> {
  ${hasIconOnly ? `startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;` : ''}
}

const ${componentName} = React.forwardRef<${componentName === 'Button' ? 'HTMLButtonElement' : 'HTMLDivElement'}, ${componentName}Props>(
  ({ 
    className,
    ${hasSize ? `size,` : ''}
    ${hasStyle ? `variant,` : ''}
    ${hasState ? `state,` : ''}
    ${hasDestructive ? `destructive,` : ''}
    ${hasIconOnly ? `iconOnly,
    startIcon,
    endIcon,` : ''}
    ${hasOnColor ? `onColor,` : ''}
    ${hasRTL ? `rtl,` : ''}
    children,
    ...props 
  }, ref) => {
    return (
      <${componentName === 'Button' ? 'button' : 'div'}
        className={cn(${componentName.toLowerCase()}Variants({ 
          ${hasSize ? `size,` : ''}
          ${hasStyle ? `variant,` : ''}
          ${hasState ? `state,` : ''}
          ${hasDestructive ? `destructive,` : ''}
          ${hasIconOnly ? `iconOnly,` : ''}
          ${hasOnColor ? `onColor,` : ''}
          ${hasRTL ? `rtl,` : ''}
          className 
        }))}
        ref={ref}
        {...props}
      >
        ${hasIconOnly ? `{startIcon && (
          <span className="mr-2 -ml-1">{startIcon}</span>
        )}
        {children}
        {endIcon && (
          <span className="ml-2 -mr-1">{endIcon}</span>
        )}` : `{children}`}
      </${componentName === 'Button' ? 'button' : 'div'}>
    );
  }
);

${componentName}.displayName = '${componentName}';

export default ${componentName};
`;
  }

  /**
   * Get Tailwind classes for style variant
   */
  private static getStyleClasses(style: string): string {
    const styleLower = style.toLowerCase();
    
    switch (styleLower) {
      case 'primary':
      case 'primary-neutral':
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
      case 'primary-brand':
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
      case 'secondary-outline':
      case 'outline':
        return 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';
      case 'ghost':
      case 'subtle':
        return 'hover:bg-accent hover:text-accent-foreground';
      case 'destructive':
      case 'des-primary':
        return 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
      case 'des-secondary':
        return 'bg-red-100 text-red-700 hover:bg-red-200';
      case 'des-secondary-outline':
        return 'border border-red-300 text-red-700 hover:bg-red-50';
      case 'transparent':
      case 'des-transparent':
        return 'bg-transparent hover:bg-accent/50';
      case 'link':
        return 'underline-offset-4 hover:underline text-primary';
      default:
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
    }
  }

  /**
   * Get Tailwind classes for state variant
   */
  private static getStateClasses(state: string): string {
    const stateLower = state.toLowerCase();
    
    switch (stateLower) {
      case 'hover':
        return 'bg-opacity-90';
      case 'active':
        return 'bg-opacity-100 transform scale-[0.98]';
      case 'disabled':
        return 'opacity-50 cursor-not-allowed';
      case 'focus':
        return 'ring-2 ring-ring ring-offset-2';
      default:
        return '';
    }
  }
}