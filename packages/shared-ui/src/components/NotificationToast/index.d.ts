import { CustomAttribute } from '../../shared';
import { default as React } from 'react';

interface ButtonProps {
    id?: string;
    label: string;
    onClick: (event?: any) => void;
    extraClasses?: string;
    title?: string;
    customAttribute?: CustomAttribute;
}
interface NotificationToastProps {
    type?: "error" | "warning" | "success" | "info" | "neutral";
    leadText?: string;
    hasHelperText?: boolean;
    helperText?: string;
    action?: boolean;
    closeButton?: boolean;
    vPostion?: "top" | "bottom";
    hPostion?: "left" | "right";
    onClose?: (event: any) => void;
    buttonsList?: ButtonProps[];
}
declare const NotificationToast: React.FC<NotificationToastProps>;
export default NotificationToast;
