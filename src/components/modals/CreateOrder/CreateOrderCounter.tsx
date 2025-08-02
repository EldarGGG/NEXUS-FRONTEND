'use client';

import { useState } from 'react';
import styles from './CreateOrder.module.scss';

export function CreateOrderCounter({}) {
  const [count, setCount] = useState(1);

  function handleIncrement() {
    const maxCount = 10;

    setCount((prev) => (prev === maxCount ? prev : prev + 1));
  }

  function handleDecrement() {
    setCount((prev) => (prev === 1 ? prev : prev - 1));
  }

  return (
    <div className={styles['table__body-counter']}>
      <button onClick={handleDecrement}>-</button>
      <p>{count}</p>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}
