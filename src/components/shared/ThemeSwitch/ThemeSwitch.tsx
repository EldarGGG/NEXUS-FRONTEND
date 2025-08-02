'use client';

// Utils
import { useId } from 'react';
import cn from 'classnames';

// Styles
import styles from './ThemeSwitch.module.scss';

// Icons
import { DarkIcon } from './icons/Dark';
import { LightIcon } from './icons/Light';

// Types
import type { ThemeSwitchProps } from './types';

export function ThemeSwitch({ className, ...rest }: ThemeSwitchProps) {
  const id = useId();

  return (
    <div {...rest} className={cn(styles['theme-switch'], className)}>
      <label htmlFor={`theme-${id}`} className={styles['theme-switch__label']}>
        <input type='checkbox' id={`theme-${id}`} hidden defaultChecked />

        <div className={styles['theme-switch__circle']}></div>

        <div className={styles['theme-switch__light']}>
          <LightIcon />
        </div>

        <div className={styles['theme-switch__dark']}>
          <DarkIcon />
        </div>
      </label>
    </div>
  );
}
