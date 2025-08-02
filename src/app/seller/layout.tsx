'use client';

import cn from 'classnames';
import { store } from '@/store';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type PropsWithChildren } from 'react';

import { Menu } from '@/components/seller/Menu';
import { Field } from '@/components/buyer/Field';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeSwitch } from '@/components/shared/ThemeSwitch';
import Link from 'next/link';
import Image from 'next/image';
import UserIcon from '@/assets/icons/user.svg';
import LogoIcon from '@/assets/icons/sidebar/logo.svg';
import MenuIcon from '@/assets/icons/sidebar/menu.svg';
import HomeIcon from '@/assets/icons/sidebar/home.png';
import BurgerMenuIcon from '@/assets/icons/burger.svg';
import TasksIcon from '@/assets/icons/sidebar/tasks.svg';
import BuyerIcon from '@/assets/icons/sidebar/buyer.svg';
import SearchIcon from '@/assets/icons/field/search.svg';
import OrdersIcon from '@/assets/icons/sidebar/orders.svg';
import ProductsIcon from '@/assets/icons/sidebar/products.svg';
import SettingsIcon from '@/assets/icons/sidebar/settings.svg';
import NotificationIcon from '@/assets/icons/notification.svg';
import CounterpartyIcon from '@/assets/icons/sidebar/counterparty.svg';
import WarehouseIcon from '@/assets/icons/sidebar/warehouse.svg';
import ChevronDownIcon from '@/assets/icons/arrows/chevron-bottom.svg';
import styles from './layout.module.scss';

export default function SellerLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState<boolean>(false);
  const [isWarehouseExpanded, setIsWarehouseExpanded] = useState<boolean>(true);

  const handleSwitchSeller = () => {
    // Get user info from localStorage to get store_id
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        const storeId = user.store?.id;
        if (storeId) {
          // Redirect to user's own shop
          router.push(`/shop/${storeId}`);
        } else {
          // Fallback to general buyer page if no store
          router.push('/buyer');
        }
      } else {
        router.push('/buyer');
      }
    }
  };

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleToggleMenuCollapse = () => setIsMenuCollapsed((prev) => !prev);
  const handleToggleWarehouse = () => setIsWarehouseExpanded((prev) => !prev);

  return (
    <ReduxProvider store={store}>
      <div className={styles['layout']}>
        <aside className={cn(styles['side-menu'], isMenuCollapsed && styles['collapsed'])}>
          <div className={styles['side-menu__header']}>
            <button 
              className={styles['side-menu__button']}
              onClick={handleToggleMenuCollapse}
            >
              <MenuIcon />
            </button>

            {!isMenuCollapsed && (
              <div className={styles['side-menu__logo']}>
                <LogoIcon />
              </div>
            )}
          </div>

          <nav className={styles['side-menu__nav']}>
            <Link
              href={'/seller'}
              className={cn(
                styles['side-menu__nav-link'],
                pathname === '/seller' && styles['active'],
              )}
              title={isMenuCollapsed ? 'Рабочий стол' : ''}
            >
              <Image src={HomeIcon} alt='' />
              {!isMenuCollapsed && <span>Рабочий стол</span>}
            </Link>

            <Link
              href={'/seller/orders'}
              className={cn(
                styles['side-menu__nav-link'],
                pathname?.includes('/seller/orders') && styles['active'],
              )}
              title={isMenuCollapsed ? 'Заказы' : ''}
            >
              <OrdersIcon />
              {!isMenuCollapsed && <span>Заказы</span>}
            </Link>

            <Link
              href={'/seller/tasks'}
              className={cn(
                styles['side-menu__nav-link'],
                pathname?.includes('/seller/tasks') && styles['active'],
              )}
              title={isMenuCollapsed ? 'Задачи' : ''}
            >
              <TasksIcon />
              {!isMenuCollapsed && <span>Задачи</span>}
            </Link>

            {/* Warehouse section with expandable products */}
            <div className={styles['side-menu__section']}>
              <button
                onClick={handleToggleWarehouse}
                className={cn(
                  styles['side-menu__nav-link'],
                  styles['side-menu__nav-link--expandable'],
                  (pathname?.includes('/seller/warehouse') || pathname?.includes('/seller/products')) && styles['active'],
                )}
                title={isMenuCollapsed ? 'Склад' : ''}
              >
                <WarehouseIcon />
                {!isMenuCollapsed && (
                  <>
                    <span>Склад</span>
                    <ChevronDownIcon 
                      className={cn(
                        styles['side-menu__chevron'],
                        isWarehouseExpanded && styles['expanded']
                      )} 
                    />
                  </>
                )}
              </button>
              
              {!isMenuCollapsed && isWarehouseExpanded && (
                <div className={styles['side-menu__submenu']}>
                  <Link
                    href={'/seller/products'}
                    className={cn(
                      styles['side-menu__nav-link'],
                      styles['side-menu__nav-link--sub'],
                      pathname?.includes('/seller/products') && styles['active'],
                    )}
                  >
                    <ProductsIcon />
                    <span>Товары</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href={'/seller/counterparty'}
              className={cn(
                styles['side-menu__nav-link'],
                pathname?.includes('/seller/counterparty') && styles['active'],
              )}
              title={isMenuCollapsed ? 'Контрагенты' : ''}
            >
              <CounterpartyIcon />
              {!isMenuCollapsed && <span>Контрагенты</span>}
            </Link>

            <Link
              href={'/seller/settings'}
              className={cn(
                styles['side-menu__nav-link'],
                (pathname?.includes('/seller/settings') || pathname?.includes('/seller/store-parameters')) && styles['active'],
              )}
              title={isMenuCollapsed ? 'Настройки' : ''}
            >
              <SettingsIcon />
              {!isMenuCollapsed && <span>Настройки</span>}
            </Link>
          </nav>

          <div style={{ marginTop: '3rem' }} />

          <button onClick={handleSwitchSeller} className={styles['side-menu__change-role']} title={isMenuCollapsed ? 'Покупатель' : ''}>
            <BuyerIcon />
            {!isMenuCollapsed && <span>Покупатель</span>}
          </button>
        </aside>

        {/* Wrapper */}

        <div className={styles['wrapper']}>
          {/* Header  */}

          <header className={styles['header']}>
            <div className={styles['header__left']}>
              <button onClick={handleToggleMenu} className={styles['header__menu-button']}>
                <BurgerMenuIcon />
              </button>

              <ThemeSwitch className={cn(styles['header__theme-switch'], styles['mobile'])} />

              <Field
                containerClassName={styles['header__search']}
                leftIcon={<SearchIcon />}
                placeholder='Поиск'
              />
            </div>

            <Link href='/buyer' className={styles['header__logo']}>
              <LogoIcon />
            </Link>

            <div className={styles['header__right']}>
              <button className={styles['header__notification']}>
                <NotificationIcon />
              </button>

              <ThemeSwitch className={cn(styles['header__theme-switch'], styles['desktop'])} />

              <button className={styles['header__user-profile']}>
                <UserIcon />
              </button>
            </div>
          </header>

          {isMenuOpen && <Menu />}

          {children}
        </div>
      </div>
    </ReduxProvider>
  );
}
