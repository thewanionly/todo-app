import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { TodoItemType, TodoList } from './TodoList';
import { MOCKED_TODO_LIST_ITEMS } from './TodoList.constants';

const meta: Meta<typeof TodoList> = {
  component: TodoList,
};

export default meta;
type Story = StoryObj<typeof TodoList>;

const TodoListContainer = () => {
  const [items, setItems] = useState<TodoItemType[]>(MOCKED_TODO_LIST_ITEMS);

  const onAddItem = (value: string) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: crypto.randomUUID(),
        value,
        isCompleted: false,
      },
    ]);
  };

  const onItemValueChange = () => null;
  const onItemCompletedChange = () => null;
  const onDeleteItem = () => null;

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
