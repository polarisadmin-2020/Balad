import { ReactNode } from 'react';

export interface IRoute {
    name: string;
    path: string;
    badge?: number;
    level?: number;
    icon?: ReactNode;
    disabled?: boolean;
    children?: Array<IRoute>;
}
declare const SidePanelRoutes: ({
    name: string;
    path: string;
    icon: import("react/jsx-runtime").JSX.Element;
    disabled: boolean;
    children: ({
        name: string;
        path: string;
        icon: import("react/jsx-runtime").JSX.Element;
        badge: number;
        children?: undefined;
    } | {
        name: string;
        path: string;
        icon: import("react/jsx-runtime").JSX.Element;
        badge: number;
        children: {
            name: string;
            path: string;
            icon: import("react/jsx-runtime").JSX.Element;
            badge: number;
            level: number;
        }[];
    })[];
} | {
    name: string;
    path: string;
    icon: import("react/jsx-runtime").JSX.Element;
    disabled: boolean;
    children: ({
        name: string;
        path: string;
        icon: import("react/jsx-runtime").JSX.Element;
        badge: number;
        children?: undefined;
    } | {
        name: string;
        path: string;
        children: {
            name: string;
            path: string;
            icon: import("react/jsx-runtime").JSX.Element;
            badge: number;
        }[];
        icon?: undefined;
        badge?: undefined;
    })[];
})[];
export default SidePanelRoutes;
