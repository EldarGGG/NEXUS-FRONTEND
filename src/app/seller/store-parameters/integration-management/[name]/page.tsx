'use client';

// Utils
import { useState } from 'react';
import cn from 'classnames';

// Components
import Link from 'next/link';

// Styles
import styles from './page.module.scss';

export default function IntegrationName() {
  const [isShowSubcategory, setIsShowSubcategory] = useState(false);
  const [isShowProducts, setIsShowProducts] = useState(false);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <p className={styles['header__title']}>Мой Склад</p>

        <Link
          href={'/seller/store-parameters/integration-management'}
          className={styles['header__link']}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='9'
            viewBox='0 0 18 9'
            fill='none'
          >
            <path
              d='M17 5C17.2761 5 17.5 4.77614 17.5 4.5C17.5 4.22386 17.2761 4 17 4V5ZM0.646447 4.14645C0.451184 4.34171 0.451184 4.65829 0.646447 4.85355L3.82843 8.03553C4.02369 8.2308 4.34027 8.2308 4.53553 8.03553C4.7308 7.84027 4.7308 7.52369 4.53553 7.32843L1.70711 4.5L4.53553 1.67157C4.7308 1.47631 4.7308 1.15973 4.53553 0.964466C4.34027 0.769204 4.02369 0.769204 3.82843 0.964466L0.646447 4.14645ZM17 4H1V5H17V4Z'
              fill='#E5F3FF'
            />
          </svg>

          <span>Вернуться назад</span>
        </Link>
      </div>

      <div className={styles['main']}>
        <div className={styles['categories']}>
          {new Array(15).fill(1).map((_, key) => (
            <button
              key={key}
              onClick={() => setIsShowSubcategory((prev) => !prev)}
              className={cn(styles['category'])}
            >
              <p className={styles['category__title']}>Категория</p>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='7'
                height='11'
                viewBox='0 0 7 11'
                fill='none'
              >
                <path
                  d='M1 0.5L6 5.5L1 10.5'
                  stroke='#E5F3FF'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          ))}
        </div>

        {isShowSubcategory && (
          <div className={styles['subcategories']}>
            {new Array(4).fill(1).map((_, key) => (
              <div key={key} className={styles['subcategory']}>
                <p className={styles['subcategory__title']}>Подкатегория</p>

                <div className={styles['subcategory__sections']}>
                  {new Array(3).fill(2).map((_, key) => (
                    <button
                      key={key}
                      onClick={() => setIsShowProducts((prev) => !prev)}
                      className={cn(styles['subcategory__sections-section'])}
                    >
                      Раздел
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {isShowSubcategory && isShowProducts && (
          <div className={styles['products']}>
            {new Array(10).fill(2).map((_, key) => (
              <div key={key} className={styles['product']}>
                <p className={styles['product__title']}>Название товара</p>

                <div className={styles['product__total']}>
                  <p>90 шт.</p>

                  <div>
                    <span>80</span>
                    <span>10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
