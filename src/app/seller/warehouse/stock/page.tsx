'use client';

import { useState, useEffect } from 'react';
import cn from 'classnames';

// Components
import { Button } from '@/components/ui/Button';
import { SearchField } from '@/components/shared/SearchField';

// Icon Components
import { FilterIcon } from '@/assets/icons/Filter';
import { EditIcon } from '@/assets/icons/Edit';
import { PlusIcon } from '@/assets/icons/Plus';

// API
import { getData } from '@/api/getData';

// Styles
import styles from './page.module.scss';

interface StockItem {
  id: number;
  item: {
    id: number;
    name: string;
    preview: string;
    default_price: number;
    uom: {
      name: string;
    };
    group: {
      name: string;
    };
  };
  storage: {
    id: number;
    name: string;
  };
  amount: number;
}

interface StockSummary {
  item_id: number;
  item_name: string;
  item_preview: string;
  item_price: number;
  item_uom: string;
  item_category: string;
  total_amount: number;
  storages: Array<{
    storage_name: string;
    amount: number;
  }>;
}

export default function WarehouseStock() {
  const [stockItems, setStockItems] = useState<StockSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      
      // Получаем данные о товарах и их остатках из API
      const stockData = await getData('warehouse/stock/');
      console.log('Warehouse stock data:', stockData);
      
      if (stockData && Array.isArray(stockData)) {
        setStockItems(stockData);
      } else {
        console.warn('Invalid stock data received:', stockData);
        setStockItems([]);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.item_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все категории' || item.item_category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Все категории', ...Array.from(new Set(stockItems.map(item => item.item_category)))];

  const getStockStatus = (amount: number) => {
    if (amount === 0) return 'out-of-stock';
    if (amount <= 5) return 'low-stock';
    if (amount <= 10) return 'medium-stock';
    return 'in-stock';
  };

  const getStockStatusText = (amount: number) => {
    if (amount === 0) return 'Нет в наличии';
    if (amount <= 5) return 'Заканчивается';
    if (amount <= 10) return 'Мало';
    return 'В наличии';
  };

  if (!mounted) {
    return <div className={styles['main']}></div>;
  }

  return (
    <div className={styles['main']}>
      <div className={styles['header']}>
        <div className={styles['header-content']}>
          <h1 className={styles['title']}>Остатки товаров</h1>
          <p className={styles['subtitle']}>Управление количеством товаров на складах</p>
        </div>
        <div className={styles['header-actions']}>
          <Button 
            onClick={() => window.location.href = '/seller/warehouse/registration'}
          >
            <PlusIcon />
            Оприходовать товар
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className={styles['filters']}>
        <div className={styles['search-container']}>
          <SearchField
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className={styles['filter-container']}>
          <select 
            className={styles['category-filter']}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stock Table */}
      <div className={styles['table-container']}>
        {loading ? (
          <div className={styles['loading']}>Загрузка остатков...</div>
        ) : (
          <table className={styles['stock-table']}>
            <thead>
              <tr>
                <th>Товар</th>
                <th>Категория</th>
                <th>Цена</th>
                <th>Общий остаток</th>
                <th>Статус</th>
                <th>Склады</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.item_id} className={styles['table-row']}>
                  <td className={styles['product-cell']}>
                    <div className={styles['product-info']}>
                      <div className={styles['product-image']}>
                        <img 
                          src={item.item_preview || '/images/placeholder.jpg'} 
                          alt={item.item_name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div className={styles['product-details']}>
                        <span className={styles['product-name']}>{item.item_name}</span>
                        <span className={styles['product-unit']}>за {item.item_uom}</span>
                      </div>
                    </div>
                  </td>
                  <td className={styles['category-cell']}>
                    <span className={styles['category-badge']}>{item.item_category}</span>
                  </td>
                  <td className={styles['price-cell']}>
                    <span className={styles['price']}>{item.item_price} ₸</span>
                  </td>
                  <td className={styles['amount-cell']}>
                    <span className={styles['amount']}>{item.total_amount} {item.item_uom}</span>
                  </td>
                  <td className={styles['status-cell']}>
                    <span className={cn(styles['status'], styles[getStockStatus(item.total_amount)])}>
                      {getStockStatusText(item.total_amount)}
                    </span>
                  </td>
                  <td className={styles['storages-cell']}>
                    <div className={styles['storages-list']}>
                      {item.storages.map((storage, index) => (
                        <div key={index} className={styles['storage-item']}>
                          <span className={styles['storage-name']}>{storage.storage_name}:</span>
                          <span className={styles['storage-amount']}>{storage.amount} {item.item_uom}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className={styles['actions-cell']}>
                    <div className={styles['actions']}>
                      <Button 
                        onClick={() => {
                          // Открыть модальное окно для редактирования остатков
                          console.log('Edit stock for item:', item.item_id);
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className={styles['empty-state']}>
            <p>Товары не найдены</p>
            <Button 
              onClick={() => window.location.href = '/seller/warehouse/registration'}
            >
              Добавить товар на склад
            </Button>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className={styles['summary']}>
        <div className={styles['summary-card']}>
          <span className={styles['summary-label']}>Всего товаров:</span>
          <span className={styles['summary-value']}>{filteredItems.length}</span>
        </div>
        <div className={styles['summary-card']}>
          <span className={styles['summary-label']}>Общая стоимость:</span>
          <span className={styles['summary-value']}>
            {filteredItems.reduce((total, item) => total + (item.item_price * item.total_amount), 0).toLocaleString()} ₸
          </span>
        </div>
        <div className={styles['summary-card']}>
          <span className={styles['summary-label']}>Товаров заканчивается:</span>
          <span className={styles['summary-value']}>
            {filteredItems.filter(item => item.total_amount <= 5).length}
          </span>
        </div>
      </div>
    </div>
  );
}
