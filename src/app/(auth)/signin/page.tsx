'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSignin } from '@/api/auth/signin';
import type { ISignin } from '@/types/auth/signin';

import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import styles from './page.module.scss';

export default function Signin() {
  const router = useRouter();
  const signin = useSignin();

  const { register, handleSubmit } = useForm<ISignin>();

  async function handleLogin(formData: any) {
    try {
      const data = await signin.request(formData) as any;

      console.log('Login response:', data);

      // Сохраняем JWT токены и информацию о пользователе
      if (data?.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('user', JSON.stringify({
          id: data.user_id,
          user_id: data.user_id,
          username: data.username,
          phone: data.phone,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          store: data.store
        }));

        // После успешного входа перенаправляем в селлерский кабинет
        if (data.store) {
          return router.push('/seller');
        } else {
          return router.push('/shop');
        }
      }
    } catch (e) {
      console.error('[NEXUS-MARKET:ERROR] Ошибка при авторизации\n', e);
    }
  }

  return (
    <main className={styles['main']}>
      <h1 className={styles['main__title']}>
        Добро пожаловать!
      </h1>

      <form onSubmit={handleSubmit(handleLogin)} className={styles['main__form']}>
        <Field
          {...register('phone', { required: true })}
          className={styles['main__form-field']}
          placeholder='Номер телефона или Email'
          type='text'
          autoComplete='off'
        />

        <Field
          {...register('password', { required: true })}
          className={styles['main__form-field']}
          placeholder='Пароль'
          type='password'
        />

        <Button
          className={styles['main__form-button']}
          loading={signin.isLoading}
          text='Войти в систему'
          type='submit'
        />

        <p className={styles['main__form-forgot']}>
          У вас нет аккаунта? <Link href='/signup'>Зарегистрироваться.</Link>
        </p>
      </form>
    </main>
  );
}
