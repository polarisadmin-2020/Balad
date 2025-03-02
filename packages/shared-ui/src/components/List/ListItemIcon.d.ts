import { CustomAttribute } from '../../shared';
import { default as React } from 'react';

interface ListItemIconProps {
    children?: React.ReactNode;
    id?: string;
    customAttribute?: CustomAttribute;
}
declare const ListItemIcon: React.FC<ListItemIconProps>;
export default ListItemIcon;
