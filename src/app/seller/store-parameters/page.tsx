'use client';

// Components
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PickupAddress } from '@/components/modals/PickupAddress';

// Icon Components
import { PlusIcon } from '@/assets/icons/Plus';
import { EditIcon } from '@/assets/icons/Edit';
import { XIcon } from '@/assets/icons/X';
import { SuccessIcon } from '@/assets/icons/Success';

// Utils
import { useState } from 'react';
import cn from 'classnames';

// Styles
import styles from './page.module.scss';

export default function StoreParameters() {
  const [isEdit, setIsEdit] = useState(false);
  const [isShowPickupAddressModal, setIsShowPickupAddressModal] = useState(false);

  return (
    <>
      {/* Modals */}
      {isShowPickupAddressModal && (
        <PickupAddress onClose={() => setIsShowPickupAddressModal(false)} />
      )}

      <div className={styles['main']}>
        <div className={styles['store-parameters']}>
          <div className={styles['header']}>
            <p className={styles['header__title']}>Настройки магазина</p>

            <nav className={styles['header__nav']}>
              <Link
                href={'/seller/store-parameters'}
                className={cn(styles['header__nav-button'], styles['active'])}
              >
                Данные магазина
              </Link>
              <Link href={''} className={styles['header__nav-button']}>
                Точки продаж и склады
              </Link>
              <Link
                href={'/seller/store-parameters/integration-management'}
                className={cn(styles['header__nav-button'])}
              >
                Управление интеграциями
              </Link>
            </nav>
          </div>

          <div className={styles['store-name']}>
            <div className={styles['store-name__inner']}>
              <p className={styles['store-name__title']}>Название магазина</p>

              <div className={styles['store-name__main']}>
                <div className={styles['store-name__field']}>
                  <p>Описание магазина</p>
                  <textarea
                    rows={5}
                    defaultValue='Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных , используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных'
                  ></textarea>
                </div>

                <div className={styles['store-name__field']}>
                  <p>Номер телефона</p>
                  <input inputMode='tel' defaultValue='+7 (747) 777-77-77' />
                </div>

                <div className={styles['store-name__field']}>
                  <p>Электронная почта</p>
                  <input type='text' defaultValue='nexusmarket@gmail.com' />
                </div>
              </div>
            </div>

            <div className={styles['store-name__list']}>
              {isEdit && (
                <>
                  <Button
                    theme='outline-red'
                    onClick={() => setIsEdit(false)}
                    className={styles['store-name__button']}
                    beforeIcon={<XIcon />}
                    text='Отмена'
                  />

                  <Button
                    theme='green'
                    onClick={() => setIsEdit(false)}
                    className={styles['store-name__button']}
                    beforeIcon={<SuccessIcon />}
                    text='Принять'
                  />
                </>
              )}
              {!isEdit && (
                <Button
                  onClick={() => setIsEdit(true)}
                  className={styles['store-name__button']}
                  beforeIcon={<EditIcon />}
                  text='Редактировать'
                />
              )}
            </div>
          </div>

          <div className={styles['pickup-addressess']}>
            <div className={styles['pickup-addressess-header']}>
              <p className={styles['pickup-addressess-header__title']}>Адреса самовывоза</p>
            </div>

            <div className={styles['pickup-addressess-main']}>
              <div className={styles['pickup-addressess-main__field']}>
                <p>Адрес самовывоза #1</p>

                <input type='text' defaultValue={'ул. Алалыкина д. 12'} />
              </div>
            </div>

            <div className={styles['pickup-addressess-footer']}>
              <Button
                onClick={() => setIsShowPickupAddressModal(true)}
                disabled={isEdit}
                style={isEdit ? { opacity: 0.5 } : {}}
                theme='outline-blue'
                text='Добавить'
                beforeIcon={<PlusIcon />}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
