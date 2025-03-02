import { default as React } from 'react';

export interface ILinkProps {
    style: "brand" | "neutral" | "on-color";
    size: "sm" | "md" | "lg";
    label: string;
    url: string;
    onClick?: () => void;
    inline?: boolean;
    icon?: boolean;
    iconType?: React.ReactNode;
    disabled?: boolean;
    external?: boolean;
    target?: "_blank" | "_self" | "_parent" | "_top";
    children?: React.ReactNode;
    id?: string;
    preventScrollReset?: boolean;
    state?: {};
    extraClass?: string;
}
declare const LinkComponent: React.FC<ILinkProps>;
export default LinkComponent;
