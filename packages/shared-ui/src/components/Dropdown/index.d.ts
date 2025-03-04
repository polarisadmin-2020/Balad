import { default as React } from 'react';

export interface DropdownProps {
    id?: string;
    placeholder?: string;
    size?: "sm" | "md" | "lg";
    style?: "default" | "lighter" | "darker";
    error?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    multiSelect?: boolean;
    options: any[];
    optionLabel?: string;
    trackBy?: string;
    getSelectedOptions?: (event: any) => void;
    extraClass?: string;
}
declare const Dropdown: React.FC<DropdownProps>;
export default Dropdown;
