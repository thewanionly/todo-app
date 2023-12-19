import { Icon, IconName } from '../Icon';

export enum TodoItemMode {
  CREATE = 'create',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

type TodoItemProps =
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

type TodoItemInputProps = {
  mode: TodoItemMode;
};

type TodoItemCheckboxProps = {
  checked: boolean;
  disabled?: boolean;
};

export const CREATE_TODO_PLACEHOLDER = 'Create a new todo...';

const TodoItemCheckbox = ({ checked, disabled = false }: TodoItemCheckboxProps) => {
  return (
    <label htmlFor="todo-item-checkbox" className="flex items-center">
      <input type="checkbox" className="hidden" aria-hidden="true" disabled={disabled} />
      <span
        id="todo-item-checkbox"
        role="checkbox"
        aria-checked={checked}
        {...(!disabled ? { tabIndex: 0 } : {})}
        className="flex h-5 w-5 items-center justify-center rounded-full border border-todo-item-toggle-border bg-todo-item-toggle-bg"
      >
        {/* TODO: implement checked state here */}
        <span
          className={`${!checked ? 'hidden' : ''} h-2 w-2 rounded-full bg-white`}
          aria-hidden="true"
        ></span>
      </span>
    </label>
  );
};

const TodoItemInput = ({ mode }: TodoItemInputProps) => {
  return (
    <input
      className="w-full bg-transparent text-todo-item-text placeholder:text-todo-item-placeholder-text"
      placeholder={mode === TodoItemMode.CREATE ? CREATE_TODO_PLACEHOLDER : ''}
    />
  );
};

export const TodoItem = ({ mode, value }: TodoItemProps) => {
  return (
    <div className="flex gap-3 rounded-[5px] bg-todo-item-bg px-5 py-3.5 shadow-todo-item-box-shadow">
      <TodoItemCheckbox checked={false} disabled={mode === TodoItemMode.CREATE} />
      {mode === TodoItemMode.COMPLETED ? <span>{value}</span> : <TodoItemInput mode={mode} />}
      {mode !== TodoItemMode.CREATE && (
        <button aria-label="remove-button">
          <Icon name={IconName.Close} className="text-todo-item-remove-btn" />
        </button>
      )}
    </div>
  );
};
