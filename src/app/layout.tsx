import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';

import './globals.css';

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A "To do" list application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${josefinSans.className} bg-body-bg`}>{children}</body>
    </html>
  );
}
