'use client';

import { useRouter } from 'next/navigation';
import cn from 'classnames';

import Link from 'next/link';
import { StatusSelect } from '@/components/shared/orders/StatusSelect';

import styles from './page.module.scss';
import { SettingsIcon } from '@/assets/icons/Settings';
import { CalendarIcon } from '@/assets/icons/Calendar';
import Image from 'next/image';

export default function OrdersID() {
  const router = useRouter();

  return (
    <div className={styles['main']}>
      <div className={styles['information']}>
        <div className={styles['information__header']}>
          <button onClick={() => router.back()} className={styles['information__header-button']}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='22'
              height='21'
              viewBox='0 0 22 21'
              fill='none'
            >
              <path
                d='M21 11.5C21.5523 11.5 22 11.0523 22 10.5C22 9.94772 21.5523 9.5 21 9.5V11.5ZM0.292893 9.79289C-0.0976311 10.1834 -0.0976311 10.8166 0.292893 11.2071L6.65685 17.5711C7.04738 17.9616 7.68054 17.9616 8.07107 17.5711C8.46159 17.1805 8.46159 16.5474 8.07107 16.1569L2.41421 10.5L8.07107 4.84315C8.46159 4.45262 8.46159 3.81946 8.07107 3.42893C7.68054 3.03841 7.04738 3.03841 6.65685 3.42893L0.292893 9.79289ZM21 9.5H1V11.5H21V9.5Z'
                fill='#7D8FA9'
              />
            </svg>
          </button>

          <p className={styles['information__header-title']}>Заказ №1000000</p>

          <StatusSelect />
        </div>

        <div className={styles['information__nav']}>
          <Link href={'#'} className={cn(styles['information__nav-link'], styles['active'])}>
            <span>Основные</span>
          </Link>
          <Link href={'#'} className={styles['information__nav-link']}>
            <span>Товары</span>
          </Link>
          <Link href={'#'} className={styles['information__nav-link']}>
            <span>Документы</span>
          </Link>
          <Link href={'#'} className={styles['information__nav-link']}>
            <SettingsIcon />
            <span>Настроить</span>
          </Link>
        </div>

        <div className={styles['information__order']}>
          <table>
            <tbody>
              <tr>
                <td>
                  <span>Сумма</span>
                </td>
                <td>
                  <span>100 000 ₸</span>
                </td>
              </tr>

              <tr>
                <td>
                  <span>Отвественный</span>
                </td>
                <td>
                  <select>
                    <option value='Магомед' defaultChecked>
                      Магомед
                    </option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <span>Тип цены</span>
                </td>
                <td>
                  <select>
                    <option value='Розничная' defaultChecked>
                      Розничная
                    </option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <span>Тип оплаты</span>
                </td>
                <td>
                  <select>
                    <option value='Kaspi Gold' defaultChecked>
                      Kaspi Gold
                    </option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <span>Склад</span>
                </td>
                <td>
                  <select>
                    <option value='Kaspi Gold' defaultChecked>
                      Основной склад
                    </option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <span>Проект</span>
                </td>
                <td>
                  <select>
                    <option value='Kaspi Gold' defaultChecked>
                      Не указано
                    </option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <CalendarIcon />
                  <span>Дата доставки</span>
                </td>
                <td>
                  <span>13.09.2023</span>
                </td>
              </tr>

              <tr>
                <td>
                  <span>Комменатрий к заказу</span>
                </td>
                <td>
                  <span>Доставить до обеда</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles['information__company']}>
          <div className={styles['information__company-user']}>
            <div>
              <Image src={require('@/assets/images/client.png')} alt='' />
              <Image src={require('@/assets/images/icons/telegram.png')} alt='' />
            </div>
            <p>Клиент</p>
          </div>

          <table>
            <tbody>
              <tr>
                <td>
                  <span>Компания</span>
                </td>
                <td>
                  <span>Nexus Market</span>
                </td>
              </tr>

              <tr>
                <td>
                  <span>Тип контрагента</span>
                </td>
                <td>
                  <span>Юридическое лицо</span>
                </td>
              </tr>

              <tr>
                <td>
                  <span>Раб. телефон</span>
                </td>
                <td>
                  <span>+7 (747) 103-23-23</span>
                </td>
              </tr>

              <tr>
                <td>
                  <span>Email раб.</span>
                </td>
                <td>
                  <span>nexusmarket@gmail.com</span>
                </td>
              </tr>

              <tr>
                <td>
                  <span>ИИН/БИН</span>
                </td>
                <td>
                  <span>1234443211234</span>
                </td>
              </tr>

              <tr>
                <td>
                  <span>Город</span>
                </td>
                <td>
                  <span>Караганда</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles['chat']}>
        <div className={styles['chat-header']}>
          <p className={styles['chat-header__title']}>Создан новый заказ №000001</p>
          <p className={styles['chat-header__date']}>Сегодня, 20:03</p>
        </div>

        <div className={styles['chat-messages']}>
          <div className={styles['chat-messages__message']}>
            <div className={styles['user']}>
              <Image src={require('@/assets/images/client.png')} alt='' />
              <Image src={require('@/assets/images/icons/telegram.png')} alt='' />
            </div>

            <div className={styles['message']}>
              <p className={styles['message__text']}>
                Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum
                является стандартной рыбой для текстов на латинице с начала XVI века.
              </p>

              <span className={styles['message__date']}>Сегодня, 20:03</span>
            </div>
          </div>

          <div className={cn(styles['chat-messages__message'], styles['my'])}>
            <div className={styles['user']}>
              <Image src={require('@/assets/images/client.png')} alt='' />
              <Image src={require('@/assets/images/icons/telegram.png')} alt='' />
            </div>

            <div className={styles['message']}>
              <p className={styles['message__text']}>
                Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum
                является стандартной рыбой для текстов на латинице с начала XVI века. В то время
                некий безымянный печатник создал большую коллекцию размеров и форм шрифтов,
                используя Lorem Ipsum для распечатки образцов.
              </p>

              <span className={styles['message__date']}>Сегодня, 20:03</span>
            </div>
          </div>

          <div className={styles['chat-messages__message']}>
            <div className={styles['user']}>
              <Image src={require('@/assets/images/client.png')} alt='' />
              <Image src={require('@/assets/images/icons/telegram.png')} alt='' />
            </div>

            <div className={styles['message']}>
              <p className={styles['message__text']}>
                Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum
                является стандартной рыбой для текстов на латинице с начала XVI века.
              </p>

              <span className={styles['message__date']}>Сегодня, 20:03</span>
            </div>
          </div>
        </div>

        <div className={styles['chat-order']}>
          <div className={styles['header']}>
            <p className={styles['header__title']}>
              В заказ №000001 от 13.09.2023 добавлены товары:
            </p>
            <span className={styles['header__date']}>Сегодня, 20:03</span>
          </div>
          <table className={styles['table']}>
            <thead>
              <tr>
                <th>
                  <p>№</p>
                </th>

                <th>
                  <p>Товар</p>
                </th>

                <th>
                  <p>Цена</p>
                </th>

                <th>
                  <p>Количество</p>
                </th>

                <th>
                  <p>Сумма</p>
                </th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3].map((idx) => (
                <tr key={idx}>
                  <td>
                    <p>{idx}</p>
                  </td>

                  <td>
                    <div>
                      <Image src={require('@/assets/images/test/cake.png')} alt='' />

                      <p>Торт “Чизкейк”</p>
                      <p>Кондитерская</p>
                    </div>
                  </td>

                  <td>
                    <p>10 000 ₸</p>
                  </td>

                  <td>
                    <p>30 шт.</p>
                  </td>

                  <td>
                    <p>300 000 ₸</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles['footer']}>
            <div className={styles['footer__item']}>
              <p>Итого к оплате:</p>
              <span>400 000 ₸</span>
            </div>

            <div className={styles['footer__item']}>
              <p>НДС:</p>
              <span>48 000 ₸</span>
            </div>

            <div className={styles['footer__item']}>
              <p>Количество:</p>
              <span>2</span>
            </div>

            <div className={styles['footer__item']}>
              <p>Вес:</p>
              <span>0</span>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className={styles['chat-message-bar']}>
          <div className={styles['chat-message-bar__other']}>
            <button type='button'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='17'
                viewBox='0 0 16 17'
                fill='none'
              >
                <g clipPath='url(#clip0_555_10286)'>
                  <path
                    opacity='0.95'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M7.29688 0.484375C7.75522 0.484375 8.21353 0.484375 8.67188 0.484375C11.8052 0.876275 14.0396 2.50128 15.375 5.35938C15.6967 6.14638 15.8999 6.95888 15.9844 7.79688C15.9844 8.25522 15.9844 8.71353 15.9844 9.17188C15.5925 12.3052 13.9675 14.5396 11.1094 15.875C10.3224 16.1967 9.50988 16.3999 8.67188 16.4844C8.21353 16.4844 7.75522 16.4844 7.29688 16.4844C4.16356 16.0925 1.92919 14.4675 0.59375 11.6094C0.271998 10.8224 0.0688728 10.0099 -0.015625 9.17188C-0.015625 8.71353 -0.015625 8.25522 -0.015625 7.79688C0.376275 4.66356 2.00128 2.42919 4.85938 1.09375C5.64638 0.771998 6.45888 0.568873 7.29688 0.484375ZM7.42188 1.20312C10.4588 1.11442 12.7661 2.354 14.3438 4.92188C15.4558 7.03981 15.56 9.20647 14.6562 11.4219C13.5939 13.6505 11.8596 15.0515 9.45312 15.625C6.62759 16.0999 4.26822 15.2718 2.375 13.1406C0.767987 11.0933 0.320072 8.81203 1.03125 6.29688C1.9674 3.65934 3.79553 2.00829 6.51562 1.34375C6.82156 1.29192 7.12362 1.24504 7.42188 1.20312Z'
                    fill='#EEF0F4'
                  />
                  <path
                    opacity='0.945'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M4.89068 6.04695C5.76677 5.96145 6.4074 6.3052 6.81255 7.0782C6.92199 7.33901 6.96368 7.60986 6.93755 7.8907C6.8268 8.13867 6.64449 8.20639 6.39068 8.09383C6.35421 8.05736 6.31777 8.02092 6.2813 7.98445C6.26233 7.66064 6.15818 7.36898 5.9688 7.10945C5.43902 6.64317 4.91818 6.65358 4.4063 7.1407C4.24827 7.36483 4.16493 7.61483 4.1563 7.8907C4.06774 8.11464 3.90627 8.19276 3.67193 8.12508C3.50174 8.03723 3.42883 7.89661 3.45318 7.7032C3.55458 6.8207 4.03374 6.26861 4.89068 6.04695Z'
                    fill='#EEF0F4'
                  />
                  <path
                    opacity='0.945'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10.4531 6.04695C11.3292 5.96145 11.9698 6.3052 12.375 7.0782C12.4894 7.33792 12.5311 7.60876 12.5 7.8907C12.3892 8.13867 12.2069 8.20639 11.9531 8.09383C11.887 8.03973 11.8401 7.97201 11.8125 7.8907C11.7786 7.21633 11.4296 6.84133 10.7656 6.7657C10.3161 6.79339 9.99839 7.01214 9.81248 7.42195C9.77083 7.60945 9.72914 7.79695 9.68748 7.98445C9.47914 8.1928 9.27083 8.1928 9.06248 7.98445C8.99626 6.96123 9.45983 6.31539 10.4531 6.04695Z'
                    fill='#EEF0F4'
                  />
                  <path
                    opacity='0.948'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M4.79691 10.2031C4.89653 10.2068 4.99028 10.2328 5.07816 10.2812C6.33916 11.5704 7.81832 11.9037 9.51566 11.2812C10.044 11.0446 10.5023 10.7113 10.8907 10.2812C11.1965 10.1477 11.3944 10.2414 11.4844 10.5625C11.4655 10.6432 11.4395 10.7214 11.4063 10.7969C9.92613 12.2968 8.19175 12.6875 6.20316 11.9688C5.53882 11.7 4.98153 11.2885 4.53128 10.7344C4.43944 10.4654 4.528 10.2883 4.79691 10.2031Z'
                    fill='#EEF0F4'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_555_10286'>
                    <rect width='16' height='16' fill='white' transform='translate(0 0.5)' />
                  </clipPath>
                </defs>
              </svg>
            </button>

            <button type='button'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='21'
                viewBox='0 0 20 21'
                fill='none'
              >
                <mask
                  id='mask0_555_10262'
                  maskUnits='userSpaceOnUse'
                  x='0'
                  y='0'
                  width='20'
                  height='21'
                >
                  <rect y='0.5' width='20' height='20' fill='#D9D9D9' />
                </mask>
                <g mask='url(#mask0_555_10262)'>
                  <path
                    d='M9.58333 18.8334C8.30556 18.8334 7.22222 18.389 6.33333 17.5001C5.44444 16.6112 5 15.5279 5 14.2501V5.50008C5 4.58341 5.32639 3.79869 5.97917 3.14591C6.63194 2.49314 7.41667 2.16675 8.33333 2.16675C9.25 2.16675 10.0347 2.49314 10.6875 3.14591C11.3403 3.79869 11.6667 4.58341 11.6667 5.50008V13.4167C11.6667 14.0001 11.4653 14.4931 11.0625 14.8959C10.6597 15.2987 10.1667 15.5001 9.58333 15.5001C9 15.5001 8.50694 15.2987 8.10417 14.8959C7.70139 14.4931 7.5 14.0001 7.5 13.4167V6.12508C7.5 5.94453 7.55917 5.79536 7.6775 5.67758C7.79528 5.55925 7.94444 5.50008 8.125 5.50008C8.30556 5.50008 8.455 5.55925 8.57333 5.67758C8.69111 5.79536 8.75 5.94453 8.75 6.12508V13.4167C8.75 13.6529 8.83 13.8506 8.99 14.0101C9.14944 14.1701 9.34722 14.2501 9.58333 14.2501C9.81944 14.2501 10.0175 14.1701 10.1775 14.0101C10.3369 13.8506 10.4167 13.6529 10.4167 13.4167V5.50008C10.4167 4.91675 10.2153 4.42369 9.8125 4.02091C9.40972 3.61814 8.91667 3.41675 8.33333 3.41675C7.75 3.41675 7.25694 3.61814 6.85417 4.02091C6.45139 4.42369 6.25 4.91675 6.25 5.50008V14.2501C6.25 15.1667 6.57639 15.9515 7.22917 16.6042C7.88194 17.257 8.66667 17.5834 9.58333 17.5834C10.5 17.5834 11.2847 17.257 11.9375 16.6042C12.5903 15.9515 12.9167 15.1667 12.9167 14.2501V6.12508C12.9167 5.94453 12.9758 5.79536 13.0942 5.67758C13.2119 5.55925 13.3611 5.50008 13.5417 5.50008C13.7222 5.50008 13.8717 5.55925 13.99 5.67758C14.1078 5.79536 14.1667 5.94453 14.1667 6.12508V14.2501C14.1667 15.5279 13.7222 16.6112 12.8333 17.5001C11.9444 18.389 10.8611 18.8334 9.58333 18.8334Z'
                    fill='#BAC4D1'
                  />
                </g>
              </svg>
            </button>
          </div>

          <input
            className={styles['chat-message-bar__field']}
            placeholder='Введите текст'
            type='text'
          />

          <button type='submit' className={styles['chat-message-bar__button']}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='25'
              viewBox='0 0 24 25'
              fill='none'
            >
              <mask
                id='mask0_555_10236'
                maskUnits='userSpaceOnUse'
                x='0'
                y='0'
                width='24'
                height='25'
              >
                <rect y='0.5' width='24' height='24' fill='#D9D9D9' />
              </mask>
              <g mask='url(#mask0_555_10236)'>
                <path
                  d='M4.4 19.9251C4.06667 20.0584 3.75 20.0291 3.45 19.8371C3.15 19.6457 3 19.3667 3 19.0001V15.2751C3 15.0417 3.06667 14.8334 3.2 14.6501C3.33333 14.4667 3.51667 14.3501 3.75 14.3001L11 12.5001L3.75 10.7001C3.51667 10.6501 3.33333 10.5334 3.2 10.3501C3.06667 10.1667 3 9.95839 3 9.72506V6.00006C3 5.63339 3.15 5.35406 3.45 5.16206C3.75 4.97072 4.06667 4.94172 4.4 5.07506L19.8 11.5751C20.2167 11.7584 20.425 12.0667 20.425 12.5001C20.425 12.9334 20.2167 13.2417 19.8 13.4251L4.4 19.9251Z'
                  fill='#EEF0F4'
                />
              </g>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
