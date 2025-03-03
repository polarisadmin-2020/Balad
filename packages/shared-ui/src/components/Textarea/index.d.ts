import { CustomAttribute } from '../../shared';
import { default as React } from 'react';

export interface ITextareaProps {
    placeholder?: string;
    style?: "default" | "lighter" | "darker";
    error?: boolean;
    feedbackIcon?: boolean;
    feedbackIconType?: "success" | "error" | "warning";
    feedbackIconRing?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    scrollbar?: boolean;
    resize?: boolean;
    cols?: number;
    rows?: number;
    onChange?: (event?: any) => void;
    onInput?: (event?: any) => void;
    id?: string;
    name?: string;
    value?: string;
    customAttribute?: CustomAttribute;
}
declare const Textarea: React.FC<ITextareaProps>;
export default Textarea;
