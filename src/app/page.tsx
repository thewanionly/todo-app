'use client';

import { twMerge } from 'tailwind-merge';

import { Header } from '@/components/Header';
import { TodoList } from '@/components/TodoList';
import { useTodoList } from '@/components/TodoList/TodoList.hooks';

export default function Home() {
  const {
    todoListRef,
    items,
    onAddItem,
    onItemValueChange,
    onItemCompletedChange,
    onDeleteItem,
    onDeleteCompletedItems,
  } = useTodoList([]);

  return (
    <>
      <Header
        className={twMerge(
          `mx-auto mt-12 w-[87.2%] min-w-[300px] max-w-xl md:mt-14 lg:mt-16 xl:mt-20`
        )}
      />
      <TodoList
        ref={todoListRef}
        className="relative z-10 mx-auto mt-10 w-[87.2%] min-w-[300px] max-w-xl md:mt-12"
        items={items}
        onAddItem={onAddItem}
        onItemValueChange={onItemValueChange}
        onItemCompletedChange={onItemCompletedChange}
        onDeleteItem={onDeleteItem}
        onDeleteCompletedItems={onDeleteCompletedItems}
      />
    </>
  );
}
