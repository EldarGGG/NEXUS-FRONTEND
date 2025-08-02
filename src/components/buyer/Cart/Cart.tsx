'use client';

// Utils
import { useState } from 'react';
import cn from 'classnames';

// Components
import { Screens } from './screens';

// Styles
import styles from './Cart.module.scss';
// Способ доставки


export function CartModal({ onClose }: CartProps) {
  const [nav, setNav] = useState<Nav>('Корзина');
  return (
    <div className={cn(styles['cart'], nav === 'Успешно' && styles['success'])}>
      {
        {
          Корзина: (
            <Screens.Cart onBack={() => onClose()} onSubmit={() => setNav('Оформление заказа')} />
          ),
          'Способ доставки': (
            <Screens.Delivery
              onBack={() => setNav('Оформление заказа')}
              onSubmit={() => setNav('Оформление заказа')}
            />
          ),

          'Оформление заказа': (
            <Screens.MakingOrder
              onBack={setNav}
              onSubmit={() => {
                // Create order in background without blocking UI
                const createOrder = async () => {
                  try {
                    const storeId = localStorage.getItem('activeMagazine');
                    if (storeId) {
                      const response = await fetch('/api/test-order', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        },
                        body: JSON.stringify({
                          store_id: storeId,
                          comment: 'Заказ из корзины',
                          delivery_address: '100004 Отделение КазПочты'
                        })
                      });
                      
                      if (response.ok) {
                        const orderData = await response.json();
                        console.log('Order created:', orderData);
                      } else {
                        console.error('Failed to create order:', response.statusText);
                      }
                    }
                  } catch (error) {
                    console.error('Error creating order:', error);
                  }
                };
                
                // Execute order creation in background
                createOrder();
                
                // Immediately show success screen
                setNav('Успешно');
              }}
            />
          ),
          'Способ оплаты': (
            <Screens.PaymentMethod
              onBack={() => setNav('Оформление заказа')}
              onSubmit={() => setNav('Успешно')}
            />
          ),
          Успешно: <Screens.Success onClose={onClose} />,
        }[nav]
      }
    </div>
  );
}




// 03.04

// 'use client';

// // Utils
// import { useState } from 'react';
// import cn from 'classnames';

// // Components
// import { Screens } from './screens';

// // Styles
// import styles from './Cart.module.scss';

// export function CartModal({ onClose }: CartProps) {
//   const [nav, setNav] = useState<Nav>('Корзина');

//   return (
//     <div className={cn(styles['cart'], nav === 'Успешно' && styles['success'])}>
//       {
//         {
//           Корзина: (
//             <Screens.Cart onBack={() => onClose()} onSubmit={() => setNav('Способ доставки')} />
//           ),
//           'Способ доставки': (
//             <Screens.Delivery
//               onBack={() => setNav('Корзина')}
//               onSubmit={() => setNav('Оформление заказа')}
//             />
//           ),
//           'Оформление заказа': (
//             <Screens.MakingOrder
//               onBack={() => setNav('Способ доставки')}
//               onSubmit={() => setNav('Успешно')}
//             />
//           ),
//           Успешно: <Screens.Success onClose={onClose} />,
//         }[nav]
//       }
//     </div>
//   );
// }
