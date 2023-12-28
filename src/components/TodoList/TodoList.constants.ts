import { TodoItemType } from './TodoList';

export const TODO_LIST_FILTERS_MAP = {
  all: {
    label: 'All',
    value: 'all',
  },
  active: {
    label: 'Active',
    value: 'active',
  },
  completed: {
    label: 'Completed',
    value: 'completed',
  },
};

export const TODO_LIST_FILTERS = Object.values(TODO_LIST_FILTERS_MAP);

export const CLEAR_COMPLETED_BTN_LABEL = 'Clear Completed';
export const EMPTY_TODO_LIST_MESSAGE = 'You have no todo items.';
export const NO_ACTIVE_TODO_ITEMS_MESSAGE = 'You have no active todo items.';
export const NO_COMPLETED_TODO_ITEMS_MESSAGE = 'You have no completed todo items.';

// mocks
export const MOCKED_TODO_LIST_ITEMS: TodoItemType[] = [
  {
    id: 'ab1',
    value: 'Wash dishes',
    isCompleted: false,
  },
  {
    id: 'ab2',
    value: 'Cook dinner',
    isCompleted: true,
  },
];
