'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './SellerNotification.module.scss';

interface SellerNotificationProps {
  onClose?: () => void;
}

export default function SellerNotification({ onClose }: SellerNotificationProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  const handleBecomeSeller = () => {
    // Активируем селлерский аккаунт
    localStorage.setItem('sellerActivated', 'true');
    
    // Перенаправляем в селлерский кабинет
    router.push('/seller');
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const handleContinueShopping = () => {
    // Просто закрываем уведомление и остаемся в каталоге
    setIsVisible(false);
    router.push('/shop');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.notification}>
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
        
        <div className={styles.content}>
          <h2 className={styles.title}>🎉 Добро пожаловать в Nexus!</h2>
          <p className={styles.description}>
            Теперь вы можете не только покупать товары, но и стать продавцом! 
            Создайте свой магазин и начните продавать прямо сейчас.
          </p>
          
          <div className={styles.actions}>
            <button 
              className={styles.primaryButton}
              onClick={handleBecomeSeller}
            >
              🏪 Стать продавцом
            </button>
            
            <button 
              className={styles.secondaryButton}
              onClick={handleContinueShopping}
            >
              🛍️ Пока только покупать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
