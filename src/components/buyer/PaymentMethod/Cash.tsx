import styles from './PaymentMethod.module.scss';
import { Field } from '../Field';
import { Button } from '@/components/ui/Button';
import { CashIcon } from '@/assets/icons/Cash';

export function CashModal({ onSubmit }: Modal) {
  return (
    <div className={styles['modal']}>
      <div className={styles['header']}>
        <p className={styles['header__title']}>Способ оплаты</p>

        <div className={styles['header__method']}>
          <CashIcon />
          <span>Наличные</span>
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
          <p className={styles['form__field-label']}>Необходимая сдача</p>

          <Field containerClassName={styles['form__field-input']} placeholder={'Введите сумму'} />
        </div>

        <Button text='Подтвердить' />
      </form>
    </div>
  );
}
