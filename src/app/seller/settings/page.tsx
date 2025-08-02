'use client';

import { useState } from 'react';

import { Field } from '@/components/ui/Field';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { EditIcon } from '@/assets/icons/Edit';
import { XIcon } from '@/assets/icons/X';
import { SuccessIcon } from '@/assets/icons/Success';
import styles from './page.module.scss';

export default function Settings() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className={styles['main']}>
      <div className={styles['settings']}>
        <div className={styles['settings-header']}>
          <p className={styles['settings-header__title']}>Общие настройки</p>
        </div>

        <div className={styles['settings-main']}>
          <div className={styles['settings-main__field']}>
            <p>Имя</p>

            <Field defaultValue={'Андрей'} />
          </div>

          <div className={styles['settings-main__field']}>
            <p>Фамилия</p>

            <Field defaultValue={'Курпатов'} />
          </div>

          <div className={styles['settings-main__field']}>
            <p>Номер телефона</p>

            <Field defaultValue={'+7 (747) 103-10-10'} />
          </div>

          <div className={styles['settings-main__field']}>
            <p>Электронная почта</p>

            <Field defaultValue={'nexusmarket@gmail.com'} />
          </div>

          <div className={styles['settings-main__select']}>
            <p>Страна</p>

            <Select
              className={styles['settings-main__select-select']}
              options={{ Kazakhstan: 'Казахстан' }}
              // onSelect={() => {}}
            />
          </div>

          <div className={styles['settings-main__field']}>
            <p>Город</p>

            <Select
              className={styles['settings-main__select-select']}
              options={{ Karaganda: 'Караганда' }}
              // onSelect={() => {}}
            />
          </div>

          <div className={styles['settings-main__field']}>
            <p>Тип контрагента</p>

            <Select
              className={styles['settings-main__select-select']}
              options={{ 'Юридическое лицо': 'Юридическое лицо' }}
              // onSelect={() => {}}
            />
          </div>

          <div className={styles['settings-main__select']}>
            <p>Категория</p>

            <Select
              className={styles['settings-main__select-select']}
              options={{ 'Оптовая торговля': 'Оптовая торговля' }}
              // onSelect={() => {}}
            />
          </div>
        </div>

        <div className={styles['settings-footer']}>
          {!isEdit && (
            <Button
              text='Редактировать'
              onClick={() => setIsEdit(true)}
              beforeIcon={<EditIcon />}
            />
          )}
          {isEdit && (
            <>
              <Button
                text='Отмена'
                onClick={() => setIsEdit(false)}
                theme='outline-red'
                beforeIcon={<XIcon />}
              />
              <Button
                text='Принять'
                onClick={() => setIsEdit(false)}
                theme='green'
                beforeIcon={<SuccessIcon />}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
