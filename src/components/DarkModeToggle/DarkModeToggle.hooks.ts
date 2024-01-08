import { useTheme } from 'next-themes';

export const useDarkMode = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    isDarkMode: resolvedTheme === 'dark',
    toggleDarkMode,
  };
};
