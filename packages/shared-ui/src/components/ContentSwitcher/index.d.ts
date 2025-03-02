import { default as React } from 'react';

interface ItemProps {
    label: React.ReactNode;
    content: React.ReactNode;
}
interface ContentSwitcherProps {
    items: ItemProps[];
    onColor: boolean;
    size: "sm" | "md" | "lg";
}
declare const ContentSwitcher: React.FC<ContentSwitcherProps>;
export default ContentSwitcher;
