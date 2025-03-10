import { default as React } from 'react';

interface IRatingStarProps {
    id?: string;
    children?: React.ReactNode;
    rating?: number;
    value?: number;
    hover?: number;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
declare const RatingStar: React.FC<IRatingStarProps>;
export default RatingStar;
