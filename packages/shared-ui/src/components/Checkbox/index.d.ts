import { CustomAttribute } from '../../shared';
import { default as React } from 'react';

export interface CheckboxProps {
    color?: "brand" | "neutral";
    label?: string;
    helperText?: string;
    alertMessage?: boolean;
    alertText?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    value?: string;
    customAttribute?: CustomAttribute;
    showBorderOnFocusAndFocusOute?: boolean;
    onChange?: (event?: any) => void;
    onInput?: (event?: any) => void;
    checked?: boolean;
}
declare const Checkbox: React.FC<CheckboxProps>;
export default Checkbox;
