import { default as React } from 'react';

export interface SwitchProps {
    color?: string;
    label?: string;
    checked?: boolean;
    helperText?: string;
    alertMessage?: boolean;
    alertText?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    value?: boolean | any;
    onChange?: (event?: any) => void;
    onInput?: (event?: any) => void;
}
declare const Switch: React.FC<SwitchProps>;
export default Switch;
