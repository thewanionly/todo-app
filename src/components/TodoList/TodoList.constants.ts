import { TodoItemType } from './TodoList';

export const TODO_LIST_FILTERS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Completed',
    value: 'completed',
  },
];

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
