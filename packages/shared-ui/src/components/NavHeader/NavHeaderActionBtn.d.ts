import { default as React } from 'react';

export interface IHeaderActionBtnProps {
    label?: string;
    icon?: React.ReactNode;
    active?: boolean;
    onClick: () => void;
    extraClasses?: string;
}
declare const HeaderActionBtn: React.FC<IHeaderActionBtnProps>;
export default HeaderActionBtn;
