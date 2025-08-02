'use client';

import { useState, useEffect } from 'react';
import cn from 'classnames';

// Components
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';

// Icon Components
import { PlusIcon } from '@/assets/icons/Plus';
import { FilterIcon } from '@/assets/icons/Filter';

// Styles
import styles from '../../products/page.module.scss';

interface WriteOff {
  id: number;
  document_number: string;
  item_name: string;
  storage_name: string;
  amount: number;
  reason: string;
  created_at: string;
  notes: string;
  status: string;
}

interface Product {
  id: number;
  name: string;
}

interface Storage {
  id: number;
  name: string;
}

export default function WriteOffs() {
  const [writeOffs, setWriteOffs] = useState<WriteOff[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [storages, setStorages] = useState<Storage[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    product_id: '',
    storage_id: '',
    amount: '',
    reason: '',
    document_number: '',
    notes: ''
  });

  useEffect(() => {
    setMounted(true);
    fetchWriteOffs();
    fetchProducts();
    fetchStorages();
  }, []);

  const fetchWriteOffs = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (!token) {
        console.error('No access token found');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8000/api/v1/seller/inventory/write-offs/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWriteOffs(data);
      } else {
        console.error('Failed to fetch write-offs:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching write-offs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (!token) return;

      const response = await fetch('http://localhost:8000/api/v1/seller/products/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchStorages = async () => {
    // For now, we'll use mock data. Later this should be connected to real API
    setStorages([
      { id: 1, name: 'Основной склад' },
      { id: 2, name: 'Склад готовой продукции' },
      { id: 3, name: 'Склад возврата' }
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.product_id || !formData.storage_id || !formData.amount || !formData.reason) {
      alert('Пожалуйста, заполните обязательные поля');
      return;
    }

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (!token) return;

      const response = await fetch('http://localhost:8000/api/v1/seller/inventory/write-offs/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: parseInt(formData.product_id),
          storage_id: parseInt(formData.storage_id),
          amount: parseInt(formData.amount),
          reason: formData.reason,
          document_number: formData.document_number,
          notes: formData.notes
        }),
      });

      if (response.ok) {
        alert('Списание успешно создано!');
        setShowAddModal(false);
        setFormData({
          product_id: '',
          storage_id: '',
          amount: '',
          reason: '',
          document_number: '',
          notes: ''
        });
        fetchWriteOffs();
      } else {
        const error = await response.json();
        alert(`Ошибка: ${error.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating write-off:', error);
      alert('Ошибка создания списания');
    }
  };

  if (!mounted) {
    return <div className={styles['main']}></div>;
  }

  return (
    <div className={styles['main']}>
      {/* Add Modal */}
      {showAddModal && (
        <div className={styles['modal']}>
          <div onClick={() => setShowAddModal(false)} className={styles['modal__space']}></div>
          <div className={styles['modal__main']}>
            <h1 className={styles['title']}>Списание товара</h1>
            
            <form onSubmit={handleSubmit} className={styles['form']}>
              <select
                value={formData.product_id}
                onChange={(e) => setFormData(prev => ({ ...prev, product_id: e.target.value }))}
                className={styles['form__select']}
                required
              >
                <option value="">Выберите товар</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>

              <select
                value={formData.storage_id}
                onChange={(e) => setFormData(prev => ({ ...prev, storage_id: e.target.value }))}
                className={styles['form__select']}
                required
              >
                <option value="">Выберите склад</option>
                {storages.map(storage => (
                  <option key={storage.id} value={storage.id}>
                    {storage.name}
                  </option>
                ))}
              </select>

              <Field
                type="number"
                placeholder="Количество"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                required
              />

              <select
                value={formData.reason}
                onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                className={styles['form__select']}
                required
              >
                <option value="">Выберите причину списания</option>
                <option value="expired">Истек срок годности</option>
                <option value="damaged">Повреждение товара</option>
                <option value="defective">Брак</option>
                <option value="theft">Кража</option>
                <option value="loss">Потеря</option>
                <option value="other">Другое</option>
              </select>

              <Field
                type="text"
                placeholder="Номер документа (опционально)"
                value={formData.document_number}
                onChange={(e) => setFormData(prev => ({ ...prev, document_number: e.target.value }))}
              />

              <Field
                type="text"
                placeholder="Примечания (опционально)"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              />

              <div className={styles['form__buttons']}>
                <Button type="submit" text="Сохранить" />
                <Button 
                  type="button" 
                  text="Отмена" 
                  theme="outline-red" 
                  onClick={() => setShowAddModal(false)} 
                />
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles['header']}>
        <Button
          theme='outline-blue'
          text='Добавить'
          beforeIcon={<PlusIcon />}
          className={styles['header__add-button']}
          onClick={() => setShowAddModal(true)}
        />

        <div className={styles['right']}>
          <button className={styles['header__button']}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
            >
              <path
                d='M8.00002 10.3832C7.91113 10.3832 7.8278 10.3692 7.75002 10.3412C7.67224 10.3136 7.60002 10.2665 7.53335 10.1998L5.13335 7.79984C5.01113 7.67762 4.95002 7.52206 4.95002 7.33317C4.95002 7.14428 5.01113 6.98873 5.13335 6.8665C5.25558 6.74428 5.4138 6.68028 5.60802 6.6745C5.80269 6.66917 5.96113 6.72761 6.08335 6.84984L7.33335 8.09984V3.33317C7.33335 3.14428 7.39735 2.98584 7.52535 2.85784C7.65291 2.73028 7.81113 2.6665 8.00002 2.6665C8.18891 2.6665 8.34735 2.73028 8.47535 2.85784C8.60291 2.98584 8.66669 3.14428 8.66669 3.33317V8.09984L9.91669 6.84984C10.0389 6.72761 10.1974 6.66917 10.392 6.6745C10.5862 6.68028 10.7445 6.74428 10.8667 6.8665C10.9889 6.98873 11.05 7.14428 11.05 7.33317C11.05 7.52206 10.9889 7.67762 10.8667 7.79984L8.46669 10.1998C8.40002 10.2665 8.3278 10.3136 8.25002 10.3412C8.17224 10.3692 8.08891 10.3832 8.00002 10.3832ZM4.00002 13.3332C3.63335 13.3332 3.31958 13.2027 3.05869 12.9418C2.79735 12.6805 2.66669 12.3665 2.66669 11.9998V10.6665C2.66669 10.4776 2.73046 10.3192 2.85802 10.1912C2.98602 10.0636 3.14446 9.99984 3.33335 9.99984C3.52224 9.99984 3.68069 10.0636 3.80869 10.1912C3.93624 10.3192 4.00002 10.4776 4.00002 10.6665V11.9998H12V10.6665C12 10.4776 12.064 10.3192 12.192 10.1912C12.3196 10.0636 12.4778 9.99984 12.6667 9.99984C12.8556 9.99984 13.0138 10.0636 13.1414 10.1912C13.2694 10.3192 13.3334 10.4776 13.3334 10.6665V11.9998C13.3334 12.3665 13.2029 12.6805 12.942 12.9418C12.6807 13.2027 12.3667 13.3332 12 13.3332H4.00002Z'
                fill='#BAC4D1'
              />
            </svg>
            <span>Импортировать</span>
          </button>

          <button className={styles['header__button']}>
            <FilterIcon />
            <span>Фильтр</span>
          </button>
        </div>
      </div>

      <div className={styles['table-container']}>
        <table className={styles['table']}>
          <thead className={styles['table__head']}>
            <tr className={styles['table__head-row']}>
              <th className={styles['table__head-th']}>
                <input type='checkbox' />
              </th>
              <th className={styles['table__head-th']}>Документ</th>
              <th className={styles['table__head-th']}>Товар</th>
              <th className={styles['table__head-th']}>Склад</th>
              <th className={styles['table__head-th']}>Количество</th>
              <th className={styles['table__head-th']}>Причина</th>
              <th className={styles['table__head-th']}>Дата</th>
              <th className={styles['table__head-th']}>Статус</th>
            </tr>
          </thead>

          <tbody className={styles['table__body']}>
            {!mounted ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'transparent' }}>
                  .
                </td>
              </tr>
            ) : loading ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>
                  Загрузка...
                </td>
              </tr>
            ) : writeOffs.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>
                  Нет записей о списании. Нажмите "Добавить" чтобы создать первую запись.
                </td>
              </tr>
            ) : (
              writeOffs.map((writeOff) => (
                <tr key={writeOff.id} className={styles['table__body-row']}>
                  <td className={styles['table__body-td']}>
                    <input type='checkbox' />
                  </td>
                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>{writeOff.document_number}</p>
                  </td>
                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>{writeOff.item_name}</p>
                  </td>
                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>{writeOff.storage_name}</p>
                  </td>
                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>{writeOff.amount}</p>
                  </td>
                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>{writeOff.reason}</p>
                  </td>
                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>{writeOff.created_at}</p>
                  </td>
                  <td className={styles['table__body-td']}>
                    <div className={styles['table__select']}>
                      <div></div>
                      <p>{writeOff.status}</p>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles['footer']}>
        <p className={styles['footer__title']}>
          Показано {writeOffs.length} записей о списании
        </p>
      </div>
    </div>
  );
}
