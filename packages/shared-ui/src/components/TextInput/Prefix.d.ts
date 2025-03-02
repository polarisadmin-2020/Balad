import { default as React } from 'react';

export interface Option {
    label: string;
    value: string;
}
export interface PrefixProps {
    type: string;
    style: string;
    options?: Option[];
    onSelect?: (optionValue: string) => void;
    label: string;
    icon?: React.ReactNode;
}
declare const Prefix: React.FC<PrefixProps>;
export default Prefix;
