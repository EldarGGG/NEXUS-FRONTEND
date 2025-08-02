import cn from 'classnames';
import styles from './Switchbar.module.scss';

export function SwitchbarButton({
  onClick,
  active,
  className,
  children,
  count = 1,
}: SwitchbarButtonProps) {
  return (
    <button
      data-value={count}
      onClick={onClick}
      className={cn(styles['switchbar-button'], active && styles['active'], className)}
    >
      {children}
    </button>
  );
}
