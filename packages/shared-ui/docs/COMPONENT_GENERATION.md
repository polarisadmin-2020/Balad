# Component Generation from Figma

This document explains how the Shared UI library generates React components from Figma JSON exports.

## Overview

The component generation process consists of the following steps:

1. Export component designs from Figma as JSON
2. Place the JSON files in the `figma-exports` directory
3. Run the generation script to create React components
4. Components are automatically added to the library exports

## Exporting from Figma

To export a component from Figma:

1. Select the component or component set in Figma
2. Right-click and select "Copy/Paste as" > "Copy as JSON"
3. Create a new file in the `figma-exports` directory with a descriptive name (e.g., `Button.json`)
4. Paste the JSON content into the file

## Component Naming Conventions

The generator extracts component names and variants from the Figma JSON. It follows these conventions:

- Component names should be in PascalCase (e.g., `Button`, `Checkbox`)
- Variants should be specified in the format: `Property=Value, Property2=Value2`
- Example: `Button, Size=md, Variant=primary, State=default`

## Supported Variant Properties

The generator recognizes the following variant properties:

- `Size`: Component size (e.g., `sm`, `md`, `lg`)
- `Style` or `Variant`: Component style (e.g., `primary`, `secondary`, `outline`)
- `State`: Component state (e.g., `default`, `hover`, `active`, `disabled`)
- `Destructive`: Whether the component has a destructive style
- `Icon only`: Whether the component only displays an icon
- `OnColor` or `On-color`: Whether the component is displayed on a colored background
- `RTL`: Whether the component supports right-to-left languages

## Running the Generator

To generate components from the Figma JSON exports:

```bash
npm run generate
```

This command will:

1. Build the component library
2. Process all JSON files in the `figma-exports` directory
3. Generate React components in the `src/components` directory
4. Update the component exports

## Generated Component Structure

Each generated component follows this structure:

```
src/components/ComponentName/
├── ComponentName.tsx    # Main component implementation
└── index.ts            # Re-exports the component
```

The main component file includes:

- A `"use client"` directive for Next.js compatibility
- A component variant definition using `class-variance-authority`
- A TypeScript interface for the component props
- A React component implementation with proper forwarded refs

## Customizing the Generation Process

If you need to customize how components are generated, you can modify the following files:

- `src/lib/services/component-generator.ts`: Main component generation logic
- `src/lib/services/figma-converter.ts`: Converts Figma JSON to React code
- `src/lib/services/figma-parser.ts`: Parses and validates Figma JSON

## Example

Here's an example of a generated Button component:

```tsx
"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/styles';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      size: {
        'sm': 'h-[32px] min-w-[80px] text-sm px-3 py-2',
        'md': 'h-[40px] min-w-[100px] text-sm px-4 py-2',
        'lg': 'h-[48px] min-w-[120px] text-sm px-6 py-3'
      },
      variant: {
        'primary': 'bg-primary text-primary-foreground hover:bg-primary/90',
        'secondary': 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        'outline': 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
      },
      iconOnly: {
        true: 'p-0 aspect-square',
        false: ''
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
      iconOnly: false
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className,
    size,
    variant,
    iconOnly,
    startIcon,
    endIcon,
    children,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ 
          size,
          variant,
          iconOnly,
          className 
        }))}
        ref={ref}
        {...props}
      >
        {startIcon && (
          <span className="mr-2 -ml-1">{startIcon}</span>
        )}
        {children}
        {endIcon && (
          <span className="ml-2 -mr-1">{endIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
```

## Troubleshooting

If you encounter issues with the component generation:

1. Check that your Figma JSON is valid
2. Ensure the component naming follows the conventions
3. Check the console output for error messages
4. Verify that the `figma-exports` directory exists and contains JSON files