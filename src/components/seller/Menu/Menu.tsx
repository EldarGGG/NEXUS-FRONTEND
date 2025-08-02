'use client';

import cn from 'classnames';

import { Select } from '@/components/ui/Select';
import { Field } from '@/components/buyer/Field';
import Link from 'next/link';
import styles from './Menu.module.scss';
import Image from 'next/image';

import HomeIcon from '@/assets/icons/sidebar/home.png';
import ChatIcon from '@/assets/icons/sidebar/chat.svg';
import ShopIcon from '@/assets/icons/sidebar/shop.svg';
import TasksIcon from '@/assets/icons/sidebar/tasks.svg';
import BuyerIcon from '@/assets/icons/sidebar/buyer.svg';
import SearchIcon from '@/assets/icons/field/search.svg';
import OrdersIcon from '@/assets/icons/sidebar/orders.svg';
import TelegramIcon from '@/assets/icons/sidebar/telegram.svg';
import ProductsIcon from '@/assets/icons/sidebar/products.svg';
import SettingsIcon from '@/assets/icons/sidebar/settings.svg';
import AnalyticsIcon from '@/assets/icons/sidebar/analytics.svg';
import CounterpartyIcon from '@/assets/icons/sidebar/counterparty.svg';
import { usePathname, useRouter } from 'next/navigation';

export function Menu() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSwitchSeller = () => {
    router.push('/buyer');
  };

  return (
    <div className={styles['menu']}>
      <div className={styles['menu-header']}>
        <Field
          containerClassName={styles['menu-header__search']}
          leftIcon={<SearchIcon />}
          placeholder='Поиск'
        />

        <Select
          defaultValue={{ ru: 'Русский' }}
          options={{
            ru: 'Русский',
            kz: 'Қазақша',
            en: 'English',
          }}
        />
      </div>

      <nav className={styles['menu-nav']}>
        <ul className={styles['menu-nav__list']}>
          <li className={styles['menu-nav__item']}>
            <Link
              href='#'
              className={cn(styles['menu-nav__link'], pathname === '/seller' && styles['active'])}
            >
              <div className={styles['menu-nav__link-icon']}>
                <Image src={HomeIcon} alt='' />
              </div>
              <span className={styles['menu-nav__link-title']}>Рабочий стол</span>
            </Link>
          </li>

          <li className={styles['menu-nav__item']}>
            <Link
              href={'/seller/orders'}
              className={cn(
                styles['menu-nav__link'],
                pathname.includes('/seller/orders') && styles['active'],
              )}
            >
              <div className={styles['menu-nav__link-icon']}>
                <OrdersIcon />
              </div>
              <span className={styles['menu-nav__link-title']}>Заказы</span>
            </Link>
          </li>

          <li className={styles['menu-nav__item']}>
            <Link
              href={'/seller/chats'}
              className={cn(
                styles['menu-nav__link'],
                pathname.includes('/seller/chats') && styles['active'],
              )}
            >
              <div className={styles['menu-nav__link-icon']}>
                <ChatIcon />
              </div>
              <span className={styles['menu-nav__link-title']}>Чаты</span>
            </Link>
          </li>

          <li className={styles['menu-nav__item']}>
            <Link
              href={'/seller/tasks'}
              className={cn(
                styles['menu-nav__link'],
                pathname.includes('/seller/tasks') && styles['active'],
              )}
            >
              <div className={styles['menu-nav__link-icon']}>
                <TasksIcon />
              </div>
              <span className={styles['menu-nav__link-title']}>Задачи</span>
            </Link>
          </li>

          <li className={styles['menu-nav__item']}>
            <Link
              href={'/seller/analytics'}
              className={cn(
                styles['menu-nav__link'],
                pathname.includes('/seller/analytics') && styles['active'],
              )}
            >
              <div className={styles['menu-nav__link-icon']}>
                <AnalyticsIcon />
              </div>
              <span className={styles['menu-nav__link-title']}>Аналитика</span>
            </Link>
          </li>

          <li className={styles['menu-nav__item']}>
            <Link
              href={'/seller/products'}
              className={cn(
                styles['menu-nav__link'],
                pathname.includes('/seller/products') && styles['active'],
              )}
            >
              <div className={styles['menu-nav__link-icon']}>
                <ProductsIcon />
              </div>
              <span className={styles['menu-nav__link-title']}>Товары</span>
            </Link>
          </li>

          <li className={styles['menu-nav__item']}>
            <Link
              href={'/seller/counterparty'}
              className={cn(
                styles['menu-nav__link'],
                pathname.includes('/seller/counterparty') && styles['active'],
              )}
            >
              <div className={styles['menu-nav__link-icon']}>
                <CounterpartyIcon />
              </div>
              <span className={styles['menu-nav__link-title']}>Контрагенты</span>
            </Link>
          </li>

          <li className={styles['menu-nav__item']}>
            <Link
              href={'/seller/store-parameters'}
              className={cn(
                styles['menu-nav__link'],
                pathname.includes('/seller/store-parameters') && styles['active'],
              )}
            >
              <div className={styles['menu-nav__link-icon']}>
                <ShopIcon />
              </div>
              <span className={styles['menu-nav__link-title']}>Параметры магазина</span>
            </Link>
          </li>

          <li className={styles['menu-nav__item']}>
            <Link
              href={'/seller/telegram-web'}
              className={cn(
                styles['menu-nav__link'],
                pathname.includes('/seller/telegram-web') && styles['active'],
              )}
            >
              <div className={styles['menu-nav__link-icon']}>
                <TelegramIcon />
              </div>
              <span className={styles['menu-nav__link-title']}>Telegram-web</span>
            </Link>
          </li>

          <li className={styles['menu-nav__item']}>
            <Link
              href={'/seller/settings'}
              className={cn(
                styles['menu-nav__link'],
                pathname.includes('/seller/settings') && styles['active'],
              )}
            >
              <div className={styles['menu-nav__link-icon']}>
                <SettingsIcon />
              </div>
              <span className={styles['menu-nav__link-title']}>Настройки</span>
            </Link>
          </li>
        </ul>

        <button onClick={handleSwitchSeller} className={styles['menu-nav__button']}>
          <BuyerIcon />
          <span>Покупатель</span>
        </button>
      </nav>

      <div className={styles['menu-banner']}>
        <div className={styles['banner']}></div>
      </div>
    </div>
  );
}
