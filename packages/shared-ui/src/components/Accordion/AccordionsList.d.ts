import { default as React } from 'react';

export interface AccordionData {
    title: string | React.ReactNode;
    content: string | React.ReactNode;
}
export interface AccordionsListProps {
    accordions: AccordionData[];
    size?: "lg" | "md" | "sm";
    iconAlignment?: "Leading" | "Trailing";
    flush?: boolean;
    extraClass?: string;
}
declare const AccordionsList: React.FC<AccordionsListProps>;
export default AccordionsList;
