'use client';

// Utils
import cn from 'classnames';
import { useState } from 'react';

// Components
import Link from 'next/link';
import Image from 'next/image';
import { Field } from '@/components/buyer/Field';
import { Switchbar, SwitchbarButton } from '@/components/buyer/Switchbar';

// Icons
import { ArrowRightIcon } from '@/assets/icons/ArrowRight';
import { SearchIcon } from '@/assets/icons/Search';
import { FilterIcon } from '@/assets/icons/Filter';

// Styles
import styles from './page.module.scss';

export default function Shops() {
  const [selectedSwitchbar, setSelectedSwitchbar] = useState('Конидетерские');

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <p className={styles['header__title']}>Добро пожаловать, OLEG!</p>

        <nav className={styles['header__nav']}>
          <ul className={styles['header__nav-list']}>
            <li>
              <Link href='/buyer' className={styles['header__nav-link']}>
                Товары
              </Link>
            </li>
            <li>
              <Link
                href='/buyer/shops'
                className={cn(styles['header__nav-link'], styles['active'])}
              >
                Магазины
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles['header__filters']}>
          <Field
            containerClassName={styles['header__filters-search']}
            leftIcon={<SearchIcon />}
            placeholder='Поиск'
          />

          <div className={styles['header__filters-button']}>
            <FilterIcon />
          </div>
        </div>
      </div>

      <Switchbar className={styles['switchbar']}>
        <SwitchbarButton
          count={10}
          onClick={() => setSelectedSwitchbar('Конидетерские')}
          active={selectedSwitchbar === 'Конидетерские'}
        >
          Конидетерские
        </SwitchbarButton>
        <SwitchbarButton
          count={6}
          onClick={() => setSelectedSwitchbar('Автозапчасти')}
          active={selectedSwitchbar === 'Автозапчасти'}
        >
          Автозапчасти
        </SwitchbarButton>
        <SwitchbarButton
          count={8}
          onClick={() => setSelectedSwitchbar('Инфоцыганство')}
          active={selectedSwitchbar === 'Инфоцыганство'}
        >
          Инфоцыганство
        </SwitchbarButton>
      </Switchbar>

      <div className={styles['products']}>
        <ul className={styles['products__list']}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item) => (
            <li key={item} className={styles['products__item']}>
              <div className={styles['product']}>
                <div className={styles['product__image']}>
                  <Image src={require('@/assets/images/test/cake.png')} alt='Nexus Market' />
                </div>

                <p className={styles['product__type']}>Кондитерская</p>

                <h2 className={styles['product__title']}>Название Магазина</h2>

                <p className={styles['product__description']}>Десерты - это вкусно!</p>

                <div className={styles['product__rates']}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='12'
                    height='11'
                    viewBox='0 0 12 11'
                    fill='none'
                  >
                    <path
                      d='M5.71468 0.878115C5.80449 0.601722 6.19551 0.601722 6.28532 0.878115L7.27973 3.9386C7.31989 4.06221 7.43508 4.1459 7.56505 4.1459H10.783C11.0737 4.1459 11.1945 4.51778 10.9594 4.6886L8.35596 6.58009C8.25082 6.65648 8.20682 6.79189 8.24698 6.9155L9.24139 9.97599C9.3312 10.2524 9.01486 10.4822 8.77974 10.3114L6.17634 8.41991C6.07119 8.34352 5.92881 8.34352 5.82366 8.41991L3.22026 10.3114C2.98514 10.4822 2.6688 10.2524 2.75861 9.97599L3.75302 6.9155C3.79318 6.79189 3.74918 6.65648 3.64404 6.58009L1.04063 4.6886C0.805517 4.51778 0.926349 4.1459 1.21697 4.1459H4.43495C4.56492 4.1459 4.68011 4.06221 4.72027 3.9386L5.71468 0.878115Z'
                      fill='currentColor'
                    />
                  </svg>

                  <span>4.9 (13)</span>
                </div>

                <Link href='/buyer/shops/shop_name' className={styles['product__cart-button']}>
                  <span>Подробнее</span>
                  <ArrowRightIcon />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
