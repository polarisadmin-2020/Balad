import { CustomAttribute } from '../../shared';
import { default as React } from 'react';

export interface Props {
    placeholder?: string;
    size?: "sm" | "md" | "lg";
    type?: "text" | "number" | "password";
    style?: "default" | "lighter" | "darker";
    error?: boolean;
    feedbackIcon?: boolean;
    feedbackIconType?: "success" | "error" | "warning";
    feedbackIconRing?: boolean;
    prefix?: boolean;
    suffix?: boolean;
    icon?: React.ReactNode;
    disabled?: boolean;
    readonly?: boolean;
    children?: React.ReactNode;
    id?: string;
    name?: string;
    value?: string;
    customAttribute?: CustomAttribute;
    onChange?: (event?: any) => void;
    onInput?: (event?: any) => void;
    onBlur?: (event?: any) => void;
}
declare const TextInput: React.FC<Props>;
export default TextInput;
