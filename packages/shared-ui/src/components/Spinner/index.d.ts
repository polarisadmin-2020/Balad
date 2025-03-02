import { default as React } from 'react';

export interface ISpinnerProps {
    size: "tiny" | "xs" | "sm" | "md" | "lg" | "xl" | "huge";
    style: "neutral" | "brand" | "on-color";
    extraClass?: string;
}
declare const Spinner: React.FC<ISpinnerProps>;
export default Spinner;
