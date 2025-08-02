import Link from 'next/link';
import cn from 'classnames';
import styles from './Header.module.scss';
import type { HeaderLinkProps } from './types';

export function HeaderLink({ children, className, active, ...rest }: HeaderLinkProps) {
  return (
    <Link
      className={cn(styles['header-nav__link'], active && styles['active'], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
