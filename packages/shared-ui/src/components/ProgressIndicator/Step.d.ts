import { default as React } from 'react';

export interface StepProps {
    index?: number;
    title?: string;
    description?: string;
    activeStep?: number;
    nextStep?: boolean;
    showStepName?: boolean;
    showStepDescription?: boolean;
}
declare const Step: React.FC<StepProps>;
export default Step;
