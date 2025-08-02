import styles from './PaymentMethod.module.scss';
import { Field } from '../Field';
import { Button } from '@/components/ui/Button';
import { PaymentIcon } from '@/assets/icons/Payment';

export function PaymentInvoiceModal({ onSubmit }: Modal) {
  return (
    <div className={styles['modal']}>
      <div className={styles['header']}>
        <p className={styles['header__title']}>Способ оплаты</p>

        <div className={styles['header__method']}>
          <PaymentIcon />
          <span>Счет на оплату</span>
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
          <p className={styles['form__field-label']}>Наименовние юр. лица</p>

          <Field
            containerClassName={styles['form__field-input']}
            placeholder={'Введите наименование'}
          />
        </div>

        <div className={styles['form__field']}>
          <p className={styles['form__field-label']}>Номер расчетного счета</p>
          <Field containerClassName={styles['form__field-input']} placeholder={'Введите номер'} />
        </div>

        <Button text='Подтвердить' />
      </form>
    </div>
  );
}
