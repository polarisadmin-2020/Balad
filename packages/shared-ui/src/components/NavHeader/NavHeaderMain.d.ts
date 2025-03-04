import { default as React } from 'react';

interface INavHeaderMainProps {
    children: React.ReactNode;
    collapsed: boolean;
    toggleCollapsed: (collapsed: boolean) => void;
}
declare const NavHeaderMain: React.FC<INavHeaderMainProps>;
export default NavHeaderMain;
