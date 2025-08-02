'use client';

import cn from 'classnames';
import { useState, useEffect } from 'react';
import { getData } from '@/api/getData';

import { CreateOrder } from '@/components/modals/CreateOrder';
import Link from 'next/link';
import Image from 'next/image';
import FilterRowIcon from '@/assets/icons/filters/filter-row.svg';
import FilterColumnIcon from '@/assets/icons/filters/filter-column.svg';
import styles from './page.module.scss';

import { PlusIcon } from '@/assets/icons/Plus';
import { ChevronTopIcon } from '@/assets/icons/ChevronTop';
import { ChevronBottomIcon } from '@/assets/icons/ChevronBottom';
import { CalendarIcon } from '@/assets/icons/Calendar';
import { FilterIcon } from '@/assets/icons/Filter';
import { StatusSelect } from '@/components/shared/orders/StatusSelect';

interface Order {
  id: number;
  order_number: string;
  customer: string;
  customer_name: string;
  total: number;
  status: string;
  status_display: string;
  created_at: string;
  updated_at: string;
  comment: string;
  delivery_address: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
}

export default function Orders() {
  const [isShowCreateOrderModal, setIsShowCreateOrderModal] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersData = await getData('seller/orders/');
      setOrders(ordersData || []);
      setTotalOrders(ordersData?.length || 0);
      setTotalRevenue(ordersData?.reduce((sum: number, order: Order) => sum + order.total, 0) || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
      setTotalOrders(0);
      setTotalRevenue(0);
      setLoading(false);
    }
  };

  const handleToggleCreateOrderModal = () => {
    setIsShowCreateOrderModal((prev) => !prev);
  };

  const handleCloseCreateOrderModal = () => {
    setIsShowCreateOrderModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'processing': return '#3B82F6';
      case 'delivered': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  return (
    <div className={styles['main']}>
      {/* Modals */}
      {isShowCreateOrderModal && <CreateOrder onClose={handleCloseCreateOrderModal} />}

      <div className={styles['order-management']}>
        <div className={styles['order-management__header']}>
          <div className={styles['order-management__info']}>
            <h2 className={styles['order-management__title']}>
              {loading ? 'Загрузка...' : `${totalOrders} ${totalOrders === 1 ? 'заказ' : totalOrders < 5 ? 'заказа' : 'заказов'}, ${totalRevenue.toLocaleString('ru-RU')} ₸`}
            </h2>
          </div>

          <div className={styles['order-management__actions']}>
            <button
              onClick={handleToggleCreateOrderModal}
              className={styles['order-management__create-order']}
            >
              <PlusIcon />
              <span>Создать заказ</span>
            </button>
          </div>
        </div>

        <div className={styles['order-management__table']}>
          <table className={styles['table']}>
            <thead className={styles['table__head']}>
              <tr>
                <th className={styles['table__head-th']}>
                  <div className={cn(styles['table__head-element'], styles['first'])}>
                    <p>Контрагент</p>
                    <span>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </span>
                  </div>
                </th>

                <th className={styles['table__head-th']}>
                  <div className={styles['table__head-element']}>
                    <p>Номер заказа</p>
                    <span>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </span>
                  </div>
                </th>

                <th className={styles['table__head-th']}>
                  <div className={styles['table__head-element']}>
                    <p>Сумма</p>
                    <span>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </span>
                  </div>
                </th>

                <th className={styles['table__head-th']}>
                  <div className={cn(styles['table__head-element'], styles['last'])}>
                    <p>Статус</p>
                    <span>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className={styles['table__body']}>
              {!mounted ? (
                // Show completely empty during SSR to avoid any hydration conflicts
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'transparent' }}>
                    .
                  </td>
                </tr>
              ) : loading ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>
                    Загрузка заказов...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>
                    У вас пока нет заказов
                  </td>
                </tr>
              ) : (
                orders.map((order, key) => (
                  <tr key={order.id} className={styles['table__body-row']}>
                    <td className={styles['table__body-td']}>
                      <div className={cn(styles['table__information'], styles['first'])}>
                        <div className={styles['table__information-photo']}>
                          <Image src={require('@/assets/images/client.png')} alt='' />

                          <Image
                            className={styles['telegram']}
                            src={require('@/assets/images/icons/telegram.png')}
                            alt=''
                          />
                        </div>

                        <p className={styles['table__information-name']}>{order.customer || 'Клиент'}</p>
                        <p className={styles['table__information-last-online']}>{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                    </td>

                    <td className={styles['table__body-td']}>
                      <p className={styles['table__text']}>
                        <Link href={`orders/${order.id}`}>№{order.order_number}</Link>
                      </p>
                    </td>

                    <td className={styles['table__body-td']}>
                      <p className={styles['table__text']}>{order.total} ₸</p>
                    </td>

                    <td className={styles['table__body-td']}>
                      <StatusSelect />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
