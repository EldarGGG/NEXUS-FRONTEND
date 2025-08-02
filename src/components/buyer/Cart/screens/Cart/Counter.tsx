'use client';

import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import type { CounterProps } from './types';
import { useDispatch } from '@/hooks/useDispatch';
import { cartActions } from '@/store/slices/buyer/cart.slice';
import { useSelector } from '@/hooks/useSelector';

import { MinusIcon } from '@/assets/icons/Minus';
import { PlusIcon } from '@/assets/icons/Plus';
import TrashIcon from '@/assets/icons/trash.svg';
import styles from './Counter.module.scss';
import { getData, sendData, deleteData } from '@/api/getData';

export function Counter({ defaultCount, className, max, product }: CounterProps) {
  /*
  Какая логика нужна
  При первичном рендере главной страницы поулчать данные есть ли товар в корзине
  дальше при изменении каунтера отправлять данные на сервер и в локалку
  повесить слушатель на локалку и проверить - если этот товар не совпадает по каунтеру то записать его значения
  если нет то и хуй с ним, а то при каждом нажатии на каунтер отпарвляется по два запроса на сервак с КАЖДОГО КАУНТЕРА КАЖДОЙ
  */

  // Для запуска скрипта только один раз
  const runOnce = useRef(true);

  // Счетчик товара
  const [count, setCount] = useState<number>(0);
  // Счетчик остатка, с API получаем остаток
  const [inStock, setInStock] = useState<number>(max || 0);
  // локальная корзина
  const dispatch = useDispatch();
  const localCart = useSelector((state) => state.buyerCart);
  const [keyPressed, setKeypressed] = useState(false);

  // Инициализация количества товара из корзины
  useEffect(() => {
    // Найти товар в локальной корзине и установить его количество
    const cartItem = localCart.find((item: any) => item.id === product.id);
    if (cartItem) {
      setCount(cartItem.counter || 0);
    } else {
      setCount(0);
    }
  }, [product.id, localCart]);

  // Функция для безопасного получения значения amount
  const getAmountValue = (amount: number | { amount__sum: number } | undefined): number => {
    if (amount === undefined) return 0;
    if (typeof amount === 'number') return amount;
    if (amount && 'amount__sum' in amount) return amount.amount__sum;
    return 0;
  };

  // Обновление максимального количества
  useEffect(() => {
    setInStock(max !== undefined ? max : getAmountValue(product.amount));
  }, [max]);

  // Увеличение счетчика товара на +
  async function handleIncrement() {
    // Новый счетчик для динамической записи
    const newCount = count >= inStock ? inStock : Number(count) + 1;
    
    try {
      // Сначала отправляем данные на бэк и ждем подтверждения
      await sendDataToAPI({ item_id: product.id, amount: newCount });
      // После успешного обновления на бэкенде, данные уже синхронизированы через refreshCartData
      console.log('Product quantity updated successfully');
    } catch (error) {
      console.error('Failed to update product quantity:', error);
      // В случае ошибки, не обновляем локальное состояние
    }
  }

  // Уменьшение счетчика товара на -
  async function handleDecrement() {
    // Новый счетчик для динамической записи
    const newCount = count <= 0 ? 0 : count - 1;
    
    try {
      // Сначала отправляем данные на бэк и ждем подтверждения
      await sendDataToAPI({ item_id: product.id, amount: newCount });
      
      // Если количество стало 0, удаляем из локальной корзины
      if (newCount === 0) {
        dispatch(
          cartActions.removeFromCart({
            id: product.id,
            newCount,
          }),
        );
      }
      
      console.log('Product quantity updated successfully');
    } catch (error) {
      console.error('Failed to update product quantity:', error);
      // В случае ошибки, не обновляем локальное состояние
    }
  }

  // Получаем колличество товара
  const getAmount = async () => {
    // Ищем товар в корзине бэка и отображаем
    const thisProduct = localCart.find((x: any) => x.id === product.id);
    if (thisProduct) {
      setCount(thisProduct.counter);
    }
  };

  // Обновляем данные корзины с бэкенда
  const refreshCartData = async () => {
    try {
      const cartData = await getData('carts/');
      console.log('Refreshed cart data from backend:', cartData);
      
      // Находим текущий товар в обновленных данных корзины
      if (cartData && cartData.items) {
        const updatedProduct = cartData.items.find((item: any) => item.item.id === product.id);
        if (updatedProduct) {
          // Обновляем локальный счетчик с данными с бэкенда
          setCount(updatedProduct.amount);
          // Обновляем локальную корзину Redux с актуальными данными
          saveToLocalCart(product, updatedProduct.amount);
        }
      }
    } catch (error: any) {
      console.error('Ошибка при обновлении данных корзины:', error.message);
    }
  };

  // Функция отправки данных на бэк
  const sendDataToAPI = async (dataArray: any) => {
    try {
      const response = await sendData('carts/', dataArray);
      console.log('Cart updated on backend:', response);
      // После успешного обновления на бэкенде, обновляем локальные данные
      await refreshCartData();
      return response;
    } catch (error: any) {
      console.error('Ошибка при обновлении корзины:', error.message);
      throw error;
    }
  };

  const deleteItemFromAPI = async (dataArray: any) => {
    try {
      const del = deleteData('carts/', dataArray);
    } catch (error: any) {
      console.error('Ошибка:', error.message);
    }
  };

  const saveToLocalCart = (product: any, counter: number) => {
    const price = product.price || getAmountValue(product.amount); // Сохраняем цену товара
    dispatch(
      cartActions.addToCart({
        id: product.id,
        amount: max,
        price: price,
        name: product.name,
        counter: counter,
        image: product.preview,
        subcategory: {
          id: product.subcategory?.id || 0,
          name: product.subcategory?.name || 'Unknown',
          category: {
            id: product.subcategory?.category?.id || 0,
            name: product.subcategory?.category?.name || 'Unknown',
          },
        },
        uom: {
          name: product.uom?.name || 'шт',
        },
      }),
    );
  };

  // Отправляем запрос на бэк при открытии окна
  useEffect(() => {
    if (runOnce.current) {
      getAmount();
      runOnce.current = false;
    }
  }, [runOnce]);

  useEffect(() => {
    getAmount();
  }, [localCart]);

  // Изменяяем счетчик через инпут
  function handleBlur(e: any) {
    // Если данные в инпуте больше того что есть на складе
    if (count >= inStock) {
      setCount(inStock);
      sendDataToAPI({ item: product.id, amount: inStock });
      saveToLocalCart(product, inStock)
    } else if (count > 0) {
      // Если данные в инпуте меньше чем есть на складе
      setCount(Number(count));
      sendDataToAPI({ item: product.id, amount: Number(count)});
      saveToLocalCart(product, count)
    }

    if (!count || count <= 0) {
      // Если данные в инпуте меньше чем есть на складе
      setCount(0);
      deleteItemFromAPI({ item: product.id, amount: 0 });
      dispatch(
        cartActions.removeFromCart({
          id: product.id,
        }),
      );
    }
  }

  function handleKeyDown(e: any) {
    // Устанавливаем флаг нажатия клавиши
    setTimeout(() => {
      setKeypressed(true);
    }, 1);
  }

  // Обработчик отпускания клавиши
  function handleKeyUp(e: any) {
    // Сбрасываем флаг нажатия клавиши
    setTimeout(() => {
      setKeypressed(false);
    }, 1);
  }

  return (
    <div className={cn(styles['counter'], className)}>
      <button
        onClick={handleDecrement}
        className={cn(styles['counter__button'], count <= 1 && styles['trash'])}
      >
        {count <= 1 ? <TrashIcon /> : <MinusIcon />}
      </button>

      {/* <span className={styles['counter__count']}>{count}</span> */}
      <input
        id='counter-input'
        className={styles['counter__count']}
        type='number'
        onChange={(e) => setCount(parseInt(e.target.value))}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        value={count}
        onBlur={handleBlur}
      />

      <button onClick={handleIncrement} className={styles['counter__button']}>
        <PlusIcon />
      </button>
    </div>
  );
}

// 02.04

// 'use client';

// import cn from 'classnames';
// import { useEffect, useRef, useState } from 'react';
// import type { CounterProps } from './types';
// import { useDispatch } from '@/hooks/useDispatch';
// import { cartActions } from '@/store/slices/buyer/cart.slice';
// import { useSelector } from '@/hooks/useSelector';

// import { MinusIcon } from '@/assets/icons/Minus';
// import { PlusIcon } from '@/assets/icons/Plus';
// import TrashIcon from '@/assets/icons/trash.svg';
// import styles from './Counter.module.scss';
// import { getData, sendData } from '@/api/getData';

// export function Counter({ defaultCount, className, max, product }: CounterProps) {

// /*
//   Какая логика нужна
//   При первичном рендере главной страницы поулчать данные есть ли товар в корзине
//   дальше при изменении каунтера отправлять данные на сервер и в локалку
//   повесить слушатель на локалку и проверить - если этот товар не совпадает по каунтеру то записать его значения
//   если нет то и хуй с ним, а то при каждом нажатии на каунтер отпарвляется по два запроса на сервак с КАЖДОГО КАУНТЕРА КАЖДОЙ
//   */

//   // Для запуска скрипта только один раз
//   const runOnce = useRef(true);

//   // Счетчик товара
//   const [count, setCount] = useState<number>(0);
//   // Счетчик остатка, с API получаем остаток
//   const [inStock, setInStock] = useState<number>(max || 0);
//   // локальная корзина
//   const dispatch = useDispatch();
//   const localCart = useSelector((state) => state.buyerCart);
//   const [keyPressed, setKeypressed] = useState(false);

//   // Увеличение счетчика товара на +
//   function handleIncrement() {
//     // Новый счетчик для динамической записи
//     const newCount = count >= inStock ? inStock : count + 1;
//     if (newCount < inStock) {
//       setCount((prev) => prev + 1);
//     } else setCount(inStock);
//     // Отпарвлаем данные на бэк
//     sendDataToAPI({ item_id: product.id, amount: newCount });
//     // Отправляем данные в локальную корзину для отображения общего колличества товара
//     saveToLocalCart(product, newCount);
//   }

//   // Уменьшение счетчика товара на -
//   function handleDecrement() {
//     // Новый счетчик для динамической записи
//     const newCount = count <= 0 ? 0 : count - 1;
//     setCount(newCount);
//     // Отпарвлаем данные на бэк
//     sendDataToAPI({ item_id: product.id, amount: newCount });
//     if (newCount === 0) {
//       return dispatch(
//         cartActions.removeFromCart({
//           id: product.id,
//           newCount,
//         }),
//       );
//       // console.log('nice')
//     }

//     // Тут должна быть логика удаления товара
//     /*В разарботке
//     if (product) {
//       if (count === 1) {
//         dispatch(
//           cartActions.removeFromCart({
//             id: product.id,
//           }),
//         );
//         return setCount(count);
//       }
//     }*/
//     saveToLocalCart(product, newCount);
//   }

//   // Получаем колличество товара
//   const getAmount = async () => {
//     // Получили все товары корзины с бэка
//     const amount = await getData('carts/');
//     console.log("КОРЗИНА БЭКА",amount)
//     // Ищем товар в корзине бэка и отображаем
//     const thisProduct = amount.items.find((x: any) => x.item.id === product.id);
//     if (thisProduct) {
//       setCount(thisProduct.amount);
//     }
//   };

//   // Функция отправки данных на бэк
//   const sendDataToAPI = async (dataArray: any) => {
//     try {
//       const send = sendData('carts/', dataArray);
//     } catch (error: any) {
//       console.error('Ошибка:', error.message);
//     }
//   };

//   const saveToLocalCart = (product: any, counter: number) => {
//     dispatch(
//       cartActions.addToCart({
//         id: product.id,
//         amount: product.amount,
//         name: product.name,
//         counter: counter,
//         image: product.preview,
//         subcategory: {
//           id: product.subcategory.id,
//           name: product.subcategory.name,
//           category: {
//             id: product.subcategory.category.id,
//             name: product.subcategory.category.name,
//           },
//         },
//         uom: {
//           name: product.uom.name,
//         },
//       }),
//     );
//   };

//   // Отправляем запрос на бэк при открытии окна
//   useEffect(() => {
//     if (runOnce.current) {
//       getAmount();
//       runOnce.current = false;
//     }
//   }, [runOnce]);

//   useEffect(() => {
//     getAmount();
//   }, [localCart]);

//   // Изменяяем счетчик через инпут
//   function handleChange(e: any) {
//     // Новый счетчик для динамической записи
//     if (!keyPressed) {
//       const newCount = parseInt(e.target.value, 10);

//       // Если данные в инпуте больше того что есть на складе
//       if (newCount >= inStock) {
//         setCount(inStock);
//         sendDataToAPI({ item: product.id, amount: inStock });
//         dispatch(
//           cartActions.addToCart({
//             id: product.id,
//             cartSize: inStock,
//           }),
//         );
//       } else if (newCount != 0) {
//         // Если данные в инпуте меньше чем есть на складе
//         setCount(newCount);

//         sendDataToAPI({ item_id: product.id, amount: newCount });
//         dispatch(
//           cartActions.addToCart({
//             id: product.id,
//             cartSize: newCount,
//           }),
//         );
//       } else {
//         setCount(0);
//         sendDataToAPI({ item: product.id, amount: 0 });
//         console.log('УДАЛЯЙСЯ СУКА');
//         dispatch(
//           cartActions.removeFromCart({
//             id: product.id,
//           }),
//         );
//       }
//     }
//   }

//   function handleKeyDown(e: any) {
//     // Устанавливаем флаг нажатия клавиши
//     setTimeout(() => {
//       setKeypressed(true);
//     }, 1);
//   }

//   // Обработчик отпускания клавиши
//   function handleKeyUp(e: any) {
//     // Сбрасываем флаг нажатия клавиши
//     setTimeout(() => {
//       setKeypressed(false);
//     }, 1);
//   }

//   return (
//     <div className={cn(styles['counter'], className)}>
//       <button
//         onClick={handleDecrement}
//         className={cn(styles['counter__button'], count === 1 && styles['trash'])}
//       >
//         {count === 1 ? <TrashIcon /> : <MinusIcon />}
//       </button>

//       {/* <span className={styles['counter__count']}>{count}</span> */}
//       <input
//         id='counter-input'
//         className={styles['counter__count']}
//         type='number'
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         onKeyUp={handleKeyUp}
//         value={count}
//       />

//       <button onClick={handleIncrement} className={styles['counter__button']}>
//         <PlusIcon />
//       </button>
//     </div>
//   );
// }
