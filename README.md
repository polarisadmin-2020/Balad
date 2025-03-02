# Shared UI Components Monorepo


This repository contains a collection of shared UI components built with React, TypeScript, and Tailwind CSS.

## Features

- Reusable UI components
- Built with React and TypeScript
- Styled with Tailwind CSS
- Accessible and responsive design
- Dark mode support

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Environment Setup

This project uses environment variables for configuration. Each package can have its own environment variables.

### Root Environment Variables

The root `.env` file contains shared variables used across all packages.

1. Copy the example file to create your own:

```bash
cp .env.example .env
```

2. Adjust the values as needed.

### Package-Specific Environment Variables

Each package can have its own `.env` file with package-specific variables.

1. Navigate to the package directory:

```bash
cd packages/shared-ui
```

2. Copy the example file:

```bash
cp .env.example .env
```

3. Adjust the values as needed.

### Automated Environment Setup

You can use the setup script to generate environment files for different environments:

```bash
node scripts/setup-env.js [environment]
```

Available environments:
- `development` (default)
- `staging`
- `production`

Example:
```bash
node scripts/setup-env.js production
```

## Deployment

To deploy the project:

1. Set up the environment for your target deployment:

```bash
node scripts/setup-env.js production
```

2. Build the project:

```bash
npm run build
```

3. Deploy using the deploy script:

```bash
GITHUB_TOKEN=your_token node deploy.js

## Components

The library includes the following components:

- Button
- Checkbox
- Avatar
- Card
- Breadcrumb
- ButtonClose
- Accordion
- NavHeader
- Tag
- Switch
- TextInput
- Dropdown
- DatePicker

## License

MIT