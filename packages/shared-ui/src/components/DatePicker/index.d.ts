import { default as React } from 'react';

export interface DateRange {
    startDate?: Date;
    endDate?: Date | null;
}
export interface DatePickerProps {
    initialDate?: Date;
    range?: boolean;
    dualMonthView?: boolean;
    inputField?: boolean;
    submitButton?: boolean;
    qickOptions?: boolean;
    value?: Date;
    onChange?: (event?: any) => void;
    onSubmit?: (event?: any) => void;
    onCancel?: (event?: any) => void;
}
declare const DatePicker: React.FC<DatePickerProps>;
export default DatePicker;
