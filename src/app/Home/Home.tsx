'use client';

import { TodoList } from '@/components/TodoList';
import { useTodoList } from '@/components/TodoList/TodoList.hooks';

export const Home = () => {
  const {
    todoListRef,
    items,
    onAddItem,
    onItemValueChange,
    onItemCompletedChange,
    onDeleteItem,
    onDeleteCompletedItems,
    setItems,
  } = useTodoList([]);

  return (
    <main>
      <TodoList
        ref={todoListRef}
        className="relative z-10 mx-auto mt-10 w-[87.2%] min-w-[300px] max-w-xl md:mt-12"
        items={items}
        onAddItem={onAddItem}
        onItemValueChange={onItemValueChange}
        onItemCompletedChange={onItemCompletedChange}
        onDeleteItem={onDeleteItem}
        onDeleteCompletedItems={onDeleteCompletedItems}
        setItems={setItems}
      />
    </main>
  );
};
