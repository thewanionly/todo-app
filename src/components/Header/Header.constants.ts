import { AppTheme } from '@/utils/constants';

export const LOGO_HEADING = 'TODO';

export const HEADER_BG_IMAGES = {
  desktop: {
    [AppTheme.DARK]: {
      src: '/images/header-bg-desktop-dark.jpg',
      alt: 'hallway',
    },
    [AppTheme.LIGHT]: {
      src: '/images/header-bg-desktop-light.jpg',
      alt: 'mountains',
    },
  },
  mobile: {
    [AppTheme.DARK]: {
      src: '/images/header-bg-mobile-dark.jpg',
      alt: 'hallway',
    },
    [AppTheme.LIGHT]: {
      src: '/images/header-bg-mobile-light.jpg',
      alt: 'mountains',
    },
  },
};
