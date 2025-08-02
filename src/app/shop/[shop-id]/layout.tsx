'use client';

import type { PropsWithChildren } from 'react';

import { Layout } from '@/components/buyer/Layout';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { CounterProvider } from '@/providers/CounterProvider';

export default function BuyerLayout({ children }: PropsWithChildren) {
  return (
    <CounterProvider>
      <Provider store={store}>
        <Layout>{children}</Layout>
      </Provider>
    </CounterProvider>
  );
}
