import { useCallback, useState } from 'react';

const DARK_MODE_LOCAL_STORAGE_KEY = 'isDarkMode';

export const useDarkMode = (defaultValue?: boolean) => {
  // Dark mode's initial value can be retrieved from various sources.
  // Here's the priority:
  //  [1] app's dark mode toggle set in local storage
  //  [2] app's dark mode toggle default value
  //  [3] user's browser theme preference
  const initializeDarkModeState = useCallback((): boolean => {
    if (typeof window === 'undefined') return defaultValue ?? false;

    // Get user's browser theme preference
    const isDarkModeInColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialValue = defaultValue ?? isDarkModeInColorScheme;

    try {
      // Get dark mode value from local storage
      const isDarkModeInLocalStorage = window.localStorage.getItem(DARK_MODE_LOCAL_STORAGE_KEY);

      return JSON.parse(isDarkModeInLocalStorage ?? 'null') ?? initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${DARK_MODE_LOCAL_STORAGE_KEY}”:`, error);
      return initialValue;
    }
  }, [defaultValue]);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(initializeDarkModeState);

  const toggleDarkMode = () => {
    const newValue = !isDarkMode;

    // Set new isDarkMode value to state
    setIsDarkMode(newValue);

    // Store new isDarkMode value to local storage
    if (typeof window === 'undefined') return;

    window.localStorage.setItem(DARK_MODE_LOCAL_STORAGE_KEY, JSON.stringify(newValue));
  };

  return {
    isDarkMode,
    toggleDarkMode,
  };
};
