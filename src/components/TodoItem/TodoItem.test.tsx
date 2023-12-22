import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CREATE_TODO_PLACEHOLDER, TodoItem, TodoItemMode } from '.';

describe('TodoItem', () => {
  describe('Create Mode', () => {
    it('displays an input box with a default value of empty string', () => {
      render(<TodoItem mode={TodoItemMode.CREATE} />);

      const inputBox = screen.getByRole('textbox');

      expect(inputBox).toHaveValue('');
    });

    it(`displays an input box with this placeholder: "${CREATE_TODO_PLACEHOLDER}"`, () => {
      render(<TodoItem mode={TodoItemMode.CREATE} />);

      const inputBox = screen.getByRole('textbox');

      expect(inputBox).toHaveAttribute('placeholder', CREATE_TODO_PLACEHOLDER);
    });

    it(`displays inputted value in input box`, async () => {
      const value = 'test';
      render(<TodoItem mode={TodoItemMode.CREATE} />);

      const inputBox = screen.getByRole('textbox');
      await userEvent.type(inputBox, value);

      expect(inputBox).toHaveValue(value);
    });

    it(`displays a circle checkbox that is unticked by default`, () => {
      render(<TodoItem mode={TodoItemMode.CREATE} />);

      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    it(`does not tick the circle checkbox when it is clicked`, async () => {
      render(<TodoItem mode={TodoItemMode.CREATE} />);

      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);

      expect(checkbox).not.toBeChecked();
    });

    it(`does not display a remove icon button`, () => {
      render(<TodoItem mode={TodoItemMode.CREATE} />);

      const removeBtn = screen.queryByRole('button', { name: 'remove-button' });

      expect(removeBtn).not.toBeInTheDocument();
    });
  });

  describe('Active Mode', () => {
    const activeModeValue = 'Active mode';

    it('displays an input box with a default value equal to the value prop', () => {
      render(<TodoItem mode={TodoItemMode.ACTIVE} value={activeModeValue} onDelete={() => {}} />);

      const inputBox = screen.getByRole('textbox');

      expect(inputBox).toHaveValue(activeModeValue);
    });

    it(`displays inputted value in input box`, async () => {
      const value = 'test';
      render(<TodoItem mode={TodoItemMode.ACTIVE} value={activeModeValue} onDelete={() => {}} />);

      const inputBox = screen.getByRole('textbox');
      await userEvent.clear(inputBox);
      await userEvent.type(inputBox, value);

      expect(inputBox).toHaveValue(value);
    });

    it(`displays a circle checkbox that is unticked by default`, () => {
      render(<TodoItem mode={TodoItemMode.ACTIVE} value={activeModeValue} onDelete={() => {}} />);

      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    it(`ticks the circle checkbox when it is clicked`, async () => {
      render(<TodoItem mode={TodoItemMode.ACTIVE} value={activeModeValue} onDelete={() => {}} />);

      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it(`displays a remove icon button`, () => {
      render(<TodoItem mode={TodoItemMode.ACTIVE} value={activeModeValue} onDelete={() => {}} />);

      const removeBtn = screen.queryByRole('button', { name: 'remove-button' });

      expect(removeBtn).toBeInTheDocument();
    });

    it('calls the function passed in the `onDelete` prop when remove icon button is clicked', async () => {
      const onDeleteHandler = jest.fn();
      render(
        <TodoItem mode={TodoItemMode.ACTIVE} value={activeModeValue} onDelete={onDeleteHandler} />
      );

      const removeBtn = screen.getByRole('button', { name: 'remove-button' });

      userEvent.click(removeBtn);

      await waitFor(() => expect(onDeleteHandler).toHaveBeenCalled());
    });
  });

  describe('Completed Mode', () => {
    const completedModeValue = 'Completed mode';

    it('displays an input box with a default value equal to the value prop', () => {
      render(
        <TodoItem mode={TodoItemMode.COMPLETED} value={completedModeValue} onDelete={() => {}} />
      );

      const inputBox = screen.getByRole('textbox');

      expect(inputBox).toHaveValue(completedModeValue);
    });

    it(`disables input box from being editable`, async () => {
      render(
        <TodoItem mode={TodoItemMode.COMPLETED} value={completedModeValue} onDelete={() => {}} />
      );

      const inputBox = screen.getByRole('textbox');

      expect(inputBox).toBeDisabled();
    });

    it(`displays a circle checkbox that is ticked by default`, () => {
      render(
        <TodoItem mode={TodoItemMode.COMPLETED} value={completedModeValue} onDelete={() => {}} />
      );

      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();
    });

    it(`unticks the circle checkbox when it is clicked`, async () => {
      render(
        <TodoItem mode={TodoItemMode.COMPLETED} value={completedModeValue} onDelete={() => {}} />
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();

      await userEvent.click(checkbox);

      expect(checkbox).not.toBeChecked();
    });

    it(`displays a remove icon button`, () => {
      render(
        <TodoItem mode={TodoItemMode.COMPLETED} value={completedModeValue} onDelete={() => {}} />
      );

      const removeBtn = screen.queryByRole('button', { name: 'remove-button' });

      expect(removeBtn).toBeInTheDocument();
    });

    it('calls the function passed in the `onDelete` prop when remove icon button is clicked', async () => {
      const onDeleteHandler = jest.fn();
      render(
        <TodoItem
          mode={TodoItemMode.COMPLETED}
          value={completedModeValue}
          onDelete={onDeleteHandler}
        />
      );

      const removeBtn = screen.getByRole('button', { name: 'remove-button' });

      userEvent.click(removeBtn);

      await waitFor(() => expect(onDeleteHandler).toHaveBeenCalled());
    });
  });
});
