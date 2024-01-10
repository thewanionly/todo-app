import { ChangeEvent, useState } from 'react';

import { Button } from '../Button';
import { TodoItem, TodoItemMode } from '../TodoItem';

type NewTodoItemProps = {
  onAddItem: (value: string) => void;
};

export const NewTodoItem = ({ onAddItem }: NewTodoItemProps) => {
  const [newTodoItemValue, setNewTodoItemValue] = useState('');

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Don't add a new todo item if there's no value
    if (!newTodoItemValue) return;

    // Add item to the list
    onAddItem(newTodoItemValue);

    // Clear `newTodoItemValue` value
    setNewTodoItemValue('');
  };

  const handleNewTodoItemValueChange = (value: string) => {
    setNewTodoItemValue(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-4 md:mb-6">
      <TodoItem
        mode={TodoItemMode.CREATE}
        value={newTodoItemValue}
        onEditValue={handleNewTodoItemValueChange}
      />
      {/* Need to add in order for form submission by "enter" key works in Jest env as well */}
      <Button type="submit" aria-hidden className="absolute left-0 top-0" tabIndex={-1} />
    </form>
  );
};
