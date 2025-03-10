export declare const DOTS = "...";
export declare const usePagination: ({ totalPageCount, siblingCount, currentPage, }: {
    totalPageCount: number;
    siblingCount: number;
    currentPage: number;
}) => (string | number)[] | undefined;
