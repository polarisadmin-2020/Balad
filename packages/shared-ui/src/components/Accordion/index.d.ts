import { default as React } from 'react';

export interface AccordionPropsTypes {
    title: string | React.ReactNode;
    content: string | React.ReactNode;
    size?: "lg" | "md" | "sm";
    iconAlignment?: "Leading" | "Trailing";
    flush?: boolean;
    disabled?: boolean;
    extraClass?: string;
}
declare const Accordion: React.FC<AccordionPropsTypes>;
export default Accordion;
