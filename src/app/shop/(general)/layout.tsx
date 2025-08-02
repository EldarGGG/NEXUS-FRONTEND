'use client';

import type { PropsWithChildren } from 'react';

import { Layout } from '@/components/buyer/Layout';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { CounterProvider } from '@/providers/CounterProvider';

export default function GeneralShopLayout({ children }: PropsWithChildren) {
  return (
    <CounterProvider>
      <Provider store={store}>
        <Layout isGeneralCatalog={true}>{children}</Layout>
      </Provider>
    </CounterProvider>
  );
}
