// Common types used across components
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// Re-export component-specific types
export * from './components';