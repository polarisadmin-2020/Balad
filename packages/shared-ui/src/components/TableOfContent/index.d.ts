import { default as React } from 'react';

interface TabType {
    Name: string;
    Target: string;
    Children?: TabType[];
}
export declare const Sections: TabType[];
declare const TableOfContent: React.FC<{
    sections?: TabType[];
    subTitle: string;
    title: string;
}>;
export default TableOfContent;
