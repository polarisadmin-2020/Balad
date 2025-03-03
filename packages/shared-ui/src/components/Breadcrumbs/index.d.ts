import { default as React } from 'react';

export interface IBreadcrumbsItem {
    label: string;
    path: string;
    disabled?: boolean;
    [type: string]: any;
}
export interface IEllipsisItem {
    ellipsis: true;
}
export interface IBreadcrumbsProps {
    items: IBreadcrumbsItem[];
    navigateTo?: (link?: string, linkData?: IBreadcrumbsItem | IEllipsisItem) => void;
}
declare const Breadcrumbs: React.FC<IBreadcrumbsProps>;
export default Breadcrumbs;
