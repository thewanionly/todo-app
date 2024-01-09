import { render, screen } from '@/tests/setup';
import { AppTheme } from '@/utils/constants';

import { DARK_MODE_TOGGLE_BUTTON_ICONS } from '../DarkModeToggle/DarkModeToggle.constants';
import { Header } from './Header';
import { HEADER_BG_IMAGES, LOGO_HEADING } from './Header.constants';

const setup = () => {
  render(<Header />, { defaultTheme: AppTheme.DARK });
};

describe('Header', () => {
  it('displays the header', () => {
    setup();

    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
  });

  it('displays the logo heading', () => {
    setup();

    const logoHeading = screen.getByRole('heading', { name: LOGO_HEADING });
    expect(logoHeading).toBeInTheDocument();
  });

  it('contains link to Home page in the logo heading', () => {
    setup();

    const logoLink = screen.getByRole('link', { name: LOGO_HEADING });

    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('displays the dark mode toggle - set as dark mode to true by default', () => {
    setup();

    const darkModeToggleBtn = screen.getByRole('button', { name: 'dark-mode-toggle-button' });
    const darkModeIcon = screen.getByLabelText(
      `${DARK_MODE_TOGGLE_BUTTON_ICONS[AppTheme.DARK]} icon`
    );

    expect(darkModeToggleBtn).toBeInTheDocument();
    expect(darkModeIcon).toBeInTheDocument();
  });

  it('displays the dark mode background image', () => {
    setup();

    const headerBgImage = screen.getByAltText(HEADER_BG_IMAGES.desktop[AppTheme.DARK].alt);

    expect(headerBgImage).toBeInTheDocument();
  });
});
