interface SwitchbarProps {
  className?: string;
  children?: React.ReactNode;
}

interface SwitchbarButtonProps {
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
  count?: number;
  onClick?: () => void;
}
