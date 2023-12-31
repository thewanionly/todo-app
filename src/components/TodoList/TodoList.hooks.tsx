import { useEffect, useRef, useState } from 'react';

import { TodoItemType } from '.';

export const useTodoList = (todoListItems: TodoItemType[]) => {
  const todoListRef = useRef<HTMLUListElement | null>(null);
  const [items, setItems] = useState<TodoItemType[]>(todoListItems);
  const [scrollToBottom, setScrollToBottom] = useState(false);

  const handleScrollListToBottom = () => {
    if (!todoListRef.current) return;

    // Scroll to the bottom of the element
    todoListRef.current.scrollTop = todoListRef.current.scrollHeight;

    // Set scrollToBottom to false again after scrolling is done
    setScrollToBottom(false);
  };

  useEffect(() => {
    if (!scrollToBottom) return;

    handleScrollListToBottom();
  }, [scrollToBottom]);

  const onAddItem = (value: string) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: crypto.randomUUID(),
        value,
        isCompleted: false,
      },
    ]);

    // scroll list to bottom after adding new item
    setScrollToBottom(true);
  };

  const onItemValueChange = (id: string, value: string) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, value } : item)));
  };

  const onItemCompletedChange = (id: string, value: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, isCompleted: value } : item))
    );
  };

  const onDeleteItem = (idToRemove: string) => {
    setItems((prevItems) => prevItems.filter(({ id }) => id !== idToRemove));
  };

  const onDeleteCompletedItems = () => {
    setItems((prevItems) => prevItems.filter(({ isCompleted }) => !isCompleted));
  };

  return {
    todoListRef,
    items,
    onAddItem,
    onItemValueChange,
    onItemCompletedChange,
    onDeleteItem,
    onDeleteCompletedItems,
  };
};
