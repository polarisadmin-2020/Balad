# Contributing to Shared UI

This document provides guidelines and instructions for contributing to the Shared UI component library.

## Development Workflow

1. Clone the repository
2. Install dependencies with `npm install`
3. Run `npm run dev` to start the development server
4. Make your changes
5. Test your changes with `npm test`
6. Submit a pull request

## Component Generation

The Shared UI library uses a component generation system that converts Figma JSON exports into React components.

### Adding a New Component

1. Export your component from Figma as JSON
2. Save the JSON file in the `figma-exports` directory
3. Run `npm run generate` to generate the component
4. The component will be available in the library

### Modifying the Generation Process

If you need to modify how components are generated, you can edit the following files:

- `src/lib/services/component-generator.ts`: Main component generation logic
- `src/lib/services/figma-converter.ts`: Converts Figma JSON to React code
- `src/lib/services/figma-parser.ts`: Parses and validates Figma JSON

## Component Structure

Each component should follow this structure:

```
src/components/ComponentName/
├── ComponentName.tsx    # Main component implementation
├── index.ts            # Re-exports the component
└── ComponentName.test.tsx  # Component tests
```

## Coding Standards

- Use TypeScript for all components
- Follow the React Hooks pattern for state management
- Use Tailwind CSS for styling
- Use class-variance-authority (cva) for component variants
- Ensure all components are accessible
- Write tests for all components

## Documentation

- Document all props using TypeScript interfaces
- Add JSDoc comments to explain complex logic
- Create Storybook stories for all components

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation if needed
3. The PR should work in Storybook without errors
4. The PR should pass all tests
5. The PR should be reviewed by at least one maintainer