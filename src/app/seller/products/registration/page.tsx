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
import styles from './page.module.scss';

interface StockRegistration {
  id: number;
  document_number: string;
  item_name: string;
  storage_name: string;
  amount: number;
  supplier: string;
  created_at: string;
  notes: string;
  status: string;
}

export default function Registration() {
  const [registrations, setRegistrations] = useState<StockRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (!token) {
        console.error('No access token found');
        setLoading(false);
        return;
      }

      const response = await fetch('https://nexus-backend-z66y.onrender.com/api/v1/seller/inventory/registration/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRegistrations(data);
      } else {
        console.error('Failed to fetch registrations:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
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
                  d='M8.00002 10.6669C7.81113 10.6669 7.65291 10.6029 7.52535 10.4749C7.39735 10.3473 7.33335 10.1891 7.33335 10.0002V5.23353L6.08335 6.48353C5.95002 6.61686 5.79447 6.68353 5.61669 6.68353C5.43891 6.68353 5.2778 6.61131 5.13335 6.46686C5.00002 6.33353 4.93624 6.17508 4.94202 5.99153C4.94735 5.80842 5.01113 5.65575 5.13335 5.53353L7.53335 3.13353C7.60002 3.06686 7.67224 3.01953 7.75002 2.99153C7.8278 2.96397 7.91113 2.9502 8.00002 2.9502C8.08891 2.9502 8.17224 2.96397 8.25002 2.99153C8.3278 3.01953 8.40002 3.06686 8.46669 3.13353L10.8667 5.53353C11 5.66686 11.0638 5.82508 11.058 6.0082C11.0527 6.19175 10.9889 6.34464 10.8667 6.46686C10.7334 6.6002 10.5751 6.66953 10.392 6.67486C10.2085 6.68064 10.05 6.61686 9.91669 6.48353L8.66669 5.23353V10.0002C8.66669 10.1891 8.60291 10.3473 8.47535 10.4749C8.34735 10.6029 8.18891 10.6669 8.00002 10.6669ZM4.00002 13.3335C3.63335 13.3335 3.31958 13.2031 3.05869 12.9422C2.79735 12.6809 2.66669 12.3669 2.66669 12.0002V10.6669C2.66669 10.478 2.73046 10.3195 2.85802 10.1915C2.98602 10.064 3.14446 10.0002 3.33335 10.0002C3.52224 10.0002 3.68069 10.064 3.80869 10.1915C3.93624 10.3195 4.00002 10.478 4.00002 10.6669V12.0002H12V10.6669C12 10.478 12.064 10.3195 12.192 10.1915C12.3196 10.064 12.4778 10.0002 12.6667 10.0002C12.8556 10.0002 13.0138 10.064 13.1414 10.1915C13.2694 10.3195 13.3334 10.478 13.3334 10.6669V12.0002C13.3334 12.3669 13.2029 12.6809 12.942 12.9422C12.6807 13.2031 12.3667 13.3335 12 13.3335H4.00002Z'
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
                  <p>Номер</p>
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
                  <p>Дата добавления</p>
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
                <td colSpan={8} style={{ textAlign: 'center', padding: '20px' }}>
                  Загрузка...
                </td>
              </tr>
            ) : registrations.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '20px' }}>
                  Нет данных об оприходовании
                </td>
              </tr>
            ) : (
              registrations.map((registration) => (
                <tr key={registration.id} className={styles['table__body-row']}>
                  <td className={styles['table__body-td']}>
                    <div className={cn(styles['table__information'], styles['first'])}>
                      <input type='checkbox' />
                    </div>
                  </td>

                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>{registration.document_number}</p>
                  </td>

                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>{registration.item_name}</p>
                  </td>

                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>{registration.storage_name}</p>
                  </td>

                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>{registration.created_at}</p>
                  </td>

                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>{registration.supplier}</p>
                  </td>

                  <td className={styles['table__body-td']}>
                    <p className={styles['table__text']}>{registration.amount} шт.</p>
                  </td>

                  <td className={styles['table__body-td']}>
                    <div className={styles['table__select']}>
                      <div></div>
                      <p>{registration.status}</p>
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
                    <button>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='28'
                        height='28'
                        viewBox='0 0 28 28'
                        fill='none'
                      >
                        <mask
                          id='mask0_875_3958'
                          maskUnits='userSpaceOnUse'
                          x='0'
                          y='0'
                          width='28'
                          height='28'
                        >
                          <rect width='28' height='28' fill='#D9D9D9' />
                        </mask>
                        <g mask='url(#mask0_875_3958)'>
                          <path
                            d='M19.5833 11.1458L16.0417 7.64583L17.2083 6.47917C17.5278 6.15972 17.9203 6 18.3858 6C18.8508 6 19.2431 6.15972 19.5625 6.47917L20.7292 7.64583C21.0486 7.96528 21.2153 8.35083 21.2292 8.8025C21.2431 9.25361 21.0903 9.63889 20.7708 9.95833L19.5833 11.1458ZM6.83333 21.2083C6.59722 21.2083 6.39944 21.1283 6.24 20.9683C6.08 20.8089 6 20.6111 6 20.375V18.0208C6 17.9097 6.02083 17.8022 6.0625 17.6983C6.10417 17.5939 6.16667 17.5 6.25 17.4167L14.8333 8.83333L18.375 12.375L9.79167 20.9583C9.70833 21.0417 9.61472 21.1042 9.51083 21.1458C9.40639 21.1875 9.29861 21.2083 9.1875 21.2083H6.83333Z'
                            fill='#EEF0F4'
                          />
                        </g>
                      </svg>
                    </button>
                    <button>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='28'
                        height='28'
                        viewBox='0 0 28 28'
                        fill='none'
                      >
                        <mask
                          id='mask0_875_3961'
                          maskUnits='userSpaceOnUse'
                          x='0'
                          y='0'
                          width='28'
                          height='28'
                        >
                          <rect width='28' height='28' fill='#D9D9D9' />
                        </mask>
                        <g mask='url(#mask0_875_3961)'>
                          <path
                            d='M9.5 22C9.04167 22 8.64944 21.8369 8.32333 21.5108C7.99667 21.1842 7.83333 20.7917 7.83333 20.3333V9.5C7.59722 9.5 7.39917 9.42028 7.23917 9.26083C7.07972 9.10083 7 8.90278 7 8.66667C7 8.43056 7.07972 8.2325 7.23917 8.0725C7.39917 7.91306 7.59722 7.83333 7.83333 7.83333H11.1667C11.1667 7.59722 11.2467 7.39917 11.4067 7.23917C11.5661 7.07972 11.7639 7 12 7H15.3333C15.5694 7 15.7675 7.07972 15.9275 7.23917C16.0869 7.39917 16.1667 7.59722 16.1667 7.83333H19.5C19.7361 7.83333 19.9339 7.91306 20.0933 8.0725C20.2533 8.2325 20.3333 8.43056 20.3333 8.66667C20.3333 8.90278 20.2533 9.10083 20.0933 9.26083C19.9339 9.42028 19.7361 9.5 19.5 9.5V20.3333C19.5 20.7917 19.3369 21.1842 19.0108 21.5108C18.6842 21.8369 18.2917 22 17.8333 22H9.5ZM11.1667 17.8333C11.1667 18.0694 11.2467 18.2672 11.4067 18.4267C11.5661 18.5867 11.7639 18.6667 12 18.6667C12.2361 18.6667 12.4342 18.5867 12.5942 18.4267C12.7536 18.2672 12.8333 18.0694 12.8333 17.8333V12C12.8333 11.7639 12.7536 11.5658 12.5942 11.4058C12.4342 11.2464 12.2361 11.1667 12 11.1667C11.7639 11.1667 11.5661 11.2464 11.4067 11.4058C11.2467 11.5658 11.1667 11.7639 11.1667 12V17.8333ZM14.5 17.8333C14.5 18.0694 14.58 18.2672 14.74 18.4267C14.8994 18.5867 15.0972 18.6667 15.3333 18.6667C15.5694 18.6667 15.7675 18.5867 15.9275 18.4267C16.0869 18.2672 16.1667 18.0694 16.1667 17.8333V12C16.1667 11.7639 16.0869 11.5658 15.9275 11.4058C15.7675 11.2464 15.5694 11.1667 15.3333 11.1667C15.0972 11.1667 14.8994 11.2464 14.74 11.4058C14.58 11.5658 14.5 11.7639 14.5 12V17.8333Z'
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
        <p className={styles['footer__title']}>Показано {registrations.length} записей об оприходовании</p>

        <div className={styles['footer__pagination']}>
          <button>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
            >
              <mask
                id='mask0_199_11017'
                maskUnits='userSpaceOnUse'
                x='0'
                y='0'
                width='20'
                height='20'
              >
                <rect width='20' height='20' fill='#D9D9D9' />
              </mask>
              <g mask='url(#mask0_199_11017)'>
                <path
                  d='M11.0834 14.4165L7.25004 10.5832C7.16671 10.4998 7.10782 10.4096 7.07337 10.3123C7.03837 10.2151 7.02087 10.1109 7.02087 9.99984C7.02087 9.88873 7.03837 9.78456 7.07337 9.68734C7.10782 9.59011 7.16671 9.49984 7.25004 9.4165L11.0834 5.58317C11.2362 5.43039 11.4306 5.354 11.6667 5.354C11.9028 5.354 12.0973 5.43039 12.25 5.58317C12.4028 5.73595 12.4792 5.93039 12.4792 6.1665C12.4792 6.40261 12.4028 6.59706 12.25 6.74984L9.00004 9.99984L12.25 13.2498C12.4028 13.4026 12.4792 13.5971 12.4792 13.8332C12.4792 14.0693 12.4028 14.2637 12.25 14.4165C12.0973 14.5693 11.9028 14.6457 11.6667 14.6457C11.4306 14.6457 11.2362 14.5693 11.0834 14.4165Z'
                  fill='#EEF0F4'
                />
              </g>
            </svg>
          </button>

          <button className={styles['active']}>
            <span>1</span>
          </button>

          <button>
            <span>2</span>
          </button>

          <button>
            <span>3</span>
          </button>

          <button disabled>
            <span>...</span>
          </button>

          <button>
            <span>36</span>
          </button>

          <button>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
            >
              <mask
                id='mask0_199_11031'
                maskUnits='userSpaceOnUse'
                x='0'
                y='0'
                width='20'
                height='20'
              >
                <rect width='20' height='20' fill='#D9D9D9' />
              </mask>
              <g mask='url(#mask0_199_11031)'>
                <path
                  d='M7.25004 14.4165C7.09726 14.2637 7.02087 14.0693 7.02087 13.8332C7.02087 13.5971 7.09726 13.4026 7.25004 13.2498L10.5 9.99984L7.25004 6.74984C7.09726 6.59706 7.02087 6.40261 7.02087 6.1665C7.02087 5.93039 7.09726 5.73595 7.25004 5.58317C7.40282 5.43039 7.59726 5.354 7.83337 5.354C8.06948 5.354 8.26393 5.43039 8.41671 5.58317L12.25 9.4165C12.3334 9.49984 12.3925 9.59011 12.4275 9.68734C12.462 9.78456 12.4792 9.88873 12.4792 9.99984C12.4792 10.1109 12.462 10.2151 12.4275 10.3123C12.3925 10.4096 12.3334 10.4998 12.25 10.5832L8.41671 14.4165C8.26393 14.5693 8.06948 14.6457 7.83337 14.6457C7.59726 14.6457 7.40282 14.5693 7.25004 14.4165Z'
                  fill='#EEF0F4'
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
