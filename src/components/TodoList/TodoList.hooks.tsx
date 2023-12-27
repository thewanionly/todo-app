import { useState } from 'react';

import { TodoItemType } from '.';

export const useTodoList = (todoListItems: TodoItemType[]) => {
  const [items, setItems] = useState<TodoItemType[]>(todoListItems);

  const onAddItem = (value: string) => {
    setItems((prevItems) => [
      {
        id: crypto.randomUUID(),
        value,
        isCompleted: false,
      },
      ...prevItems,
    ]);
  };

  const onItemValueChange = () => null;

  const onItemCompletedChange = (id: string, value: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, isCompleted: value } : item))
    );
  };

  const onDeleteItem = (idToRemove: string) => {
    setItems((prevItems) => prevItems.filter(({ id }) => id !== idToRemove));
  };

  return {
    items,
    onAddItem,
    onItemValueChange,
    onItemCompletedChange,
    onDeleteItem,
  };
};
