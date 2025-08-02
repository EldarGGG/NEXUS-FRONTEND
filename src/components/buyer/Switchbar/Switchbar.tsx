import cn from 'classnames';
import styles from './Switchbar.module.scss';

export function Switchbar({ children, className }: SwitchbarProps) {
  return <div className={cn(styles['switchbar'], className)}>{children}</div>;
}
