interface Option {
  [key: string]: string;
}

interface SelectProps {
  defaultValue?: Option;
  options: Option;
  placeholder?: string;
  onChange?: (event: React.MouseEvent<HTMLButtonElement>, value: string) => void;
  className?: string;
}
