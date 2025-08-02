export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
  icon?: React.ReactNode;
  beforeIcon?: React.ReactNode;
  loading?: boolean;
  theme?: 'blue' | 'green' | 'gray' | 'outline-red' | 'outline-blue' | 'red';
}
