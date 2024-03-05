import { useEffect, useRef, useState } from 'react';

import { useStateWithLocalStorage } from '@/hooks';

import { TodoItemType } from '.';

const TODO_LIST_LOCAL_STORAGE_KEY = 'todo_list';

export const useTodoList = (initialItems: TodoItemType[]) => {
  const [items, setItems] = useStateWithLocalStorage<TodoItemType[]>(
    TODO_LIST_LOCAL_STORAGE_KEY,
    initialItems
  );
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const todoListRef = useRef<HTMLUListElement | null>(null);

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
    setItems,
  };
};
