import { default as React } from 'react';

interface ContentSwitcherItemProps {
    itemType: "first" | "mid" | "last";
    onColor: boolean;
    size: "sm" | "md" | "lg";
    label: React.ReactNode;
    selected: boolean;
    onClick: () => void;
}
declare const ContentSwitcherItem: React.FC<ContentSwitcherItemProps>;
export default ContentSwitcherItem;
