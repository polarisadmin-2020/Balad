# Using the Shared UI Component Library

This guide explains how to use the Shared UI component library in your projects.

## Installation

```bash
npm install @monorepo/shared-ui
```

## Basic Usage

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

## Available Components

### Button

```jsx
import { Button } from '@monorepo/shared-ui';

// Basic usage
<Button>Click Me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icons
<Button startIcon={<Icon />}>With Icon</Button>
<Button endIcon={<Icon />}>With Icon</Button>
<Button iconOnly={<Icon />} aria-label="Icon button" />

// Disabled state
<Button disabled>Disabled</Button>
```

### Checkbox

```jsx
import { Checkbox } from '@monorepo/shared-ui';

// Basic usage
<Checkbox label="Accept terms" />

// With helper text
<Checkbox 
  label="Subscribe to newsletter" 
  helperText="We'll send you weekly updates" 
/>

// Disabled state
<Checkbox label="Disabled option" disabled />

// Controlled component
const [checked, setChecked] = useState(false);
<Checkbox 
  label="Controlled checkbox" 
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>
```

### Avatar

```jsx
import { Avatar } from '@monorepo/shared-ui';

// With image
<Avatar src="/path/to/image.jpg" alt="User name" />

// With initials
<Avatar initials="JD" />

// With sizes
<Avatar src="/path/to/image.jpg" size="sm" />
<Avatar src="/path/to/image.jpg" size="md" />
<Avatar src="/path/to/image.jpg" size="lg" />

// With variants
<Avatar src="/path/to/image.jpg" variant="circle" />
<Avatar src="/path/to/image.jpg" variant="square" />
```

### Card

```jsx
import { Card } from '@monorepo/shared-ui';

// Basic card
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// With variants
<Card variant="outlined">Content</Card>
<Card variant="elevated">Content</Card>

// Interactive card
<Card onClick={() => console.log('Card clicked')}>
  Click me
</Card>
```

## Theme Customization

The Shared UI components use Tailwind CSS for styling and can be customized using your project's Tailwind configuration.

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        // Add your custom colors here
      },
      // Add other customizations
    },
  },
  plugins: [],
}
```

## Using with Next.js

```jsx
// app/page.tsx
import { Button } from '@monorepo/shared-ui';

export default function Page() {
  return (
    <div>
      <h1>My Next.js Page</h1>
      <Button>Click Me</Button>
    </div>
  );
}
```

## Using with TypeScript

The Shared UI components are built with TypeScript and provide type definitions for all props.

```tsx
import { Button, ButtonProps } from '@monorepo/shared-ui';

// You can extend the component props
interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}

function CustomButton({ customProp, ...props }: CustomButtonProps) {
  return <Button {...props} />;
}
```

## Accessibility

All Shared UI components are built with accessibility in mind. They include proper ARIA attributes and keyboard navigation support.

## Support

If you encounter any issues or have questions about using the Shared UI components, please open an issue on the repository.