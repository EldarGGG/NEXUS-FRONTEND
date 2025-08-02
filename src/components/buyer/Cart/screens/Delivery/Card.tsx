// Icons
import { TruckIcon } from '@/assets/icons/Truck';
import { MoreIcon } from '@/assets/icons/More';

// Styles
import styles from './Card.module.scss';

// Types
import type { CardProps } from './types';
import { useEffect, useId, useState } from 'react';

export function Card({ byCourier = false, title, id, dotId }: CardProps) {
  const [active, setActive]= useState(false)
  useEffect(() => {
    if (dotId == id) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [dotId])

  return (
    <label htmlFor={id} className={styles['card']} onClick={() => console.log(dotId, id)}>
      <div className={styles['card__checkbox']}>
        <input type='radio' name='point' id={id} checked={active}   />
      </div>

      <p className={styles['card__title']}>{title}</p>

      {!byCourier && (
        <>
          <p className={styles['card__subtitle']}>
            100004 Карагандинская область, г. Караганда, ул. Орлова, д. 105/2
          </p>

          <div className={styles['card__address']}>
            <TruckIcon />

            <span>Доставка с четверга, 19 октября, бесплатно</span>
          </div>

          <button className={styles['card__more-button']}>
            <MoreIcon />
          </button>
        </>
      )}
    </label>
  );
}
