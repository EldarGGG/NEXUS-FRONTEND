'use client';

import { useState } from 'react';
import cn from 'classnames';
import styles from './StatusSelect.module.scss';

export function StatusSelect() {
  const [selected, setSelected] = useState({ color: '#FFCD6A', title: 'В работе' });
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { color: '#CBD3DD', title: 'Новый' },
    { color: '#FFCD6A', title: 'В работе' },
    { color: '#D8A1FA', title: 'Предзаказ' },
    { color: '#319DFF', title: 'Собран' },
    { color: '#95F7D9', title: 'Доставлен' },
    { color: '#2BEFB3', title: 'Оплачен' },
    { color: '#0DA678', title: 'Реализован' },
    { color: '#FF97B4', title: 'Возврат' },
    { color: '#FF316A', title: 'Отменен' },
  ];

  return (
    <div className={cn(styles['status-select'], isOpen && styles['open'])}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles['status-select__selected']}
      >
        <div style={{ background: selected.color }} />

        <span style={{ color: selected.color }}>{selected.title}</span>

        <svg
          className={cn(isOpen && styles['open'])}
          xmlns='http://www.w3.org/2000/svg'
          width='12'
          height='11'
          viewBox='0 0 12 11'
          fill='none'
        >
          <path
            d='M1 2.5L6 7.5L11 2.5'
            stroke='#CBD3DD'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      {isOpen && <div className={styles['status-select__divider']} />}

      <div className={cn(styles['status-select__options'], isOpen && styles['open'])}>
        {options.map((option, key) =>
          option.title === 'Оплачен' ? (
            <div key={key} className={styles['divider']}>
              &#8203;
            </div>
          ) : (
            <button
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              key={key}
              className={styles['status-select__option']}
            >
              <div style={{ background: option.color }} />

              <span style={{ color: option.color }}>{option.title}</span>
            </button>
          ),
        )}
      </div>
    </div>
  );
}
