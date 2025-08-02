import { BankCardModal } from './BankCard';
import { CashModal } from './Cash';
import { PaymentInvoiceModal } from './PaymentInvoice';
import styles from './PaymentMethod.module.scss';

export function PaymentMethodModal({ onSubmit, onClose, method }: PaymentMethod) {
  return (
    <div className={styles['payment-method']}>
      <div onClick={onClose} className={styles['payment-method__space']}></div>

      <div className={styles['payment-method__main']}>
        {
          {
            'bank-card': <BankCardModal onSubmit={onSubmit} />,
            'payment-invoice': <PaymentInvoiceModal onSubmit={onSubmit} />,
            cash: <CashModal onSubmit={onSubmit} />,
          }[method]
        }
      </div>
    </div>
  );
}
