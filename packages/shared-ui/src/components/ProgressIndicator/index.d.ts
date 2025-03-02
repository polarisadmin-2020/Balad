import { default as React } from 'react';

export interface IProgressIndicatorProps {
    activeStep?: number;
    alignment?: "horizontal" | "vertical";
    children?: React.ReactNode;
}
declare const ProgressIndicator: React.FC<IProgressIndicatorProps>;
export default ProgressIndicator;
