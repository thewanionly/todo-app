import userEvent from '@testing-library/user-event';

import { render, screen } from '@/tests/setup';
import { AppTheme } from '@/utils/constants';

import { useDarkMode } from '.';
import { DarkModeToggle } from './DarkModeToggle';
import { DARK_MODE_TOGGLE_BUTTON_ICONS } from './DarkModeToggle.constants';

const DarkModeToggleSetup = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />;
};

const setup = (defaultValue = false) => {
  render(<DarkModeToggleSetup />, { defaultTheme: defaultValue ? AppTheme.DARK : AppTheme.LIGHT });
};

describe('DarkModeToggle', () => {
  it('displays the dark mode toggle button', () => {
    setup();

    const darkModeToggleBtn = screen.getByRole('button', { name: 'dark-mode-toggle-button' });

    expect(darkModeToggleBtn).toBeInTheDocument();
  });

  describe('dark mode by default', () => {
    it('displays the dark mode icon', () => {
      setup(true);

      const darkModeIcon = screen.getByLabelText(
        `${DARK_MODE_TOGGLE_BUTTON_ICONS[AppTheme.DARK]} icon`
      );

      expect(darkModeIcon).toBeInTheDocument();
    });

    it(`displays the light mode icon after clicking the dark mode toggle `, async () => {
      setup(true);

      const darkModeToggleBtn = screen.getByRole('button', { name: 'dark-mode-toggle-button' });
      await userEvent.click(darkModeToggleBtn);

      const lightModeIcon = screen.getByLabelText(
        `${DARK_MODE_TOGGLE_BUTTON_ICONS[AppTheme.LIGHT]} icon`
      );
      expect(lightModeIcon).toBeInTheDocument();
    });
  });

  describe('light mode by default', () => {
    it('displays the light mode icon', () => {
      setup(false);

      const lightModeIcon = screen.getByLabelText(
        `${DARK_MODE_TOGGLE_BUTTON_ICONS[AppTheme.LIGHT]} icon`
      );

      expect(lightModeIcon).toBeInTheDocument();
    });

    it(`displays the dark mode icon after clicking the dark mode toggle `, async () => {
      setup(false);

      const darkModeToggleBtn = screen.getByRole('button', { name: 'dark-mode-toggle-button' });
      await userEvent.click(darkModeToggleBtn);

      const darkModeIcon = screen.getByLabelText(
        `${DARK_MODE_TOGGLE_BUTTON_ICONS[AppTheme.DARK]} icon`
      );
      expect(darkModeIcon).toBeInTheDocument();
    });
  });
});
