import styles from './Header.module.scss';

export function HeaderTitle({ children }: { children?: React.ReactNode }) {
  return <p className={styles['header__title']}>{children}</p>;
}
