import { default as React } from 'react';

export interface IMenuItemProps {
    trailElement?: any;
    label?: string;
    leadIcon?: React.ReactNode | null;
    disabled?: boolean;
}
declare const MenuItem: React.FC<IMenuItemProps>;
export default MenuItem;
