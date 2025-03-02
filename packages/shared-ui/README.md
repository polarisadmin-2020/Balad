# Shared UI Component Library

This package contains shared UI components generated from Figma designs. The components are built using React, TypeScript, and Tailwind CSS.

## Getting Started

### Installation

```bash
npm install @monorepo/shared-ui
```

### Usage

```jsx
import { Button, Checkbox } from '@monorepo/shared-ui';

function MyComponent() {
  return (
    <div>
      <Button variant="primary" size="md">Click Me</Button>
      <Checkbox label="Accept terms" />
    </div>
  );
}
```

## Environment Variables

This package uses the following environment variables:

- `STORYBOOK_PORT`: Port for running Storybook (default: 6006)

Copy `.env.example` to `.env` and adjust the values as needed:

```bash
cp .env.example .env
```

## Component Generation Process

This library uses a component generation system that converts Figma JSON exports into React components.

### How It Works

1. Export component designs from Figma as JSON
2. Place the JSON files in the `figma-exports` directory
3. Run the generation script to create React components
4. Components are automatically added to the library exports

### Commands

- `npm run build`: Build the component library
- `npm run dev`: Watch for changes and rebuild
- `npm run generate`: Generate components from Figma JSON exports
- `npm run storybook`: Run Storybook to view and test components

## Adding New Components

1. Export your component from Figma as JSON
2. Save the JSON file in the `figma-exports` directory
3. Run `npm run generate` to generate the component
4. The component will be available in the library

## Component Structure

Each generated component follows a consistent structure:

- TypeScript React component with proper typing
- Tailwind CSS for styling
- Variants using class-variance-authority (cva)
- Proper accessibility attributes
- Comprehensive prop interface

## Available Components

The library includes the following components:

- Button
- Checkbox
- Avatar
- Card
- Tag
- and more...

## Development

### Directory Structure

```
packages/shared-ui/
├── figma-exports/       # Figma JSON exports
├── src/
│   ├── components/      # Generated React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and services
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Helper utilities
├── scripts/             # Build and generation scripts
└── stories/             # Storybook stories
```

### Contributing

1. Create a new branch for your changes
2. Make your changes
3. Run tests and ensure Storybook examples work
4. Submit a pull request