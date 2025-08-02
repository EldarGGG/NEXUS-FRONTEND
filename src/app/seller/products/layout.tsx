'use client';

// Components
import { Header } from '@/components/ui/Header';
import { HeaderTitle } from '@/components/ui/Header/HeaderTitle';
import { HeaderNav } from '@/components/ui/Header/HeaderNav';
import { HeaderLink } from '@/components/ui/Header/HeaderLink';

// Types
import type { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';

export default function ProductsLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      <Header>
        <HeaderTitle>
          {pathname === '/seller/products' && (
            <>
              Информация по
              <select>
                <option defaultChecked>товарам</option>
                <option>услугам</option>
                <option>сырью</option>
              </select>
            </>
          )}

          {pathname === '/seller/products/registration' && <>Информация о товарах</>}
        </HeaderTitle>

        <HeaderNav>
          <HeaderLink active={pathname === '/seller/products'} href='/seller/products'>
            Остатки
          </HeaderLink>

          <HeaderLink
            active={pathname === '/seller/products/registration'}
            href='/seller/products/registration'
          >
            Оприходование
          </HeaderLink>

          <HeaderLink
            active={pathname === '/seller/products/write-downs'}
            href='/seller/products/write-downs'
          >
            Списание
          </HeaderLink>

          <HeaderLink
            active={pathname === '/seller/products/inventory'}
            href='/seller/products/inventory'
          >
            Инвентаризация
          </HeaderLink>
        </HeaderNav>
      </Header>

      {children}
    </>
  );
}
