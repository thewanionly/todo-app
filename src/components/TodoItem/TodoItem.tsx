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
  mode: TodoItemMode;
  value: string;
};

type TodoItemCheckboxProps = {
  checked: boolean;
  disabled?: boolean;
};

export const CREATE_TODO_PLACEHOLDER = 'Create a new todo...';

const TodoItemCheckbox = ({ checked, disabled = false }: TodoItemCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <label htmlFor="todo-item-checkbox" className="flex items-center">
      <input
        type="checkbox"
        id="todo-item-checkbox"
        className="peer appearance-none"
        checked={isChecked}
        onChange={handleCheckboxChange}
        disabled={disabled}
      />
      <span
        className={`${
          isChecked
            ? 'bg-todo-item-toggle-completed'
            : 'bg-todo-item-toggle-border hover:bg-todo-item-toggle-border-hover'
        } peer-focus-visible:todo-item-checkbox-focus flex h-5 w-5 cursor-pointer items-center justify-center rounded-full peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-inherit`}
      >
        {isChecked ? (
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

export const TodoItem = ({ className, mode, value, onDelete }: TodoItemProps) => {
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
