import type { Meta, StoryObj } from '@storybook/react';

import { TodoItemType, TodoList } from './TodoList';
import { MOCKED_TODO_LIST_ITEMS, TodoListFilterValues } from './TodoList.constants';
import { useTodoList } from './TodoList.hooks';
import { filterTodoList } from './TodoList.utils';

const meta: Meta<typeof TodoList> = {
  component: TodoList,
};

export default meta;
type Story = StoryObj<typeof TodoList>;

type TodoListContainerProps = {
  initialItems?: TodoItemType[];
  initialFilter?: TodoListFilterValues;
};

const TodoListContainer = ({ initialItems = [], initialFilter }: TodoListContainerProps) => {
  const {
    todoListRef,
    items,
    onAddItem,
    onItemValueChange,
    onItemCompletedChange,
    onDeleteItem,
    onDeleteCompletedItems,
  } = useTodoList(initialItems);

  return (
    <div className="p-10">
      <TodoList
        ref={todoListRef}
        className="min-w-[300px] max-w-xl"
        items={items}
        initialFilter={initialFilter}
        onAddItem={onAddItem}
        onItemValueChange={onItemValueChange}
        onItemCompletedChange={onItemCompletedChange}
        onDeleteItem={onDeleteItem}
        onDeleteCompletedItems={onDeleteCompletedItems}
      />
    </div>
  );
};

export const All: Story = {
  render: () => <TodoListContainer initialItems={MOCKED_TODO_LIST_ITEMS} />,
};

export const EmptyList: Story = {
  render: () => <TodoListContainer />,
};

export const Active: Story = {
  render: () => (
    <TodoListContainer
      initialItems={MOCKED_TODO_LIST_ITEMS}
      initialFilter={TodoListFilterValues.Active}
    />
  ),
};

export const NoActive: Story = {
  render: () => (
    <TodoListContainer
      initialItems={filterTodoList(MOCKED_TODO_LIST_ITEMS, TodoListFilterValues.Completed)}
      initialFilter={TodoListFilterValues.Active}
    />
  ),
};

export const Completed: Story = {
  render: () => (
    <TodoListContainer
      initialItems={MOCKED_TODO_LIST_ITEMS}
      initialFilter={TodoListFilterValues.Completed}
    />
  ),
};

export const NoCompleted: Story = {
  render: () => (
    <TodoListContainer
      initialItems={filterTodoList(MOCKED_TODO_LIST_ITEMS, TodoListFilterValues.Active)}
      initialFilter={TodoListFilterValues.Completed}
    />
  ),
};
