import { TodoItem, TodoItemMode } from '../TodoItem';

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
}

export const TodoList = ({
  className = '',
  items,
  onItemValueChange,
  onItemCompletedChange,
  onDeleteItem,
}: TodoListProps) => {
  const handleEditItemValue = (id: string) => (value: string) => {
    onItemValueChange(id, value);
  };

  const handleToggleItemCompleted = (id: string) => (isCompleted: boolean) => {
    onItemCompletedChange(id, isCompleted);
  };

  const handleDeleteItem = (id: string) => () => {
    onDeleteItem(id);
  };

  return (
    <ul className={className}>
      {items.map(({ id, value, isCompleted }, index) => (
        <li key={id}>
          <TodoItem
            className={`rounded-none border-b border-todo-item-bottom-border  ${
              index === 0 ? 'rounded-t-[5px]' : ''
            }`}
            mode={isCompleted ? TodoItemMode.COMPLETED : TodoItemMode.ACTIVE}
            value={value}
            onEditValue={handleEditItemValue(id)}
            onToggleCompleted={handleToggleItemCompleted(id)}
            onDelete={handleDeleteItem(id)}
          />
        </li>
      ))}
    </ul>
  );
};
