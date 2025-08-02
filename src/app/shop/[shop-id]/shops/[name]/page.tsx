'use client';

import { useState } from 'react';

import { FilterIcon } from '@/assets/icons/Filter';
import { ProductCard } from '@/components/buyer/ProductCard';
import { SearchField } from '@/components/shared/SearchField';
import { Switchbar, SwitchbarButton } from '@/components/buyer/Switchbar';
import CakeImage from '@/assets/images/test/cake.png';
import styles from './page.module.scss';

const products = [
  {
    id: 1,
    image: CakeImage,
    shopName: 'Кондитерская “ОГУРЕЦ”',
    title: 'Торт "ОГУРЕЦ"',
    description: 'Роскошь розового велюра',
    price: '500 000 ₸',
    methods: ['halyk', 'kaspi', 'money'],
    inStock: 5,
    rating: '4.5 (95)',
    count: 0,
  },
  {
    id: 2,
    image: CakeImage,
    shopName: 'Кондитерская “Hani”',
    title: 'Торт "Чизкейк"',
    description: 'Роскошь розового велюра',
    price: '500 000 ₸',
    methods: ['halyk', 'kaspi', 'money'],
    inStock: 5,
    rating: '4.5 (95)',
    count: 0,
  },
  {
    id: 3,
    image: CakeImage,
    shopName: 'Кондитерская “Hani”',
    title: 'Торт "Чизкейк"',
    description: 'Роскошь розового велюра',
    price: '500 000 ₸',
    methods: ['halyk', 'kaspi', 'money'],
    inStock: 5,
    rating: '4.5 (95)',
    count: 0,
  },
  {
    id: 4,
    image: CakeImage,
    shopName: 'Кондитерская “Hani”',
    title: 'Торт "Чизкейк"',
    description: 'Роскошь розового велюра',
    price: '500 000 ₸',
    methods: ['halyk', 'kaspi', 'money'],
    inStock: 5,
    rating: '4.5 (95)',
    count: 0,
  },
  {
    id: 5,
    image: CakeImage,
    shopName: 'Кондитерская “Hani”',
    title: 'Торт "Чизкейк"',
    description: 'Роскошь розового велюра',
    price: '500 000 ₸',
    methods: ['halyk', 'kaspi', 'money'],
    inStock: 5,
    rating: '4.5 (95)',
    count: 0,
  },
];

export default function Shop() {
  const [selectedSwitchbar, setSelectedSwitchbar] = useState('Все товары');

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['header__filters']}>
          <SearchField containerClassName={styles['header__filters-search']} />

          <div className={styles['header__filters-button']}>
            <FilterIcon />
          </div>
        </div>
      </div>

      <Switchbar className={styles['switchbar']}>
        <SwitchbarButton
          count={10}
          onClick={() => setSelectedSwitchbar('Чизкейки')}
          active={selectedSwitchbar === 'Чизкейки'}
        >
          Чизкейки
        </SwitchbarButton>
        <SwitchbarButton
          count={6}
          onClick={() => setSelectedSwitchbar('Торты')}
          active={selectedSwitchbar === 'Торты'}
        >
          Торты
        </SwitchbarButton>
        <SwitchbarButton
          count={8}
          onClick={() => setSelectedSwitchbar('Донаты')}
          active={selectedSwitchbar === 'Донаты'}
        >
          Донаты
        </SwitchbarButton>
        <SwitchbarButton
          count={12}
          onClick={() => setSelectedSwitchbar('Запчасти')}
          active={selectedSwitchbar === 'Запчасти'}
        >
          Запчасти
        </SwitchbarButton>
      </Switchbar>

      <div className={styles['products']}>
        <ul className={styles['products__list']}>
          {products.map((product, key) => (
            <li key={key} className={styles['products__item']}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
