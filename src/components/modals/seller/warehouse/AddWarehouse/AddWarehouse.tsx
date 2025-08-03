'use client';

import { useState } from 'react';
import cn from 'classnames';

import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import styles from './AddWarehouse.module.scss';

interface AddWarehouseProps {
  onClose: () => void;
  onSuccess?: () => void;
}

interface WarehouseFormData {
  name: string;
  description: string;
  address: string;
}

export function AddWarehouseModal({ onClose, onSuccess }: AddWarehouseProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<WarehouseFormData>({
    name: '',
    description: '',
    address: ''
  });

  // Handle form input changes
  const handleInputChange = (field: keyof WarehouseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle warehouse creation
  const handleCreateWarehouse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      alert('Пожалуйста, введите название склада');
      return;
    }

    try {
      setLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      
      const warehouseData = {
        name: formData.name,
        description: formData.description,
        address: formData.address
      };

      const response = await fetch('https://nexus-backend-z66y.onrender.com/api/v1/warehouses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(warehouseData)
      });

      if (response.ok) {
        alert('Склад успешно создан!');
        onSuccess?.();
        onClose();
      } else {
        const error = await response.json();
        alert(`Ошибка создания склада: ${error.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating warehouse:', error);
      alert('Ошибка создания склада');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['modal']}>
      <div onClick={onClose} className={styles['modal__space']}></div>

      <div className={styles['modal__main']}>
        <h1 className={styles['title']}>Добавить склад</h1>

        <form className={styles['form']} onSubmit={handleCreateWarehouse}>
          <Field
            className={styles['form__field']}
            type='text'
            placeholder='Название склада *'
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />

          <Field
            className={styles['form__field']}
            type='text'
            placeholder='Описание склада (опционально)'
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />

          <Field
            className={styles['form__field']}
            type='text'
            placeholder='Адрес склада (опционально)'
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />

          <div className={styles['form__buttons']}>
            <Button 
              type='button'
              text='Отмена' 
              theme='gray'
              className={styles['form__button']} 
              onClick={onClose}
            />
            <Button 
              type='submit'
              text={loading ? 'Создание...' : 'Создать склад'} 
              theme='blue'
              className={styles['form__button']} 
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
