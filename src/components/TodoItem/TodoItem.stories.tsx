import type { Meta, StoryObj } from '@storybook/react';

import { TodoItem, TodoItemMode } from './TodoItem';

const meta: Meta<typeof TodoItem> = {
  component: TodoItem,
};

export default meta;
type Story = StoryObj<typeof TodoItem>;

const commonArgs = {
  className: 'w-80',
};

export const CreateMode: Story = {
  args: {
    ...commonArgs,
    mode: TodoItemMode.CREATE,
  },
};

export const ActiveMode: Story = {
  args: {
    ...commonArgs,
    mode: TodoItemMode.ACTIVE,
    value: 'Active mode',
  },
};

export const CompletedMode: Story = {
  args: {
    ...commonArgs,
    mode: TodoItemMode.COMPLETED,
    value: 'Completed mode',
  },
};
