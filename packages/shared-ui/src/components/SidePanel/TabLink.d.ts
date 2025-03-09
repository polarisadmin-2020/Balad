import { default as React } from 'react';

export interface ITabLinkProps {
    type: "parent" | "child";
    onColor?: boolean;
    level?: number;
    expanded?: boolean;
    badge?: number;
    icon: React.ReactNode;
    externalLink?: boolean;
    text: string;
    link: string;
    onExpand?: (value: boolean) => void;
    disabled?: boolean;
}
declare const TabLink: React.FC<ITabLinkProps>;
export default TabLink;
