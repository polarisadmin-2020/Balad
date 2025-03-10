import { default as React } from 'react';

export interface StepIconProps {
    currentStep?: number;
    labelStyle?: "dot" | "circle";
    labelState?: "current" | "completed" | "upcomming";
}
declare const StepLabel: React.FC<StepIconProps>;
export default StepLabel;
