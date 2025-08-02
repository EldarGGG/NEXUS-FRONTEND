'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import styles from './page.module.scss';

export default function SignupSuccess() {
  const router = useRouter();

  return (
    <main className={styles['main']}>
      <h1 className={styles['main__title']}>
        Поздравляем, Вы
        <br />
        успешно завершили
        <br /> регистрацию!
      </h1>

      <Button
        onClick={() => router.push('/signin')}
        className={styles['button']}
        text='Войти в систему'
      />
    </main>
  );
}
