import { useState, useEffect } from 'react';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { DARK_MODE_TOGGLE_BUTTON_ICONS } from './DarkModeToggle.constants';

type DarkModeToggleProps = {
  isDarkMode: boolean;
  onToggle: () => void;
};

export const DarkModeToggle = ({ isDarkMode, onToggle }: DarkModeToggleProps) => {
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const icon = DARK_MODE_TOGGLE_BUTTON_ICONS[isDarkMode ? 'dark' : 'light'];

  return (
    <Button aria-label="dark-mode-toggle-button" className="p-0" onClick={onToggle}>
      <Icon
        name={icon}
        className="h-5 w-5 text-dark-mode-toggle-btn hover:text-dark-mode-toggle-btn-hover md:h-[26px] md:w-[26px]"
      />
    </Button>
  );
};
