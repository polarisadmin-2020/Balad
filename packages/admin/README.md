# Admin Microfrontend

This package contains the admin interface for the application, built as a microfrontend using Next.js, React, and Tailwind CSS.

## Features

- Dashboard with statistics and activity feed
- User management
- Product management
- Dark/light theme support
- Responsive design

## Getting Started

### Development

```bash
# From the root of the monorepo
cd packages/admin
npm run dev
```

This will start the development server on port 3002.

### Build

```bash
# From the root of the monorepo
cd packages/admin
npm run build
```

## Project Structure

```
packages/admin/
├── app/                 # Next.js app directory
│   ├── page.tsx         # Dashboard page
│   ├── users/           # User management
│   └── products/        # Product management
├── components/          # Reusable components
│   ├── dashboard/       # Dashboard-specific components
│   └── layout/          # Layout components (Sidebar, Header)
└── public/
    └── images/          # Admin-specific images
```

## Images

The `public/images` directory contains admin-specific images. To use these images:

```jsx
// In any component
<img src="/images/your-image.jpg" alt="Description" />
```

You can also use shared images from the shared-ui package:

```jsx
// In any component
<img src="/shared-ui/images/your-image.jpg" alt="Description" />
```

## Shared UI Components

This microfrontend uses components from the shared UI library:

```jsx
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import Avatar from '@monorepo/shared-ui/src/components/Avatar/Avatar';
```

## Customization

### Theme

The admin interface uses the same theme system as the main application, with light and dark mode support. You can customize the theme in the `tailwind.config.js` file.

### Layout

The layout components (Sidebar, Header) can be customized to fit your specific needs.

## Adding New Pages

To add a new page to the admin interface:

1. Create a new directory in the `app` directory
2. Add a `page.tsx` file to the directory
3. Import the necessary components and implement the page

Example:

```jsx
// app/settings/page.tsx
"use client";

import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import Card from '@monorepo/shared-ui/src/components/Card/Card';

export default function SettingsPage() {
  // Implementation
}
```