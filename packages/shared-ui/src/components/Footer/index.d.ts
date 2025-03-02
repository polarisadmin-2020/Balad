import { default as React } from 'react';

export interface FooterType {
    background?: string;
    NavLinks?: boolean;
    mainTitle?: string;
    mainDescription?: string;
    mainLinkTilte?: string;
    mainLink?: string;
    mainImage?: string;
    groupLinks?: {
        title: string;
        links: {
            name: string;
            target: string;
        }[];
    }[];
    socialMediaTitle: string;
    socialMediaLinks: {
        title?: string;
        target: string;
        icon: React.ReactNode;
    }[];
    accessibilityTitle?: string;
    accessibilityLinks?: {
        title?: string;
        target: string;
        icon: React.ReactNode;
    }[];
    basicLinks?: {
        name: string;
        target: string;
    }[];
    extraLinks?: {
        name: string;
        target: string;
    }[];
    copyright?: string;
    bottomImages?: React.ReactNode[];
}
export interface FooterNavLinksType {
    links: {
        name: string;
        target: string;
    }[];
    background?: string;
}
declare const Footer: React.FC<FooterType>;
export default Footer;
