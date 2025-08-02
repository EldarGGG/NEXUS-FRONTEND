'use client';

// Components
import { Header } from '@/components/ui/Header';
import { HeaderTitle } from '@/components/ui/Header/HeaderTitle';
import { HeaderNav } from '@/components/ui/Header/HeaderNav';
import { HeaderLink } from '@/components/ui/Header/HeaderLink';

// Types
import type { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';

export default function SettingsLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      <Header>
        <HeaderTitle>Настройки</HeaderTitle>

        <HeaderNav>
          <HeaderLink active={pathname === '/seller/settings'} href='/seller/settings'>
            Общие настройки
          </HeaderLink>

          <HeaderLink
            active={pathname === '/seller/settings/technical'}
            href='/seller/settings/technical'
          >
            Технические настройки
          </HeaderLink>

          <HeaderLink active={pathname === '/seller/settings/users'} href='/seller/settings/users'>
            Пользователи
          </HeaderLink>

          <HeaderLink
            active={pathname === '/seller/settings/payment-and-delivery'}
            href='/seller/settings/payment-and-delivery'
          >
            Оплата и доставка
          </HeaderLink>
        </HeaderNav>
      </Header>

      {children}
    </>
  );
}
