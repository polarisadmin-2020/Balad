export declare const getMonthDays: (date: Date) => Date[];
export declare const getDaysFromPreviousMonth: (date: Date) => Date[];
export declare const getDaysFromNextMonth: (date: Date) => Date[];
export declare const defaultStaticRanges: {
    label: string;
    range: () => {
        startDate: Date;
        endDate: Date;
    };
}[];
export declare function compareDatesWithoutTime(date1: Date, date2: Date): boolean;
export declare const validateInputDate: (date: string) => boolean;
