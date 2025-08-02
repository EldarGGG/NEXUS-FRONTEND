import Image from 'next/image';
import StarIcon from '@/assets/icons/star.svg';
import CartIcon from '@/assets/icons/cart.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import KaspiImage from '@/assets/images/payment-methods/kaspi.png';
import HalykImage from '@/assets/images/payment-methods/halyk.png';
import MoneyImage from '@/assets/images/payment-methods/money.png';
import styles from './ProductCard.module.scss';
import type { Product, ProductCardProps } from './types';
import { useEffect, useRef, useState } from 'react';
import { Counter } from '../Cart/screens/Cart/Counter';
import { cartActions } from '@/store/slices/buyer/cart.slice';
import { useDispatch } from '@/hooks/useDispatch';
import { useSelector } from '@/hooks/useSelector';
import { getData, sendData } from '@/api/getData';
import Link from 'next/link';
import cn from 'classnames';

export function ProductCard({ product }: ProductCardProps) {
  // Меняем состояние кнопки "добавить в корзину"
  const [productInBasket, setProductInBasket] = useState(false);
  const [inStock, setInStock] = useState(typeof product.amount === 'object' ? product.amount?.amount__sum || 0 : product.amount || 0);
  const magazine = typeof window !== 'undefined' ? localStorage.getItem('activeMagazine') : null;

  const [x, setX] = useState('')
  const [y, setY] = useState('')
  const [active, setActive] = useState(false)

  const dispatch = useDispatch();
  const localCart = useSelector((state) => state.buyerCart);

  function isProductInCart() {
    const thisItem = localCart.find((x) => x.id == product.id);
    if (thisItem) {
      setProductInBasket(true);
    } else setProductInBasket(false);
  }

  useEffect(() => {
    isProductInCart();
  }, [localCart]);
  // useEffect(() => {
  //   console.log('nice')
  //   product
  // },)

  // Сохранение в корзину
  const handleSaveToCart = () => {
    // Меняем состояние кнопки
    setProductInBasket(true);
    // Отправляем данные на бэк
    sendDataToAPI({ item_id: product.id, amount: 1 });
    console.log(product, 'ДОБАВИЛИ В КОРЗИНУ');
    // Отправляем данные в локальную корзину для правильного отображения общего счетчика товаров в корзине
    dispatch(
      cartActions.addToCart({
        id: product.id,
        amount: typeof product.amount === 'object' ? product.amount?.amount__sum || 0 : product.amount || 0,
        name: product.name,
        counter: 1,
        image: product.preview,
        subcategory: product.subcategory ? {
          id: product.subcategory.id,
          name: product.subcategory.name,
          category: product.subcategory.category ? {
            id: product.subcategory.category.id,
            name: product.subcategory.category.name,
          } : {
            id: 0,
            name: 'Без категории',
          },
        } : {
          id: 0,
          name: 'Без подкатегории',
          category: {
            id: 0,
            name: 'Без категории',
          },
        },
        uom: {
          name: product.uom.name,
        },
      }),
    );
  };

  const _renderPaymentMethods = ({ methods }: Pick<Product, 'methods'>) => {
    /* Рендер методов оплаты */

    return (
      <ul className={styles['product__methods']}>
        <li>
          <Image src={KaspiImage} alt='' />
        </li>
        <li>
          <Image src={HalykImage} alt='' />
        </li>
        <li>
          <Image src={MoneyImage} alt='' />
        </li>
      </ul>
    );
  };

  // Отправляем данные на сервер
  const sendDataToAPI = async (dataArray: any) => {
    try {
      const send = await sendData('carts/', dataArray);
    } catch (error: any) {
      console.error('Ошибка:', error.message);
    }
  };

  function getCoord(x:any) {
    if (window.screen.width <= 768) {
      setX(`${x.x}px`)

    } else {
      setX(`${x.x + 200}px`)

    }
    setY(`${x.top}px`)
    setActive(true)
    setTimeout(() => {
      setActive(false)
    }, 1000)
  }

  return (
    <>
      <div className={styles['product']}>
        <div className={styles['product__image']}>
          <Link
            href={`/shop/${magazine}/${product.id}/`}
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.setItem('thisProduct', JSON.stringify(product.id));
              }
            }}
          >
            {/* <Image src={product.image} alt='product image' /> */}
            <img src={product.preview} />
          </Link>
        </div>

        <h2
          className={styles['product__title']}
          onClick={() => {
            console.log('ДАННЫЕ С ЛОКАЛЬНОЙ КОРЗИНЫ', localCart, 'PRODUCT', product);
          }}
        >
          {product.name} CLICK
        </h2>
        <p className={styles['product__description']}>{product.subcategory?.name || 'Без категории'}</p>

        <div className={styles['product__payment']}>
          <span className={styles['product__price']}>{product.price || (typeof product.amount === 'object' ? product.amount?.amount__sum : product.amount) || 0} ₸</span>

          {_renderPaymentMethods({ methods: product.methods })}
        </div>

        <div className={styles['product__other']}>
          <p
            style={productInBasket ? { gridArea: '1/1/2/3' } : {}}
            className={styles['product__in-stock']}
          >
            На складе:{' '}
            <span>
              {inStock} {product.uom.name}
            </span>
          </p>

          <div className={styles['product__rates']}>
            <StarIcon />
            <span>{product.id}</span>
          </div>
          {!productInBasket ? (
            <button
              onClick={(e) => {
                handleSaveToCart(), getCoord(e.currentTarget.getBoundingClientRect());
              }}
              className={styles['product__cart-button']}
            >
              <span>Добавить в корзину</span>

              <CartIcon className={styles['product__cart-button_icon-1']} />

              <PlusIcon className={styles['product__cart-button_icon-2']} />
            </button>
          ) : (
            <Counter product={product} max={inStock} className={styles['product__cart-counter']} />
          )}
        </div>

        {/* <button
          onClick={() => handleSaveToCart()}
          className={`${styles['product__cart-button']} ${productInBasket ? 'active' : ''}`}
        >
          <span>{productInBasket ? 'Товар в корзине' : 'Добавить в корзину'}</span>

          <CartIcon className={styles['product__cart-button_icon-1']} />

          <PlusIcon className={styles['product__cart-button_icon-2']} />
        </button> */}
      </div>
      <div className={cn(styles['aniImg'], active && styles['active'])} style={{top: y, left: x}}>
        <img src={product.preview} alt="" />
      </div>
    </>
  );
}

// 02.04

// import Image from 'next/image';
// import StarIcon from '@/assets/icons/star.svg';
// import CartIcon from '@/assets/icons/cart.svg';
// import PlusIcon from '@/assets/icons/plus.svg';
// import KaspiImage from '@/assets/images/payment-methods/kaspi.png';
// import HalykImage from '@/assets/images/payment-methods/halyk.png';
// import MoneyImage from '@/assets/images/payment-methods/money.png';
// import styles from './ProductCard.module.scss';
// import type { Product, ProductCardProps } from './types';
// import { useEffect, useState } from 'react';
// import { Counter } from '../Cart/screens/Cart/Counter';
// import { cartActions } from '@/store/slices/buyer/cart.slice';
// import { useDispatch } from '@/hooks/useDispatch';
// import { useSelector } from '@/hooks/useSelector';
// import { getData, sendData } from '@/api/getData';
// import Link from 'next/link';

// export function ProductCard({ product }: ProductCardProps) {
//   // Меняем состояние кнопки "добавить в корзину"
//   const [productInBasket, setProductInBasket] = useState(false);
//   const [inStock, setInStock] = useState(0);

//   const dispatch = useDispatch();
//   const localCart = useSelector(state => state.buyerCart)

//   // Если товар есть в корзине то меняем состояние кнопки
//   const getCartItems = async (product: any) => {
//     try {
//       const stock = await getData(`stock/${product.id}`);
//       product.amount = stock.stocks[0].amount;
//       const data = await getData('carts/');
//       if (data.items.find((x: any) => x.item.id === product.id)) {
//         setProductInBasket(true);
//         // console.log('СРАБОТАЛА ФУНКЦИЯ В КАРТОЧКЕ TRUE')
//       } else {
//         setProductInBasket(false);
//         // console.log('СРАБОТАЛА ФУНКЦИЯ В КАРТОЧКЕ FALSE')

//       }
//     } catch (error) {
//       console.log('Ошибка:', error);
//     }
//   };

//   // Получаем остаток по товарам корзины
//   const getStock = async (x: any) => {
//     const stock = await getData(`stock/${x.id}`);
//     // Добавляем новый параметр к каждому товару равный остатку этого товара
//     // Записываем измененные значения для дальнейшего отображения
//     // product.amount = stock.stocks[0].amount;
//     setInStock(stock.stocks[0].amount)
//   };
//   const sel = useSelector(x => x.buyerCart)

//   useEffect(() => {
//     getCartItems(product);
//     getStock(product)
//   }, []);

//   useEffect(() => {
//     getCartItems(product);
//   }, [localCart])

//   // Сохранение в корзину
//   const handleSaveToCart = () => {
//     // Меняем состояние кнопки
//     setProductInBasket(true);
//     // Отправляем данные на бэк
//     sendDataToAPI({ item: product.id, amount: 1 });
//     console.log(product, 'ДОБАВИЛИ В КОРЗИНУ')
//     // Отправляем данные в локальную корзину для правильного отображения общего счетчика товаров в корзине
//     dispatch(
//       cartActions.addToCart({
//         id: product.id,
//         name: product.name,
//         image: product.preview,
//         subcategory: {
//           id: product.subcategory.id,
//           name: product.subcategory.name,
//           category: {
//             id: product.subcategory.category.id,
//             name: product.subcategory.category.name,
//           }
//         },
//         uom: {
//           name: product.uom.name
//         }
//       }),
//     );
//   };

//   const _renderPaymentMethods = ({ methods }: Pick<Product, 'methods'>) => {
//     /* Рендер методов оплаты */

//     return (
//       <ul className={styles['product__methods']}>
//         <li>
//           <Image src={KaspiImage} alt='' />
//         </li>
//         <li>
//           <Image src={HalykImage} alt='' />
//         </li>
//         <li>
//           <Image src={MoneyImage} alt='' />
//         </li>
//       </ul>
//     );
//   };

//   // Отправляем данные на сервер
//   const sendDataToAPI = async (dataArray: any) => {
//     try {
//       const send = await sendData('carts/', dataArray);
//     } catch (error: any) {
//       console.error('Ошибка:', error.message);
//     }
//   };

//   return (
//     <div className={styles['product']}>
//       <div className={styles['product__image']}>
//         <Link
//           href={`/buyer/${product.subcategory.store}/${product.id}/`}
//           onClick={() => localStorage.setItem('thisProduct', JSON.stringify(product.id))}
//         >
//           {/* <Image src={product.image} alt='product image' /> */}
//           <img src={product.preview} />
//         </Link>
//       </div>

//       <h2 className={styles['product__title']}>{product.name}</h2>
//       <p className={styles['product__description']}>{product.subcategory.name}</p>

//       <div className={styles['product__payment']}>
//         <span className={styles['product__price']}>667$</span>

//         {_renderPaymentMethods({ methods: product.methods })}
//       </div>

//       <div className={styles['product__other']}>
//        <p
//           style={productInBasket ? { gridArea: '1/1/2/3' } : {}}
//           className={styles['product__in-stock']}
//         >
//           На складе:{' '}
//           <span>
//             {inStock} {product.uom.name}
//           </span>
//         </p>

//         <div className={styles['product__rates']}>
//           <StarIcon />
//           <span>{product.id}</span>
//         </div>
//         {!productInBasket ? (
//           <button onClick={() => handleSaveToCart()} className={styles['product__cart-button']}>
//             <span>Добавить в корзину</span>

//             <CartIcon className={styles['product__cart-button_icon-1']} />

//             <PlusIcon className={styles['product__cart-button_icon-2']} />
//           </button>
//         ) : (
//           <Counter
//             product={product}
//             max={inStock}
//             className={styles['product__cart-counter']}
//           />
//         )}
//       </div>

//         {/* <button
//           onClick={() => handleSaveToCart()}
//           className={`${styles['product__cart-button']} ${productInBasket ? 'active' : ''}`}
//         >
//           <span>{productInBasket ? 'Товар в корзине' : 'Добавить в корзину'}</span>

//           <CartIcon className={styles['product__cart-button_icon-1']} />

//           <PlusIcon className={styles['product__cart-button_icon-2']} />
//         </button> */}
//     </div>
//   );
// }

// import Image from 'next/image';
// import StarIcon from '@/assets/icons/star.svg';
// import CartIcon from '@/assets/icons/cart.svg';
// import PlusIcon from '@/assets/icons/plus.svg';
// import KaspiImage from '@/assets/images/payment-methods/kaspi.png';
// import HalykImage from '@/assets/images/payment-methods/halyk.png';
// import MoneyImage from '@/assets/images/payment-methods/money.png';
// import styles from './ProductCard.module.scss';
// import type { Product, ProductCardProps, myProduct } from './types';
// import { useEffect, useState } from 'react';
// import { Counter } from '../Cart/screens/Cart/Counter';
// import { cartActions } from '@/store/slices/buyer/cart.slice';
// import { useDispatch } from '@/hooks/useDispatch';
// import { useSelector } from '@/hooks/useSelector';

// import Link from 'next/link';

// let URL = 'http://127.0.0.1:8000/api/v1';
// const key =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7ImVtYWlsIjoickByLmNvbSIsInBob25lIjoiNzc3NzUxODc1MDEiLCJpZCI6IjEifX0.9l-B_e4JNSa8IKDren_e11ONeUVCkY33kyhSaplOjaM';

// console.log(JSON.parse(localStorage.getItem('Products')), 'LOCALSTORAGE232');

// export function ProductCard({ product }: myProduct) {
//   const productInBasket = useSelector((state) => state.buyerCart.find((x) => x.id == product.id));

//   const [counter, setCounter] = useState<number>(0);
//   const [inStock, setInStock] = useState<number>(5);
//   const dispatch = useDispatch();

//   /*Сохранение в корзину*/
//   const handleSaveToCart = () => {
//     const newCount = counter === 5 ? 5 : counter + 1;
//     const newInStock = inStock === 0 ? 0 : inStock - 1;
//     setCounter(newCount);
//     setInStock(newInStock);

//     // setCounter((prev) => (prev === 5 ? prev : prev + 1));
//     // setInStock((prev) => (prev === 0 ? 0 : prev - 1));

//     console.log('ДОБАВИТЬ В КОРЗИНУ', product);

//     sendDataToAPI({ item: product.id, amount: newCount });
//     dispatch(
//       cartActions.addToCart({
//         id: product.id,
//         count: newCount,
//         inStock: newInStock,
//         price: '669$',
//         title: product.name,
//         uom: product.uom.name,
//       }),
//     );
//   };

//   const handleDecrement = (count: number) => {
//     const newCount = counter === 0 ? 0 : counter - 1;
//     const newInStock = inStock === 5 ? 5 : inStock + 1;

//     if (newCount === 0) {
//       dispatch(cartActions.removeFromCart({ id: product.id }));
//       return setCounter(newCount);
//     }
//     setCounter(newCount);
//     setInStock(newInStock);

//     dispatch(
//       cartActions.addToCart({
//         id: product.id,
//         count: newCount,
//         inStock: newInStock,
//         price: '669$',
//         title: product.name,
//         uom: product.uom.name,
//       }),
//     );
//   };

//   const _renderPaymentMethods = ({ methods }: Pick<Product, 'methods'>) => {
//     /* Рендер методов оплаты */

//     return (
//       <ul className={styles['product__methods']}>
//         <li>
//           <Image src={KaspiImage} alt='' />
//         </li>
//         <li>
//           <Image src={HalykImage} alt='' />
//         </li>
//         <li>
//           <Image src={MoneyImage} alt='' />
//         </li>
//       </ul>
//     );
//   };

//   // console.log('ЭТО ПРОДУКТЫ В КРТОЧКЕ', product);

//   const sendDataToAPI = async (dataArray) => {
//     try {
//       const response = await fetch(`${URL}/carts/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: key,
//           // Добавьте любые другие необходимые заголовки, например, авторизацию
//         },
//         body: JSON.stringify(dataArray),
//       });

//       if (!response.ok) {
//         throw new Error('Ошибка отправки данных на сервер');
//       }

//       console.log('Данные успешно отправлены на сервер');
//     } catch (error) {
//       console.error('Ошибка:', error.message);
//     }
//   };

//   return (
//     <div className={styles['product']}>
//       <div className={styles['product__image']}>
//         <Link
//           href={`/buyer/${product.subcategory.store}/${product.id}/`}
//           onClick={() => localStorage.setItem('thisProduct', JSON.stringify(product.id))}
//         >
//           {/* <Image src={product.image} alt='product image' /> */}
//           <img src={product.preview} />
//         </Link>
//       </div>

//       <h2 className={styles['product__title']}>{product.name}</h2>
//       <p className={styles['product__description']}>{product.subcategory.name}</p>

//       <div className={styles['product__payment']}>
//         <span className={styles['product__price']}>667$</span>

//         {_renderPaymentMethods({ methods: product.methods })}
//       </div>

//       <div className={styles['product__other']}>
//         <p
//           style={counter >= 1 ? { gridArea: '1/1/2/3' } : {}}
//           className={styles['product__in-stock']}
//         >
//           На складе:{' '}
//           <span>
//             {inStock} {product.uom.name}
//           </span>
//         </p>

//         <div className={styles['product__rates']}>
//           <StarIcon />
//           <span>{product.id}</span>
//         </div>

//         {counter === 0 ? (
//           <button onClick={() => handleSaveToCart()} className={styles['product__cart-button']}>
//             <span>Добавить в корзину</span>

//             <CartIcon className={styles['product__cart-button_icon-1']} />

//             <PlusIcon className={styles['product__cart-button_icon-2']} />
//           </button>
//         ) : (
//           <Counter
//             product={product}
//             max={5}
//             defaultCount={counter}
//             increment={handleSaveToCart}
//             decrement={handleDecrement}
//             className={styles['product__cart-counter']}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// import Image from 'next/image';
// import StarIcon from '@/assets/icons/star.svg';
// import CartIcon from '@/assets/icons/cart.svg';
// import PlusIcon from '@/assets/icons/plus.svg';
// import KaspiImage from '@/assets/images/payment-methods/kaspi.png';
// import HalykImage from '@/assets/images/payment-methods/halyk.png';
// import MoneyImage from '@/assets/images/payment-methods/money.png';
// import styles from './ProductCard.module.scss';
// import type { Product, ProductCardProps, myProduct } from './types';
// import { useState } from 'react';
// import { Counter } from '../Cart/screens/Cart/Counter';
// import { cartActions } from '@/store/slices/buyer/cart.slice';
// import { useDispatch } from '@/hooks/useDispatch';
// import { useSelector } from '@/hooks/useSelector';

// import Link from 'next/link';

// const products = {
//   id: 32,
//   image: 'string',
//   title: 'string',
//   shop: 'string',
//   weight: 'string',
//   count: 2,
//   price: 'string',
//   perPiece: 'string',
//   inStock: 2,
// };

// export function ProductCard({ product }: ProductCardProps) {
//   const productInBasket = useSelector((state) => state.buyerCart.find((x) => x.id == product.id));
//   const img = 'http://127.0.0.1:8000/media/images/noimage.png';

//   const [counter, setCounter] = useState<number>(
//     productInBasket?.count ? productInBasket?.count : product.count,
//   );
//   const [inStock, setInStock] = useState<number>(product.inStock);
//   const dispatch = useDispatch();

//   const handleSaveToCart = () => {
//     /**
//      * Сохранение в корзину
//      */

//     setCounter((prev) => (prev === product.inStock ? product.inStock : prev + 1));
//     setInStock((prev) => (prev === 0 ? 0 : prev - 1));

//     console.log(product);

//     dispatch(
//       cartActions.addToCart({
//         id: product.id,
//         count: counter === product.inStock ? product.inStock : counter + 1,
//         inStock: inStock === 0 ? 0 : inStock - 1,
//         price: product.price,
//         title: product.title,
//       }),
//     );
//   };

//   const handleDecrement = (count: number) => {
//     count = count - 1;
//     setInStock((prev) => prev + 1);

//     if (count === 0) {
//       dispatch(cartActions.removeFromCart({ id: product.id, count }));
//       return setCounter(count);
//     }

//     dispatch(
//       cartActions.addToCart({
//         id: product.id,
//         count: count,
//       }),
//     );
//   };

//   const _renderPaymentMethods = ({ methods }: Pick<Product, 'methods'>) => {
//     /**
//      * Рендер методов оплаты
//      */

//     return (
//       <ul className={styles['product__methods']}>
//         <li>
//           <Image src={KaspiImage} alt='' />
//         </li>
//         <li>
//           <Image src={HalykImage} alt='' />
//         </li>
//         <li>
//           <Image src={MoneyImage} alt='' />
//         </li>
//       </ul>
//     );
//   };
//   // href={`/buyer/productPage/${product.id}`

//   // localStorage.clear
//   // localStorage.setItem('thisProduct', JSON.stringify(product.id))

//   return (
//     <div className={styles['product']}>
//       <div className={styles['product__image']}>
//         <Link
//           href={`/buyer/${product.id}/`}
//           onClick={() => localStorage.setItem('thisProduct', JSON.stringify(product.id))}
//         >
//           <Image src={product.image} alt='product image' />
//           {/* <img  src={img}/> */}
//         </Link>
//       </div>

//       <h2 className={styles['product__title']}>{product.title}</h2>
//       <p className={styles['product__description']}>{product.title}</p>

//       <div className={styles['product__payment']}>
//         <span className={styles['product__price']}>667$</span>

//         {_renderPaymentMethods({ methods: product.methods })}
//       </div>

//       <div className={styles['product__other']}>
//         <p
//           style={counter >= 1 ? { gridArea: '1/1/2/3' } : {}}
//           className={styles['product__in-stock']}
//         >
//           На складе:{' '}
//           <span>
//             {product.id} {product.inStock}
//           </span>
//         </p>

//         <div className={styles['product__rates']}>
//           <StarIcon />
//           <span>{product.rating}</span>
//         </div>

//         {counter === 0 ? (
//           <button onClick={() => handleSaveToCart()} className={styles['product__cart-button']}>
//             <span>Добавить в корзину</span>

//             <CartIcon className={styles['product__cart-button_icon-1']} />

//             <PlusIcon className={styles['product__cart-button_icon-2']} />
//           </button>
//         ) : (
//           <Counter
//             product={products}
//             max={product.inStock}
//             defaultCount={counter}
//             increment={handleSaveToCart}
//             decrement={handleDecrement}
//             className={styles['product__cart-counter']}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
