import { CustomAttribute } from '../../shared';
import { default as React, ReactNode } from 'react';

interface CardProps {
    type?: "default" | "expanded" | "selectable";
    showTitle?: boolean;
    showDescription?: boolean;
    showFeaturedIcon?: boolean;
    image?: string;
    disabled?: boolean;
    showRating?: boolean;
    customComponent?: ReactNode | undefined;
    id?: string;
    customAttribute?: CustomAttribute;
    title?: string;
    description?: string;
    featuredIcon?: ReactNode;
    primaryActionLabel?: string;
    secondaryActionLabel?: string;
    onCheckboxChange?: () => void;
    onPrimaryAction?: () => void;
    onSecondaryAction?: () => void;
    onExpandAction?: () => void;
}
declare const Card: React.FC<CardProps>;
export default Card;
