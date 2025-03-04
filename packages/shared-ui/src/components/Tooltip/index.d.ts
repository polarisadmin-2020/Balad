import { default as React } from 'react';

type IconType = "success-check" | "blue-info" | "neutral-info" | "neutral-?" | "warning-!-circle" | "warning-!-triangle" | "error-!" | "error-x";
type BeakPlacement = "none" | "top" | "bottom" | "left" | "right";
type BeakAlignment = "start" | "center" | "end";
type Direction = "top" | "bottom" | "left" | "right";
type Theme = "light" | "dark";
export interface ITooltipProps {
    children?: React.ReactNode;
    beakPlacement?: BeakPlacement;
    beakAlignment?: BeakAlignment;
    direction?: Direction;
    title?: string;
    helperText?: string;
    icon?: boolean;
    iconType?: IconType;
    theme?: Theme;
}
declare const Tooltip: React.FC<ITooltipProps>;
export default Tooltip;
