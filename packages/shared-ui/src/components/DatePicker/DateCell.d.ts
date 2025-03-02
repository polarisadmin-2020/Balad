import { default as React } from 'react';

export interface DateCellProps {
    date: Date;
    isCurrentMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
    midRange?: boolean;
    onSelect: (date: Date) => void;
    isFirstRangeChild: boolean;
    isLastRangeChild: boolean;
}
declare const DateCell: React.FC<DateCellProps>;
export default DateCell;
