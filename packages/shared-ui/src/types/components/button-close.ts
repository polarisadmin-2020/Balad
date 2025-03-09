export interface ButtonCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
  state?: string;
  variant?: 'default' | 'onColor';
}