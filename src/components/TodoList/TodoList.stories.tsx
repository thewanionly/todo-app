import type { Meta, StoryObj } from '@storybook/react';

import { TodoList } from './TodoList';
import { MOCKED_TODO_LIST_ITEMS } from './TodoList.constants';
import { useTodoList } from './TodoList.hooks';

const meta: Meta<typeof TodoList> = {
  component: TodoList,
};

export default meta;
type Story = StoryObj<typeof TodoList>;

const TodoListContainer = () => {
  const { items, onAddItem, onItemValueChange, onItemCompletedChange, onDeleteItem } =
    useTodoList(MOCKED_TODO_LIST_ITEMS);

  return (
    <div className=" p-10">
      <TodoList
        className="w-80"
        items={items}
        onAddItem={onAddItem}
        onItemValueChange={onItemValueChange}
        onItemCompletedChange={onItemCompletedChange}
        onDeleteItem={onDeleteItem}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <TodoListContainer />,
};
