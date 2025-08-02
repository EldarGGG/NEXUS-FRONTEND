'use client';

import { useState, useEffect } from 'react';
import cn from 'classnames';

import { Select } from '@/components/ui/Select';
import { Field, FieldPhoto } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import styles from './AddProduct.module.scss';
import type { AddProductProps, Navigation } from './types';

// Product form data interface
interface ProductFormData {
  name: string;
  price: string;
  category: string;
  status: string;
  description: string;
  warehouse: string;
  quantity: string;
}

// Warehouse interface
interface Warehouse {
  id: number;
  name: string;
}

export function AddProductModal({ onClose }: AddProductProps) {
  const [navigation, setNavigation] = useState<Navigation>('Товар');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    category: '',
    status: 'active',
    description: '',
    warehouse: '',
    quantity: ''
  });
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  // Fetch warehouses on component mount
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        const response = await fetch('http://localhost:8000/api/v1/warehouses/', {
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });
        if (response.ok) {
          const data = await response.json();
          setWarehouses(data);
        }
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      }
    };
    fetchWarehouses();
  }, []);

  // Handle form input changes
  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle product creation
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category || !formData.status) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    if (formData.warehouse && (!formData.quantity || parseInt(formData.quantity) < 0)) {
      alert('Пожалуйста, укажите корректное количество для выбранного склада');
      return;
    }

    try {
      setLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        status: formData.status === 'active',
        category_name: formData.category || 'Без категории',
        warehouse_id: parseInt(formData.warehouse),
        quantity: parseInt(formData.quantity)
      };

      const response = await fetch('http://localhost:8000/api/v1/seller/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        alert('Товар успешно создан!');
        onClose();
        // Refresh the page to show new product
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Ошибка создания товара: ${error.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Ошибка создания товара');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['modal']}>
      <div onClick={onClose} className={styles['modal__space']}></div>

      <div className={styles['modal__main']}>
        <h1 className={styles['title']}>Добавить</h1>

        <div className={styles['nav']}>
          <button
            type='button'
            onClick={() => setNavigation('Товар')}
            className={cn(styles['nav__link'], navigation === 'Товар' && styles['active'])}
          >
            Товар
          </button>

          <button
            type='button'
            onClick={() => setNavigation('Категория')}
            className={cn(styles['nav__link'], navigation === 'Категория' && styles['active'])}
          >
            Категория
          </button>
        </div>

        {
          {
            Товар: (
              <form className={styles['form']} onSubmit={handleCreateProduct}>
                <Field
                  className={styles['form__field']}
                  type='text'
                  placeholder='Название товара'
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />

                <Field
                  className={styles['form__field']}
                  type='number'
                  inputMode='numeric'
                  placeholder='Цена (в тенге)'
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  required
                />

                <Field
                  className={styles['form__field']}
                  type='text'
                  placeholder='Категория (опционально)'
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                />

                <Field
                  className={styles['form__field']}
                  type='text'
                  placeholder='Описание (опционально)'
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />

                {warehouses.length > 0 ? (
                  <>
                    <select
                      className={styles['form__select']}
                      value={formData.warehouse}
                      onChange={(e) => handleInputChange('warehouse', e.target.value)}
                    >
                      <option value="">Выберите склад (опционально)</option>
                      {warehouses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id.toString()}>
                          {warehouse.name}
                        </option>
                      ))}
                    </select>

                    {formData.warehouse && (
                      <Field
                        className={styles['form__field']}
                        type='number'
                        inputMode='numeric'
                        placeholder='Количество на складе'
                        value={formData.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                        min="0"
                      />
                    )}
                  </>
                ) : (
                  <div className={styles['warehouse-notice']}>
                    <p>У вас пока нет складов. Сначала создайте склад в разделе &quot;Склад&quot;, затем вы сможете указать количество товара на складе.</p>
                  </div>
                )}

                <select
                  className={styles['form__select']}
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="">Статус товара</option>
                  <option value="active">Активный</option>
                  <option value="inactive">Неактивный</option>
                </select>

                <Button 
                  type='submit'
                  text={loading ? 'Сохранение...' : 'Сохранить'} 
                  className={styles['form__button']} 
                  disabled={loading}
                />
              </form>
            ),
            Категория: (
              <div className={styles['form']}>
                <FieldPhoto placeholder='Название товара' onSelectPhoto={() => {}} />

                <Select
                  className={styles['form__select']}
                  placeholder='Выберите родительскую категорию'
                  options={{
                    category1: 'Категория 1',
                    category2: 'Категория 2',
                  }}
                />

                <Select
                  className={styles['form__select']}
                  placeholder='Выберите подкатегорию'
                  options={{
                    category1: 'Категория 1',
                    category2: 'Категория 2',
                  }}
                />

                <Button text='Сохранить' className={styles['form__button']} />
              </div>
            ),
          }[navigation]
        }
      </div>
    </div>
  );
}
