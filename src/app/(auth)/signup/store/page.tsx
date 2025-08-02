'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useLocalStore } from '@/api/local-stores/store';

import { Field, FieldPhoto } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import styles from './page.module.scss';

export default function SignupSeller() {
  const router = useRouter();
  const store = useLocalStore();
  const { handleSubmit, register } = useForm();

  const handleCreateStore = async (formData: any) => {
    try {
      await store.createStore({
        ...formData,
        // BIN: 'string',
        // name: 'string',
        // color: 'string',
        // summary: 'string',
        // is_visible: false,
      });

      router.push('/dashboard');
    } catch (e) {
      console.error('[NEXUS-MARKET:ERROR] Произошла ошибка при созданий магазина!\n', e);
    }
  };

  return (
    <main className={styles['main']}>
      <h1 className={styles['main__title']}>Регистрация продавца</h1>

      <form onSubmit={handleSubmit(handleCreateStore)} className={styles['main__form']}>
        <Field
          {...register('name')}
          className={styles['main__form-field']}
          placeholder='Название магазина'
          type='text'
        />

        <FieldPhoto className={styles['main__form-field']} placeholder='Загрузите логотип' />

        <Field
          {...register('BIN')}
          type='text'
          placeholder='Укажите ИИН/БИН'
          className={styles['main__form-field']}
        />

        <p className={styles['main__form-title']}>Адреса самовывоза</p>

        <Field
          {...register('summary')}
          className={styles['main__form-field']}
          type='text'
          placeholder='Укажите адреса самовывоза'
        />

        <Button type='submit' className={styles['main__form-button']} text='Войти в систему' />
      </form>
    </main>
  );
}
