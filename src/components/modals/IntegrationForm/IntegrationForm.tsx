'use client';

// Styles
import styles from './IntegrationForm.module.scss';

// Components
import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';

// Icon Components
import { ArrowRightIcon } from '@/assets/icons/ArrowRight';

// Types
import type { IntegrationFormProps } from './types';

export function IntegrationForm({ title, onClose, onSubmit }: IntegrationFormProps) {
  return (
    <div className={styles['modal']}>
      <div onClick={onClose} className={styles['modal__space']}></div>

      <div className={styles['modal__main']}>
        <div className={styles['main']}>
          <h1 className={styles['main__title']}>{title}</h1>

          <div className={styles['main__form']}>
            <Field placeholder='Введите логин' />
            <Field placeholder='Введите пароль' />
          </div>

          <Button onClick={onSubmit} text='Подключиться' icon={<ArrowRightIcon />} />
        </div>
      </div>
    </div>
  );
}
