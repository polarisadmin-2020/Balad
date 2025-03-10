import { CustomAttribute } from '../../shared';
import { default as React, ForwardedRef } from 'react';

export interface AvatarProps {
    type?: "initials" | "image" | "icon";
    size?: 120 | 80 | 68 | 48 | 40 | 32 | 24;
    square?: boolean;
    border?: boolean;
    text?: string;
    imgUrl?: string;
    icon?: React.ReactNode;
    customAttribute?: CustomAttribute;
    ref?: ForwardedRef<any>;
}
declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
