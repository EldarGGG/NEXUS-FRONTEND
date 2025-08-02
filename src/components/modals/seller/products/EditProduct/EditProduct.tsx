'use client';

import { Select } from '@/components/ui/Select';
import { Field, FieldPhoto } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import styles from './EditProduct.module.scss';
import type { EditProductProps } from './types';
import { XIcon } from '@/assets/icons/X';
import { SuccessIcon } from '@/assets/icons/Success';

export function EditProductModal({ onClose }: EditProductProps) {
  return (
    <div className={styles['modal']}>
      <div onClick={onClose} className={styles['modal__space']}></div>

      <div className={styles['modal__main']}>
        <h1 className={styles['title']}>Редактировать</h1>

        <form className={styles['form']}>
          <FieldPhoto placeholder='Название товара' onSelectPhoto={() => {}} />

          <Select
            className={styles['form__select']}
            placeholder='Выберите категорию'
            options={{
              category1: 'Категория 1',
              category2: 'Категория 2',
            }}
          />

          <Field
            className={styles['form__field']}
            type='number'
            inputMode='numeric'
            placeholder='Укажатие стоимость'
          />

          <Select
            className={styles['form__select']}
            placeholder='Выберите статус'
            options={{
              status1: 'Статус 1',
              status2: 'Статус 2',
            }}
          />

          <div className={styles['form__footer']}>
            <Button
              theme='outline-red'
              beforeIcon={<XIcon />}
              text='Отмена'
              className={styles['form__button']}
            />
            <Button
              theme='green'
              beforeIcon={<SuccessIcon />}
              text='Сохранить'
              className={styles['form__button']}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
