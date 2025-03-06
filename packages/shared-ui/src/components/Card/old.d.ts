import { CustomAttribute } from '../../shared';
import { default as React, ReactNode } from 'react';

interface CardProps {
    type?: "default" | "expanded" | "selectable";
    showtitle?: boolean;
    showDescription?: boolean;
    showFeaturedIcon?: boolean;
    image?: string;
    disabled?: boolean;
    showRating?: boolean;
    customComponent?: ReactNode | undefined;
    id?: string;
    customAttribute?: CustomAttribute;
}
declare const Card: React.FC<CardProps>;
export default Card;
