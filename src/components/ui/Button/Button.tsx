import cn from 'classnames';
import styles from './Button.module.scss';
import type { ButtonProps } from './types';

export function Button({
  className,
  text,
  icon,
  beforeIcon,
  theme,
  loading,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={loading}
      className={cn(
        className,
        styles['button'],
        !!loading && styles['loading'],
        theme === 'outline-red' && styles['outline-red'],
        theme === 'outline-blue' && styles['outline-blue'],
        theme === 'green' && styles['green'],
        theme === 'gray' && styles['gray'],
        theme === 'red' && styles['red'],
      )}
      {...rest}
    >
      {!!beforeIcon && beforeIcon}
      <p className={styles['button__text']}>{text}</p>
      {!!icon && icon}
    </button>
  );
}
