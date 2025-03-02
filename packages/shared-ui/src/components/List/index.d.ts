import { CustomAttribute } from '../../shared';
import { default as React, ReactNode } from 'react';

export interface ListProps {
    type?: "ordered" | "unordered" | "with-icon";
    style?: "brand" | "neutral" | "on-color";
    id?: string;
    customAttribute?: CustomAttribute;
    children?: ReactNode;
}
declare const List: React.FC<ListProps>;
export default List;
