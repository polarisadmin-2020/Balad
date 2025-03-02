import { CustomAttribute } from '../../shared';
import { default as React, ReactNode } from 'react';

interface ListItemProps {
    type?: "ordered" | "expanded" | "selectable";
    children?: ReactNode;
    id?: string;
    customAttribute?: CustomAttribute;
}
declare const ListItem: React.FC<ListItemProps>;
export default ListItem;
