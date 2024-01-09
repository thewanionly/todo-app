import { useTheme } from 'next-themes';

import { AppTheme } from '@/utils/constants';

export const useDarkMode = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const isDarkMode = resolvedTheme === AppTheme.DARK;

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? AppTheme.LIGHT : AppTheme.DARK);
  };

  return {
    isDarkMode,
    toggleDarkMode,
  };
};
