import { default as React } from 'react';

interface ISubMenuProps {
    active?: boolean;
    subMenuFullWidth?: boolean;
    background?: string;
    children: React.ReactNode;
}
declare const NavHeaderSubMenu: React.FC<ISubMenuProps>;
export default NavHeaderSubMenu;
