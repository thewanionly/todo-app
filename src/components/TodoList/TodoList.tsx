import { ChangeEvent, useState } from 'react';

import { twMerge } from 'tailwind-merge';

import {
  CLEAR_COMPLETED_BTN_LABEL,
  EMPTY_MESSAGE_MAP,
  TODO_LIST_FILTERS,
  TODO_LIST_FILTERS_MAP,
  TodoListFilterValues,
} from '.';
import { Button } from '../Button';
import { FilterButtons } from '../FilterButtons';
import { TodoItem, TodoItemMode } from '../TodoItem';
import { filterTodoList, generateTodoListCountText } from './TodoList.utils';

export interface TodoItemType {
  id: string;
  value: string;
  isCompleted: boolean;
}

interface TodoListProps {
  className?: string;
  items: TodoItemType[];
  onAddItem: (value: string) => void;
  onItemValueChange: (id: string, newValue: string) => void;
  onItemCompletedChange: (id: string, newIsCompleted: boolean) => void;
  onDeleteItem: (id: string) => void;
  onDeleteCompletedItems: () => void;
}

export const TodoList = ({
  className = '',
  items,
  onAddItem,
  onItemValueChange,
  onItemCompletedChange,
  onDeleteItem,
  onDeleteCompletedItems,
}: TodoListProps) => {
  const [newTodoItemValue, setNewTodoItemValue] = useState('');
  const [currentFilter, setCurrentFilter] = useState<TodoListFilterValues>(
    TODO_LIST_FILTERS[0].value
  );

  const filteredItems = filterTodoList(items, currentFilter);

  const activeItemsCount = filterTodoList(items, TODO_LIST_FILTERS_MAP.active.value).length;
  const showActiveItemsCount = currentFilter !== TODO_LIST_FILTERS_MAP.completed.value;
  const showClearCompletedBtn = filteredItems.some(({ isCompleted }) => isCompleted);

  const isEmptyList = items.length === 0;
  const showEmptyMessage = isEmptyList || filteredItems.length === 0;
  const emptyMessage = EMPTY_MESSAGE_MAP[currentFilter];

  const handleAddNewTodoItem = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Don't add a new todo item if there's no value
    if (!newTodoItemValue) return;

    // Add item to the list
    onAddItem(newTodoItemValue);

    // Clear `newTodoItemValue` value
    setNewTodoItemValue('');

    // Set `currentFilter` to "all" when adding a new item under "completed" `currentFilter`
    if (currentFilter === TODO_LIST_FILTERS_MAP.completed.value) {
      setCurrentFilter(TODO_LIST_FILTERS_MAP.all.value);
    }
  };

  const handleNewTodoItemValueChange = (value: string) => {
    setNewTodoItemValue(value);
  };

  const handleEditItemValue = (id: string) => (value: string) => {
    onItemValueChange(id, value);
  };

  const handleInputBlur = (id: string) => (value: string) => {
    if (value) return;

    // remove item if value is empty on input blur
    onDeleteItem(id);
  };

  const handleToggleItemCompleted = (id: string) => (isCompleted: boolean) => {
    onItemCompletedChange(id, isCompleted);
  };

  const handleDeleteItem = (id: string) => () => {
    onDeleteItem(id);
  };

  const handleDeleteCompletedItems = () => {
    onDeleteCompletedItems();
  };

  const handleFilterChange = (value: string) => {
    setCurrentFilter(value as TodoListFilterValues);
  };

  return (
    <div className={className}>
      <form onSubmit={handleAddNewTodoItem} className="relative">
        <TodoItem
          className="mb-4"
          mode={TodoItemMode.CREATE}
          value={newTodoItemValue}
          onEditValue={handleNewTodoItemValueChange}
        />
        {/* Need to add in order for form submission by "enter" key works in Jest env as well */}
        <Button type="submit" aria-hidden className="absolute left-0 top-0" tabIndex={-1} />
      </form>
      <div className="rounded-[5px] shadow-todo-list-box-shadow">
        {showEmptyMessage && (
          <div
            className={twMerge(
              `flex aspect-[2] items-center justify-center rounded-[5px] bg-todo-list-bg text-sm text-body-text ${
                !isEmptyList ? 'md:rounded-b-none' : ''
              }`
            )}
          >
            {emptyMessage}
          </div>
        )}
        {!isEmptyList && (
          <>
            {!showEmptyMessage && (
              <ul
                aria-label="todo list"
                className="todo-list max-h-[41.2vh] overflow-auto rounded-t-[5px]"
              >
                {filteredItems.map(({ id, value, isCompleted }) => (
                  <li key={id}>
                    <TodoItem
                      className={`rounded-none border-b border-todo-item-bottom-border`}
                      mode={isCompleted ? TodoItemMode.COMPLETED : TodoItemMode.ACTIVE}
                      value={value}
                      onEditValue={handleEditItemValue(id)}
                      onInputBlur={handleInputBlur(id)}
                      onToggleCompleted={handleToggleItemCompleted(id)}
                      onDelete={handleDeleteItem(id)}
                    />
                  </li>
                ))}
              </ul>
            )}
            <div
              className={twMerge(
                `relative flex items-center justify-between gap-3 rounded-b-[5px] bg-todo-list-bg px-5 py-3.5 ${
                  showEmptyMessage
                    ? 'h-0 p-0 md:h-[50px] md:border-t md:border-todo-item-bottom-border md:px-5 md:py-3.5'
                    : ''
                }`
              )}
            >
              <span className={`text-sm text-body-text ${showEmptyMessage ? 'invisible' : ''}`}>
                {showActiveItemsCount && generateTodoListCountText(activeItemsCount)}
              </span>
              <FilterButtons
                className={twMerge(
                  `absolute left-0 top-0 mt-16 w-full md:inset-1/2 md:mt-0 md:h-full md:w-max md:-translate-x-1/2 md:-translate-y-1/2 md:transform md:p-0 md:shadow-none ${
                    showEmptyMessage ? 'mt-4' : ''
                  }`
                )}
                filters={TODO_LIST_FILTERS}
                defaultFilter={currentFilter}
                onSelectFilter={handleFilterChange}
              />
              {showClearCompletedBtn && (
                <Button
                  className={`p-0 text-sm text-clear-completd-btn-text hover:text-clear-completd-btn-text-hover ${
                    showEmptyMessage ? 'invisible' : ''
                  }`}
                  onClick={handleDeleteCompletedItems}
                >
                  {CLEAR_COMPLETED_BTN_LABEL}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
