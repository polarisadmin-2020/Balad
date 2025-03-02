import { default as React } from 'react';

export interface Option {
    label: string;
    value: string;
}
export interface SuffixProps {
    type: string;
    style: string;
    options?: Option[];
    onSelect?: (optionValue: string) => void;
    label: string;
    icon?: React.ReactNode;
}
declare const Suffix: React.FC<SuffixProps>;
export default Suffix;
