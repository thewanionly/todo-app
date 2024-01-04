'use client';

import { twMerge } from 'tailwind-merge';

import { Header } from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header
        className={twMerge(`mx-auto mt-12 min-w-[300px] max-w-xl px-6 md:mt-14 lg:mt-16 xl:mt-20`)}
      />
    </>
  );
}
