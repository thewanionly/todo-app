import type { Metadata } from 'next';

import { twMerge } from 'tailwind-merge';

import { DarkModeProvider } from '@/components/DarkModeToggle/DarkModeProvider';
import { Header } from '@/components/Header';
import { josefinSans } from '@/lib/fonts';

import './globals.css';

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A "To do" list application',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${josefinSans.variable} bg-body-bg`} suppressHydrationWarning>
      <body>
        <DarkModeProvider>
          <Header
            className={twMerge(
              `mx-auto mt-12 w-[87.2%] min-w-[300px] max-w-xl md:mt-14 lg:mt-16 xl:mt-20`
            )}
          />
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
