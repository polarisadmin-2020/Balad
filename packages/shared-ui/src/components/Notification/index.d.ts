import { default as React } from 'react';

declare const icons: {
    critical: import("react/jsx-runtime").JSX.Element;
    warning: import("react/jsx-runtime").JSX.Element;
    success: import("react/jsx-runtime").JSX.Element;
    info: import("react/jsx-runtime").JSX.Element;
    neutral: import("react/jsx-runtime").JSX.Element;
};
type IconType = keyof typeof icons;
export interface INotificationProps {
    icon?: boolean;
    leadText: string;
    content: string;
    style: IconType;
    link?: boolean;
    dismissable?: boolean;
    setNavigateTo?: string;
    navigateTo?: (link?: string) => void;
    dismmissed?: () => void;
}
declare const Notification: React.FC<INotificationProps>;
export default Notification;
