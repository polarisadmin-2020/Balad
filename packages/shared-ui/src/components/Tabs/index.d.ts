import { default as React } from 'react';

export interface IIconMapping {
    [key: string]: JSX.Element;
}
export interface ITab {
    label: string;
    link?: string;
    tabIcon?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
export interface ITabsComponentProps {
    size: string;
    orientation: "horizontal" | "vertical";
    external: boolean;
    flush?: boolean;
    divider?: boolean;
    tabsList: ITab[];
    extraClass?: string;
}
export interface ITabComponentProps {
    label: string;
    link?: string;
    external?: boolean;
    size: string;
    tabIcon?: React.ReactNode;
    active: boolean;
    setActive: () => void;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
declare const TabsComponent: React.FC<ITabsComponentProps>;
export default TabsComponent;
