'use client';

import { useState, useEffect } from 'react';
import cn from 'classnames';
import Link from 'next/link';

// Components
import { Button } from '@/components/ui/Button';
import { SearchField } from '@/components/shared/SearchField';
import { AddWarehouseModal } from '@/components/modals/seller/warehouse/AddWarehouse';

// Icon Components
import { PlusIcon } from '@/assets/icons/Plus';
import { FilterIcon } from '@/assets/icons/Filter';
import { EditIcon } from '@/assets/icons/Edit';

// Styles - используем тот же стиль, что и для страницы товаров
import styles from '../stock/page.module.scss';

interface Storage {
  id: number;
  name: string;
  description: string;
  address: string;
  item_count: number;
  created_at: string;
}

export default function Storages() {
  const [storages, setStorages] = useState<Storage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isShowAddWarehouseModal, setIsShowAddWarehouseModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchStorages();
  }, []);

  const fetchStorages = async () => {
    try {
      setLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      
      if (!token) {
        console.error('No access token found');
        setLoading(false);
        return;
      }

      const response = await fetch('https://nexus-backend-z66y.onrender.com/api/v1/warehouses/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStorages(data);
      } else {
        console.error('Failed to fetch storages:', response.statusText);
        // Временные демо-данные, если API недоступен
        setStorages([
          {
            id: 1,
            name: 'Основной склад',
            description: 'Основной склад готовой продукции',
            address: 'ул. Промышленная, 24',
            item_count: 145,
            created_at: '2023-05-15'
          },
          {
            id: 2,
            name: 'Склад комплектующих',
            description: 'Хранение запчастей и комплектующих',
            address: 'ул. Заводская, 10',
            item_count: 85,
            created_at: '2023-06-20'
          },
          {
            id: 3,
            name: 'Склад возврата',
            description: 'Хранение возвратных товаров',
            address: 'ул. Складская, 5',
            item_count: 32,
            created_at: '2023-08-10'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching storages:', error);
      // Временные демо-данные при ошибке
      setStorages([
        {
          id: 1,
          name: 'Основной склад',
          description: 'Основной склад готовой продукции',
          address: 'ул. Промышленная, 24',
          item_count: 145,
          created_at: '2023-05-15'
        },
        {
          id: 2,
          name: 'Склад комплектующих',
          description: 'Хранение запчастей и комплектующих',
          address: 'ул. Заводская, 10',
          item_count: 85,
          created_at: '2023-06-20'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStorage = async (id: number) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      
      if (!token) {
        console.error('No access token found');
        return;
      }

      const response = await fetch(`https://nexus-backend-z66y.onrender.com/api/v1/warehouses/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setStorages(storages.filter(storage => storage.id !== id));
        alert('Склад успешно удален');
      } else {
        const error = await response.json();
        alert(`Ошибка удаления склада: ${error.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting storage:', error);
      alert('Ошибка удаления склада');
    } finally {
      setConfirmDelete(null);
    }
  };

  const filteredStorages = storages.filter(storage => 
    storage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    storage.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    storage.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted) {
    return <div className={styles['main']}></div>;
  }

  return (
    <div className={styles['main']}>
      <div className={styles['header']}>
        <div className={styles['header-content']}>
          <h1 className={styles['title']}>Склады</h1>
          <p className={styles['subtitle']}>Управление складами и распределением товаров</p>
        </div>
        <div className={styles['header-actions']}>
          <Button onClick={() => setIsShowAddWarehouseModal(true)}>
            <PlusIcon />
            Добавить склад
          </Button>
          <Link href="/seller/warehouse" className={styles['header-link']}>
            Назад к складу
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className={styles['filters']}>
        <div className={styles['search-container']}>
          <SearchField
            placeholder="Поиск складов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className={styles['table-container']}>
        {loading ? (
          <div className={styles['loading']}>Загрузка данных...</div>
        ) : filteredStorages.length > 0 ? (
          <table className={styles['table']}>
            <thead className={styles['table-header']}>
              <tr>
                <th>Название склада</th>
                <th>Описание</th>
                <th>Адрес</th>
                <th>Количество товаров</th>
                <th>Дата создания</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredStorages.map((storage) => (
                <tr key={storage.id} className={styles['table-row']}>
                  <td className={styles['storage-name-cell']}>
                    <span className={styles['storage-name']}>{storage.name}</span>
                  </td>
                  <td className={styles['description-cell']}>
                    <span className={styles['description']}>{storage.description || 'Нет описания'}</span>
                  </td>
                  <td className={styles['address-cell']}>
                    <span className={styles['address']}>{storage.address || 'Адрес не указан'}</span>
                  </td>
                  <td className={styles['count-cell']}>
                    <span className={styles['count']}>{storage.item_count} шт.</span>
                  </td>
                  <td className={styles['date-cell']}>
                    <span className={styles['date']}>{storage.created_at}</span>
                  </td>
                  <td className={styles['actions-cell']}>
                    <div className={styles['actions']}>
                      {confirmDelete === storage.id ? (
                        <div className={styles['confirm-delete']}>
                          <span>Удалить?</span>
                          <Button 
                            className={cn(styles['confirm-button'], styles['yes'])}
                            onClick={() => handleDeleteStorage(storage.id)}
                          >
                            Да
                          </Button>
                          <Button 
                            className={cn(styles['confirm-button'], styles['no'])}
                            onClick={() => setConfirmDelete(null)}
                          >
                            Нет
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Button 
                            className={styles['edit-button']}
                            onClick={() => {
                              // Здесь будет функционал редактирования склада
                              console.log('Edit storage:', storage.id);
                            }}
                          >
                            <EditIcon />
                          </Button>
                          <Button 
                            className={styles['delete-button']}
                            onClick={() => setConfirmDelete(storage.id)}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="currentColor"/>
                            </svg>
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles['empty-state']}>
            <p>Склады не найдены</p>
            <Button onClick={() => setIsShowAddWarehouseModal(true)}>
              Добавить первый склад
            </Button>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className={styles['summary']}>
        <div className={styles['summary-card']}>
          <span className={styles['summary-label']}>Всего складов:</span>
          <span className={styles['summary-value']}>{filteredStorages.length}</span>
        </div>
        <div className={styles['summary-card']}>
          <span className={styles['summary-label']}>Общее количество товаров:</span>
          <span className={styles['summary-value']}>
            {filteredStorages.reduce((sum, storage) => sum + storage.item_count, 0)} шт.
          </span>
        </div>
      </div>

      {/* Modals */}
      {isShowAddWarehouseModal && (
        <AddWarehouseModal 
          onClose={() => setIsShowAddWarehouseModal(false)}
          onSuccess={() => {
            fetchStorages();
          }}
        />
      )}
    </div>
  );
}
