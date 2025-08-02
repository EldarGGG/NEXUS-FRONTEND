'use client';

// Styles
import styles from './page.module.scss';

// Components
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { IntegrationForm } from '@/components/modals/IntegrationForm';

// Icon Components
import { ArrowRightIcon } from '@/assets/icons/ArrowRight';
import { LockIcon } from '@/assets/icons/Lock';

// Utils
import cn from 'classnames';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function IntegrationManagement() {
  const router = useRouter();

  const [isShowIntegrationForm, setIsShowIntegrationForm] = useState(false);

  return (
    <>
      {isShowIntegrationForm && (
        <IntegrationForm
          title='Подключение к МойСклад'
          onClose={() => setIsShowIntegrationForm(false)}
          onSubmit={() => router.push('/seller/store-parameters/integration-management/moy-sklad')}
        />
      )}

      <div className={styles['main']}>
        <div className={styles['header']}>
          <p className={styles['header__title']}>Настройки магазина</p>

          <nav className={styles['header__nav']}>
            <Link href={'/seller/store-parameters'} className={styles['header__nav-button']}>
              Данные магазина
            </Link>
            <Link href={''} className={styles['header__nav-button']}>
              Точки продаж и склады
            </Link>
            <Link
              href={'/seller/store-parameters/integration-management'}
              className={cn(styles['header__nav-button'], styles['active'])}
            >
              Управление интеграциями
            </Link>
          </nav>
        </div>

        <div className={styles['integrations']}>
          <div className={styles['integrations-card']}>
            <div className={styles['integrations-card__image']}>
              <Image src={require('@/assets/images/integrations/amocrm.png')} alt='' />
            </div>

            <Button text='Подключено' theme='green' />
          </div>

          <div className={styles['integrations-card']}>
            <div className={styles['integrations-card__image']}>
              <Image src={require('@/assets/images/integrations/moy-sklad.png')} alt='' />
            </div>

            <Button
              onClick={() => setIsShowIntegrationForm(true)}
              text='Подключить'
              icon={<ArrowRightIcon />}
              theme='outline-blue'
            />
          </div>

          <div className={styles['integrations-card']}>
            <div className={styles['integrations-card__image']}>
              <Image src={require('@/assets/images/integrations/planfact.png')} alt='' />
            </div>

            <Button text='Подключить' icon={<ArrowRightIcon />} theme='outline-blue' />
          </div>

          <div className={styles['integrations-card']}>
            <div className={styles['integrations-card__image']}>
              <Image src={require('@/assets/images/integrations/whatsapp.png')} alt='' />
            </div>

            <Button text='Подключить' icon={<ArrowRightIcon />} theme='outline-blue' />
          </div>

          <div className={cn(styles['integrations-card'], styles.disabled)}>
            <div className={styles['integrations-card__image']}>
              <Image src={require('@/assets/images/integrations/a-data.png')} alt='' />
            </div>

            <Button text='Недоступно' disabled beforeIcon={<LockIcon />} theme='gray' />
          </div>

          <div className={cn(styles['integrations-card'], styles.disabled)}>
            <div className={styles['integrations-card__image']}>
              <Image src={require('@/assets/images/integrations/kaspikz.png')} alt='' />
            </div>

            <Button text='Недоступно' disabled beforeIcon={<LockIcon />} theme='gray' />
          </div>

          <div className={cn(styles['integrations-card'], styles.disabled)}>
            <div className={styles['integrations-card__image']}>
              <Image src={require('@/assets/images/integrations/1c.png')} alt='' />
            </div>

            <Button text='Недоступно' disabled beforeIcon={<LockIcon />} theme='gray' />
          </div>

          <div className={cn(styles['integrations-card'], styles.disabled)}>
            <div className={styles['integrations-card__image']}>
              <Image src={require('@/assets/images/integrations/google-docs.png')} alt='' />
            </div>

            <Button text='Недоступно' disabled beforeIcon={<LockIcon />} theme='gray' />
          </div>
        </div>
      </div>
    </>
  );
}
