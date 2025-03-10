# Component Showcase

This document showcases the components available in the Shared UI library and their variants.

## Button

The Button component is used to trigger an action or event.

### Variants

- **Primary**: Used for primary actions
- **Secondary**: Used for secondary actions
- **Outline**: A button with only an outline
- **Ghost**: A button with no background or outline
- **Destructive**: Used for destructive actions

### Sizes

- **Small**: Compact size
- **Medium**: Default size
- **Large**: Larger, more prominent size

### Examples

```jsx
<Button variant="primary" size="md">Primary Button</Button>
<Button variant="secondary" size="md">Secondary Button</Button>
<Button variant="outline" size="md">Outline Button</Button>
<Button variant="ghost" size="md">Ghost Button</Button>
<Button variant="destructive" size="md">Destructive Button</Button>

<Button variant="primary" size="sm">Small Button</Button>
<Button variant="primary" size="md">Medium Button</Button>
<Button variant="primary" size="lg">Large Button</Button>

<Button variant="primary" startIcon={<Icon />}>With Start Icon</Button>
<Button variant="primary" endIcon={<Icon />}>With End Icon</Button>
<Button variant="primary" iconOnly={<Icon />} aria-label="Icon Button" />
```

## Checkbox

The Checkbox component is used to select one or more options from a set.

### Variants

- **Default**: Standard checkbox
- **Indeterminate**: Checkbox in an indeterminate state

### States

- **Unchecked**: Default state
- **Checked**: Selected state
- **Disabled**: Unavailable for interaction

### Examples

```jsx
<Checkbox label="Default checkbox" />
<Checkbox label="Checked checkbox" checked />
<Checkbox label="Indeterminate checkbox" indeterminate />
<Checkbox label="Disabled checkbox" disabled />
<Checkbox label="Disabled checked checkbox" disabled checked />

<Checkbox 
  label="With helper text" 
  helperText="This is some additional information about the checkbox"
/>

<Checkbox 
  label="With error message" 
  error 
  helperText="This field is required"
/>
```

## Avatar

The Avatar component is used to represent a user or entity.

### Variants

- **Image**: Displays a user image
- **Initials**: Displays user initials
- **Icon**: Displays a generic icon

### Sizes

- **Extra Small**: 24px
- **Small**: 32px
- **Medium**: 40px
- **Large**: 48px
- **Extra Large**: 64px

### Examples

```jsx
<Avatar src="/path/to/image.jpg" alt="User name" />
<Avatar initials="JD" />
<Avatar icon={<UserIcon />} />

<Avatar src="/path/to/image.jpg" size="xs" />
<Avatar src="/path/to/image.jpg" size="sm" />
<Avatar src="/path/to/image.jpg" size="md" />
<Avatar src="/path/to/image.jpg" size="lg" />
<Avatar src="/path/to/image.jpg" size="xl" />

<Avatar src="/path/to/image.jpg" variant="circle" />
<Avatar src="/path/to/image.jpg" variant="square" />
```

## Card

The Card component is used to group related content and actions.

### Variants

- **Default**: Standard card
- **Elevated**: Card with a shadow
- **Outlined**: Card with a border
- **Interactive**: Clickable card

### Examples

```jsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

<Card variant="elevated">
  <CardContent>Elevated Card</CardContent>
</Card>

<Card variant="outlined">
  <CardContent>Outlined Card</CardContent>
</Card>

<Card variant="interactive" onClick={() => console.log('Card clicked')}>
  <CardContent>Interactive Card</CardContent>
</Card>
```

## Breadcrumb

The Breadcrumb component is used to show the navigation path.

### Examples

```jsx
<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem href="/products/category">Category</BreadcrumbItem>
  <BreadcrumbItem>Current Page</BreadcrumbItem>
</Breadcrumb>

<Breadcrumb separator={<ChevronRightIcon />}>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem>Current Page</BreadcrumbItem>
</Breadcrumb>
```

## Tag

The Tag component is used to categorize or label content.

### Variants

- **Default**: Standard tag
- **Outline**: Tag with only an outline
- **Solid**: Tag with a solid background

### Colors

- **Gray**: Default color
- **Red**: For errors or warnings
- **Green**: For success or approved states
- **Blue**: For information or in-progress states
- **Purple**: For special or featured items

### Sizes

- **Small**: Compact size
- **Medium**: Default size
- **Large**: Larger, more prominent size

### Examples

```jsx
<Tag>Default Tag</Tag>
<Tag variant="outline">Outline Tag</Tag>
<Tag variant="solid">Solid Tag</Tag>

<Tag color="gray">Gray Tag</Tag>
<Tag color="red">Red Tag</Tag>
<Tag color="green">Green Tag</Tag>
<Tag color="blue">Blue Tag</Tag>
<Tag color="purple">Purple Tag</Tag>

<Tag size="sm">Small Tag</Tag>
<Tag size="md">Medium Tag</Tag>
<Tag size="lg">Large Tag</Tag>

<Tag onClose={() => console.log('Tag closed')}>Closable Tag</Tag>
<Tag icon={<Icon />}>Tag with Icon</Tag>
```