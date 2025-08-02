import { font } from '@/assets/fonts';
import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import { ReactQueryClient } from '@/providers/ReactQueryClient';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Nexus Market',
  description: 'Created by https://t.me/azikulov',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='kk'>
      <head>
        <script async src='https://telegram.org/js/telegram-web-app.js' />
      </head>

      <body className={font.className}>
          <ReactQueryClient>{children}</ReactQueryClient>
      </body>
    </html>
  );
}
