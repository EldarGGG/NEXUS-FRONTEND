'use client';

import { useState, useEffect } from 'react';
import cn from 'classnames';

// Components
import { Button } from '@/components/ui/Button';
import { SearchField } from '@/components/shared/SearchField';

// Icon Components
import { PlusIcon } from '@/assets/icons/Plus';
import { FilterIcon } from '@/assets/icons/Filter';
import { ChevronTopIcon } from '@/assets/icons/ChevronTop';
import { ChevronBottomIcon } from '@/assets/icons/ChevronBottom';

// Styles
import styles from '../registration/page.module.scss';

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

export default function WriteDowns() {
  const [writeOffs, setWriteOffs] = useState<WriteOff[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchWriteOffs();
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

  if (!mounted) {
    return <div className={styles['main']}></div>;
  }

  return (
    <div className={styles['main']}>
      <div className={styles['header']}>
        <Button
          theme='outline-blue'
          text='Добавить'
          beforeIcon={<PlusIcon />}
          className={styles['header__add-button']}
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
              <mask
                id='mask0_875_3668'
                maskUnits='userSpaceOnUse'
                x='0'
                y='0'
                width='16'
                height='16'
              >
                <rect width='16' height='16' fill='#D9D9D9' />
              </mask>
              <g mask='url(#mask0_875_3668)'>
                <path
                  d='M8.00002 10.3832C7.91113 10.3832 7.8278 10.3692 7.75002 10.3412C7.67224 10.3136 7.60002 10.2665 7.53335 10.1998L5.13335 7.79984C5.01113 7.67762 4.95002 7.52206 4.95002 7.33317C4.95002 7.14428 5.01113 6.98873 5.13335 6.8665C5.25558 6.74428 5.4138 6.68028 5.60802 6.6745C5.80269 6.66917 5.96113 6.72761 6.08335 6.84984L7.33335 8.09984V3.33317C7.33335 3.14428 7.39735 2.98584 7.52535 2.85784C7.65291 2.73028 7.81113 2.6665 8.00002 2.6665C8.18891 2.6665 8.34735 2.73028 8.47535 2.85784C8.60291 2.98584 8.66669 3.14428 8.66669 3.33317V8.09984L9.91669 6.84984C10.0389 6.72761 10.1974 6.66917 10.392 6.6745C10.5862 6.68028 10.7445 6.74428 10.8667 6.8665C10.9889 6.98873 11.05 7.14428 11.05 7.33317C11.05 7.52206 10.9889 7.67762 10.8667 7.79984L8.46669 10.1998C8.40002 10.2665 8.3278 10.3136 8.25002 10.3412C8.17224 10.3692 8.08891 10.3832 8.00002 10.3832ZM4.00002 13.3332C3.63335 13.3332 3.31958 13.2027 3.05869 12.9418C2.79735 12.6805 2.66669 12.3665 2.66669 11.9998V10.6665C2.66669 10.4776 2.73046 10.3192 2.85802 10.1912C2.98602 10.0636 3.14446 9.99984 3.33335 9.99984C3.52224 9.99984 3.68069 10.0636 3.80869 10.1912C3.93624 10.3192 4.00002 10.4776 4.00002 10.6665V11.9998H12V10.6665C12 10.4776 12.064 10.3192 12.192 10.1912C12.3196 10.0636 12.4778 9.99984 12.6667 9.99984C12.8556 9.99984 13.0138 10.0636 13.1414 10.1912C13.2694 10.3192 13.3334 10.4776 13.3334 10.6665V11.9998C13.3334 12.3665 13.2029 12.6805 12.942 12.9418C12.6807 13.2027 12.3667 13.3332 12 13.3332H4.00002Z'
                  fill='#BAC4D1'
                />
              </g>
            </svg>
            <span>Импортировать</span>
          </button>

          <button className={styles['header__button']}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
            >
              <mask
                id='mask0_875_3176'
                maskUnits='userSpaceOnUse'
                x='0'
                y='0'
                width='16'
                height='16'
              >
                <rect width='16' height='16' fill='#D9D9D9' />
              </mask>
              <g mask='url(#mask0_875_3176)'>
                <path
                  d='M8.00002 5.6165C8.08891 5.6165 8.17224 5.63039 8.25002 5.65817C8.3278 5.68595 8.40002 5.73317 8.46669 5.79984L10.8667 8.19984C10.9889 8.32206 11.05 8.47762 11.05 8.6665C11.05 8.85539 10.9889 9.01095 10.8667 9.13317C10.7445 9.25539 10.5862 9.31939 10.392 9.32484C10.1974 9.33017 10.0389 9.27173 9.91669 9.14984L8.66669 7.89984V12.6665C8.66669 12.8554 8.60291 13.0138 8.47535 13.1418C8.34779 13.2694 8.18891 13.3332 8.00002 13.3332C7.81113 13.3332 7.65269 13.2694 7.52469 13.1418C7.39713 13.0138 7.33335 12.8554 7.33335 12.6665V7.89984L6.08335 9.14984C5.96113 9.27206 5.80269 9.33051 5.60802 9.32517C5.4138 9.31939 5.25558 9.25539 5.13335 9.13317C5.01113 9.01095 4.95002 8.85539 4.95002 8.6665C4.95002 8.47762 5.01113 8.32206 5.13335 8.19984L7.53335 5.79984C7.60002 5.73317 7.67224 5.68595 7.75002 5.65817C7.8278 5.63039 7.91113 5.6165 8.00002 5.6165ZM12 2.6665C12.3667 2.6665 12.6807 2.79706 12.942 3.05817C13.2029 3.31939 13.3334 3.63317 13.3334 3.99984V5.33317C13.3334 5.52206 13.2696 5.68051 13.142 5.80817C13.014 5.93595 12.8556 5.99984 12.6667 5.99984C12.4778 5.99984 12.3196 5.93595 12.192 5.80817C12.064 5.68051 12 5.52206 12 5.33317V3.99984H4.00002V5.33317C4.00002 5.52206 3.93624 5.68051 3.80869 5.80817C3.68113 5.93595 3.52269 5.99984 3.33335 5.99984C3.14446 5.99984 2.98602 5.93595 2.85802 5.80817C2.73046 5.68051 2.66669 5.52206 2.66669 5.33317V3.99984C2.66669 3.63317 2.79735 3.31939 3.05869 3.05817C3.31958 2.79706 3.63335 2.6665 4.00002 2.6665H12Z'
                  fill='#BAC4D1'
                />
              </g>
            </svg>
            <span>Экспортировать</span>
          </button>
        </div>
      </div>

      <div className={styles['filter']}>
        <SearchField placeholder='Поиск документа' />
        <button className={styles['filter__button']}>
          <FilterIcon />
        </button>
      </div>

      <div className={styles['table-container']}>
        <table className={styles['table']}>
          <thead className={styles['table__head']}>
            <tr>
              <th className={styles['table__head-th']}>
                <div className={cn(styles['table__head-element'], styles['first'])}>
                  <input type='checkbox' />
                </div>
              </th>
              <th className={styles['table__head-th']}>
                <div className={styles['table__head-element']}>
                  <p>№ документа</p>
                  <span>
                    <ChevronTopIcon />
                    <ChevronBottomIcon />
                  </span>
                </div>
              </th>
              <th className={styles['table__head-th']}>
                <div className={styles['table__head-element']}>
                  <p>Товар</p>
                  <span>
                    <ChevronTopIcon />
                    <ChevronBottomIcon />
                  </span>
                </div>
              </th>
              <th className={styles['table__head-th']}>
                <div className={styles['table__head-element']}>
                  <p>Склад</p>
                  <span>
                    <ChevronTopIcon />
                    <ChevronBottomIcon />
                  </span>
                </div>
              </th>
              <th className={styles['table__head-th']}>
                <div className={styles['table__head-element']}>
                  <p>Дата списания</p>
                  <span>
                    <ChevronTopIcon />
                    <ChevronBottomIcon />
                  </span>
                </div>
              </th>
              <th className={styles['table__head-th']}>
                <div className={styles['table__head-element']}>
                  <p>Кол-во</p>
                  <span>
                    <ChevronTopIcon />
                    <ChevronBottomIcon />
                  </span>
                </div>
              </th>
              <th className={styles['table__head-th']}>
                <div className={styles['table__head-element']}>
                  <p>Причина</p>
                  <span>
                    <ChevronTopIcon />
                    <ChevronBottomIcon />
                  </span>
                </div>
              </th>
              <th className={styles['table__head-th']}>
                <div className={styles['table__head-element']}>
                  <p>Статус</p>
                  <span>
                    <ChevronTopIcon />
                    <ChevronBottomIcon />
                  </span>
                </div>
              </th>
              <th className={styles['table__head-th']}>
                <div className={cn(styles['table__head-element'], styles['last'])}>
                  <p>Опции</p>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className={styles['table__body']}>
            {loading ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '20px' }}>
                  Загрузка...
                </td>
              </tr>
            ) : writeOffs.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '20px' }}>
                  Нет данных о списаниях
                </td>
              </tr>
            ) : (
              writeOffs.map((writeOff) => (
                <tr key={writeOff.id} className={styles['table__body-row']}>
                  <td className={styles['table__body-td']}>
                    <div className={cn(styles['table__information'], styles['first'])}>
                      <input type='checkbox' />
                    </div>
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
                    <p className={styles['table__text']}>{writeOff.created_at}</p>
                  </td>
                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>{writeOff.amount} шт.</p>
                  </td>
                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>{writeOff.reason}</p>
                  </td>
                  <td className={styles['table__body-td']}>
                    <div className={styles['table__select']}>
                      <div></div>
                      <p>{writeOff.status}</p>
                    </div>
                  </td>
                  <td className={styles['table__body-td']}>
                    <div className={styles['table__body-options']}>
                      <button>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='28'
                          height='28'
                          viewBox='0 0 28 28'
                          fill='none'
                        >
                          <mask
                            id='mask0_875_3955'
                            maskUnits='userSpaceOnUse'
                            x='0'
                            y='0'
                            width='28'
                            height='28'
                          >
                            <rect width='28' height='28' fill='#D9D9D9' />
                          </mask>
                          <g mask='url(#mask0_875_3955)'>
                            <path
                              d='M14.0208 18C15.0625 18 15.9481 17.6356 16.6775 16.9067C17.4064 16.1772 17.7708 15.2917 17.7708 14.25C17.7708 13.2083 17.4064 12.3228 16.6775 11.5933C15.9481 10.8644 15.0625 10.5 14.0208 10.5C12.9792 10.5 12.0936 10.8644 11.3642 11.5933C10.6353 12.3228 10.2708 13.2083 10.2708 14.25C10.2708 15.2917 10.6353 16.1772 11.3642 16.9067C12.0936 17.6356 12.9792 18 14.0208 18ZM14.0208 16.5C13.3958 16.5 12.8647 16.2811 12.4275 15.8433C11.9897 15.4061 11.7708 14.875 11.7708 14.25C11.7708 13.625 11.9897 13.0936 12.4275 12.6558C12.8647 12.2186 13.3958 12 14.0208 12C14.6458 12 15.1772 12.2186 15.615 12.6558C16.0522 13.0936 16.2708 13.625 16.2708 14.25C16.2708 14.875 16.0522 15.4061 15.615 15.8433C15.1772 16.2811 14.6458 16.5 14.0208 16.5ZM14.0208 20.5C12.0903 20.5 10.3264 19.9897 8.72917 18.9692C7.13194 17.9481 5.92361 16.5694 5.10417 14.8333C5.0625 14.7639 5.03472 14.6769 5.02083 14.5725C5.00694 14.4686 5 14.3611 5 14.25C5 14.1389 5.00694 14.0311 5.02083 13.9267C5.03472 13.8228 5.0625 13.7361 5.10417 13.6667C5.92361 11.9306 7.13194 10.5522 8.72917 9.53167C10.3264 8.51056 12.0903 8 14.0208 8C15.9514 8 17.7153 8.51056 19.3125 9.53167C20.9097 10.5522 22.1181 11.9306 22.9375 13.6667C22.9792 13.7361 23.0069 13.8228 23.0208 13.9267C23.0347 14.0311 23.0417 14.1389 23.0417 14.25C23.0417 14.3611 23.0347 14.4686 23.0208 14.5725C23.0069 14.6769 22.9792 14.7639 22.9375 14.8333C22.1181 16.5694 20.9097 17.9481 19.3125 18.9692C17.7153 19.9897 15.9514 20.5 14.0208 20.5Z'
                              fill='#EEF0F4'
                            />
                          </g>
                        </svg>
                      </button>
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
