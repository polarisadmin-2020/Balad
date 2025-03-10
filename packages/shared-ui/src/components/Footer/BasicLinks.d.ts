import { ILinkItem } from './footer';
import { default as React } from 'react';

declare const BasicLinks: React.FC<{
    links: ILinkItem[];
    isDark: boolean;
}>;
export default BasicLinks;
