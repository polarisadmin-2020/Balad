import { CustomAttribute } from '../../shared';
import { default as React } from 'react';

interface IRatingProps {
    size?: "small" | "medium" | "large";
    value?: number;
    onChange?: (value: number) => void;
    id?: string;
    readOnly?: boolean;
    max?: number;
    customAttribute?: CustomAttribute;
}
declare const Rating: React.FC<IRatingProps>;
export default Rating;
