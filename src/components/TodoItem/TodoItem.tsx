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
      onDelete?: never;
    }
  | {
      mode: TodoItemMode.ACTIVE;
      value: string;
      onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
    }
  | {
      mode: TodoItemMode.COMPLETED;
      value: string;
      onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
    };

type TodoItemProps = TodoItemCommonProps & TodoItemConditionalProps;

type TodoItemInputProps = {
  value: string;
  placeholder?: string;
  isCompleted: boolean;
};

type TodoItemCheckboxProps = {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export const CREATE_TODO_PLACEHOLDER = 'Create a new todo...';

const TodoItemCheckbox = ({ checked, onChange, disabled = false }: TodoItemCheckboxProps) => {
  return (
    <label htmlFor="todo-item-checkbox" className="flex items-center">
      <input
        type="checkbox"
        id="todo-item-checkbox"
        className="peer appearance-none focus-visible:outline-0"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span
        className={`${disabled ? 'pointer-events-none' : 'pointer-events-auto'} ${
          checked
            ? 'bg-todo-item-toggle-completed'
            : 'bg-todo-item-toggle-border hover:bg-todo-item-toggle-border-hover'
        } flex h-5 w-5 cursor-pointer items-center justify-center rounded-full peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-visible-outline`}
      >
        {checked ? (
          <Icon
            name={IconName.Check}
            className={`h-2 w-2.5 text-todo-item-toggle-completed-check-icon`}
          />
        ) : (
          <span
            className={`h-[19px] w-[19px] rounded-full bg-todo-item-toggle-bg`}
            aria-hidden="true"
          />
        )}
      </span>
    </label>
  );
};

const TodoItemInput = ({ value = '', placeholder, isCompleted }: TodoItemInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      className={`w-full bg-transparent text-todo-item-text placeholder:text-todo-item-placeholder-text ${
        isCompleted ? 'text-todo-item-text-completed line-through' : ''
      }`}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleInputChange}
      disabled={isCompleted}
    />
  );
};

export const TodoItem = ({ className, mode, value, onDelete }: TodoItemProps) => {
  const [completed, setCompleted] = useState(mode === TodoItemMode.COMPLETED);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
  };

  return (
    <div
      className={`flex gap-3 rounded-[5px] bg-todo-item-bg px-5 py-3.5 shadow-todo-item-box-shadow ${className}`}
    >
      <TodoItemCheckbox
        checked={completed}
        onChange={handleCheckboxChange}
        disabled={mode === TodoItemMode.CREATE}
      />
      <TodoItemInput
        value={value ?? ''}
        placeholder={mode === TodoItemMode.CREATE ? CREATE_TODO_PLACEHOLDER : ''}
        isCompleted={completed}
      />
      {mode !== TodoItemMode.CREATE && (
        <button type="button" aria-label="remove-button" onClick={onDelete}>
          <Icon
            name={IconName.Close}
            className="text-todo-item-remove-btn hover:text-todo-item-remove-btn-hover"
          />
        </button>
      )}
    </div>
  );
};
