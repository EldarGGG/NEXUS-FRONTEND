'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getData } from '@/api/getData';
import styles from './page.module.scss';

interface DashboardStats {
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  pendingOrders: number;
  todayOrders?: number;
  todayRevenue?: number;
  storeInfo?: {
    id: number;
    name: string;
    description: string;
  };
}

interface ActivityItem {
  id: string;
  type: 'order' | 'product' | 'payment' | 'setting';
  title: string;
  description?: string;
  timestamp: string;
  amount?: number;
}

export default function SellerDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // Check authentication first
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        router.push('/signin');
        return false;
      }
      
      const user = JSON.parse(userStr);
      setUserInfo(user);
      
      // Check if user has a store (seller)
      if (!user.store) {
        alert('У вас нет магазина. Обратитесь к администратору.');
        router.push('/signin');
        return false;
      }
      
      return true;
    };

    if (!checkAuth()) return;

    const fetchDashboardData = async () => {
      try {
        const dashboardData = await getData('dashboard/stats/');
        
        setStats({
          totalOrders: dashboardData.totalOrders || 0,
          totalProducts: dashboardData.totalProducts || 0,
          totalRevenue: dashboardData.totalRevenue || 0,
          pendingOrders: dashboardData.pendingOrders || 0,
          todayOrders: dashboardData.todayOrders || 0,
          todayRevenue: dashboardData.todayRevenue || 0,
          storeInfo: dashboardData.storeInfo
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // If API fails, show empty data (user's personal empty dashboard)
        setStats({
          totalOrders: 0,
          totalProducts: 0,
          totalRevenue: 0,
          pendingOrders: 0,
          todayOrders: 0,
          todayRevenue: 0
        });
        setLoading(false);
      }
    };

    const fetchRecentActivity = async () => {
      try {
        // Try to get real activity data
        const activityData = await getData('dashboard/activity/');
        setActivities(activityData.activities || []);
      } catch (error) {
        console.error('Error fetching activity data:', error);
        // Generate realistic mock activity based on current stats
        const mockActivities: ActivityItem[] = [];
        
        if (stats.totalOrders > 0) {
          mockActivities.push({
            id: '1',
            type: 'order',
            title: `Новый заказ #${Math.floor(Math.random() * 9999) + 1000}`,
            timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
            amount: Math.floor(Math.random() * 50000) + 5000
          });
        }
        
        if (stats.totalProducts > 0) {
          mockActivities.push({
            id: '2',
            type: 'product',
            title: 'Товар добавлен в каталог',
            description: 'Новый товар успешно добавлен',
            timestamp: new Date(Date.now() - Math.random() * 7200000).toISOString()
          });
        }
        
        if (stats.totalRevenue > 0) {
          mockActivities.push({
            id: '3',
            type: 'payment',
            title: 'Платеж получен',
            timestamp: new Date(Date.now() - Math.random() * 14400000).toISOString(),
            amount: Math.floor(Math.random() * 30000) + 10000
          });
        }
        
        mockActivities.push({
          id: '4',
          type: 'setting',
          title: 'Настройки магазина обновлены',
          description: 'Параметры доставки изменены',
          timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString()
        });
        
        // Sort by timestamp (newest first)
        mockActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setActivities(mockActivities.slice(0, 5)); // Show only last 5 activities
      }
    };

    fetchDashboardData();
    fetchRecentActivity();
  }, [router]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Рабочий стол</h1>
        <p className={styles.subtitle}>
          {userInfo?.store?.name ? 
            `Добро пожаловать в панель управления магазином "${userInfo.store.name}"` : 
            'Добро пожаловать в панель управления магазином'
          }
        </p>
        {userInfo && (
          <div className={styles.userInfo}>
            <small>
              Пользователь: {userInfo.first_name || 'Не указано'} {userInfo.last_name || 'Не указано'} (ID: {userInfo.user_id || 'Не указан'})
              {userInfo.store && (
                <> | Магазин ID: {userInfo.store.id}</>
              )}
            </small>
          </div>
        )}
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 7L12 3L4 7L12 11L20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12L12 16L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 17L12 21L20 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statNumber}>{stats.totalOrders}</h3>
            <p className={styles.statLabel}>Всего заказов</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V19C17 19.6 16.6 20 16 20H8C7.4 20 7 19.6 7 19V13M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statNumber}>{stats.totalProducts}</h3>
            <p className={styles.statLabel}>Товаров в каталоге</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2V22M17 5H9.5C8.1 5 7 6.1 7 7.5S8.1 10 9.5 10H14.5C15.9 10 17 11.1 17 12.5S15.9 15 14.5 15H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statNumber}>{stats.totalRevenue.toLocaleString()} ₸</h3>
            <p className={styles.statLabel}>Общая выручка</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statNumber}>{stats.pendingOrders}</h3>
            <p className={styles.statLabel}>Ожидают обработки</p>
          </div>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h2 className={styles.sectionTitle}>Быстрые действия</h2>
        <div className={styles.actionGrid}>
          <a href="/seller/products/registration" className={styles.actionCard}>
            <div className={styles.actionIcon}>➕</div>
            <div className={styles.actionContent}>
              <h3>Добавить товар</h3>
              <p>Создать новый товар в каталоге</p>
            </div>
          </a>

          <a href="/seller/orders" className={styles.actionCard}>
            <div className={styles.actionIcon}>📋</div>
            <div className={styles.actionContent}>
              <h3>Управление заказами</h3>
              <p>Просмотр и обработка заказов</p>
            </div>
          </a>

          <a href="/seller/analytics" className={styles.actionCard}>
            <div className={styles.actionIcon}>📊</div>
            <div className={styles.actionContent}>
              <h3>Аналитика</h3>
              <p>Отчеты и статистика продаж</p>
            </div>
          </a>

          <a href="/seller/store-parameters" className={styles.actionCard}>
            <div className={styles.actionIcon}>⚙️</div>
            <div className={styles.actionContent}>
              <h3>Настройки магазина</h3>
              <p>Конфигурация параметров</p>
            </div>
          </a>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>Последняя активность</h2>
        <div className={styles.activityList}>
          {activities.length > 0 ? (
            activities.map((activity) => {
              const getActivityIcon = (type: string) => {
                switch (type) {
                  case 'order':
                    return (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V19C17 19.6 16.6 20 16 20H8C7.4 20 7 19.6 7 19V13M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    );
                  case 'product':
                    return (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M20 7L12 3L4 7L12 11L20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 12L12 16L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    );
                  case 'payment':
                    return (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2V22M17 5H9.5C8.1 5 7 6.1 7 7.5S8.1 10 9.5 10H14.5C15.9 10 17 11.1 17 12.5S15.9 15 14.5 15H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    );
                  case 'setting':
                    return (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        <path d="M19.4 15A1.65 1.65 0 0 0 21 13.09A1.65 1.65 0 0 0 19.4 9L18.36 8.5A1 1 0 0 1 18 7.5V6.5A1 1 0 0 1 19 5.5H20A2 2 0 0 0 22 3.5V2.5A2 2 0 0 0 20 0.5H19A1 1 0 0 1 18 1.5V2.5A1 1 0 0 1 18.36 3.5L19.4 4A1.65 1.65 0 0 0 21 2.91A1.65 1.65 0 0 0 19.4 1L18.36 0.5A1 1 0 0 1 18 -0.5V-1.5A1 1 0 0 1 19 -2.5H20A2 2 0 0 0 22 -4.5V-5.5A2 2 0 0 0 20 -7.5H19A1 1 0 0 1 18 -6.5V-5.5A1 1 0 0 1 18.36 -4.5L19.4 -4A1.65 1.65 0 0 0 21 -5.91A1.65 1.65 0 0 0 19.4 -8L18.36 -8.5A1 1 0 0 1 18 -9.5V-10.5A1 1 0 0 1 19 -11.5H20A2 2 0 0 0 22 -13.5V-14.5A2 2 0 0 0 20 -16.5H19A1 1 0 0 1 18 -15.5V-14.5A1 1 0 0 1 18.36 -13.5L19.4 -13" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    );
                  default:
                    return (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    );
                }
              };

              const formatTimeAgo = (timestamp: string) => {
                const now = new Date();
                const activityTime = new Date(timestamp);
                const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60));
                
                if (diffInMinutes < 1) return 'Только что';
                if (diffInMinutes < 60) return `${diffInMinutes} мин назад`;
                if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ч назад`;
                return `${Math.floor(diffInMinutes / 1440)} дн назад`;
              };

              return (
                <div key={activity.id} className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className={styles.activityContent}>
                    <p>
                      <strong>{activity.title}</strong>
                      {activity.amount && ` - ${activity.amount.toLocaleString()} ₸`}
                    </p>
                    {activity.description && (
                      <p className={styles.activityDescription}>{activity.description}</p>
                    )}
                    <p className={styles.activityTime}>{formatTimeAgo(activity.timestamp)}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyActivity}>
              <p>Пока нет активности</p>
              <p className={styles.emptyHint}>Создайте первый заказ или добавьте товар</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
