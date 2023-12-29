import { TODO_LIST_FILTERS_MAP, TodoItemType } from '.';

export const generateTodoListCountText = (itemCount: number): string => {
  if (!itemCount || isNaN(itemCount) || itemCount < 1) return '';

  return `${itemCount} ${itemCount === 1 ? 'item' : 'items'} left`;
};

export const filterTodoList = (items: TodoItemType[], filterValue: string): TodoItemType[] => {
  // 'all' filter
  if (filterValue === TODO_LIST_FILTERS_MAP.all.value) return items;

  // 'active' and 'completed' filters
  return items.filter(({ isCompleted }) =>
    filterValue === TODO_LIST_FILTERS_MAP.active.value ? !isCompleted : isCompleted
  );
};
