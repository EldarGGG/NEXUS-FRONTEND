import { Button } from '@/components/ui/Button';
import styles from './Delete.module.scss';
import { XIcon } from '@/assets/icons/X';
import { SuccessIcon } from '@/assets/icons/Success';
import { DeleteProps } from './types';

export function DeleteModal({ onClose }: DeleteProps) {
  return (
    <div className={styles['modal']}>
      <div onClick={onClose} className={styles['modal__space']}></div>

      <div className={styles['modal__main']}>
        <h1 className={styles['title']}>
          Вы уверены что хотите <br /> удалить товар?
        </h1>

        <div className={styles['main']}>
          <Button onClick={onClose} theme='outline-red' beforeIcon={<XIcon />} text='Отмена' />
          <Button onClick={onClose} theme='red' beforeIcon={<SuccessIcon />} text='Принять' />
        </div>
      </div>
    </div>
  );
}
