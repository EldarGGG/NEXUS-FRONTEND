'use client';

// Components
import Image from 'next/image';
import { Counter } from './Counter';

// Icon
import { ArrowRightIcon } from '@/assets/icons/ArrowRight';

// Styles
import styles from './Card.module.scss';

// Types
import type { CardProps } from './types';
import { createRef } from 'react';
import { cartActions } from '@/store/slices/buyer/cart.slice';
import { useDispatch } from '@/hooks/useDispatch';
import { useState } from 'react';

export function Card({ product, onBuy }: CardProps) {
  const dispatch = useDispatch();
  const [productInBasket, setProductInBasket] = useState(false);

  // Вспомогательная функция для безопасного получения amount
  const getAmountValue = (amount: any): number => {
    if (typeof amount === 'object' && amount?.amount__sum !== undefined) {
      return amount.amount__sum;
    }
    return typeof amount === 'number' ? amount : 0;
  };

  const cardRef = createRef<HTMLDivElement>();

  const handleIncrement = (count: number) => {
    dispatch(cartActions.addToCart({ id: product.id, count: count + 1 }));
  };

  const handleDecrement = (count: number) => {
    count = count - 1;

    if (count === 0) {
      return dispatch(cartActions.removeFromCart({ id: product.id, count }));
    }

    return dispatch(cartActions.addToCart({ id: product.id, count }));
  };

  function buyOne() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('buyOne', JSON.stringify(product));
    }
    if (onBuy) {

      onBuy()
    }
  }

  return (
    <div ref={cardRef} className={styles['card']}>
      <div className={styles['card__main']}>
        <div className={styles['card__image']}>
          {/* <Image src={product.preview} alt='' loading='lazy' /> */}
          <img src={product.preview} alt='' className='myImg' loading='lazy'/>
        </div>

        <p className={styles['card__shop']}>Название магазина</p>
        <p className={styles['card__title']}>{product.name}</p>

        <div className={styles['card__info']}>
          <Counter
            max={getAmountValue(product.amount)}
            className={styles['card__counter']} product={product}  />

          <span className={styles['card__weight']}>
            <span>Вес: 0кг</span>
          </span>
        </div>
      </div>

      <div className={styles['card__footer']}>
        <p className={styles['card__price']}>{product.price || getAmountValue(product.amount)} ₸</p>
        <p className={styles['card__per-piece']}>Цена за 1шт. {product.price || getAmountValue(product.amount)} ₸</p>

        {/* <button onClick={buyOne} className={styles['card__button']}>
          <span>Купить</span>
          <ArrowRightIcon />
        </button> */}
      </div>
    </div>
  );
}
