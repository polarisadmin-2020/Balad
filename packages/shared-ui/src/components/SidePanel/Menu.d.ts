import { IRoute } from './Routes';
import { default as React } from 'react';

export interface MenuProps {
    routes: IRoute[];
}
export interface TabComponentProps {
    route: IRoute;
}
export interface SubmenuComponentProps {
    route: IRoute;
    childRoute: IRoute;
    onChildExpanded?: (expanded: boolean, subHeight: number) => void;
}
declare const SidePanelMenu: React.FC<MenuProps>;
export declare const TabComponent: React.FC<TabComponentProps>;
export default SidePanelMenu;
