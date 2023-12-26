import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CREATE_TODO_PLACEHOLDER } from '../TodoItem';
import { TodoList } from './TodoList';
import { MOCKED_TODO_LIST_ITEMS } from './TodoList.constants';
import { useTodoList } from './TodoList.hooks';
import { generateTodoListCountText } from './TodoList.utils';

const TodoListSetup = () => {
  const { items, onAddItem, onItemValueChange, onItemCompletedChange, onDeleteItem } =
    useTodoList(MOCKED_TODO_LIST_ITEMS);

  return (
    <TodoList
      items={items}
      onAddItem={onAddItem}
      onItemValueChange={onItemValueChange}
      onItemCompletedChange={onItemCompletedChange}
      onDeleteItem={onDeleteItem}
    />
  );
};

const setup = () => {
  render(<TodoListSetup />);
};

describe('TodoList', () => {
  describe('Layout', () => {
    it('displays a list of todo items', () => {
      setup();

      MOCKED_TODO_LIST_ITEMS.forEach(({ value }) => {
        const todoItem = screen.getByDisplayValue(value);
        expect(todoItem).toBeInTheDocument();
      });
    });

    it('displays an input field for adding new todo item', () => {
      setup();

      const addTodoInput = screen.getByPlaceholderText(CREATE_TODO_PLACEHOLDER);
      expect(addTodoInput).toBeInTheDocument();
    });

    it('displays the number of todo list items', () => {
      setup();

      const todoListCount = screen.getByText(
        generateTodoListCountText(MOCKED_TODO_LIST_ITEMS.length)
      );
      expect(todoListCount).toBeInTheDocument();
    });

    xit('displays the todo list filter buttons', () => {
      setup();

      // TODO:
    });

    xit('displays a button for clearing all completed items', () => {
      setup();

      // TODO:
    });
  });

  describe('Interactions', () => {
    it('clears the value in the "add new todo item" input field after pressing Enter key and the new item has been added', async () => {
      setup();

      // input value
      const newTodoItemValue = 'New value test';
      const addTodoInput = screen.getByPlaceholderText(CREATE_TODO_PLACEHOLDER);
      await userEvent.type(addTodoInput, newTodoItemValue);

      // assert inputted value is reflected in the input field
      expect(addTodoInput).toHaveValue(newTodoItemValue);

      // click enter
      await userEvent.type(addTodoInput, '{enter}');

      // assert inputted value is cleared from the input field
      expect(addTodoInput).toHaveValue('');
    });

    it('adds a new todo item in the list after typing in the input field for creating new todo item and pressing Enter key', async () => {
      setup();

      // input value
      const newTodoItemValue = 'New value test';
      const addTodoInput = screen.getByPlaceholderText(CREATE_TODO_PLACEHOLDER);
      await userEvent.type(addTodoInput, newTodoItemValue);

      // assert inputted value is reflected in the input field
      expect(addTodoInput).toHaveValue(newTodoItemValue);

      // click enter
      await userEvent.type(addTodoInput, '{enter}');

      // assert inputted value is added in todo list
      expect(screen.getByDisplayValue(newTodoItemValue)).toBeInTheDocument();

      // assert the todo list count if updated
      expect(
        screen.getByText(generateTodoListCountText(MOCKED_TODO_LIST_ITEMS.length + 1))
      ).toBeInTheDocument();
    });

    it('does not add a new todo item in the list after typing in the input field for creating new todo item and pressing Enter key when the value is empty', async () => {
      setup();

      // assert input value if it's empty
      const addTodoInput = screen.getByPlaceholderText(CREATE_TODO_PLACEHOLDER);
      expect(addTodoInput).toHaveValue('');

      // assert todo list count before entering
      expect(
        screen.getByText(generateTodoListCountText(MOCKED_TODO_LIST_ITEMS.length))
      ).toBeInTheDocument();

      // click enter
      await userEvent.type(addTodoInput, '{enter}');

      // assert todo list count after entering
      expect(
        screen.getByText(generateTodoListCountText(MOCKED_TODO_LIST_ITEMS.length))
      ).toBeInTheDocument();
    });

    xit('removes a todo item from the list after clicking on the delete button on the same todo item', () => {
      setup();

      // TODO:

      // assert the todo list count as well
    });

    xit('marks the todo item as completed after clicking the checkbox toggle in the todo item', () => {
      setup();

      // TODO:
    });

    xit('updates the todo item after clicking the todo item value and inputting in it', () => {
      setup();

      // TODO:
    });

    xit('deletes the todo item when value is updated to an empty string and input loses focus', () => {
      setup();

      // TODO:

      // assert the todo list count as well
    });

    xit('updates the todo list to show all todo list items by default', () => {
      setup();

      // TODO:

      // assert the todo list count as well
    });

    xit('updates the todo list to show active todo list items after clicking the "Active" filter', () => {
      setup();

      // TODO:

      // assert the todo list count as well
    });

    xit('updates the todo list to show the completed todo list items after clicking the "Completed" filter', () => {
      setup();

      // TODO:

      // assert the todo list count as well
    });

    xit('removes all the completed items after "clear completed" button is clicked', () => {
      setup();

      // TODO:

      // assert the todo list count as well
    });
  });
});
