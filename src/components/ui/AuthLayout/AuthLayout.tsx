import cn from 'classnames';
import type { AuthLayoutProps } from './types';

import { Logo } from '@/assets/icons/Logo';
import { Select } from '../Select';
import { ThemeSwitch } from '@/components/shared/ThemeSwitch';
import Link from 'next/link';
import Image from 'next/image';
import styles from './AuthLayout.module.scss';

export function AuthLayout({ children, progress }: AuthLayoutProps) {
  return (
    <div className={styles['layout']}>
      <header className={styles['header']}>
        <Link href='/' className={styles['header__logo']}>
          <Logo />
        </Link>

        <div className={styles['header__switches']}>
          <ThemeSwitch />

          <Select options={{ ru: 'RU', en: 'EN', kz: 'KZ' }} defaultValue={{ ru: 'RU' }} />
        </div>
      </header>

      {children}

      <footer className={styles['footer']}>
        {progress && (
          <div
            className={cn(
              styles['progress'],
              progress === '0%' && styles['progress-0'],
              progress === '50%' && styles['progress-50'],
              progress === '100%' && styles['progress-100'],
            )}
          >
            <span>{progress}</span>
          </div>
        )}

        <div className={styles['partners']}>
          <div className={styles['partners__image']}>
            <Image src={require('@/assets/images/partners/amocrm.png')} alt='' />
          </div>

          <div className={styles['partners__image']}>
            <Image src={require('@/assets/images/partners/moy-sklad.png')} alt='' />
          </div>

          <div className={styles['partners__image']}>
            <Image src={require('@/assets/images/partners/planfact.png')} alt='' />
          </div>
        </div>
      </footer>
    </div>
  );
}
