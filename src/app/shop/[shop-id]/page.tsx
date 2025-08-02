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
import styles from './page.module.scss';
import { getData } from '@/api/getData';
import { cartActions } from '@/store/slices/buyer/cart.slice';
import { useDispatch } from '@/hooks/useDispatch';
import { useSelector } from '@/hooks/useSelector';
import Preloader from '@/components/ui/Preloader/preloader';
import SellerNotification from '@/components/shared/SellerNotification/SellerNotification';

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
  const [store, setStore] = useState<string>('');
  // Выбранная категория CSS
  const [selectedSwitchbar, setSelectedSwitchbar] = useState('Все товары');
  //Активная категория
  let activeCategory = typeof window !== 'undefined' ? localStorage.getItem('activeCategory') || 'Все товары' : 'Все товары';

  // Здесь будут храниться категории товаров
  const [onlyCategory, setOnlyCategory] = useState<string[]>();
  // отфильтрованные товары, они и отображаются на сайте
  const [filtredProducts, setFiltredProducts] = useState<ProductData[]>();
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
  // функция получения товаров с бэка

  async function getItemsAndFilter() {
    // Получаем товары
    const items = await getData(`stores/${folderName}/items/`);
    // Если в СТОРЕДЖЕ была активная категория
    if (activeCategory && activeCategory !== 'Все товары') {
      console.log('АКТИВНАЯ КАТЕГОРИЯ ЕСТЬ');

      // Фильтрует по категории
      setFiltredProducts(
        items.filter((x: any) => x.subcategory.name === activeCategory),
      );
      setSelectedSwitchbar(activeCategory);
    } else {
      // Если в СТОРЕДЖЕ НЕ была активная категория
      console.log('АКТИВНОЙ КАТЕГОРИИ НЕТ');
      activeCategory = 'Все товары';
      setFiltredProducts(items);
      setSelectedSwitchbar('Все товары');
    }
    // Записываем данные в переменную
    setMyProducts(items);
    console.log('Полученные данные с API', items);
    // Дополнительное логирование цен
    if (items && items.length > 0) {
      console.log('Цены товаров:', items.map((item: any) => ({ 
        name: item.name, 
        price: item.price, 
        amount: item.amount,
        default_price: item.default_price 
      })));
    }
  }

  async function getCart() {
    try {
      // Получили товары корзины
      const product = await getData('carts/');
      console.log('с корзины бэка', product);
      // Записали в локальную корзину
      if (product && product.items) {
        product.items.forEach((x: any) => {
          dispatch(
            cartActions.addToCart({
              id: x.item.id,
              amount: typeof x.item.amount === 'object' ? x.item.amount?.amount__sum || 0 : x.item.amount || 0,
              name: x.item.name,
              counter: x.amount,
              image: x.item.preview,
              subcategory: {
                id: x.item.subcategory.id,
                name: x.item.subcategory.name,
                category: {
                  id: x.item.subcategory.category?.id || 1,
                  name: x.item.subcategory.category?.name || 'General',
                },
              },
              uom: {
                name: x.item.uom?.name || 'шт',
              },
            }),
          );
        });
      }
    } catch (error) {
      console.log('Ошибка загрузки корзины:', error);
    }
  }

  async function fetMagazine() {
    try {
      // Получаем название магазина
      const magazine = await getData(`stores/${folderName}/`);
      setStore(magazine.name);
    } catch (error) {
      console.log('Ошибка загрузки магазина:', error);
      setStore(`Магазин ${folderName}`);
    }
  }

  async function fetCategory() {
    try {
      // Получаем категории товаров
      const subcategories = await getData(`stores/${folderName}/subcategories/`);
      // Записываем название категорий/подкатегорий
      setOnlyCategory(subcategories.map((x: any) => x.name));
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
    //получаем название продукта с URL по которому перешли
    folderName = window.location.pathname.split('/').filter(Boolean).pop()?.split('-').pop();
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
    </div>
  );
};

export default Home;

// 02.04

// 'use client';

// import cn from 'classnames';
// import { useEffect, useState } from 'react';

// import Link from 'next/link';
// import CakeImage from '@/assets/images/test/cake.png';
// import { Field } from '@/components/buyer/Field';
// import { Switchbar } from '@/components/buyer/Switchbar';
// import { ProductCard } from '@/components/buyer/ProductCard';
// import { SwitchbarButton } from '@/components/buyer/Switchbar/SwitchbarButton';
// import { FilterIcon } from '@/assets/icons/Filter';
// import { SearchIcon } from '@/assets/icons/Search';
// import styles from './page.module.scss';
// import { getData } from '@/api/getData';
// import { cartActions } from '@/store/slices/buyer/cart.slice';
// import { useDispatch } from '@/hooks/useDispatch';
// import { useSelector } from '@/hooks/useSelector';
// import Preloader from '@/components/ui/Preloader/preloader';

// interface ProductData {
//   amount: number;
//   id: number;
//   name: string;
//   preview: string;
//   methods: string[];
//   subcategory: {
//     name: string;
//     store: number;
//     category: {
//       name: string;
//     };
//   };
// }

// const Home = () => {
//   // Сюда будут записываться товары после получения с бэка
//   const [myProducts, setMyProducts] = useState<ProductData[] | undefined>(undefined);
//   // Название магазина
//   const [store, setStore] = useState<string>('');
//   // Выбранная категория CSS
//   const [selectedSwitchbar, setSelectedSwitchbar] = useState('Все товары');
//   //Активная категория
//   const activeCategory = localStorage.getItem('activeCategory') || '';
//   // Здесь будут храниться категории товаров
//   const [onlyCategory, setOnlyCategory] = useState<string[]>();
//   // отфильтрованные товары, они и отображаются на сайте
//   const [filtredProducts, setFiltredProducts] = useState<ProductData[]>();
//   localStorage.setItem('activeSideCategory', '')

//   // функция фильтрации товаров по нажатию на кнопку
//   const productFilter = (filterCategory: any) => {
//     if (filterCategory === 'Все товары') {
//       setFiltredProducts(myProducts); //Записываем все товары
//       setSelectedSwitchbar('Все товары'); // Подсвечиваем кнопку
//       localStorage.setItem('activeCategory', 'Все товары'); //сохраняем в localStorage
//     } else {
//       setFiltredProducts(myProducts?.filter((x) => x.subcategory.name == filterCategory)); //Записываем товары определенной категории
//       setSelectedSwitchbar(filterCategory); // Подсвечиваем кнопку
//       localStorage.setItem('activeCategory', filterCategory); //сохраняем в localStorage
//     }
//   };
//   const dispatch = useDispatch();
//   // функция получения товаров с бэка
//   const getDataFromApi = async () => {
//     try {
//       // Получаем товары
//       const items = await getData('stores/1/items/');
//       // Получаем название магазина
//       const magazine = await getData('stores/1/');
//       setStore(magazine.name);
//       // Получаем категории товаров
//       const subcategories = await getData('stores/1/subcategories/');
//       localStorage.setItem('products', JSON.stringify(items));
//       // Если в СТОРЕДЖЕ была активная категория
//       if (activeCategory) {
//         // Фильтрует по категории
//         setFiltredProducts(
//           activeCategory === 'Все товары'
//             ? items
//             : items.filter((x: any) => x.subcategory.name === activeCategory),
//         );
//         setSelectedSwitchbar(activeCategory);
//       } else {
//         // Если в СТОРЕДЖЕ НЕ была активная категория
//         setFiltredProducts(items);
//         setSelectedSwitchbar(activeCategory);
//       }
//       // Записываем название категорий/подкатегорий
//       setOnlyCategory(subcategories.map((x: any) => x.name));
//       // Записываем данные в переменную
//       setMyProducts(items);
//       console.log('Полученные данные с API', items);
//     } catch (error) {
//       console.error('Ошбика :', error);
//     }
//   };

//   useEffect(() => {
//     (window as any).Telegram?.WebApp.expand();
//     getDataFromApi();
//   }, []);

//   return (
//     <div className={styles['container']}>
//       <div className={styles['header']}>
//         <p className={styles['header__title']}>Добро пожаловать {store}</p>

//         <nav className={styles['header__nav']}>
//           <ul className={styles['header__nav-list']}>
//             <li>
//               <Link href='/buyer' className={cn(styles['header__nav-link'], styles['active'])}>
//                 Товары
//               </Link>
//             </li>
//             {/* <li>
//               <Link href='/buyer/shops' className={styles['header__nav-link']}>
//                 Магазины
//               </Link>
//             </li> */}
//           </ul>
//         </nav>

//         <div className={styles['header__filters']}>
//           {/* <Field
//             containerClassName={styles['header__filters-search']}
//             leftIcon={<SearchIcon />}
//             placeholder='Поиск'
//           /> */}

//           <div className={styles['header__filters-button']}>
//             <FilterIcon />
//           </div>
//         </div>
//       </div>
//       {myProducts ? (
//         <>
//           <Switchbar className={styles['switchbar']}>
//             <div className='wrapper' id='waa'>
//               <SwitchbarButton
//                 onClick={() => productFilter('Все товары')}
//                 active={selectedSwitchbar === 'Все товары'}
//                 count={myProducts.length}
//               >
//                 Все товары
//               </SwitchbarButton>
//               {onlyCategory?.map((thisCategory, id) => (
//                 <SwitchbarButton
//                   key={id}
//                   onClick={() => productFilter(thisCategory)}
//                   active={selectedSwitchbar === thisCategory}
//                   count={myProducts.filter((shop) => shop.subcategory.name === thisCategory).length}
//                 >
//                   {thisCategory}
//                 </SwitchbarButton>
//               ))}
//             </div>
//           </Switchbar>

//           <div className={styles['products']}>
//             <ul className={styles['products__list']}>
//               {filtredProducts?.map((product, key) => (
//                 <li key={key} className={styles['products__item']}>
//                   <ProductCard product={product} />
//                 </li>
//               ))}
//               {/* {myProducts.map((product, key) => (
//                 <li key={key} className={styles['products__item']}>
//                   <ProductCard product={product} />
//                 </li>
//               ))} */}
//             </ul>
//           </div>
//         </>
//       ) : (
//         <Preloader />
//       )}
//     </div>
//   );
// };

// export default Home;

// OLD

// 'use client';

// import cn from 'classnames';
// import { useEffect, useState } from 'react';

// import Link from 'next/link';
// import CakeImage from '@/assets/images/test/cake.png';
// import { Field } from '@/components/buyer/Field';
// import { Switchbar } from '@/components/buyer/Switchbar';
// import { ProductCard } from '@/components/buyer/ProductCard';
// import { SwitchbarButton } from '@/components/buyer/Switchbar/SwitchbarButton';
// import { FilterIcon } from '@/assets/icons/Filter';
// import { SearchIcon } from '@/assets/icons/Search';
// import styles from './page.module.scss';
// import { getData } from '@/api/getData';
// import { cartActions } from '@/store/slices/buyer/cart.slice';
// import { useDispatch } from '@/hooks/useDispatch';
// import { useSelector } from '@/hooks/useSelector';

// interface ProductData {
//   amount: number;
//   id: number;
//   name: string;
//   preview: string;
//   methods: string[];
//   subcategory: {
//     name: string;
//     store: number;
//     category: {
//       name: string;
//     };
//   };
// }

// const Home = () => {
//   console.log('NICE')
//   // Сюда будут записываться товары после получения с бэка
//   const [myProducts, setMyProducts] = useState<ProductData[] | undefined>(undefined);
//   // Выбранная категория CSS
//   const [selectedSwitchbar, setSelectedSwitchbar] = useState('Все товары');
//   //Активная категория
//   const activeCategory = localStorage.getItem('activeCategory') || '';
//   // Здесь будут храниться категории товаров
//   const [onlyCategory, setOnlyCategory] = useState<string[]>();
//   // отфильтрованные товары, они и отображаются на сайте
//   const [filtredProducts, setFiltredProducts] = useState<ProductData[]>();

//   // функция фильтрации товаров по нажатию на кнопку
//   const productFilter = (filterCategory: any) => {
//     if (filterCategory === 'Все товары') {
//       setFiltredProducts(myProducts); //Записываем все товары
//       setSelectedSwitchbar('Все товары'); // Подсвечиваем кнопку
//       localStorage.setItem('activeCategory', 'Все товары'); //сохраняем в localStorage
//     } else {
//       setFiltredProducts(myProducts?.filter((x) => x.subcategory.name == filterCategory)); //Записываем товары определенной категории
//       setSelectedSwitchbar(filterCategory); // Подсвечиваем кнопку
//       localStorage.setItem('activeCategory', filterCategory); //сохраняем в localStorage
//     }
//   };
// const dispatch = useDispatch()
//   // функция получения товаров с бэка
//   const getDataFromApi = async () => {
//     try {
//       // Получаем товары
//       const items = await getData("stores/1/items/")
//       // Получаем категории товаров
//       const subcategories = await getData("stores/1/subcategories/")
//       // Получаем корзину товаров
//       const cart = await getData("carts/")
//       console.log('CART,', cart, "ITEMS", items)
//       cart.items.map(product => {
//         dispatch(
//           cartActions.addToCart({
//             id: product.item.id,
//             counter: product.amount,
//             name: product.item.name,
//             image: product.item.preview,
//             subcategory: {
//               id: product.item.subcategory.id,
//               name: product.item.subcategory.name,
//               category: {
//                 id: product.item.subcategory.category.id,
//                 name: product.item.subcategory.category.name,
//               }
//             },
//             uom: {
//               name: product.item.uom.name
//             }
//           }),
//         );
//       })
//       localStorage.setItem('products', JSON.stringify(items));
//       // Если в СТОРЕДЖЕ была активная категория
//       if (activeCategory) {
//         // Фильтрует по категории
//         setFiltredProducts(
//           activeCategory === 'Все товары'
//             ? items
//             : items.filter((x: any) => x.subcategory.name === activeCategory),
//         );
//         setSelectedSwitchbar(activeCategory);
//       } else {
//         // Если в СТОРЕДЖЕ НЕ была активная категория
//         setFiltredProducts(items);
//         setSelectedSwitchbar(activeCategory);
//       }
//       // Записываем название категорий/подкатегорий
//       setOnlyCategory(subcategories.map((x: any) => x.name));
//       // Записываем данные в переменную
//       setMyProducts(items);
//       console.log('Полученные данные с API', items);
//     } catch (error) {
//       console.error('Ошбика :', error);
//     }
//   };

//   const sel = useSelector(state => state.buyerCart)

//   useEffect(() => {
//     (window as any).Telegram?.WebApp.expand();
//     getDataFromApi();
//   }, []);

//   return (
//     <div className={styles['container']}>
//       <div className={styles['header']}>
//         <p className={styles['header__title']}>
//           Добро пожаловать {myProducts ? myProducts[0].subcategory.category.name : 'Пользователь'}
//         </p>

//         <nav className={styles['header__nav']}>
//           <ul className={styles['header__nav-list']}>
//             <li>
//               <Link href='/buyer' className={cn(styles['header__nav-link'], styles['active'])}>
//                 Товары
//               </Link>
//             </li>
//             {/* <li>
//               <Link href='/buyer/shops' className={styles['header__nav-link']}>
//                 Магазины
//               </Link>
//             </li> */}
//           </ul>
//         </nav>

//         <div className={styles['header__filters']}>
//           {/* <Field
//             containerClassName={styles['header__filters-search']}
//             leftIcon={<SearchIcon />}
//             placeholder='Поиск'
//           /> */}

//           <div className={styles['header__filters-button']}>
//             <FilterIcon />
//           </div>
//         </div>
//       </div>
//       {myProducts ? (
//         <>
//           <Switchbar className={styles['switchbar']}>
//             <div className='wrapper' id='waa'>
//               <SwitchbarButton
//                 onClick={() => productFilter('Все товары')}
//                 active={selectedSwitchbar === 'Все товары'}
//                 count={myProducts.length}
//               >
//                 Все товары
//               </SwitchbarButton>
//               {onlyCategory?.map((thisCategory, id) => (
//                 <SwitchbarButton
//                   key={id}
//                   onClick={() => productFilter(thisCategory)}
//                   active={selectedSwitchbar === thisCategory}
//                   count={myProducts.filter((shop) => shop.subcategory.name === thisCategory).length}
//                 >
//                   {thisCategory}
//                 </SwitchbarButton>
//               ))}
//             </div>
//           </Switchbar>

//           <div className={styles['products']}>
//             <ul className={styles['products__list']}>
//               {filtredProducts?.map((product, key) => (
//                 <li key={key} className={styles['products__item']}>
//                   <ProductCard product={product} />
//                 </li>
//               ))}
//               {/* {myProducts.map((product, key) => (
//                 <li key={key} className={styles['products__item']}>
//                   <ProductCard product={product} />
//                 </li>
//               ))} */}
//             </ul>
//           </div>
//         </>
//       ) : (
//         <div className='loader-container'>
//           <div className='loader'></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
