'use client';

import { Field } from '@/components/ui/Field';
import styles from './page.module.scss';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { EditIcon } from '@/assets/icons/Edit';
import { ArrowRightIcon } from '@/assets/icons/ArrowRight';

export default function Technical() {
  return (
    <div className={styles['main']}>
      <div className={styles['technical']}>
        <div className={styles['technical-header']}>
          <p className={styles['technical-header__title']}>Технические настройки</p>

          <div className={styles['technical-header__image']}></div>
        </div>

        <div className={styles['technical-main']}>
          <div className={styles['technical-main__field']}>
            <p>Адрес (домен)</p>

            <Field defaultValue={'nexusmarket.kz'} />
          </div>

          <div className={styles['technical-main__field']}>
            <p>Часовой пояс</p>

            <Select
              className={styles['technical-main__field-select']}
              options={{ 'GMT+6': 'GMT+6' }}
            />
          </div>

          <div className={styles['technical-main__field']}>
            <p>Формат даты и времени</p>

            <Select className={styles['technical-main__field-select']} options={{ Чего: 'Чего' }} />
          </div>

          <div className={styles['technical-main__field']}>
            <p>Валюта</p>

            <Select
              className={styles['technical-main__field-select']}
              options={{ KZT: 'Тенге (₸)' }}
            />
          </div>
        </div>

        <div className={styles['technical-footer']}>
          <Button text='Редактировать' beforeIcon={<EditIcon />} />
        </div>
      </div>

      <div className={styles['backup']}>
        <div className={styles['backup-header']}>
          <p className={styles['backup-header__title']}>Последнее резервное копирование</p>
        </div>

        <div className={styles['backup-main']}>
          <p className={styles['backup-main__text']}>
            Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum
            является стандартной рыбой для текстов на латинице с начала XVI века.
          </p>
          <p className={styles['backup-main__date']}>Последнее: Вчера, 18:28</p>

          <div style={{ marginTop: '1rem' }} />

          <Button
            className={styles['backup-main__button']}
            theme='outline-blue'
            text='Резервное копирование'
            icon={<ArrowRightIcon />}
          />
        </div>
      </div>
    </div>
  );
}
