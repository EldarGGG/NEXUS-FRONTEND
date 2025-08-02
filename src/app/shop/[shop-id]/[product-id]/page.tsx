'use client';
//Components
import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from '@/hooks/useSelector';
import Image from 'next/image';
import StarIcon from '@/assets/icons/star.svg';
import CakeImage from '@/assets/images/test/cake.png';
import CartIcon from '@/assets/icons/cart.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeft';
import Slider from 'react-slick';
import { Counter } from '@/components/buyer/Cart/screens/Cart/Counter';
import { useCounter } from '@/providers/CounterProvider';
import { getData, sendData } from '@/api/getData';
//styles
import './productPage.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch } from '@/hooks/useDispatch';
import { cartActions } from '@/store/slices/buyer/cart.slice';

import styles from '@/components/buyer/ProductCard/ProductCard.module.scss';
import Preloader from '@/components/ui/Preloader/preloader';

interface ProductData {
  id: number;
  name: string;
  preview: string;
  amount: number | { amount__sum: number };
  subcategory: {
    name: string;
    store: string;
    id: number;
    category: {
      name: string;
      id: number;
    };
  };
  uom: {
    name: string;
  }
}

const ProductPage = () => {
  //место записи названия продукта с URL
  let folderName: any;
  const magazine = localStorage.getItem('activeMagazine')
  //берем значения со слайсера корзины
  const dispath = useDispatch();
  const localCart = useSelector(state => state.buyerCart)

  const [counter, setCounter] = useState<number>(0); // счетчик в который будем ложить счетчик продукта
  const [thisProduct, setThisProduct] = useState(); // не помню что

  const [productData, setProductData] = useState<ProductData>();

  const [productInBasket, setProductInBasket] = useState(false);

  const getProduct = async (id: number) => {
    //получаем id товара
    try {
      const item = await getData(`stores/${magazine}/items/${id}`);
      const cart = await getData('carts/');
      if (cart.items.find((x: any) => x.item.id === id)) {
        setProductInBasket(true);
      } else {
        setProductInBasket(false);

      }

      getStock(item);
    } catch (error) {
      console.error('Ошбика :', error);
    }
  };

  // Получаем остаток по товарам корзины
  const getStock = async (x: any) => {
    const stock = await getData(`stock/${x.id}`);
    // Добавляем новый параметр к каждому товару равный остатку этого товара
    x.amount = stock.stocks[0].amount;
    // Записываем измененные значения для дальнейшего отображения
    setProductData(x);
  };

  useEffect(() => {
    //поулчаем название продукта с URL по которому перешли
    folderName = window.location.pathname.split('/').filter(Boolean).pop();
    //вызываем функцию где получаем данные товара
    getProduct(parseInt(folderName!, 10));
  }, [thisProduct, localCart]);

  const settings = {
    customPaging: function (i: any) {
      return (
        <img
          src={productData?.preview}
          width='100%'
          height='100%'
          className='slider__img'
          alt='cake'
        />
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const dispatch = useDispatch();

  // const handleSaveToCart = async () => {
  //   setCounter((prev) => prev + 1);
  // };

  const handleSaveToCart = () => {
    console.log(productData,'aaa')
    // Меняем состояние кнопки
    setProductInBasket(true);
    // Отправляем данные на бэк
    sendDataToAPI({ item: productData?.id, amount: 1 });
    // Отправляем данные в локальную корзину для правильного отображения общего счетчика товаров в корзине
    dispatch(
      cartActions.addToCart({
        id: productData?.id,
        amount: typeof productData?.amount === 'object' ? productData.amount?.amount__sum || 0 : productData?.amount || 0,
        name: productData?.name,
        counter: 1,
        image: productData?.preview,
        subcategory: {
          id: productData?.subcategory.id,
          name: productData?.subcategory.name,
          category: {
            id: productData?.subcategory.category.id,
            name: productData?.subcategory.category.name,
          },
        },
        uom: {
          name: productData?.uom.name,
        },
      }),
    );
  };

  // Отправляем данные на сервер
  const sendDataToAPI = async (dataArray: any) => {
    try {
      const send = sendData('carts/', dataArray);
      console.log('Данные успешно отправлены на сервер');
    } catch (error: any) {
      console.error('Ошибка:', error.message);
    }
  };

  return (
    <>
      {productData ? (
        <>
          <div>
            <Link href={`/shop/${magazine}`} className='back-btn'>
              <ArrowLeftIcon />
              Назад
            </Link>
          </div>
          <div className='productPage'>
            <div className='productPage__slider-container slider-container'>
              <Slider {...settings}>
                <img src={productData.preview} className='slider__img' alt='cake' />
                <img src={productData.preview} className='slider__img' alt='cake' />
                <img src={productData.preview} className='slider__img' alt='cake' />
                <img src={productData.preview} className='slider__img' alt='cake' />
                <img src={productData.preview} className='slider__img' alt='cake' />
                <img src={productData.preview} className='slider__img' alt='cake' />
                {/* <Image src={productData.preview} className='slider__img' alt='cake' />
                <Image src={CakeImage} className='slider__img' alt='cake' />
                <Image src={CakeImage} className='slider__img' alt='cake' />
                <Image src={CakeImage} className='slider__img' alt='cake' />
                <Image src={CakeImage} className='slider__img' alt='cake' /> */}
              </Slider>
            </div>
            <div className='productPage__specification specification'>
              <span>
                <h2 className='specification__title' onClick={() => console.log(productData)}>{productData.name} CLICK</h2>
                <picture className='specification__star'>
                  <StarIcon />
                  <p>4.5 (95)</p>
                </picture>
                <p className='specification__price'>
                  <span>Это цена -</span>
                  {productData.id}
                </p>
              </span>
              <div className='specification__characteristics'>
                <p>{productData.subcategory.name}</p>
                <p>{productData.subcategory.category.name}</p>
                <p>Товара в наличии {typeof productData.amount === 'object' ? productData.amount?.amount__sum || 0 : productData.amount || 0}</p>
              </div>
              {productInBasket ? (
                <Counter 
                  product={{
                    ...productData,
                    amount: typeof productData.amount === 'object' ? productData.amount.amount__sum : productData.amount
                  }} 
                  max={typeof productData.amount === 'object' ? productData.amount.amount__sum : productData.amount} 
                />
              ) : (
                <button
                  onClick={() => handleSaveToCart()}
                  className={`${styles['product__cart-button']} ${productInBasket ? 'active' : ''}`}
                >
                  <span>{productInBasket ? 'ТОВАР В КОРЗИНЕ' : 'Добавить в корзину'}</span>

                  <CartIcon className={styles['product__cart-button_icon-1']} />

                  <PlusIcon className={styles['product__cart-button_icon-2']} />
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
       <Preloader/>
      )}
    </>
  );
};

export default ProductPage;
