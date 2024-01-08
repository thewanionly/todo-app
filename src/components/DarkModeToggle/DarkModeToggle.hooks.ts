import { useTheme } from 'next-themes';

// TODO: remove defaultValue param
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useDarkMode = (defaultValue?: boolean) => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    isDarkMode: resolvedTheme === 'dark',
    toggleDarkMode,
  };
};
