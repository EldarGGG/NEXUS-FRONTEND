import cn from 'classnames';
import styles from './screen.module.scss';
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeft';




function PaymentMethod({onBack}: MakingOrderScreenProps) {
    return (
        <div className={styles['mobile']}>
        <header className={styles['header']}>
          <button onClick={onBack} className={styles['header__back-button']}>
            <ArrowLeftIcon />
          </button>

          <p className={styles['header__title']}>
            Оформление заказа CLICK
          </p>
        </header>

        
      </div>
    )
}

export default PaymentMethod