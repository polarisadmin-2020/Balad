import { default as React } from 'react';

interface IHeaderLinkProps {
    label: string;
    icon?: React.ReactNode;
    active?: boolean;
    onClick: () => void;
    subMenuBackground?: "Brand" | string;
    subMenuFullWidth?: boolean;
    children?: React.ReactNode;
}
declare const HeaderLink: React.FC<IHeaderLinkProps>;
export default HeaderLink;
