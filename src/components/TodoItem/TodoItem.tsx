export enum TodoItemMode {
  CREATE = 'create',
  READ = 'read',
  COMPLETED = 'completed',
}

type TodoItemProps =
  | {
      mode: TodoItemMode.CREATE;
      value?: never;
    }
  | {
      mode: TodoItemMode.READ;
      value: string;
    }
  | {
      mode: TodoItemMode.COMPLETED;
      value: string;
    };

export const TodoItem = ({ mode, value }: TodoItemProps) => {
  if (mode === TodoItemMode.CREATE) {
    return (
      <div className="rounded-[5px] bg-todo-item-bg px-5 py-3.5 shadow-todo-item-box-shadow focus-within:outline focus-within:outline-2 focus-within:outline-filter-buttons-text-active">
        <input className="w-full bg-transparent outline-0" placeholder="Create a new todo..." />
      </div>
    );
  }

  return (
    <div>
      <input defaultValue={value} />
    </div>
  );
};
