import { CustomAttribute } from '../../shared';
import { default as React } from 'react';

export interface RadioButtonProps {
    color?: "neutral" | "brand";
    label?: string;
    hasHelperText?: boolean;
    helperText?: string;
    alertMessage?: boolean;
    alertText?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    value?: string;
    customAttribute?: CustomAttribute;
    onChange?: (event?: any) => void;
    onInput?: (event?: any) => void;
}
declare const RadioButton: React.FC<RadioButtonProps>;
export default RadioButton;
