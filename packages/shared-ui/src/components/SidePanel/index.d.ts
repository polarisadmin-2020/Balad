import { IRoute } from './Routes';
import { default as React } from 'react';

export interface SidePanelProps {
    background?: string;
    border?: boolean;
    overlay?: boolean;
    collapsed?: boolean;
    routes: IRoute[];
}
declare const SidePanel: React.FC<SidePanelProps>;
export default SidePanel;
