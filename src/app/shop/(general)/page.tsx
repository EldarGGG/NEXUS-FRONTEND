'use client';

import cn from 'classnames';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import CakeImage from '@/assets/images/test/cake.png';
import { Field } from '@/components/buyer/Field';
import { Switchbar } from '@/components/buyer/Switchbar';
import { ProductCard } from '@/components/buyer/ProductCard';
import { SwitchbarButton } from '@/components/buyer/Switchbar/SwitchbarButton';
import { FilterIcon } from '@/assets/icons/Filter';
import { SearchIcon } from '@/assets/icons/Search';
import styles from '../[shop-id]/page.module.scss';
import { getData } from '@/api/getData';
import { cartActions } from '@/store/slices/buyer/cart.slice';
import { useDispatch } from '@/hooks/useDispatch';
import { useSelector } from '@/hooks/useSelector';
import Preloader from '@/components/ui/Preloader/preloader';
import SellerNotification from '@/components/shared/SellerNotification';
import BecomeSellerModal from '@/components/shared/BecomeSellerModal';

interface ProductData {
  amount: number;
  id: number;
  name: string;
  preview: string;
  methods: string[];
  subcategory: {
    name: string;
    store: number;
    category: {
      name: string;
    };
  };
}

const Home = () => {
  let folderName: any;

  // Сюда будут записываться товары после получения с бэка
  const [myProducts, setMyProducts] = useState<ProductData[] | undefined>(undefined);
  // Название магазина
  const [store, setStore] = useState<string>('на наш каталог!');
  // Выбранная категория CSS
  const [selectedSwitchbar, setSelectedSwitchbar] = useState('Все товары');
  //Активная категория
  let activeCategory = typeof window !== 'undefined' ? localStorage.getItem('activeCategory') || 'Все товары' : 'Все товары';

  // Здесь будут храниться категории товаров
  const [onlyCategory, setOnlyCategory] = useState<string[]>();
  // отфильтрованные товары, они и отображаются на сайте
  const [filtredProducts, setFiltredProducts] = useState<ProductData[]>();
  // Состояние модального окна для становления продавцом
  const [showBecomeSellerModal, setShowBecomeSellerModal] = useState(false);
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('activeSideCategory', '');
  }

  const dispatch = useDispatch();

  // функция фильтрации товаров по нажатию на кнопку
  const productFilter = async (filterCategory: any) => {
    if (filterCategory === 'Все товары') {
      setFiltredProducts(myProducts); //Записываем все товары
      setSelectedSwitchbar('Все товары'); // Подсвечиваем кнопку
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeCategory', 'Все товары'); //сохраняем в localStorage
      }
    } else {
      setFiltredProducts(myProducts?.filter((x) => x.subcategory.name == filterCategory)); //Записываем товары определенной категории
      setSelectedSwitchbar(filterCategory); // Подсвечиваем кнопку
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeCategory', filterCategory); //сохраняем в localStorage
      }
    }
    // Код ниже нужен для правильного отображения того находится товар в корзини или нет при навигации через категории
    dispatch(
      cartActions.addToCart({
        work: 'work',
      }),
    );
    dispatch(
      cartActions.removeFromCart({
        work: 'work',
      }),
    );
  };
  // функция получения товаров с бэка - МОДИФИЦИРОВАННАЯ ДЛЯ ВСЕХ МАГАЗИНОВ

  async function getItemsAndFilter() {
    try {
      // Получаем список всех магазинов
      const stores = await getData('stores/');
      let allItems: ProductData[] = [];
      // Получаем товары из каждого магазина
      for (const store of stores) {
        try {
          const items = await getData(`stores/${store.id}/items/`);
          // Фильтруем только активные товары
          const activeItems = items.filter((item: any) => item.status === true);
          allItems = [...allItems, ...activeItems];
        } catch (error) {
          console.log(`Ошибка загрузки товаров из магазина ${store.id}:`, error);
        }
      }
      // Если в СТОРЕДЖЕ была активная категория
      if (activeCategory && activeCategory !== 'Все товары') {
        console.log('АКТИВНАЯ КАТЕГОРИЯ ЕСТЬ');

        // Фильтрует по категории
        setFiltredProducts(
          allItems.filter((x: any) => x.subcategory.name === activeCategory),
        );
        setSelectedSwitchbar(activeCategory);
      } else {
        console.log('АКТИВНОЙ КАТЕГОРИИ НЕТ');
        // Записываем все товары
        setFiltredProducts(allItems);
        setSelectedSwitchbar('Все товары');
      }
      setMyProducts(allItems);
    } catch (error) {
      console.log('Ошибка загрузки товаров:', error);
    }
  }

  async function getCart() {
    try {
      // Корзина временно отключена для общего каталога
    } catch (error) {
      console.log('Ошибка загрузки корзины:', error);
    }
  }

  async function fetMagazine() {
    try {
      // Название магазина уже установлено для общего каталога
      setStore('на наш каталог!');
    } catch (error) {
      console.log('Ошибка загрузки магазина:', error);
      setStore('на наш каталог!');
    }
  }

  async function fetCategory() {
    try {
      // Получаем список всех магазинов
      const stores = await getData('stores/');
      let allCategories: string[] = [];
      // Получаем категории из каждого магазина
      for (const store of stores) {
        try {
          const subcategories = await getData(`stores/${store.id}/subcategories/`);
          const categoryNames = subcategories.map((x: any) => x.name);
          allCategories = [...allCategories, ...categoryNames];
        } catch (error) {
          console.log(`Ошибка загрузки категорий из магазина ${store.id}:`, error);
        }
      }
      // Убираем дубликаты категорий
      const uniqueCategories = Array.from(new Set(allCategories));
      setOnlyCategory(uniqueCategories);
    } catch (error) {
      console.log('Ошибка загрузки категорий:', error);
      setOnlyCategory([]);
    }
  }

  const getAllDataFromApi = async () => {
    try {
      await fetCategory();
      await getCart();
      await fetMagazine();
      await getItemsAndFilter();
      console.log('ВСЕ ДАННЫЕ УСПЕШНО ПОЛУЧЕНЫ');
    } catch (error) {
      console.error('Ошибка :', error);
    }
  };

  useEffect(() => {
    //получаем название продукта с URL по которому перешли - для общего каталога не нужно
    folderName = 'general-catalog';
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeMagazine', folderName);
    }
    (window as any).Telegram?.WebApp.expand();
    getAllDataFromApi();
  }, []);

  return (
    <div className={styles['container']}>
      <SellerNotification />
      <div className={styles['header']}>
        <p className={styles['header__title']}>Добро пожаловать {store}</p>

        <nav className={styles['header__nav']}>
          <ul className={styles['header__nav-list']}>
            <li>
              <Link href='/buyer' className={cn(styles['header__nav-link'], styles['active'])}>
                Товары
              </Link>
            </li>
            {/* <li>
              <Link href='/buyer/shops' className={styles['header__nav-link']}>
                Магазины
              </Link>
            </li> */}
          </ul>
        </nav>

        <div className={styles['header__filters']}>
          {/* <Field
            containerClassName={styles['header__filters-search']}
            leftIcon={<SearchIcon />}
            placeholder='Поиск'
          /> */}

          <div className={styles['header__filters-button']}>
            <FilterIcon />
          </div>
        </div>
      </div>
      {myProducts ? (
        <>
          <Switchbar className={styles['switchbar']}>
            <div className='wrapper' id='waa'>
              <SwitchbarButton
                onClick={() => productFilter('Все товары')}
                active={selectedSwitchbar === 'Все товары'}
                count={myProducts.length}
              >
                Все товары
              </SwitchbarButton>
              {onlyCategory?.map((thisCategory, id) => (
                <SwitchbarButton
                  key={id}
                  onClick={() => productFilter(thisCategory)}
                  active={selectedSwitchbar === thisCategory}
                  count={myProducts.filter((shop) => shop.subcategory?.name === thisCategory).length}
                >
                  {thisCategory}
                </SwitchbarButton>
              ))}
            </div>
          </Switchbar>

          <div className={styles['products']}>
            <ul className={styles['products__list']}>
              {filtredProducts?.map((product, key) => (
                <li key={key} className={styles['products__item']}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Preloader />
      )}
      
      {/* Кнопка "Стать продавцом" внизу слева */}
      <button
        onClick={() => setShowBecomeSellerModal(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)',
          zIndex: 1000,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0056b3';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#007bff';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Стать продавцом
      </button>
      
      {/* Модальное окно для становления продавцом */}
      <BecomeSellerModal 
        isOpen={showBecomeSellerModal}
        onClose={() => setShowBecomeSellerModal(false)} 
      />
    </div>
  );
};

export default Home;
