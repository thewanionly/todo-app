import { useCallback, useEffect, useRef, useState } from 'react';

import { TodoItemType } from '.';

const TODO_LIST_LOCAL_STORAGE_KEY = 'todo_list';

export const useTodoList = (initialItems: TodoItemType[]) => {
  // Get default value from local storage then parse stored json or return initialItems
  const getDefaultValue = useCallback((): TodoItemType[] => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === 'undefined') {
      return initialItems;
    }

    try {
      const item = window.localStorage.getItem(TODO_LIST_LOCAL_STORAGE_KEY);
      return item ? JSON.parse(item) : initialItems;
    } catch (error) {
      console.error(`Error reading localStorage key “${TODO_LIST_LOCAL_STORAGE_KEY}”:`, error);
      return initialItems;
    }
  }, [initialItems]);

  const [items, setItems] = useState<TodoItemType[]>(getDefaultValue);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const todoListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    // Synchronize state with localStorage
    try {
      window.localStorage.setItem(TODO_LIST_LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.warn(`Error setting localStorage key “${TODO_LIST_LOCAL_STORAGE_KEY}”:`, error);
    }
  }, [items]);

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
