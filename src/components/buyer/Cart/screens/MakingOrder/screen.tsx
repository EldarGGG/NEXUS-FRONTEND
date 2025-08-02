'use client';

// Utils
import cn from 'classnames';
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react';

// Components
import Image from 'next/image';
import { Field } from '@/components/buyer/Field';
import { PaymentMethodModal } from '@/components/buyer/PaymentMethod';

// Icons
import { MapIcon } from '@/assets/icons/Map';
import { UserIcon } from '@/assets/icons/User';
import { CashIcon } from '@/assets/icons/Cash';
import { ListIcon } from '@/assets/icons/List';
import { BankCardIcon } from '@/assets/icons/BankCard';
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeft';
import { ArrowRightIcon } from '@/assets/icons/ArrowRight';
import { CryptoCurrencyIcon } from '@/assets/icons/CryptoCurrency';

// API
import { apiClient } from '@/api';

// Styles
import styles from './screen.module.scss';
import { useSelector } from '@/hooks/useSelector';
import { CartIcon } from '@/assets/icons/Cart';

interface CartData {
  amount: number;
  id: number;
  name: string;
  preview: string;
  subcategory: {
    name: string;
    category: {
      name: string;
    };
  };
}

export function MakingOrderScreen({ onSubmit, onBack }: MakingOrderScreenProps) {
  const [selectedPayment, setSelectedPayment] = useState({
    method: 'bank-card',
    isShow: false,
    info: '**1704',
    icon: <BankCardIcon />,
  });

  // function changeMethod(x) {
  //   setSelectedPayment({x.method, x.isShow, x.info, x.icon})
  // }

  const [paymentMethod, setPaymentMethod] = useState('');

  const productsCounter = [];
  const [cart, setCart] = useState<CartData[]>();
  const [cartSize, setCartSize] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const localCart = useSelector((state) => state.buyerCart);

  useEffect(() => {
    let size = 0;
    let total = 0;
    if (localCart) {
      localCart.forEach((product: any) => {
        size = size + product.counter;
        const price = product.price || (typeof product.amount === 'object' ? product.amount?.amount__sum || 0 : product.amount || 0);
        const quantity = product.counter || 0;
        total += price * quantity;
      });
    }
    setCartSize(Number(size));
    setCartTotal(Number(total.toFixed(2)));
  }, [localCart]);

  const [show, setShow] = useState<boolean>();
  const [first, setFirst] = useState<boolean>(true);
  const [disable, setDisable] = useState<boolean>(false);

  function firstClick() {
    setFirst(false);
    setShow(true);
    setDisable(true);
    setTimeout(() => {
      setDisable(false);
    }, 400);
  }

  function handleClick() {
    setShow(!show);
    setDisable(true);
    setTimeout(() => {
      setDisable(false);
    }, 400);
  }
  return (
    <>
      <div className={styles['mobile']}>
        <header className={styles['header']}>
          <button onClick={() => onBack('Корзина')} className={styles['header__back-button']}>
            <ArrowLeftIcon />
          </button>

          <p className={styles['header__title']} onClick={() => console.log(localCart)}>
            Оформление заказа CLICK
          </p>
        </header>

        <div className={styles['card-list']}>
          <div className={styles['card']}>
            <div className={styles['card-header']}>
              <p className={styles['card-header__title']}>Информация о доставке</p>
            </div>

            <div className={styles['card-main']}>
              <div className={styles['address']}>
                <div className={styles['address__icon']}>
                  <MapIcon />
                </div>

                <div>
                  <p className={styles['address__title']}>100004 Отделение КазПочты</p>
                  <p className={styles['address__subtitle']}>
                    100004 Карагандинская область, г. Караганда, ул. Орлова, д. 105/2
                  </p>
                  {/* <p className={styles['address__period']}>Срок хранения заказа - 14 дней</p> */}
                </div>
              </div>

              <div className={styles['receiver']}>
                <div className={styles['receiver__icon']}>
                  <UserIcon />
                </div>

                <div className={styles['receiver__content']}>
                  <span className={styles['receiver__name']}>Джолдаспаев Алимжан,</span>
                  <span className={styles['receiver__phone']}>+7 (747) 103-64-10</span>
                </div>
              </div>
              <button
                className={styles['card__button__change-info']}
                onClick={() => onBack('Способ доставки')}
              >
                Изменить данные <span>❯</span>
              </button>
            </div>
          </div>
          {/* ыфвфывфывфывыфвыфвфыв


фывфывфыв
фыв
ыфвы
фв
фы
вфы
вфы
вфы
в */}

          <div className={cn(styles['card'], show && styles['active'])}>
            <div className={cn(styles['card'], styles['card-wrapper'])}>
              <div className={styles['card-header']}>
                <p className={styles['card-header__title']}>Способ оплаты</p>
              </div>
              <div className={styles['card-main']}>
                <button
                  tabIndex={0}
                  onClick={() =>
                    setSelectedPayment({
                      isShow: true,
                      method: selectedPayment.method,
                      info: selectedPayment.info,
                      icon: selectedPayment.icon,
                    })
                  }
                  className={cn(
                    styles['payments__cash'],
                    styles['payments__item'],
                  )}
                >
                  <BankCardIcon />
                  <span>{selectedPayment.info}</span>
                </button>
                <button
                  disabled={disable}
                  className={styles['card__button__change-method']}
                  onClick={() => {
                    first ? firstClick() : handleClick();
                  }}
                >
                  Выбрать другой способ оплаты{' '}
                  <span className={show ? styles['active'] : ''}>❯</span>
                </button>
                
              </div>
            </div>
            <div
              className={cn(
                styles['payments'],
                first ? '' : show ? styles['active'] : styles['hide'],
              )}
            >
              <button
                tabIndex={0}
                onClick={() =>
                  setSelectedPayment({
                    isShow: false,
                    method: 'cash',
                    info: 'Наличными',
                    icon: <CashIcon />,
                  })
                }
                className={cn(
                  styles['payments__cash'],
                  styles['payments__item'],
                  selectedPayment.method === 'cash' && styles['active'],
                )}
              >
                <CashIcon />
                <span>Наличными</span>
              </button>
              <button
                tabIndex={0}
                onClick={() =>
                  setSelectedPayment({
                    isShow: false,
                    method: 'bank-card',
                    info: '** 1704',
                    icon: <BankCardIcon />,
                  })
                }
                className={cn(
                  styles['payments__cash'],
                  styles['payments__item'],
                  selectedPayment.method === 'bank-card' && styles['active'],
                )}
              >
                <CashIcon />
                <span>Картой</span>
              </button>

              <button
                tabIndex={0}
                onClick={() =>
                  setSelectedPayment({
                    isShow: false,
                    method: 'payment-invoice',
                    info: 'Счет на оплату',
                    icon: <ListIcon />,
                  })
                }
                className={cn(
                  styles['payments__cash'],
                  styles['payments__item'],
                  selectedPayment.method === 'payment-invoice' && styles['active'],
                )}
              >
                <ListIcon />
                <span>Счет на оплату</span>
              </button>

              <button
                disabled
                tabIndex={0}
                className={cn(styles['payments__cash'], styles['payments__item'])}
              >
                <CryptoCurrencyIcon />
                <span>Криптовалюта</span>
              </button>
            </div>
          </div>
          {/* ыфвфывфывфывыфвыфвфыв


фывфывфыв
фыв
ыфвы
фв
фы
вфы
вфы
вфы
в */}

          <div className={styles['card']}>
            <div className={styles['card-header']}>
              <p className={styles['card-header__title']}>Ваша корзина</p>
            </div>
            <div className={styles['card-main']}>
              <ul className={styles['result-list']}>
                <li className={styles['result-item']}>
                  <span>Товаров</span>
                  <span>{cartSize}</span>
                </li>{' '}
                <li className={styles['result-item']}>
                  <span>Общий вес</span>
                  <span>{cartSize} кг.</span>
                </li>
              </ul>

              <div className={styles['divider']}></div>

              <ul className={styles['result-list']}>
                <li className={styles['result-item']}>
                  <span>Итого</span>
                  <span>{cartTotal} ₸ </span>
                </li>
              </ul>
            </div>

            <button onClick={onSubmit} className={styles['card__button']}>
              <span>Оформить заказ</span>
              <span>{cartSize} шт., {cartTotal} ₸</span>
            </button>
          </div>

          <div className={styles['card']}>
            <div className={styles['card-header']}>
              <p className={styles['card-header__title']}>Дата доставки: 23 октября, бесплатно</p>
              <p className={styles['card-header__result']}>{cartSize} товара, 0 кг</p>
            </div>

            <div className={styles['card-main']}>
              <div className={styles['products']}>
                <ul className={styles['products-list']}>
                  {localCart?.map((index) => (
                    <li key={index.id}>
                      <div className={styles['product']}>
                        <div className={styles['product__image']}>
                          {/* <Image src={require('@/assets/images/test/cake.png')} alt='' /> */}
                          <img src={index.image} alt='' />
                        </div>
                        <p className={styles['product__price']}>{index.counter}</p>
                        <p className={styles['product__shop']}>{index.name}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles['card']}>
            <div className={styles['card-header']}>
              <p className={styles['card-header__title']}>Дополнительные параметры</p>
            </div>

            <div className={styles['card-main']}>
              <div className={styles['parameters']}>
                <Field
                  containerClassName={styles['parameters__field']}
                  placeholder={'Выберите дату доставки'}
                />
                <Field
                  containerClassName={styles['parameters__field']}
                  placeholder={'Впишите комментарий'}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={cn(styles['card'], styles['confirm-order'])}>
          <button onClick={async () => {
            // Create order via API first
            try {
              const storeId = localStorage.getItem('activeMagazine');
              const accessToken = localStorage.getItem('access_token');
              
              console.log('DEBUG: Starting order creation');
              console.log('DEBUG: Store ID:', storeId);
              console.log('DEBUG: Access token exists:', !!accessToken);
              
              if (storeId) {
                const requestData = {
                  store_id: storeId,
                  comment: 'Заказ из корзины',
                  delivery_address: '100004 Отделение КазПочты'
                };
                
                console.log('DEBUG: Request data:', requestData);
                
                const targetUrl = '/api/test-order';
                console.log('DEBUG: Target URL (using Next.js API route):', targetUrl);
                console.log('DEBUG: Current window location:', window.location.href);
                
                const response = await fetch(targetUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                  },
                  body: JSON.stringify(requestData)
                });
                
                console.log('DEBUG: Response status:', response.status);
                console.log('DEBUG: Response URL:', response.url);
                console.log('DEBUG: Response headers:', Object.fromEntries(response.headers));
                
                if (response.ok) {
                  const orderData = await response.json();
                  console.log('Order created successfully:', orderData);
                  alert('Заказ успешно создан!');
                } else {
                  const errorText = await response.text();
                  console.error('Failed to create order:', response.status, response.statusText);
                  console.error('Error response:', errorText);
                  alert(`Ошибка создания заказа: ${response.status} ${response.statusText}`);
                }
              } else {
                console.error('No store ID found in localStorage');
                alert('Ошибка: не найден ID магазина');
              }
            } catch (error) {
              console.error('Error creating order:', error);
              const errorMessage = error instanceof Error ? error.message : 'Unknown error';
              alert(`Ошибка сети: ${errorMessage}`);
            }
            
            // Then call the original onSubmit
            onSubmit();
          }} className={styles['confirm-order__card__button']}>
            <span>Оформить заказ</span>
            <ArrowRightIcon />
            <span>{cartSize} ₸</span>
          </button>
        </div>
      </div>

      {selectedPayment.isShow && (
        <PaymentMethodModal
          onSubmit={() =>
            setSelectedPayment({
              method: selectedPayment.method,
              isShow: false,
              info: selectedPayment.info,
              icon: selectedPayment.icon,
            })
          }
          onClose={() =>
            setSelectedPayment({
              method: selectedPayment.method,
              isShow: false,
              info: selectedPayment.info,
              icon: selectedPayment.icon,
            })
          }
          method={selectedPayment.method}
        />
      )}
    </>
  );
}
