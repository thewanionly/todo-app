import { useState } from 'react';

export const useDarkMode = (initialValue = false) => {
  const [isDarkMode, setIsDarkMode] = useState(initialValue);

  const toggleDarkMode = () => {
    setIsDarkMode((prevValue) => !prevValue);
  };

  return {
    isDarkMode,
    toggleDarkMode,
  };
};
