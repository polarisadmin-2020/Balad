import { VariantProps } from 'class-variance-authority';
import { avatarVariants } from '../../components/Avatar/Avatar';

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  initials?: string;
  fallback?: React.ReactNode;
  background?: 'default' | 'colored';
}