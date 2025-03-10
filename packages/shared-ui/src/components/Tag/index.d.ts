import { CustomAttribute } from '../../shared';
import { default as React } from 'react';

export interface TagProps {
    label?: string;
    color: "gray" | "success" | "destruct" | "warning" | "info" | "purple" | "pink" | "orange" | "on-color";
    size: "lg" | "md" | "sm";
    iconOnly?: boolean;
    iconType?: React.ReactNode;
    leadIcon?: boolean;
    leadIconType?: React.ReactNode;
    trailIcon?: boolean;
    trailIconType?: React.ReactNode;
    rounded?: boolean;
    outlined?: boolean;
    id?: string;
    children?: React.ReactNode;
    customAttribute?: CustomAttribute;
}
declare const Tag: React.FC<TagProps>;
export default Tag;
