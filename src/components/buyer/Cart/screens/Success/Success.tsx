'use client';

import { useEffect } from 'react';
import styles from './Success.module.scss';

export function SuccessScreen({ onClose }: SuccessProps) {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 2999);
  }, [onClose]);

  return (
    <div className={styles['success']}>
      <p className={styles['success__title']}>Заказ успешно создан!</p>

      <div className={styles['success__line']}></div>
    </div>
  );
}
