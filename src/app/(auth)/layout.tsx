import Link from 'next/link';
import styles from './layout.module.scss';
import { ThemeSwitch } from '@/components/shared/ThemeSwitch';
import { Select } from '@/components/ui/Select';
import Image from 'next/image';
import { Logo } from '@/assets/icons/Logo';

import AmoCRMImage from '@/assets/images/partners/amocrm.png';
import MoySkladImage from '@/assets/images/partners/moy-sklad.png';
import AutodeskImage from '@/assets/images/partners/autodesk.png';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles['layout']}>
      <header className={styles['header']}>
        <Link href='/' className={styles['header__logo']}>
          <Logo />
        </Link>

        <div className={styles['header__switches']}>
          <ThemeSwitch />

          <Select
            className={styles['header__lang-switch']}
            options={{ ru: 'Русский', en: 'English', kz: 'Қазақша' }}
            defaultValue={{ ru: 'Русский' }}
          />
        </div>
      </header>

      {children}

      <footer className={styles['footer']}>
        {/* Логотипы партнеров убраны по требованию пользователя */}
      </footer>
    </div>
  );
}
