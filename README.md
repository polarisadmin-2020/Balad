# Shared UI Components Monorepo

This repository contains a collection of shared UI components built with React, TypeScript, and Tailwind CSS.

## Features

- Reusable UI components
- Built with React and TypeScript
- Styled with Tailwind CSS
- Accessible and responsive design
- Dark mode support
- Microfrontend architecture

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

## Project Structure

```
├── packages/
│   ├── shared-ui/       # Shared UI components library
│   │   ├── public/
│   │   │   └── images/  # Shared images used across all repos
│   │   └── src/
│   │       └── components/
│   │
│   └── admin/           # Admin microfrontend
│       ├── public/
│       │   └── images/  # Admin-specific images
│       ├── app/
│       └── components/
│
├── public/
│   └── images/          # Main application images
│
└── app/                 # Main Next.js application
```

## Shared Images

The repository includes shared image directories that can be used across all microfrontends:

- `/public/images/` - For the main application
- `/packages/shared-ui/public/images/` - For shared images used across all repos
- `/packages/admin/public/images/` - For admin-specific images

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