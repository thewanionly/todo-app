import { render, screen } from '@testing-library/react';

import { TodoList } from './TodoList';
import { MOCKED_TODO_LIST_ITEMS } from './TodoList.constants';

const setup = () => {
  render(
    <TodoList
      items={MOCKED_TODO_LIST_ITEMS}
      onAddItem={jest.fn()}
      onItemValueChange={jest.fn()}
      onItemCompletedChange={jest.fn()}
      onDeleteItem={jest.fn()}
    />
  );
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

    xit('displays an input field for adding new todo item', () => {
      setup();

      // TODO:
    });

    xit('displays the number of todo list items', () => {
      setup();

      // TODO:
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
    xit('adds a new todo item in the list after typing in the input field for creating new todo item and pressing Enter key', () => {
      setup();

      // TODO:

      // assert the todo list count as well
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
