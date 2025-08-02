'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BecomeSellerModal.module.scss';

interface BecomeSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BecomeSellerModal({ isOpen, onClose }: BecomeSellerModalProps) {
  const [storeName, setStoreName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!storeName.trim()) {
      alert('Пожалуйста, введите название магазина');
      return;
    }

    setIsLoading(true);
    
    try {
      // Здесь можно добавить API вызов для создания магазина
      // Пока просто симулируем успешное создание
      
      // Активируем селлерский аккаунт
      localStorage.setItem('sellerActivated', 'true');
      localStorage.setItem('storeName', storeName);
      
      // Закрываем модальное окно
      onClose();
      
      // Перенаправляем в селлерский кабинет
      router.push('/seller');
      
    } catch (error) {
      console.error('Ошибка при создании магазина:', error);
      alert('Произошла ошибка при создании магазина');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>🏪 Стать продавцом</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="storeName" className={styles.label}>
              Название вашего магазина
            </label>
            <input
              id="storeName"
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Например: Мой супер магазин"
              className={styles.input}
              disabled={isLoading}
            />
          </div>
          
          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isLoading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading || !storeName.trim()}
            >
              {isLoading ? 'Создание...' : 'Создать магазин'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
