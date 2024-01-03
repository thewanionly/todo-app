import { ChangeEvent, FocusEvent, useId, useState } from 'react';

import { twMerge } from 'tailwind-merge';

import { useOnValueChange } from '@/hooks';

import { Button } from '../Button';
import { Icon, IconName } from '../Icon';

export enum TodoItemMode {
  CREATE = 'create',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

type TodoItemCommonProps = {
  className?: string;
  onInputBlur?: (value: string) => void;
};

type TodoItemConditionalProps =
  | {
      mode: TodoItemMode.CREATE;
      value: string;
      onEditValue: (value: string) => void;
      onToggleCompleted?: never;
      onDelete?: never;
    }
  | {
      mode: TodoItemMode.ACTIVE;
      value: string;
      onEditValue: (value: string) => void;
      onToggleCompleted: (value: boolean) => void;
      onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
    }
  | {
      mode: TodoItemMode.COMPLETED;
      value: string;
      onEditValue: (value: string) => void;
      onToggleCompleted: (value: boolean) => void;
      onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
    };

type TodoItemProps = TodoItemCommonProps & TodoItemConditionalProps;

type TodoItemInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
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
  const checkboxId = useId();

  return (
    <label htmlFor={checkboxId} className="flex items-center">
      <input
        type="checkbox"
        id={checkboxId}
        className="peer appearance-none focus-visible:outline-0"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        data-checked={checked}
      />
      <span
        className={`${disabled ? 'pointer-events-none' : 'pointer-events-auto'} ${
          checked
            ? 'bg-todo-item-toggle-completed'
            : 'bg-todo-item-toggle-border hover:bg-todo-item-toggle-border-hover'
        } flex h-5 w-5 cursor-pointer items-center justify-center rounded-full peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-visible-outline md:h-6 md:w-6`}
      >
        {checked ? (
          <Icon
            name={IconName.Check}
            className={`h-2 w-2.5 text-todo-item-toggle-completed-check-icon md:h-2.5 md:w-3`}
          />
        ) : (
          <span
            className={`h-[19px] w-[19px] rounded-full bg-todo-item-toggle-bg md:h-[23px] md:w-[23px]`}
            aria-hidden="true"
          />
        )}
      </span>
    </label>
  );
};

const TodoItemInput = ({
  value = '',
  onChange,
  onBlur,
  placeholder,
  isCompleted,
}: TodoItemInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur?.(event.target.value);
  };

  useOnValueChange(() => {
    setInputValue(value);
  }, value);

  return (
    <input
      className={`w-full bg-transparent tracking-[-0.167px] text-todo-item-text  placeholder:text-todo-item-placeholder-text md:tracking-[-0.25px] ${
        isCompleted ? 'text-todo-item-text-completed line-through' : ''
      }`}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      disabled={isCompleted}
      data-value={value}
    />
  );
};

export const TodoItem = ({
  className = '',
  mode,
  value,
  onEditValue,
  onInputBlur,
  onToggleCompleted,
  onDelete,
}: TodoItemProps) => {
  const [completed, setCompleted] = useState(mode === TodoItemMode.COMPLETED);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
    onToggleCompleted?.(event.target.checked);
  };

  return (
    <div
      className={twMerge(
        `flex gap-3 rounded-[5px] bg-todo-item-bg px-5 py-4 shadow-todo-item-box-shadow md:gap-6 md:px-6 md:py-5 md:text-lg ${className}`
      )}
    >
      <TodoItemCheckbox
        checked={completed}
        onChange={handleCheckboxChange}
        disabled={mode === TodoItemMode.CREATE}
      />
      <TodoItemInput
        value={value ?? ''}
        onChange={onEditValue}
        onBlur={onInputBlur}
        placeholder={mode === TodoItemMode.CREATE ? CREATE_TODO_PLACEHOLDER : ''}
        isCompleted={completed}
      />
      {mode !== TodoItemMode.CREATE && (
        <Button aria-label="remove-button" className="p-0" onClick={onDelete}>
          <Icon
            name={IconName.Close}
            className="h-4 w-4 text-todo-item-remove-btn hover:text-todo-item-remove-btn-hover md:h-5 md:w-5"
          />
        </Button>
      )}
    </div>
  );
};
