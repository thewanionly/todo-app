import type { Metadata } from 'next';

import { josefinSans } from '@/lib/fonts';

import './globals.css';

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A "To do" list application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${josefinSans.variable} bg-body-bg`}>
      <body>{children}</body>
    </html>
  );
}
