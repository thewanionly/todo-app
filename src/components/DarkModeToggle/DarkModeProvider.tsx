'use client';

import { ThemeProvider } from 'next-themes';

import { DARK_MODE_LOCAL_STORAGE_KEY } from './DarkModeToggle.constants';

type DarkModeProviderProps = {
  defaultValue?: string;
  children: React.ReactNode;
};

export const DarkModeProvider = ({ defaultValue, children }: DarkModeProviderProps) => (
  <ThemeProvider
    attribute="class"
    storageKey={DARK_MODE_LOCAL_STORAGE_KEY}
    defaultTheme={defaultValue}
  >
    {children}
  </ThemeProvider>
);
