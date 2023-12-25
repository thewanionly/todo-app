import type { Meta, StoryObj } from '@storybook/react';

import { FilterButtons } from '.';
import { TODO_LIST_FILTERS } from '../TodoList';

const meta: Meta<typeof FilterButtons> = {
  component: FilterButtons,
};

export default meta;
type Story = StoryObj<typeof FilterButtons>;

export const TodoListFilters: Story = {
  args: {
    className: 'w-80',
    filters: TODO_LIST_FILTERS,
  },
};
