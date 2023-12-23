import type { Meta, StoryObj } from '@storybook/react';

import { Icon as IconComponent, IconName } from '../Icon';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Text: Story = {
  args: {
    children: 'Text Button',
  },
};

export const Icon: Story = {
  args: {
    children: <IconComponent name={IconName.Close} />,
  },
};
