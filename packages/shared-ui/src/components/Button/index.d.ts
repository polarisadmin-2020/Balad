import { CustomAttribute } from '../../shared';
import { default as React, ForwardedRef } from 'react';

export interface ButtonProps {
    style: "primary-neutral" | "primary-brand" | "secondary" | "secondary-outline" | "subtle" | "transparent" | "des-primary" | "des-secondary" | "des-secondary-outline" | "des-subtle" | "des-transparent";
    size: "lg" | "md" | "sm";
    label?: string;
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    iconOnly?: boolean;
    iconType?: React.ReactNode;
    leadIcon?: boolean;
    leadIconType?: React.ReactNode;
    trailIcon?: boolean;
    trailIconType?: React.ReactNode;
    disabled?: boolean;
    id?: string;
    children?: React.ReactNode;
    customAttribute?: CustomAttribute;
    type?: "button" | "submit" | "reset";
    ref?: ForwardedRef<any>;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
