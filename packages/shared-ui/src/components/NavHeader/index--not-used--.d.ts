import { default as React } from 'react';

interface NavHeaderProps {
    fullWidth?: Boolean;
    logo?: Boolean;
    menuItems?: Boolean;
    actions?: Boolean;
    govIdentifier?: Boolean;
    divider?: Boolean;
    collapsed: boolean;
    toggleCollapsed: (collapsed: boolean) => void;
}
declare const NavHeader: React.FC<NavHeaderProps>;
export default NavHeader;
