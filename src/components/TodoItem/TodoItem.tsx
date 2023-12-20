import { ChangeEvent, useState } from 'react';

import { Icon, IconName } from '../Icon';

export enum TodoItemMode {
  CREATE = 'create',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

type TodoItemCommonProps = {
  className?: string;
};

type TodoItemConditionalProps =
  | {
      mode: TodoItemMode.CREATE;
      value?: never;
    }
  | {
      mode: TodoItemMode.ACTIVE;
      value: string;
    }
  | {
      mode: TodoItemMode.COMPLETED;
      value: string;
    };

type TodoItemProps = TodoItemCommonProps & TodoItemConditionalProps;

type TodoItemInputProps = {
  mode: TodoItemMode;
  value: string;
};

type TodoItemCheckboxProps = {
  checked: boolean;
  disabled?: boolean;
};

export const CREATE_TODO_PLACEHOLDER = 'Create a new todo...';

const TodoItemCheckbox = ({ checked, disabled = false }: TodoItemCheckboxProps) => {
  const [checkboxValue, setCheckboxValue] = useState(checked);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(event.target.checked);
  };

  return (
    <label htmlFor="todo-item-checkbox" className="flex items-center">
      <input
        type="checkbox"
        id="todo-item-checkbox"
        className="hidden"
        checked={checkboxValue}
        onChange={handleCheckboxChange}
        disabled={disabled}
      />
      <span
        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-todo-item-toggle-border bg-todo-item-toggle-bg"
        {...(!disabled ? { tabIndex: 0 } : {})}
      >
        {/* TODO: implement checked state here */}
        <span
          className={`${!checkboxValue ? 'hidden' : ''} h-2 w-2 rounded-full bg-white`}
          aria-hidden="true"
        ></span>
      </span>
    </label>
  );
};

const TodoItemInput = ({ mode, value = '' }: TodoItemInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      className="w-full bg-transparent text-todo-item-text placeholder:text-todo-item-placeholder-text"
      placeholder={mode === TodoItemMode.CREATE ? CREATE_TODO_PLACEHOLDER : ''}
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export const TodoItem = ({ className, mode, value }: TodoItemProps) => {
  return (
    <div
      className={`flex gap-3 rounded-[5px] bg-todo-item-bg px-5 py-3.5 shadow-todo-item-box-shadow ${className}`}
    >
      <TodoItemCheckbox checked={false} disabled={mode === TodoItemMode.CREATE} />
      {mode === TodoItemMode.COMPLETED ? (
        <span>{value}</span>
      ) : (
        <TodoItemInput mode={mode} value={value ?? ''} />
      )}
      {mode !== TodoItemMode.CREATE && (
        <button aria-label="remove-button">
          <Icon name={IconName.Close} className="text-todo-item-remove-btn" />
        </button>
      )}
    </div>
  );
};
