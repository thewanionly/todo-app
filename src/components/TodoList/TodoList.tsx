import { ChangeEvent, useState } from 'react';

import { Button } from '../Button';
import { TodoItem, TodoItemMode } from '../TodoItem';

export interface TodoItemType {
  id: string;
  value: string;
  isCompleted: boolean;
}

interface TodoListProps {
  className?: string;
  items: TodoItemType[];
  onAddItem: (value: string) => void;
  onItemValueChange: (id: string, newValue: string) => void;
  onItemCompletedChange: (id: string, newIsCompleted: boolean) => void;
  onDeleteItem: (id: string) => void;
}

export const TodoList = ({
  className = '',
  items,
  onAddItem,
  onItemValueChange,
  onItemCompletedChange,
  onDeleteItem,
}: TodoListProps) => {
  const [newTodoItemValue, setNewTodoItemValue] = useState('');

  const handleAddNewTodoItem = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Add item to the list
    onAddItem(newTodoItemValue);

    // Clear `newTodoItemValue` value
    setNewTodoItemValue('');
  };

  const handleNewTodoItemValueChange = (value: string) => {
    setNewTodoItemValue(value);
  };

  const handleEditItemValue = (id: string) => (value: string) => {
    onItemValueChange(id, value);
  };

  const handleToggleItemCompleted = (id: string) => (isCompleted: boolean) => {
    onItemCompletedChange(id, isCompleted);
  };

  const handleDeleteItem = (id: string) => () => {
    onDeleteItem(id);
  };

  return (
    <div className={className}>
      <form onSubmit={handleAddNewTodoItem} className="relative">
        <TodoItem
          className="mb-4"
          mode={TodoItemMode.CREATE}
          value={newTodoItemValue}
          onEditValue={handleNewTodoItemValueChange}
        />
        {/* Need to add in order for form submission by "enter" key works in Jest env as well */}
        <Button type="submit" className="absolute left-0 top-0" tabIndex={-1} />
      </form>
      <ul>
        {items.map(({ id, value, isCompleted }, index) => (
          <li key={id}>
            <TodoItem
              className={`rounded-none border-b border-todo-item-bottom-border  ${
                index === 0 ? 'rounded-t-[5px]' : ''
              }`}
              mode={isCompleted ? TodoItemMode.COMPLETED : TodoItemMode.ACTIVE}
              value={value}
              onEditValue={handleEditItemValue(id)}
              onToggleCompleted={handleToggleItemCompleted(id)}
              onDelete={handleDeleteItem(id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
