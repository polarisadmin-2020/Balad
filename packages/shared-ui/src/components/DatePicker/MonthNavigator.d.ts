import { default as React } from 'react';

export interface MonthNavigatorProps {
    currentMonth: Date;
    onChange: (newMonth: Date) => void;
    showArrows?: boolean;
}
declare const MonthNavigator: React.FC<MonthNavigatorProps>;
export default MonthNavigator;
