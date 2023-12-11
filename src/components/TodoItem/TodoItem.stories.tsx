import type { Meta, StoryObj } from '@storybook/react';

import { TodoItem, TodoItemMode } from './TodoItem';

const meta: Meta<typeof TodoItem> = {
  component: TodoItem,
};

export default meta;
type Story = StoryObj<typeof TodoItem>;

export const CreateMode: Story = {
  args: {
    mode: TodoItemMode.CREATE,
  },
};

export const ReadMode: Story = {
  args: {
    mode: TodoItemMode.READ,
    value: 'Read mode',
  },
};

export const CompletedMode: Story = {
  args: {
    mode: TodoItemMode.COMPLETED,
    value: 'Completed mode',
  },
};
