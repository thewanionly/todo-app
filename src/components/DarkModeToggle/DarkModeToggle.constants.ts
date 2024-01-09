import { AppTheme } from '@/utils/constants';

import { IconName } from '../Icon';

export const DARK_MODE_TOGGLE_BUTTON_ICONS = {
  [AppTheme.DARK]: IconName.Sun,
  [AppTheme.LIGHT]: IconName.Moon,
};

export const DARK_MODE_LOCAL_STORAGE_KEY = 'isDarkMode';
