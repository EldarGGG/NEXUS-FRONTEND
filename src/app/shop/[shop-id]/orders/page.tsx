'use client';
//Components
import React from 'react';
import { useEffect, useState } from 'react';
import { SwitchbarButton } from '@/components/buyer/Switchbar/SwitchbarButton';

//styles
// import styles from './page.module.scss';
import styles from './orders.module.scss';
import { getData } from '@/api/getData';
import Preloader from '@/components/ui/Preloader/preloader';


interface ProductData {
  id: number;
  name: string;
  preview: string;
  amount: {
    amount__sum: number
  } 
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

const OrdersPage = () => {
  let folderName: string = '';

  const [products, setProducts] = useState<ProductData[]>();

  const getDataFromApi = async () => {
    const data = await getData('stores/2/items/');
    setProducts(data);
  };

  useEffect(() => {
    getDataFromApi();
    folderName = window.location.pathname.split('/').filter(Boolean).pop()!;
    localStorage.setItem('activeSideCategory', folderName);
  },[]);
  const [selectedSwitchbar, setSelectedSwitchbar] = useState('Все');

  const filter = ['Все', 'Выполненные', 'В пути'];

  return (
    <div className={styles['container']}>
      <div className={styles['container__filter']}>
        {filter?.map((thisCategory, id) => (
          <SwitchbarButton
            key={id}
            onClick={() => setSelectedSwitchbar(thisCategory)}
            active={selectedSwitchbar === thisCategory}
            count={5}
          >
            {thisCategory}
          </SwitchbarButton>
        ))}
      </div>
      {products ? (
        <div className={styles['products']}>
          <ul className={styles['products__list']}>
            <li className={styles['products__card--filter']}>
              <span
                className={styles['products__card__name']}
                onClick={() => console.log(products)}
              >
                Товар
              </span>
              <span className={styles['products__card__quantity']}>Кол-во.</span>
              <span className={styles['products__card__status']}>Статус выполнения</span>
            </li>
            {products.map((product, id) => (
              <li key={id} className={styles['products__card']}>
                <div className={styles['products__card__wrapper']}>
                  <img className={styles['products__card__image']} src={product.preview} />
                  <span className={styles['products__card__name']}>{product.name}</span>
                </div>
                <span className={styles['products__card__quantity']}>
                  {typeof product.amount === 'object' ? product.amount?.amount__sum || 0 : product.amount || 0} {product.uom.name}
                </span>
                <span className={styles['products__card__status']}>Выполняется</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Preloader/>
      )}
    </div>
  );
};

export default OrdersPage;
