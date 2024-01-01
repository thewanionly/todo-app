import { render, screen } from '@testing-library/react';

import { Header } from './Header';
import { HEADER_BG_IMAGES, LOGO_HEADING } from './Header.constants';

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

  it('displays the dark mode toggle', () => {
    render(<Header />);

    const darkModeToggleBtn = screen.getByRole('button', { name: 'dark-mode-toggle-button' });

    expect(darkModeToggleBtn).toBeInTheDocument();
  });

  it('displays a background image', () => {
    render(<Header />);

    // display dark mode by default
    const headerBgImage = screen.getByAltText(HEADER_BG_IMAGES.desktop.dark.alt);

    expect(headerBgImage).toBeInTheDocument();
  });
});
