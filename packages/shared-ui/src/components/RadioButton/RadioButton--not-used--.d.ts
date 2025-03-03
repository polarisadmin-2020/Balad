import { default as React } from 'react';

export interface RadioButtonComponentProps {
    Color?: "brand";
    Label?: string;
    HasHelperText?: boolean;
    HelperText?: string;
    AlertMessage?: boolean;
    AlertText?: string;
    disabled?: boolean;
}
declare const RadioButtonComponent: React.FC<RadioButtonComponentProps>;
export default RadioButtonComponent;
