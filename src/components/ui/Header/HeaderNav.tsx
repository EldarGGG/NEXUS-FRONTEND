import styles from './Header.module.scss';

export function HeaderNav({ children }: { children?: React.ReactNode }) {
  return <nav className={styles['header-nav']}>{children}</nav>;
}
