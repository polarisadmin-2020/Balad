import { default as React, ElementType } from 'react';

interface IStructuredListProps<T> {
    cells: {
        title: string;
        propertyName: string;
        type: "element" | "propertyName";
        El?: ElementType;
        elProperties?: string[];
        colSpan?: number;
        customAttribute?: {
            key: string;
            value: string;
        };
        sort?: "up" | "down" | "none";
        isSort?: boolean;
        isFilter?: boolean;
    }[];
    showSelectCheckBox?: boolean;
    getSelectedRows?: (event?: any) => void;
    rowDivider: boolean;
    alternate?: boolean;
    contained?: boolean;
    data: T;
}
declare const StructuredList: React.FC<IStructuredListProps<any[]>>;
export default StructuredList;
