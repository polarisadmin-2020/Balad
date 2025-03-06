import { ElementType } from 'react';

export interface IDataTableCell {
    title: string;
    isSort: boolean;
    isFilter: boolean;
    sort?: "up" | "down";
    propertyName: string;
    type: "element" | "propertyName";
    El?: ElementType;
    elProperties?: string[];
    colSpan?: number;
    customAttribute?: {
        key: string;
        value: string;
    };
}
