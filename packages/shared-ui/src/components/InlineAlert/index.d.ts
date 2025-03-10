import { CustomAttribute } from '../../shared';
import { default as React } from 'react';

type IconType = "neutral" | "info" | "error" | "success" | "warning";
export interface InlineAlertProps {
    type?: IconType;
    leadText: string;
    helperText?: string;
    isactionButtons?: boolean;
    isCloseButton?: boolean;
    onClose?: (event: any) => void;
    colored?: boolean;
    children?: React.ReactNode;
    buttonsList?: {
        id?: string;
        label: string;
        onClick: (event?: any) => void;
        exraClasses?: string;
        title?: string;
        customAttribute?: CustomAttribute;
    }[];
}
declare const InlineAlert: React.FC<InlineAlertProps>;
export default InlineAlert;
