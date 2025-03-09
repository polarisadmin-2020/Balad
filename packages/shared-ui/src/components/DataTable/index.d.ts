import { IDataTableCell } from './types';
import { default as React } from 'react';

export interface IDataTableProps<T> {
    cells: IDataTableCell[];
    showSelectCheckBox?: boolean;
    getSelectedRows?: (event?: any) => void;
    pressOnFilter?: (propertyName?: any) => void;
    rowDivider: boolean;
    alternate?: boolean;
    contained?: boolean;
    data: T;
}
declare const DataTable: React.FC<IDataTableProps<any[]>>;
export default DataTable;
