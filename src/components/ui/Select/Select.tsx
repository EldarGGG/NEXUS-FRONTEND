'use client';

import cn from 'classnames';
import { useState } from 'react';
import ChevronBottomIcon from '@/assets/icons/arrows/chevron-bottom.svg';
import styles from './Select.module.scss';

/**
 * TODO
 * Необходимо обернуть в forwardRef
 * Провести рефакторинг кода
 */

export function Select({ defaultValue, options, placeholder, onChange, className }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState(defaultValue);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: Option) => {
    setIsOpen(false);
    setSelected(option);
  };

  const _renderItems = (options: Option) => {
    if (!options) return;

    return Object.entries(options).map(([key, value], index) => (
      <li key={index} className={styles['select__item']}>
        <button
          type='button'
          className={styles['select__button']}
          onClick={(e) => {
            handleSelect({ [key]: value });
            onChange?.(e, value);
          }}
        >
          <span>{value}</span>
        </button>
      </li>
    ));
  };

  return (
    <div className={cn(styles['select'], isOpen && styles['isOpen'], className)}>
      <div onClick={handleToggle} className={styles['select__main-button']}>
        <span>{(selected && Object.values(selected)[0]) || placeholder || 'Выбрать'}</span>

        <ChevronBottomIcon />
      </div>

      <ul className={styles['select__list']}>{_renderItems(options)}</ul>
    </div>
  );
}
