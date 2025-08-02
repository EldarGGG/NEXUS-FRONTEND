import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import styles from './PickupAddress.module.scss';
import type { PickupAddressProps } from './types';

export function PickupAddress({ onClose }: PickupAddressProps) {
  return (
    <div className={styles['pickup-address']}>
      <div onClick={onClose} className={styles['pickup-address__space']}></div>

      <div className={styles['pickup-address__main']}>
        <div className={styles['main']}>
          <h1 className={styles['main__title']}>Добавить адрес самовывоза</h1>

          <Field placeholder='Добавьте адрес самовывоза' className={styles['main__field']} />

          <Button
            text='Завершить'
            onClick={onClose}
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='22'
                viewBox='0 0 24 22'
                fill='none'
              >
                <path
                  d='M1 10.25C0.585786 10.25 0.25 10.5858 0.25 11C0.25 11.4142 0.585786 11.75 1 11.75V10.25ZM23.5303 11.5303C23.8232 11.2374 23.8232 10.7626 23.5303 10.4697L18.7574 5.6967C18.4645 5.40381 17.9896 5.40381 17.6967 5.6967C17.4038 5.98959 17.4038 6.46447 17.6967 6.75736L21.9393 11L17.6967 15.2426C17.4038 15.5355 17.4038 16.0104 17.6967 16.3033C17.9896 16.5962 18.4645 16.5962 18.7574 16.3033L23.5303 11.5303ZM1 11.75H23V10.25H1V11.75Z'
                  fill='#EEF0F4'
                />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}
