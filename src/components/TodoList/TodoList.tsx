import { ForwardedRef, forwardRef, useEffect, useState } from 'react';

import { useStateWithLocalStorage } from '@/hooks';

import { TODO_LIST_FILTERS, TODO_LIST_FILTERS_MAP, TodoListFilterValues } from '.';
import { NewTodoItem } from './NewTodoItem';
import { TodoListView } from './TodoListView';

export interface TodoItemType {
  id: string;
  value: string;
  isCompleted: boolean;
}

type TodoListProps = {
  className?: string;
  items: TodoItemType[];
  initialFilter?: TodoListFilterValues;
  onAddItem: (value: string) => void;
  onItemValueChange: (id: string, newValue: string) => void;
  onItemCompletedChange: (id: string, newIsCompleted: boolean) => void;
  onDeleteItem: (id: string) => void;
  onDeleteCompletedItems: () => void;
};

const FILTER_VALUE_LOCAL_STORAGE_KEY = 'filter_value';

export const TodoList = forwardRef(function TodoListComponent(
  { className = '', initialFilter = TODO_LIST_FILTERS[0].value, onAddItem, ...rest }: TodoListProps,
  ref: ForwardedRef<HTMLUListElement>
) {
  const [currentFilter, setCurrentFilter] = useStateWithLocalStorage<TodoListFilterValues>(
    FILTER_VALUE_LOCAL_STORAGE_KEY,
    initialFilter
  );
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddNewTodoItem = (value: string) => {
    onAddItem(value);

    // Set `currentFilter` to "all" when adding a new item under "completed" `currentFilter`
    if (currentFilter === TODO_LIST_FILTERS_MAP.completed.value) {
      setCurrentFilter(TODO_LIST_FILTERS_MAP.all.value);
    }
  };

  const handleFilterChange = (newFilter: TodoListFilterValues) => {
    setCurrentFilter(newFilter);
  };

  return (
    <div className={className}>
      <NewTodoItem onAddItem={handleAddNewTodoItem} />
      {mounted && (
        <TodoListView
          ref={ref}
          {...rest}
          currentFilter={currentFilter}
          onFilterChange={handleFilterChange}
        />
      )}
    </div>
  );
});
