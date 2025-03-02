import { default as React } from 'react';

export interface INavHeaderProps {
    children?: React.ReactNode;
    fullWidth?: boolean;
    divider?: boolean;
}
export interface ISubMenuProps {
    active: boolean;
    fullWidth: boolean;
    background?: string;
    subMenuLinks?: ISubMenuData[];
}
export interface ISubMenuLinkProps {
    background?: string;
    link?: string;
    linkStyle: number | undefined;
    label?: string;
    helperText?: string;
    icon?: React.ReactNode;
}
export interface ISubMenuData {
    label: string;
    helperText?: string;
    link?: string;
    linkStyle?: number | undefined;
    icon?: React.ReactNode;
}
export interface IHeaderLinkProps {
    data: IMenuData;
    active?: boolean;
    setActive?: () => void;
    background?: string;
}
export interface IMenuData {
    label: string;
    link?: string;
    icon?: React.ReactNode;
    subMenu?: ISubMenuData[];
}
export interface IActions {
    label: string;
    link?: string;
    icon?: React.ReactNode;
}
export declare const data: {
    label: string;
    icon: import("react/jsx-runtime").JSX.Element;
    link: string;
    subMenu: {
        label: string;
        helperText: string;
        link: string;
        linkStyle: number;
        icon: import("react/jsx-runtime").JSX.Element;
    }[];
};
