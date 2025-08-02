'use client';

// Utils
import cn from 'classnames';

// Components
import Link from 'next/link';
import { Select } from '@/components/ui/Select';

// Icons
import { LogoSymbolIcon } from '@/assets/icons/LogoSymbol';
import { SavedIcon } from '@/assets/icons/Saved';
import { OrdersIcon } from '@/assets/icons/Orders';
import { SettingsIcon } from '@/assets/icons/Settings';
import { InfoIcon } from '@/assets/icons/Info';
import { SellerIcon } from '@/assets/icons/Seller';

// Styles
import styles from './Menu.module.scss';
import { Field } from '../Field';
import { SearchIcon } from '@/assets/icons/Search';

interface MenuProps {
  isGeneralCatalog?: boolean;
}

export function Menu({ isGeneralCatalog = false }: MenuProps) {
  return (
    <div className={styles['menu']}>
      <div className={styles['menu-header']}>
        <Field
          containerClassName={styles['menu-header__search']}
          leftIcon={<SearchIcon />}
          placeholder='Поиск'
        />

        <Select
          defaultValue={{ ru: 'RU' }}
          options={{
            ru: 'RU',
            kz: 'KZ',
            en: 'EN',
          }}
        />
      </div>

      <nav className={styles['menu-nav']}>
        <ul className={styles['menu-nav__list']}>
          <li className={styles['menu-nav__item']}>
            <Link href='#' className={cn(styles['menu-nav__link'], styles['active'])}>
              <div className={styles['menu-nav__link-icon']}>
                <LogoSymbolIcon />
              </div>
              <span className={styles['menu-nav__link-title']}>Главная страница</span>
            </Link>
          </li>

          <li className={styles['menu-nav__item']}>
            <Link href='#' className={cn(styles['menu-nav__link'])}>
              <div className={styles['menu-nav__link-icon']}>
                <SavedIcon />
              </div>
              <span className={styles['menu-nav__link-title']}>Избранные</span>
            </Link>
          </li>

          <li className={styles['menu-nav__item']}>
            <Link href='#' className={cn(styles['menu-nav__link'])}>
              <div className={styles['menu-nav__link-icon']}>
                <OrdersIcon />
              </div>
              <span className={styles['menu-nav__link-title']}>Заказы</span>
            </Link>
          </li>

          <li className={styles['menu-nav__item']}>
            <Link href='#' className={cn(styles['menu-nav__link'])}>
              <div className={styles['menu-nav__link-icon']}>
                <SettingsIcon />
              </div>
              <span className={styles['menu-nav__link-title']}>Настройки</span>
            </Link>
          </li>

          <li className={styles['menu-nav__item']}>
            <Link href='#' className={cn(styles['menu-nav__link'])}>
              <div className={styles['menu-nav__link-icon']}>
                <InfoIcon />
              </div>
              <span className={styles['menu-nav__link-title']}>Информация</span>
            </Link>
          </li>
        </ul>

        {!isGeneralCatalog && (
          <button className={styles['menu-nav__button']}>
            <SellerIcon />
            <span>Продавец</span>
          </button>
        )}
      </nav>

      <div className={styles['menu-banner']}>
        <div className={styles['banner']}></div>
      </div>
    </div>
  );
}
