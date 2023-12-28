import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CREATE_TODO_PLACEHOLDER } from '../TodoItem';
import { TodoList } from './TodoList';
import {
  CLEAR_COMPLETED_BTN_LABEL,
  EMPTY_TODO_LIST_MESSAGE,
  MOCKED_TODO_LIST_ITEMS,
  TODO_LIST_FILTERS,
  TODO_LIST_FILTERS_MAP,
} from './TodoList.constants';
import { useTodoList } from './TodoList.hooks';
import { generateTodoListCountText } from './TodoList.utils';

const TodoListSetup = ({ isEmptyList = false }: { isEmptyList?: boolean }) => {
  const {
    items,
    onAddItem,
    onItemValueChange,
    onItemCompletedChange,
    onDeleteItem,
    onDeleteCompletedItems,
  } = useTodoList(isEmptyList ? [] : MOCKED_TODO_LIST_ITEMS);

  return (
    <TodoList
      items={items}
      onAddItem={onAddItem}
      onItemValueChange={onItemValueChange}
      onItemCompletedChange={onItemCompletedChange}
      onDeleteItem={onDeleteItem}
      onDeleteCompletedItems={onDeleteCompletedItems}
    />
  );
};

type SetupOptions = {
  showEmptyList?: boolean;
};

const setup = ({ showEmptyList = false }: SetupOptions = {}) => {
  render(<TodoListSetup isEmptyList={showEmptyList} />);
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

    it('displays the todo list filter buttons', () => {
      setup();

      TODO_LIST_FILTERS.forEach(({ label }) => {
        const filterBtn = screen.getByRole('button', { name: label });
        expect(filterBtn).toBeInTheDocument();
      });
    });

    it('displays a button for clearing all completed items if there is at least one completed item', () => {
      setup();

      const clearCompletedBtn = screen.getByRole('button', { name: CLEAR_COMPLETED_BTN_LABEL });

      expect(clearCompletedBtn).toBeInTheDocument();
    });

    it(`displays an empty message when there's no todo items`, () => {
      setup({ showEmptyList: true });

      const emptyMessage = screen.getByText(EMPTY_TODO_LIST_MESSAGE);
      expect(emptyMessage).toBeInTheDocument();
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
      const listEl = screen.getByRole('list', { name: 'todo list' });
      const newTodoItem = within(listEl).getByDisplayValue(newTodoItemValue);
      expect(newTodoItem).toBeInTheDocument();

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

      // assert if no empty todo item is added in the list
      const listEl = screen.getByRole('list', { name: 'todo list' });
      const emptyTodoItem = within(listEl).queryByDisplayValue('');
      expect(emptyTodoItem).not.toBeInTheDocument();

      // assert todo list count after entering
      expect(
        screen.getByText(generateTodoListCountText(MOCKED_TODO_LIST_ITEMS.length))
      ).toBeInTheDocument();
    });

    it('removes a todo item from the list after clicking on the delete button on the same todo item', async () => {
      setup();

      // assert todo list count before deleting
      expect(
        screen.getByText(generateTodoListCountText(MOCKED_TODO_LIST_ITEMS.length))
      ).toBeInTheDocument();

      // assert that the first item is in the list
      expect(screen.getByDisplayValue(MOCKED_TODO_LIST_ITEMS[0].value)).toBeInTheDocument();

      // click the delete button in the first todo item
      const listEl = screen.getByRole('list', { name: 'todo list' });
      const firstRemoveButton = within(listEl).getAllByRole('button', { name: 'remove-button' })[0];
      expect(firstRemoveButton).toBeInTheDocument();

      await userEvent.click(firstRemoveButton);

      // assert that the first item is removed from the list
      expect(screen.queryByDisplayValue(MOCKED_TODO_LIST_ITEMS[0].value)).not.toBeInTheDocument();

      // assert todo list count after deleting
      expect(
        screen.getByText(generateTodoListCountText(MOCKED_TODO_LIST_ITEMS.length - 1))
      ).toBeInTheDocument();
    });

    it('marks the todo item as completed after clicking the checkbox toggle in the todo item', async () => {
      setup();

      const firstItem = screen.getByDisplayValue(MOCKED_TODO_LIST_ITEMS[0].value);

      // assert that the first item is in the list
      expect(firstItem).toBeInTheDocument();

      // assert that the first item is not completed
      const listEl = screen.getByRole('list', { name: 'todo list' });
      const firstCompletedCheckbox = within(listEl).getAllByRole('checkbox')[0];
      expect(firstCompletedCheckbox).not.toBeChecked();
      expect(firstCompletedCheckbox).toHaveAttribute('data-checked', 'false');

      // click the completed checkbox in the first todo item
      await userEvent.click(firstCompletedCheckbox);

      // assert that the first item is completed
      expect(firstCompletedCheckbox).toBeChecked();
      expect(firstCompletedCheckbox).toHaveAttribute('data-checked', 'true');
    });

    it('marks the todo item as not completed after clicking the checkbox toggle in the todo item when it was previously completed', async () => {
      setup();

      const secondItem = screen.getByDisplayValue(MOCKED_TODO_LIST_ITEMS[1].value);

      // assert that the second item is in the list
      expect(secondItem).toBeInTheDocument();

      // assert that the second item is not completed
      const listEl = screen.getByRole('list', { name: 'todo list' });
      const secondCompletedCheckbox = within(listEl).getAllByRole('checkbox')[1];
      expect(secondCompletedCheckbox).toBeChecked();
      expect(secondCompletedCheckbox).toHaveAttribute('data-checked', 'true');

      // click the completed checkbox in the second todo item
      await userEvent.click(secondCompletedCheckbox);

      // assert that the second item is completed
      expect(secondCompletedCheckbox).not.toBeChecked();
      expect(secondCompletedCheckbox).toHaveAttribute('data-checked', 'false');
    });

    it('updates the todo item after clicking the todo item value and inputting in it', async () => {
      setup();

      // assert the first item's value
      const listEl = screen.getByRole('list', { name: 'todo list' });
      const firstItemInput = within(listEl).getAllByRole('textbox')[0];
      expect(firstItemInput).toHaveValue(MOCKED_TODO_LIST_ITEMS[0].value);
      expect(firstItemInput).toHaveAttribute('data-value', MOCKED_TODO_LIST_ITEMS[0].value);

      // update the todo item value
      const newValue = 'test';
      await userEvent.clear(firstItemInput);
      await userEvent.type(firstItemInput, newValue);

      // assert that the value has changed
      expect(firstItemInput).toHaveValue(newValue);
      expect(firstItemInput).toHaveAttribute('data-value', newValue);
    });

    it('deletes the todo item when value is updated to an empty string and input loses focus', async () => {
      setup();

      // assert todo list count before deletion
      expect(
        screen.getByText(generateTodoListCountText(MOCKED_TODO_LIST_ITEMS.length))
      ).toBeInTheDocument();

      // assert the first item's value
      const listEl = screen.getByRole('list', { name: 'todo list' });
      const firstItemInput = within(listEl).getAllByRole('textbox')[0];
      expect(firstItemInput).toHaveValue(MOCKED_TODO_LIST_ITEMS[0].value);
      expect(firstItemInput).toHaveAttribute('data-value', MOCKED_TODO_LIST_ITEMS[0].value);

      // remove the first item by clearing the value and going out of focus
      await userEvent.clear(firstItemInput);
      await userEvent.click(document.body); // simulate going out of focus by clicking the body

      // assert that the first item is removed from the list
      expect(screen.queryByDisplayValue(MOCKED_TODO_LIST_ITEMS[0].value)).not.toBeInTheDocument();

      // assert todo list count after deletion
      expect(
        screen.getByText(generateTodoListCountText(MOCKED_TODO_LIST_ITEMS.length - 1))
      ).toBeInTheDocument();
    });

    it('shows all todo list items by default', () => {
      setup();

      // assert that all todo items are present
      MOCKED_TODO_LIST_ITEMS.forEach(({ value }) => {
        const todoItem = screen.getByDisplayValue(value);
        expect(todoItem).toBeInTheDocument();
      });
    });

    it('updates the todo list to show active todo list items after clicking the "Active" filter', async () => {
      setup();

      // assert that all todo items are present before filtering
      MOCKED_TODO_LIST_ITEMS.forEach(({ value }) => {
        const todoItem = screen.getByDisplayValue(value);
        expect(todoItem).toBeInTheDocument();
      });

      // click on the active filter
      const activeFilterBtn = screen.getByRole('button', {
        name: TODO_LIST_FILTERS_MAP.active.label,
      });
      await userEvent.click(activeFilterBtn);

      // assert that only active items are present
      MOCKED_TODO_LIST_ITEMS.forEach(({ value, isCompleted }) => {
        const todoItem = screen.queryByDisplayValue(value);

        if (isCompleted) {
          expect(todoItem).not.toBeInTheDocument();
        } else {
          expect(todoItem).toBeInTheDocument();
        }
      });
    });

    xit(`displays a "no active todo items" message when there's no active todo items`, () => {
      setup();

      // TODO:
    });

    xit('updates the todo list to show the completed todo list items after clicking the "Completed" filter', () => {
      setup();

      // TODO:

      // assert the todo list count as well
    });

    xit(`displays a "no completed todo items" message when there's no completed todo items`, () => {
      setup();

      // TODO:
    });

    it('removes all the completed items after "clear completed" button is clicked', async () => {
      setup();

      // assert todo list count before deletion
      expect(
        screen.getByText(generateTodoListCountText(MOCKED_TODO_LIST_ITEMS.length))
      ).toBeInTheDocument();

      const clearCompletedBtn = screen.getByRole('button', { name: CLEAR_COMPLETED_BTN_LABEL });

      // click clear completed button
      await userEvent.click(clearCompletedBtn);

      // assert todo list count after deletion
      expect(
        screen.getByText(
          generateTodoListCountText(
            MOCKED_TODO_LIST_ITEMS.filter(({ isCompleted }) => !isCompleted).length
          )
        )
      ).toBeInTheDocument();
    });

    it('does not display a button for clearing all completed items if there is no completed item', async () => {
      setup();

      // untick completed items
      const completedCheckboxes = screen
        .getAllByRole<HTMLInputElement>('checkbox')
        .filter((checkboxEl) => checkboxEl.checked);

      for (const checkboxEl of completedCheckboxes) {
        await userEvent.click(checkboxEl);
      }

      // assert clear completed button does not exist
      const clearCompletedBtn = screen.queryByRole('button', { name: CLEAR_COMPLETED_BTN_LABEL });

      expect(clearCompletedBtn).not.toBeInTheDocument();
    });
  });
});
