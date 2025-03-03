import { ISocialMediaLinkProps } from './footer';

export interface ISocialMediaLinks {
    id?: string;
    links: ISocialMediaLinkProps[];
    isDark: boolean;
    title: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
    onClick?: () => void;
}
declare const SocialMediaLinks: React.FC<ISocialMediaLinks>;
export default SocialMediaLinks;
