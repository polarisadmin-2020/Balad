import { CustomAttribute } from '../../shared';
import { default as React } from 'react';

export interface IModalProps {
    title?: string;
    closeButton?: boolean;
    onClose?: (event: any) => void;
    featuredIconColor?: "brand" | "gray" | "error" | "warning" | "success" | "info";
    featuredIconStyle?: "light" | "outlined" | "hard";
    featuredIconType?: "infoCircle" | "error";
    featuredIconCircle?: boolean;
    featuredIconSize?: "xl" | "lg" | "md" | "sm";
    alignmentCenter?: boolean;
    actionStack?: boolean;
    actionFillContainer?: boolean;
    secondBtnPosition?: "left" | "right";
    position?: "start" | "end" | "center";
    children?: React.ReactNode;
    name: string;
    show?: boolean;
    staticModal?: boolean;
    buttonsList?: {
        id?: string;
        label: string;
        onClick: (event?: any) => void;
        extraClass?: string;
        title?: string;
        customAttribute?: CustomAttribute;
    }[];
}
export declare const Modal: React.FC<IModalProps>;
export default Modal;
