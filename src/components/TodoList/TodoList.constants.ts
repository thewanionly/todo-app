import { TodoItemType } from './TodoList';

export enum TodoListFilterValues {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface TodoListFilterMapProperties {
  label: string;
  value: TodoListFilterValues;
}

export const TODO_LIST_FILTERS_MAP: Record<TodoListFilterValues, TodoListFilterMapProperties> = {
  [TodoListFilterValues.All]: {
    label: 'All',
    value: TodoListFilterValues.All,
  },
  [TodoListFilterValues.Active]: {
    label: 'Active',
    value: TodoListFilterValues.Active,
  },
  [TodoListFilterValues.Completed]: {
    label: 'Completed',
    value: TodoListFilterValues.Completed,
  },
};

export const TODO_LIST_FILTERS = Object.values(TODO_LIST_FILTERS_MAP);

export const CLEAR_COMPLETED_BTN_LABEL = 'Clear Completed';
export const EMPTY_TODO_LIST_MESSAGE = 'You have no todo items.';
export const NO_ACTIVE_TODO_ITEMS_MESSAGE = 'You have no active todo items.';
export const NO_COMPLETED_TODO_ITEMS_MESSAGE = 'You have no completed todo items.';
export const DRAG_AND_DROP_MESSAGE = 'Drag and drop to reorder list';

export const EMPTY_MESSAGE_MAP: Record<TodoListFilterValues, string> = {
  [TodoListFilterValues.All]: EMPTY_TODO_LIST_MESSAGE,
  [TodoListFilterValues.Active]: NO_ACTIVE_TODO_ITEMS_MESSAGE,
  [TodoListFilterValues.Completed]: NO_COMPLETED_TODO_ITEMS_MESSAGE,
};

// mocks
export const MOCKED_TODO_LIST_ITEMS: TodoItemType[] = [
  {
    id: 'ab1',
    value: 'Cook dinner',
    isCompleted: false,
  },
  {
    id: 'ab2',
    value: 'Buy groceries',
    isCompleted: true,
  },
  {
    id: 'ab3',
    value: 'Wash dishes',
    isCompleted: false,
  },
];
