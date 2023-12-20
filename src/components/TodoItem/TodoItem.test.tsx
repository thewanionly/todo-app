import { render, screen } from '@testing-library/react';
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

    it(`displays a circle checkbox`, () => {
      render(<TodoItem mode={TodoItemMode.CREATE} />);

      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toBeInTheDocument();
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
      render(<TodoItem mode={TodoItemMode.ACTIVE} value={activeModeValue} />);

      const inputBox = screen.getByRole('textbox');

      expect(inputBox).toHaveValue(activeModeValue);
    });

    it(`displays inputted value in input box`, async () => {
      const value = 'test';
      render(<TodoItem mode={TodoItemMode.ACTIVE} value={activeModeValue} />);

      const inputBox = screen.getByRole('textbox');
      await userEvent.clear(inputBox);
      await userEvent.type(inputBox, value);

      expect(inputBox).toHaveValue(value);
    });

    it(`displays a circle checkbox`, () => {
      render(<TodoItem mode={TodoItemMode.ACTIVE} value={activeModeValue} />);

      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toBeInTheDocument();
    });

    it(`ticks the circle checkbox when it is clicked`, async () => {
      render(<TodoItem mode={TodoItemMode.ACTIVE} value={activeModeValue} />);

      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    xit(`displays a remove icon button`, () => {
      render(<TodoItem mode={TodoItemMode.ACTIVE} value={activeModeValue} />);

      const removeBtn = screen.queryByRole('button', { name: 'remove-button' });

      expect(removeBtn).not.toBeInTheDocument();
    });

    xit('calls the function passed in the `onClick` prop when remove icon button is clicked', async () => {
      render(<TodoItem mode={TodoItemMode.ACTIVE} value={activeModeValue} />);

      const removeBtn = screen.getByRole('button', { name: 'remove-button' });

      userEvent.click(removeBtn);

      // await waitFor(() => expect(onClickHandler).toHaveBeenCalled())
    });
  });
});
