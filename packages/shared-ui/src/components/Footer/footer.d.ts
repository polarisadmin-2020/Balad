import { default as React } from 'react';

export interface IFooterProps {
    background?: "DarkGreen" | "Light";
    navLinkGroups?: INavLinkGroupProps[];
    socialMediaLinks?: ISocialMediaLinkProps[];
    basicLinks?: ILinkItem[];
    copyrightText: string;
}
export interface INavLinkGroupProps {
    title: string;
    links: ILinkItem[];
}
export interface ISocialMediaLinkProps {
    href: string;
    icon: React.ReactNode;
}
export interface ILinkItem {
    name: string;
    target: string;
}
declare const Footer: React.FC<IFooterProps>;
export default Footer;
