import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import { AppTheme } from '@/utils/constants';

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

  const icon = DARK_MODE_TOGGLE_BUTTON_ICONS[isDarkMode ? AppTheme.DARK : AppTheme.LIGHT];

  return (
    <Button aria-label="dark-mode-toggle-button" className="p-0" onClick={onToggle}>
      <motion.div
        layout
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Icon
          name={icon}
          className="h-5 w-5 text-dark-mode-toggle-btn hover:text-dark-mode-toggle-btn-hover md:h-[26px] md:w-[26px]"
        />
      </motion.div>
    </Button>
  );
};
