import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CREATE_TODO_PLACEHOLDER } from '../TodoItem';
import { TodoList } from './TodoList';
import {
  CLEAR_COMPLETED_BTN_LABEL,
  EMPTY_TODO_LIST_MESSAGE,
  MOCKED_TODO_LIST_ITEMS,
  NO_ACTIVE_TODO_ITEMS_MESSAGE,
  NO_COMPLETED_TODO_ITEMS_MESSAGE,
  TODO_LIST_FILTERS,
  TODO_LIST_FILTERS_MAP,
} from './TodoList.constants';
import { useTodoList } from './TodoList.hooks';
import { filterTodoList, generateTodoListCountText } from './TodoList.utils';

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
    describe('Adding a new todo item', () => {
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

        // assert the active todo list count if updated
        expect(
          screen.getByText(
            generateTodoListCountText(
              filterTodoList(MOCKED_TODO_LIST_ITEMS, TODO_LIST_FILTERS_MAP.active.value).length + 1
            )
          )
        ).toBeInTheDocument();
      });

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

      it('does not add a new todo item in the list after typing in the input field for creating new todo item and pressing Enter key when the value is empty', async () => {
        setup();

        // assert input value if it's empty
        const addTodoInput = screen.getByPlaceholderText(CREATE_TODO_PLACEHOLDER);
        expect(addTodoInput).toHaveValue('');

        // assert todo list count before entering
        expect(
          screen.getByText(
            generateTodoListCountText(
              filterTodoList(MOCKED_TODO_LIST_ITEMS, TODO_LIST_FILTERS_MAP.active.value).length
            )
          )
        ).toBeInTheDocument();

        // click enter
        await userEvent.type(addTodoInput, '{enter}');

        // assert if no empty todo item is added in the list
        const listEl = screen.getByRole('list', { name: 'todo list' });
        const emptyTodoItem = within(listEl).queryByDisplayValue('');
        expect(emptyTodoItem).not.toBeInTheDocument();

        // assert todo list count after entering
        expect(
          screen.getByText(
            generateTodoListCountText(
              filterTodoList(MOCKED_TODO_LIST_ITEMS, TODO_LIST_FILTERS_MAP.active.value).length
            )
          )
        ).toBeInTheDocument();
      });

      it('sets the current filter to "all" when current filter is "completed" and user adds a new todo item', async () => {
        setup();

        // click on the completed filter
        const completedFilterBtn = screen.getByRole('button', {
          name: TODO_LIST_FILTERS_MAP.completed.label,
        });
        await userEvent.click(completedFilterBtn);

        // input value
        const newTodoItemValue = 'New value test';
        const addTodoInput = screen.getByPlaceholderText(CREATE_TODO_PLACEHOLDER);
        await userEvent.type(addTodoInput, newTodoItemValue);

        // click enter
        await userEvent.type(addTodoInput, '{enter}');

        // assert that current filter is "all"
        [newTodoItemValue, ...MOCKED_TODO_LIST_ITEMS.map(({ value }) => value)].forEach((value) => {
          const todoItem = screen.getByDisplayValue(value);
          expect(todoItem).toBeInTheDocument();
        });
      });
    });

    describe('Deleting a todo item', () => {
      it('removes a todo item from the list after clicking on the delete button on the same todo item', async () => {
        setup();

        // assert that the first item is in the list
        expect(screen.getByDisplayValue(MOCKED_TODO_LIST_ITEMS[0].value)).toBeInTheDocument();

        // click the delete button in the first todo item
        const listEl = screen.getByRole('list', { name: 'todo list' });
        const firstRemoveButton = within(listEl).getAllByRole('button', {
          name: 'remove-button',
        })[0];
        expect(firstRemoveButton).toBeInTheDocument();

        await userEvent.click(firstRemoveButton);

        // assert that the first item is removed from the list
        expect(screen.queryByDisplayValue(MOCKED_TODO_LIST_ITEMS[0].value)).not.toBeInTheDocument();
      });

      it('deletes the todo item when value is updated to an empty string and input loses focus', async () => {
        setup();

        // assert todo list count before deletion
        expect(
          screen.getByText(
            generateTodoListCountText(
              filterTodoList(MOCKED_TODO_LIST_ITEMS, TODO_LIST_FILTERS_MAP.active.value).length
            )
          )
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
          screen.getByText(
            generateTodoListCountText(
              filterTodoList(MOCKED_TODO_LIST_ITEMS, TODO_LIST_FILTERS_MAP.active.value).length - 1
            )
          )
        ).toBeInTheDocument();
      });
    });

    describe(`Updating a todo item's value`, () => {
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
    });

    describe(`Marking a todo item as completed`, () => {
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
    });

    describe('Filtering the todo items', () => {
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

      it(`displays a "no active todo items" message when there's no active todo items`, async () => {
        setup();

        // mark active elements as completed
        const activeCheckboxes = screen
          .getAllByRole<HTMLInputElement>('checkbox')
          .filter((checkboxEl) => !checkboxEl.checked);

        for (const checkboxEl of activeCheckboxes) {
          await userEvent.click(checkboxEl);
        }

        // click on the active filter
        const activeFilterBtn = screen.getByRole('button', {
          name: TODO_LIST_FILTERS_MAP.active.label,
        });
        await userEvent.click(activeFilterBtn);

        // assert that "no active todo items" is present
        const noActiveTodoMessage = screen.getByText(NO_ACTIVE_TODO_ITEMS_MESSAGE);
        expect(noActiveTodoMessage).toBeInTheDocument();
      });

      it('updates the todo list to show the completed todo list items after clicking the "Completed" filter', async () => {
        setup();

        // assert that all todo items are present before filtering
        MOCKED_TODO_LIST_ITEMS.forEach(({ value }) => {
          const todoItem = screen.getByDisplayValue(value);
          expect(todoItem).toBeInTheDocument();
        });

        // click on the completed filter
        const completedFilterBtn = screen.getByRole('button', {
          name: TODO_LIST_FILTERS_MAP.completed.label,
        });
        await userEvent.click(completedFilterBtn);

        // assert that only completed items are present
        MOCKED_TODO_LIST_ITEMS.forEach(({ value, isCompleted }) => {
          const todoItem = screen.queryByDisplayValue(value);

          if (isCompleted) {
            expect(todoItem).toBeInTheDocument();
          } else {
            expect(todoItem).not.toBeInTheDocument();
          }
        });
      });

      it(`displays a "no completed todo items" message when there's no completed todo items`, async () => {
        setup();

        // untick completed items
        const completedCheckboxes = screen
          .getAllByRole<HTMLInputElement>('checkbox')
          .filter((checkboxEl) => checkboxEl.checked);

        for (const checkboxEl of completedCheckboxes) {
          await userEvent.click(checkboxEl);
        }

        // click on the completed filter
        const completedFilterBtn = screen.getByRole('button', {
          name: TODO_LIST_FILTERS_MAP.completed.label,
        });
        await userEvent.click(completedFilterBtn);

        // assert that "no completed todo items" is present
        const noCompletedTodoMessage = screen.getByText(NO_COMPLETED_TODO_ITEMS_MESSAGE);
        expect(noCompletedTodoMessage).toBeInTheDocument();
      });
    });

    describe('Active items count', () => {
      it('displays the number of active todo list items', () => {
        setup();

        const activeItemsCount = screen.getByText(
          generateTodoListCountText(
            filterTodoList(MOCKED_TODO_LIST_ITEMS, TODO_LIST_FILTERS_MAP.active.value).length
          )
        );
        expect(activeItemsCount).toBeInTheDocument();
      });

      it('hides the active item count when current filter is "completed"', async () => {
        setup();

        // click on the completed filter
        const completedFilterBtn = screen.getByRole('button', {
          name: TODO_LIST_FILTERS_MAP.completed.label,
        });
        await userEvent.click(completedFilterBtn);

        // assert that active items count is NOT present
        const activeItemsCount = screen.queryByText(
          generateTodoListCountText(
            filterTodoList(MOCKED_TODO_LIST_ITEMS, TODO_LIST_FILTERS_MAP.active.value).length
          )
        );
        expect(activeItemsCount).not.toBeInTheDocument();
      });
    });

    describe(`"Clear completed" button`, () => {
      it('removes all the completed items after "clear completed" button is clicked', async () => {
        setup();

        // assert that completed items are present before deletion
        MOCKED_TODO_LIST_ITEMS.forEach(({ value, isCompleted }) => {
          const todoItem = screen.queryByDisplayValue(value);

          if (isCompleted) {
            expect(todoItem).toBeInTheDocument();
          }
        });

        const clearCompletedBtn = screen.getByRole('button', { name: CLEAR_COMPLETED_BTN_LABEL });

        // click clear completed button
        await userEvent.click(clearCompletedBtn);

        // assert that completed items are NOT present anymore after deletion
        MOCKED_TODO_LIST_ITEMS.forEach(({ value, isCompleted }) => {
          const todoItem = screen.queryByDisplayValue(value);

          if (isCompleted) {
            expect(todoItem).not.toBeInTheDocument();
          }
        });
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

      it('does not display a button for clearing all completed items if current filter is "active"', async () => {
        setup();

        // click on the active filter
        const activeFilterBtn = screen.getByRole('button', {
          name: TODO_LIST_FILTERS_MAP.active.label,
        });
        await userEvent.click(activeFilterBtn);

        // assert clear completed button does not exist
        const clearCompletedBtn = screen.queryByRole('button', { name: CLEAR_COMPLETED_BTN_LABEL });

        expect(clearCompletedBtn).not.toBeInTheDocument();
      });
    });
  });
});
