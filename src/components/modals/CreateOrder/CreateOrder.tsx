'use client';

// Utils
import { useEffect, useState } from 'react';
import cn from 'classnames';

// Styles
import styles from './CreateOrder.module.scss';

// Icon Components
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeft';
import { ChevronTopIcon } from '@/assets/icons/ChevronTop';
import { ChevronBottomIcon } from '@/assets/icons/ChevronBottom';

// Components
import Image from 'next/image';
import { SearchField } from '@/components/shared/SearchField';
import { CreateOrderCounter } from './CreateOrderCounter';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';

// Types
import type { CatalogProps, CreateOrderProps, OrderProps } from './types';
import { useSelector } from '@/hooks/useSelector';

export function CreateOrder({ onClose }: CreateOrderProps) {
  const categories = useSelector((state) => state.categories);

  const [modalPage, setModalPage] = useState<number>(1);

  function handleBack() {
    if (modalPage === 1) {
      return onClose();
    }

    if (modalPage === 2) {
      return setModalPage(1);
    }
  }

  function handleNext() {
    if (modalPage === 1) {
      return setModalPage(2);
    }

    if (modalPage === 2) {
      return setModalPage(3);
    }
  }

  return (
    <div className={styles['create-order']}>
      <div onClick={onClose} className={styles['create-order__space']}></div>

      {modalPage === 1 && (
        <Catalog categories={categories} onClose={onClose} handleNext={handleNext} />
      )}
      {modalPage === 2 && (
        <Order
          categories={categories}
          onClose={onClose}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}
      {modalPage === 3 && <Success onClose={onClose} />}
    </div>
  );
}

function Order({ onClose, handleBack, categories, handleNext }: OrderProps) {
  return (
    <div className={styles['create-order__main']}>
      <div className={styles['header']}>
        <div className={styles['header__left']}>
          <button onClick={handleBack} className={styles['header__button']}>
            <ArrowLeftIcon />
          </button>
          <p className={styles['header__title']}>Заказ №_</p>
        </div>

        <div className={styles['header__filter']}>
          <SearchField />
        </div>

        <div className={styles['header__button-group']}>
          <Button
            text={'Отмена'}
            theme='outline-red'
            onClick={onClose}
            style={{ width: 'fit-content !important' }}
            beforeIcon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='14'
                height='15'
                viewBox='0 0 14 15'
                fill='none'
              >
                <path
                  opacity='0.978'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0.724609 0.486328C0.843098 0.486328 0.961589 0.486328 1.08008 0.486328C1.22632 0.530834 1.36304 0.599193 1.49023 0.691406C3.31808 2.52381 5.15011 4.35129 6.98633 6.17383C8.82254 4.35129 10.6546 2.52381 12.4824 0.691406C12.6096 0.599193 12.7463 0.530834 12.8926 0.486328C13.0111 0.486328 13.1296 0.486328 13.248 0.486328C13.6156 0.58343 13.8617 0.811295 13.9863 1.16992C13.9863 1.32487 13.9863 1.47982 13.9863 1.63477C13.9404 1.77199 13.8721 1.89959 13.7812 2.01758C11.9538 3.84504 10.1263 5.67253 8.29883 7.5C10.1354 9.3366 11.972 11.1732 13.8086 13.0098C13.8835 13.1232 13.9428 13.2416 13.9863 13.3652C13.9863 13.5202 13.9863 13.6751 13.9863 13.8301C13.8695 14.1383 13.6599 14.357 13.3574 14.4863C13.1751 14.4863 12.9928 14.4863 12.8105 14.4863C12.6857 14.4329 12.5672 14.3645 12.4551 14.2812C10.6363 12.458 8.81344 10.6396 6.98633 8.82617C5.15922 10.6396 3.33632 12.458 1.51758 14.2812C1.40542 14.3645 1.28693 14.4329 1.16211 14.4863C0.979817 14.4863 0.797527 14.4863 0.615234 14.4863C0.312758 14.357 0.103123 14.1383 -0.0136719 13.8301C-0.0136719 13.6751 -0.0136719 13.5202 -0.0136719 13.3652C0.0298944 13.2416 0.0891393 13.1232 0.164062 13.0098C2.00065 11.1732 3.83723 9.3366 5.67383 7.5C3.84636 5.67253 2.01888 3.84504 0.191406 2.01758C0.100576 1.89959 0.032217 1.77199 -0.0136719 1.63477C-0.0136719 1.47982 -0.0136719 1.32487 -0.0136719 1.16992C0.110992 0.811295 0.357085 0.58343 0.724609 0.486328Z'
                  fill='#EEF0F4'
                />
              </svg>
            }
          />

          <Button
            onClick={handleNext}
            text={'Создать заказ'}
            style={{ width: 'fit-content !important' }}
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='25'
                height='20'
                viewBox='0 0 25 20'
                fill='none'
              >
                <path
                  d='M1.5 9.25C1.08579 9.25 0.75 9.58579 0.75 10C0.75 10.4142 1.08579 10.75 1.5 10.75V9.25ZM24.0303 10.5303C24.3232 10.2374 24.3232 9.76256 24.0303 9.46967L19.2574 4.6967C18.9645 4.40381 18.4896 4.40381 18.1967 4.6967C17.9038 4.98959 17.9038 5.46447 18.1967 5.75736L22.4393 10L18.1967 14.2426C17.9038 14.5355 17.9038 15.0104 18.1967 15.3033C18.4896 15.5962 18.9645 15.5962 19.2574 15.3033L24.0303 10.5303ZM1.5 10.75H23.5V9.25H1.5V10.75Z'
                  fill='#EEF0F4'
                />
              </svg>
            }
          />
        </div>
      </div>

      <div className={styles['filter']}>
        <div className={styles['filter__field']}>
          <span>Контрагент</span>
          <select>
            <option value='' defaultChecked>
              Магомед
            </option>
          </select>
        </div>

        <div className={styles['filter__field']}>
          <span>Склад</span>
          <select>
            <option value='' defaultChecked>
              Основной склад
            </option>
          </select>
        </div>

        <div className={styles['filter__field']}>
          <span>Проект</span>
          <select>
            <option value='' defaultChecked>
              Не указано
            </option>
          </select>
        </div>

        <div className={styles['filter__field']}>
          <span>Тип цены</span>
          <select>
            <option value='' defaultChecked>
              Розничная
            </option>
          </select>
        </div>
        <div className={styles['filter__field']}>
          <span>Цена с НДС</span>
          <select>
            <option value='' defaultChecked>
              Да
            </option>
          </select>
        </div>

        <div className={styles['filter__field']}>
          <span>Тип оплаты</span>
          <select>
            <option value='' defaultChecked>
              Kaspi Gold
            </option>
          </select>
        </div>

        <div className={styles['filter__field']}>
          <input type='date' />
        </div>
      </div>

      <div className={styles['main']} style={{ flexFlow: 'column' }}>
        <div className={styles['table-container']}>
          <table className={styles['table']}>
            <thead className={styles['table__head']}>
              <tr className={styles['table__head-row']}>
                <th className={styles['table__head-th']}>
                  <div className={styles['table__head-title']}>
                    <input type='checkbox' />
                  </div>
                </th>

                <th className={styles['table__head-th']}>
                  <div className={styles['table__head-title']}>
                    <p>№</p>
                  </div>
                </th>

                <th className={styles['table__head-th']}>
                  <div className={styles['table__head-title']}>
                    <p>Товар</p>

                    <div>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </div>
                  </div>
                </th>

                <th className={styles['table__head-th']}>
                  <div className={styles['table__head-title']}>
                    <p>Кол-во</p>
                    <div>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </div>
                  </div>
                </th>

                <th className={styles['table__head-th']}>
                  <div className={styles['table__head-title']}>
                    <p>Ед. измерения</p>
                    <div>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </div>
                  </div>
                </th>

                <th className={styles['table__head-th']}>
                  <div className={styles['table__head-title']}>
                    <p>Цена</p>
                    <div>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </div>
                  </div>
                </th>

                <th className={styles['table__head-th']}>
                  <div className={styles['table__head-title']}>
                    <p>НДС</p>
                    <div>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </div>
                  </div>
                </th>

                <th className={styles['table__head-th']}>
                  <div className={styles['table__head-title']}>
                    <p>Скидка</p>
                    <div>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </div>
                  </div>
                </th>

                <th className={styles['table__head-th']}>
                  <div className={styles['table__head-title']}>
                    <p>Сумма</p>
                    <div>
                      <ChevronTopIcon />
                      <ChevronBottomIcon />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className={styles['table__body']}>
              {categories[0].items.map((index: any, key: any) => (
                <tr key={key} className={styles['table__body-row']}>
                  <td className={styles['table__body-td']}>
                    <div className={styles['table__body-info']}>
                      <input type='checkbox' id={'cake' + String(index)} />
                    </div>
                  </td>

                  <td className={styles['table__body-td']}>
                    <div className={styles['table__body-info']}>
                      <p>{index}</p>
                    </div>
                  </td>

                  <td className={styles['table__body-td']}>
                    <div className={styles['table__body-info']}>
                      <label htmlFor={'cake' + String(index)}>
                        <Image src={require('@/assets/images/test/cake.png')} alt='' />
                        <p>Торт “Чизкейк” {index}</p>
                      </label>
                    </div>
                  </td>

                  <td className={styles['table__body-td']}>
                    <CreateOrderCounter />
                  </td>

                  <td className={styles['table__body-td']}>
                    <div className={styles['table__body-info']}>
                      <p>кг.</p>
                    </div>
                  </td>

                  <td className={styles['table__body-td']}>
                    <div className={styles['table__body-info']}>
                      <p>100 000 ₸</p>
                    </div>
                  </td>

                  <td className={styles['table__body-td']}>
                    <div className={styles['table__body-info']}>
                      <p>12 000 ₸</p>
                    </div>
                  </td>

                  <td className={styles['table__body-td']}>
                    <div className={styles['table__body-info']}>
                      <p>0% </p> <span className={styles['table__body-info_hr']}>|</span> <p>0 ₸</p>
                    </div>
                  </td>

                  <td className={styles['table__body-td']}>
                    <div className={styles['table__body-info']}>
                      <p>100 000 ₸</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles['footer']}>
          <div className={styles['footer-left']}>
            <Field
              type='text'
              placeholder='Комментарий к заказу...'
              className={styles['footer-left__field']}
            />

            <Button
              type='button'
              text={'Повторить заказ'}
              theme='outline-blue'
              className={styles['footer-left__button']}
            />
          </div>

          <div className={styles['footer-info']}>
            <table>
              <tbody>
                <tr>
                  <td>Итого к оплате:</td>
                  <td className={styles['bold']}>400 000 ₸ </td>
                </tr>
                <tr>
                  <td>НДС:</td>
                  <td className={styles['bold']}>48 000 ₸ </td>
                </tr>
                <tr>
                  <td className={styles['gray']}>Количество:</td>
                  <td className={cn(styles['bold'], styles['gray'])}>2</td>
                </tr>
                <tr>
                  <td className={styles['gray']}>Вес</td>
                  <td className={cn(styles['bold'], styles['gray'])}>0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Catalog({ categories, onClose, handleNext }: CatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);

  function handleSelectCategory(category: string) {
    if (selectedCategory === category) return setSelectedCategory(null);
    return setSelectedCategory((prev) => (category === prev ? null : category));
  }

  function handleAddToCart(product: string) {
    setCart((prev) => [...prev, product]);
  }

  function handleRemoveFromCart(product: string) {
    setCart((prev) => prev.filter((item) => item !== product));
  }

  return (
    <div className={styles['create-order__main']}>
      <div className={styles['header']}>
        <div className={styles['header__left']}>
          <button onClick={onClose} className={styles['header__button']}>
            <ArrowLeftIcon />
          </button>
          <p className={styles['header__title']}>Каталог</p>
        </div>

        <div className={styles['header__filter']}>
          <div className={styles['header__filter-select']}>
            <span>Склад:</span>

            <select>
              <option value='' defaultChecked>
                Основной склад
              </option>
            </select>
          </div>

          <div className={styles['header__filter-select']}>
            <span>Тип цены:</span>

            <select>
              <option value='' defaultChecked>
                Розничная
              </option>
            </select>
          </div>

          <div className={styles['header__filter-select']}>
            <span>Остаток:</span>

            <select>
              <option value='' defaultChecked>
                Любое значение
              </option>
            </select>
          </div>
        </div>

        <p className={styles['header__result']}>{cart.length} товаров на 0 ₸</p>
      </div>

      <div className={styles['header-bottom']}>
        <SearchField />

        <Button
          text='Перейти к подтверждению'
          onClick={() => {
            handleNext();
          }}
          style={!!cart.length ? {} : { visibility: 'hidden' }}
          className={styles['header-bottom__button']}
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='22'
              viewBox='0 0 24 22'
              fill='none'
            >
              <path
                d='M1 10.25C0.585786 10.25 0.25 10.5858 0.25 11C0.25 11.4142 0.585786 11.75 1 11.75V10.25ZM23.5303 11.5303C23.8232 11.2374 23.8232 10.7626 23.5303 10.4697L18.7574 5.6967C18.4645 5.40381 17.9896 5.40381 17.6967 5.6967C17.4038 5.98959 17.4038 6.46447 17.6967 6.75736L21.9393 11L17.6967 15.2426C17.4038 15.5355 17.4038 16.0104 17.6967 16.3033C17.9896 16.5962 18.4645 16.5962 18.7574 16.3033L23.5303 11.5303ZM1 11.75H23V10.25H1V11.75Z'
                fill='#EEF0F4'
              />
            </svg>
          }
        />
      </div>

      <div className={styles['main']}>
        <div className={styles['sidebar']}>
          <p className={styles['sidebar__title']}>Категория</p>

          <nav className={styles['sidebar__nav']}>
            {categories &&
              categories.map((category, key) => (
                <button
                  onClick={() => handleSelectCategory(category.title)}
                  key={key}
                  className={cn(
                    styles['sidebar__nav-button'],
                    selectedCategory === category.title && styles['active'],
                  )}
                >
                  <span>{category.title}</span>

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='7'
                    height='11'
                    viewBox='0 0 7 11'
                    fill='none'
                  >
                    <path
                      d='M1 0.5L6 5.5L1 10.5'
                      stroke='#E5F3FF'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              ))}
          </nav>
        </div>

        <div className={styles['table-container']}>
          <table className={styles['table']}>
            <thead className={styles['table__head']}>
              <tr className={styles['table__head-row']}>
                <th className={styles['table__head-th']}>
                  <p className={styles['table__head-title']}>Наименование</p>
                </th>

                <th className={styles['table__head-th']}>
                  <p className={styles['table__head-title']}>В заказ</p>
                </th>

                <th className={styles['table__head-th']}>
                  <p className={styles['table__head-title']}>Цена</p>
                </th>

                <th className={styles['table__head-th']}>
                  <p className={styles['table__head-title']}>НДС</p>
                </th>

                <th className={styles['table__head-th']}>
                  <p className={styles['table__head-title']}>Основной склад</p>
                </th>

                <th className={styles['table__head-th']}>
                  <p className={styles['table__head-title']}>Склад номер #2</p>
                </th>
              </tr>
            </thead>

            {selectedCategory && (
              <tbody className={styles['table__body']}>
                {categories[0].items.map((_: any, key: any) => (
                  <tr key={key} className={styles['table__body-row']}>
                    <td className={styles['table__body-td']}>
                      <div className={styles['table__body-info']}>
                        <input
                          type='checkbox'
                          id={'cake' + String(key)}
                          onChange={(e) =>
                            e.target.checked
                              ? handleAddToCart('Торт “Чизкейк” ' + key)
                              : handleRemoveFromCart('Торт “Чизкейк” ' + key)
                          }
                        />

                        <label htmlFor={'cake' + String(key)}>
                          <Image src={require('@/assets/images/test/cake.png')} alt='' />
                          <p>Торт “Чизкейк” {key}</p>
                        </label>
                      </div>
                    </td>

                    <td className={styles['table__body-td']}>
                      <CreateOrderCounter />
                    </td>

                    <td className={styles['table__body-td']}>
                      <div className={styles['table__body-info']}>
                        <p>100 000 ₸</p>
                      </div>
                    </td>

                    <td className={styles['table__body-td']}>
                      <div className={styles['table__body-info']}>
                        <p>12 000 ₸</p>
                      </div>
                    </td>

                    <td className={styles['table__body-td']}>
                      <div className={styles['table__body-number']}>
                        <p>90 шт.</p>
                        <div>
                          <span>80</span>
                          <span>10</span>
                        </div>
                      </div>
                    </td>

                    <td className={styles['table__body-td']}>
                      <div className={styles['table__body-number']}>
                        <p>90 шт.</p>

                        <div>
                          <span>80</span>
                          <span>10</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          {!selectedCategory && (
            <p className={styles['table-container__title']}>Выберите категорию</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Success({ onClose }: CreateOrderProps) {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 2999);
  }, [onClose]);

  return (
    <div className={styles['create-order__success']}>
      <div className={styles['success']}>
        <p className={styles['success__title']}>Заказ успешно создан!</p>

        <div className={styles['success__line']}></div>
      </div>
    </div>
  );
}
