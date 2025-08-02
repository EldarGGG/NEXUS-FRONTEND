'use client';

import cn from 'classnames';
import { useState, useEffect } from 'react';

import { SearchField } from '@/components/shared/SearchField';
import Preloader from '@/components/ui/Preloader/preloader';

import PlusIcon from '@/assets/icons/plus.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import FilterIcon from '@/assets/icons/filters/filter-column.svg';

import styles from './page.module.scss';

// Types
interface Counterparty {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: 'customer' | 'supplier' | 'partner';
  status: 'active' | 'inactive' | 'blocked';
  orders_count?: number;
  total_spent?: number;
  created_at: string;
}

export default function Counterparties() {
  /*** Состояния ***/
  const [isShowAddModal, setIsShowAddModal] = useState<boolean>(false);
  const [counterparties, setCounterparties] = useState<Counterparty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingCounterparty, setEditingCounterparty] = useState<Partial<Counterparty> | null>(null);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [newCounterparty, setNewCounterparty] = useState<{
    name: string;
    email: string;
    phone: string;
    type: 'customer' | 'supplier' | 'partner';
    status: 'active' | 'inactive' | 'blocked';
  }>({
    name: '',
    email: '',
    phone: '',
    type: 'customer',
    status: 'active'
  });

  /*** Функции ***/
  const handleToggleAddModal = () => setIsShowAddModal((prev) => !prev);

  // Fetch counterparties from API
  const fetchCounterparties = async () => {
    try {
      setLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      
      const response = await fetch('http://localhost:8000/api/v1/seller/counterparties/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCounterparties(data);
      } else {
        console.error('Failed to fetch counterparties:', response.status);
        // Mock data for demonstration
        const mockData: Counterparty[] = [
          {
            id: 1,
            name: 'ООО "Рога и копыта"',
            email: 'info@rogaikopyta.kz',
            phone: '+7 (777) 123-45-67',
            type: 'customer',
            status: 'active',
            orders_count: 15,
            total_spent: 250000,
            created_at: '2024-01-15'
          },
          {
            id: 2,
            name: 'ИП Иванов И.И.',
            email: 'ivanov@mail.ru',
            phone: '+7 (701) 987-65-43',
            type: 'supplier',
            status: 'active',
            orders_count: 8,
            total_spent: 120000,
            created_at: '2024-02-10'
          },
          {
            id: 3,
            name: 'ТОО "Партнер"',
            email: 'partner@company.kz',
            phone: '+7 (727) 555-44-33',
            type: 'partner',
            status: 'inactive',
            orders_count: 3,
            total_spent: 45000,
            created_at: '2024-03-05'
          }
        ];
        setCounterparties(mockData);
      }
    } catch (error) {
      console.error('Error fetching counterparties:', error);
      setCounterparties([]);
    } finally {
      setLoading(false);
    }
  };

  // Component mount effect
  useEffect(() => {
    setMounted(true);
    fetchCounterparties();
  }, []);

  const filteredCounterparties = counterparties.filter(counterparty => {
    const matchesSearch = 
      counterparty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counterparty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counterparty.phone.includes(searchTerm);
    const matchesType = filterType === 'all' || counterparty.type === filterType;
    const matchesStatus = filterStatus === 'all' || counterparty.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const createCounterparty = async () => {
    try {
      // Mock API call
      setCounterparties([...counterparties, { 
        ...newCounterparty, 
        id: Date.now(), 
        created_at: new Date().toISOString() 
      }]);
      setNewCounterparty({
        name: '',
        email: '',
        phone: '',
        type: 'customer',
        status: 'active'
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating counterparty:', error);
    }
  };

  const startEdit = (counterparty: Counterparty) => {
    setEditingId(counterparty.id);
    setEditingCounterparty(counterparty);
  };

  const saveEdit = async () => {
    if (!editingCounterparty || !editingId) return;
    
    try {
      // Mock API call
      setCounterparties(counterparties.map(c => 
        c.id === editingId ? { ...c, ...editingCounterparty } : c
      ));
      setEditingId(null);
      setEditingCounterparty(null);
    } catch (error) {
      console.error('Error updating counterparty:', error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingCounterparty(null);
  };

  const deleteCounterparty = async (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этого контрагента?')) {
      try {
        // Mock API call
        setCounterparties(counterparties.filter(c => c.id !== id));
      } catch (error) {
        console.error('Error deleting counterparty:', error);
      }
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'customer': return 'Клиент';
      case 'supplier': return 'Поставщик';
      case 'partner': return 'Партнер';
      default: return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'inactive': return 'Неактивный';
      case 'blocked': return 'Заблокирован';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'inactive': return '#6B7280';
      case 'blocked': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'customer': return '#3B82F6';
      case 'supplier': return '#8B5CF6';
      case 'partner': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.left}>
          <button 
            onClick={() => setShowCreateForm(true)}
            className={cn(styles.button, styles.primary)}
          >
            <PlusIcon />
            Добавить контрагента
          </button>
        </div>
        
        <div className={styles.right}>
          <SearchField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Поиск по имени, email или телефону"
            className={styles.search}
          />
          
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={styles.filter}
          >
            <option value="all">Все типы</option>
            <option value="customer">Клиенты</option>
            <option value="supplier">Поставщики</option>
            <option value="partner">Партнеры</option>
          </select>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filter}
          >
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
            <option value="blocked">Заблокированные</option>
          </select>
        </div>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className={styles.createForm}>
          <h3>Добавить нового контрагента</h3>
          <div className={styles.formGrid}>
            <input
              type="text"
              value={newCounterparty.name}
              onChange={(e) => setNewCounterparty({ ...newCounterparty, name: e.target.value })}
              placeholder="Название/Имя"
            />
            <input
              type="email"
              value={newCounterparty.email}
              onChange={(e) => setNewCounterparty({ ...newCounterparty, email: e.target.value })}
              placeholder="Email"
            />
            <input
              type="tel"
              value={newCounterparty.phone}
              onChange={(e) => setNewCounterparty({ ...newCounterparty, phone: e.target.value })}
              placeholder="Телефон"
            />
            <select
              value={newCounterparty.type}
              onChange={(e) => setNewCounterparty({ ...newCounterparty, type: e.target.value as 'customer' | 'supplier' | 'partner' })}
            >
              <option value="customer">Клиент</option>
              <option value="supplier">Поставщик</option>
              <option value="partner">Партнер</option>
            </select>
          </div>
          <div className={styles.formActions}>
            <button onClick={createCounterparty} className={styles.saveButton}>Сохранить</button>
            <button onClick={() => setShowCreateForm(false)} className={styles.cancelButton}>Отмена</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <Preloader />
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Название/Имя</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>Тип</th>
                <th>Статус</th>
                <th>Заказов</th>
                <th>Сумма</th>
                <th>Дата создания</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredCounterparties.length === 0 ? (
                <tr>
                  <td colSpan={9} className={styles.emptyState}>
                    Контрагенты не найдены
                  </td>
                </tr>
              ) : (
                filteredCounterparties.map((counterparty) => (
                  <tr key={counterparty.id}>
                    <td>
                      {editingId === counterparty.id ? (
                        <input
                          type="text"
                          value={editingCounterparty?.name || ''}
                          onChange={(e) => setEditingCounterparty(prev => ({ ...prev, name: e.target.value }))}
                        />
                      ) : (
                        counterparty.name
                      )}
                    </td>
                    <td>
                      {editingId === counterparty.id ? (
                        <input
                          type="email"
                          value={editingCounterparty?.email || ''}
                          onChange={(e) => setEditingCounterparty(prev => ({ ...prev, email: e.target.value }))}
                        />
                      ) : (
                        <a href={`mailto:${counterparty.email}`} className={styles.emailLink}>
                          {counterparty.email}
                        </a>
                      )}
                    </td>
                    <td>
                      {editingId === counterparty.id ? (
                        <input
                          type="tel"
                          value={editingCounterparty?.phone || ''}
                          onChange={(e) => setEditingCounterparty(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      ) : (
                        <a href={`tel:${counterparty.phone}`} className={styles.phoneLink}>
                          {counterparty.phone}
                        </a>
                      )}
                    </td>
                    <td>
                      {editingId === counterparty.id ? (
                        <select
                          value={editingCounterparty?.type || counterparty.type}
                          onChange={(e) => setEditingCounterparty(prev => ({ ...prev, type: e.target.value as 'customer' | 'supplier' | 'partner' }))}
                        >
                          <option value="customer">Клиент</option>
                          <option value="supplier">Поставщик</option>
                          <option value="partner">Партнер</option>
                        </select>
                      ) : (
                        <span 
                          className={styles.badge}
                          style={{ backgroundColor: getTypeColor(counterparty.type) }}
                        >
                          {getTypeLabel(counterparty.type)}
                        </span>
                      )}
                    </td>
                    <td>
                      {editingId === counterparty.id ? (
                        <select
                          value={editingCounterparty?.status || counterparty.status}
                          onChange={(e) => setEditingCounterparty(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' | 'blocked' }))}
                        >
                          <option value="active">Активный</option>
                          <option value="inactive">Неактивный</option>
                          <option value="blocked">Заблокирован</option>
                        </select>
                      ) : (
                        <span 
                          className={styles.badge}
                          style={{ backgroundColor: getStatusColor(counterparty.status) }}
                        >
                          {getStatusLabel(counterparty.status)}
                        </span>
                      )}
                    </td>
                    <td>{counterparty.orders_count || 0}</td>
                    <td>{counterparty.total_spent?.toLocaleString() || 0} ₸</td>
                    <td>{new Date(counterparty.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className={styles.actions}>
                        {editingId === counterparty.id ? (
                          <>
                            <button onClick={saveEdit} className={styles.saveBtn}>Сохранить</button>
                            <button onClick={cancelEdit} className={styles.cancelBtn}>Отмена</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEdit(counterparty)} className={styles.editBtn}>
                              ✏️
                            </button>
                            <button onClick={() => deleteCounterparty(counterparty.id)} className={styles.deleteBtn}>
                              <TrashIcon />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
