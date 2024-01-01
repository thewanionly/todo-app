import type { Meta, StoryObj } from '@storybook/react';

import { DarkModeToggle } from './DarkModeToggle';
import { useDarkMode } from './DarkModeToggle.hooks';

const meta: Meta<typeof DarkModeToggle> = {
  component: DarkModeToggle,
};

export default meta;
type Story = StoryObj<typeof DarkModeToggle>;

const DarkModeToggleContainer = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode(true);

  return <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />;
};

export const Default: Story = {
  render: () => <DarkModeToggleContainer />,
};
