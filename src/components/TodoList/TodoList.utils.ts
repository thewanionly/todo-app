import { TODO_LIST_FILTERS_MAP, TodoItemType } from '.';

export const generateTodoListCountText = (itemCount: number): string => {
  if (!itemCount || isNaN(itemCount) || itemCount < 1) return '';

  return `${itemCount} ${itemCount === 1 ? 'item' : 'items'} left`;
};

export const filterTodoList = (items: TodoItemType[], filterValue: string): TodoItemType[] => {
  if (filterValue === TODO_LIST_FILTERS_MAP.active.value) {
    return items.filter(({ isCompleted }) => !isCompleted);
  }

  return items;
};
