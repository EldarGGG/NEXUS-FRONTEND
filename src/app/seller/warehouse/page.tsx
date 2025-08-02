'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import cn from 'classnames';

// Components
import { Button } from '@/components/ui/Button';
import { AddWarehouseModal } from '@/components/modals/seller/warehouse/AddWarehouse';

// Icon Components
import { PlusIcon } from '@/assets/icons/Plus';

// Styles
import styles from './page.module.scss';

interface WarehouseStats {
  totalProducts: number;
  totalStock: number;
  lowStockCount: number;
  storageCount: number;
}

export default function Warehouse() {
  const [stats, setStats] = useState<WarehouseStats>({
    totalProducts: 0,
    totalStock: 0,
    lowStockCount: 0,
    storageCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isShowAddWarehouseModal, setIsShowAddWarehouseModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchWarehouseStats();
  }, []);

  const fetchWarehouseStats = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (!token) {
        setLoading(false);
        return;
      }

      // For now, we'll use mock data. Later this can be connected to real API
      setStats({
        totalProducts: 45,
        totalStock: 1250,
        lowStockCount: 3,
        storageCount: 4
      });
    } catch (error) {
      console.error('Error fetching warehouse stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return <div className={styles['main']}></div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.left}>
          <h1 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Склад</h1>
          <p style={{ color: '#9CA3AF', fontSize: '0.875rem', margin: 0 }}>Управление складскими операциями</p>
        </div>
        <div className={styles.right}>
          <Button 
            theme="blue" 
            text="Добавить склад" 
            beforeIcon={<PlusIcon />} 
            className={styles['header__add-button']}
            onClick={() => setIsShowAddWarehouseModal(true)}
          />
          <Link href="/seller/warehouse/stock" className={styles['header__button']}>
            <span>Остатки</span>
          </Link>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles['stat-card']}>
          <div className={styles['stat-number']}>{stats.totalProducts}</div>
          <div className={styles['stat-label']}>Всего товаров</div>
        </div>
        <div className={styles['stat-card']}>
          <div className={styles['stat-number']}>{stats.totalStock}</div>
          <div className={styles['stat-label']}>Общий остаток</div>
        </div>
        <div className={styles['stat-card']}>
          <div className={styles['stat-number']}>{stats.lowStockCount}</div>
          <div className={styles['stat-label']}>Заканчивается</div>
        </div>
        <div className={styles['stat-card']}>
          <div className={styles['stat-number']}>{stats.storageCount}</div>
          <div className={styles['stat-label']}>Складов</div>
        </div>
      </div>

      {/* Action Cards */}
      <div className={styles['actions']}>
        <Link href="/seller/warehouse/storages" className={styles['action-card']}>
          <div className={styles['action-icon']}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 2H4c-1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16z" fill="currentColor"/>
              <path d="M7 7h4v4H7zm0 6h4v4H7zm6-6h4v4h-4zm0 6h4v4h-4z" fill="currentColor"/>
            </svg>
          </div>
          <div className={styles['action-content']}>
            <h3>Склады</h3>
            <p>Управление складами и помещениями</p>
          </div>
        </Link>
        
        <Link href="/seller/warehouse/stock" className={styles['action-card']}>
          <div className={styles['action-icon']}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" fill="currentColor"/>
            </svg>
          </div>
          <div className={styles['action-content']}>
            <h3>Остатки товаров</h3>
            <p>Просмотр количества товаров на складах</p>
          </div>
        </Link>

        <Link href="/seller/warehouse/registration" className={styles['action-card']}>
          <div className={styles['action-icon']}>
            <PlusIcon />
          </div>
          <div className={styles['action-content']}>
            <h3>Оприходование</h3>
            <p>Поступление товаров на склад</p>
          </div>
        </Link>

        <Link href="/seller/warehouse/write-offs" className={styles['action-card']}>
          <div className={styles['action-icon']}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
            </svg>
          </div>
          <div className={styles['action-content']}>
            <h3>Списание</h3>
            <p>Списание товаров со склада</p>
          </div>
        </Link>

        <Link href="/seller/warehouse/inventory" className={styles['action-card']}>
          <div className={styles['action-icon']}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
            </svg>
          </div>
          <div className={styles['action-content']}>
            <h3>Инвентаризация</h3>
            <p>Проверка остатков товаров</p>
          </div>
        </Link>

        <Link href="/seller/warehouse/movements" className={styles['action-card']}>
          <div className={styles['action-icon']}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
            </svg>
          </div>
          <div className={styles['action-content']}>
            <h3>Движения товаров</h3>
            <p>История всех операций</p>
          </div>
        </Link>

        <Link href="/seller/warehouse/reports" className={styles['action-card']}>
          <div className={styles['action-icon']}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor"/>
            </svg>
          </div>
          <div className={styles['action-content']}>
            <h3>Отчеты</h3>
            <p>Аналитика по складу</p>
          </div>
        </Link>

        <Link href="/seller/warehouse/settings" className={styles['action-card']}>
          <div className={styles['action-icon']}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" fill="currentColor"/>
            </svg>
          </div>
          <div className={styles['action-content']}>
            <h3>Настройки склада</h3>
            <p>Управление складами и настройки</p>
          </div>
        </Link>
      </div>

      {/* Modals */}
      {isShowAddWarehouseModal && (
        <AddWarehouseModal 
          onClose={() => setIsShowAddWarehouseModal(false)}
          onSuccess={() => {
            fetchWarehouseStats();
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
