import { render, screen } from '@testing-library/react';

import { DARK_MODE_TOGGLE_BUTTON_ICONS } from '../DarkModeToggle/DarkModeToggle.constants';
import { Header } from './Header';
import { HEADER_BG_IMAGES, LOGO_HEADING } from './Header.constants';

// Mock "useDarkMode"
jest.mock('../DarkModeToggle/DarkModeToggle.hooks', () => ({
  __esModule: true,
  useDarkMode: jest.fn(() => ({
    isDarkMode: true, // set dark mode to true by default
  })),
}));

describe('Header', () => {
  it('displays the header', () => {
    render(<Header />);

    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
  });

  it('displays the logo heading', () => {
    render(<Header />);

    const logoHeading = screen.getByRole('heading', { name: LOGO_HEADING });
    expect(logoHeading).toBeInTheDocument();
  });

  it('contains link to Home page in the logo heading', () => {
    render(<Header />);

    const logoLink = screen.getByRole('link', { name: LOGO_HEADING });

    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('displays the dark mode toggle - set as dark mode to true by default', () => {
    render(<Header />);

    const darkModeToggleBtn = screen.getByRole('button', { name: 'dark-mode-toggle-button' });
    const darkModeIcon = screen.getByLabelText(`${DARK_MODE_TOGGLE_BUTTON_ICONS.dark} icon`);

    expect(darkModeToggleBtn).toBeInTheDocument();
    expect(darkModeIcon).toBeInTheDocument();
  });

  it('displays the dark mode background image', () => {
    render(<Header />);

    const headerBgImage = screen.getByAltText(HEADER_BG_IMAGES.desktop.dark.alt);

    expect(headerBgImage).toBeInTheDocument();
  });
});
