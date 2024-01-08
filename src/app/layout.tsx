import type { Metadata } from 'next';

import { DarkModeProvider } from '@/components/DarkModeToggle/DarkModeProvider';
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
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}
