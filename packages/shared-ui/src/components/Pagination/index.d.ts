import { CustomAttribute } from '../../shared';
import { default as React, ForwardedRef } from 'react';

interface PaginationProps {
    size?: "small" | "medium" | "large";
    id?: string;
    customAttribute?: CustomAttribute;
    ref?: ForwardedRef<any>;
    totalPageCount: number;
    siblingCount?: number;
    onChange?: (value: number) => void;
}
declare const Pagination: React.FC<PaginationProps>;
export default Pagination;
