import { BankCardIcon } from '@/assets/icons/BankCard';
import styles from './PaymentMethod.module.scss';
import { Field } from '../Field';
import { Button } from '@/components/ui/Button';

export function BankCardModal({ onSubmit }: Modal) {
  return (
    <div className={styles['modal']}>
      <div className={styles['header']}>
        <p className={styles['header__title']}>Способ оплаты</p>

        <div className={styles['header__method']}>
          <BankCardIcon />
          <span>Карта</span>
        </div>
      </div>

      <form
        className={styles['form']}
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) onSubmit();
        }}
      >
        <div className={styles['form__field']}>
          <p className={styles['form__field-label']}>ФИО</p>

          <Field
            containerClassName={styles['form__field-input']}
            placeholder={'Введите ФИО на карте'}
          />
        </div>

        <div className={styles['form__field']}>
          <p className={styles['form__field-label']}>Карта</p>
          <Field
            containerClassName={styles['form__field-input']}
            placeholder={'Введите номер карты'}
          />
        </div>

        <Button text='Подтвердить' />
      </form>
    </div>
  );
}
