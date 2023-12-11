import { render, screen } from '@testing-library/react';

import { TodoItem, TodoItemMode } from '.';

describe('TodoItem', () => {
  it('displays value in TodoItem when mode is READ', () => {
    const value = 'hello';
    render(<TodoItem mode={TodoItemMode.READ} value={value} />);

    const inputBox = screen.getByRole('textbox');

    expect(inputBox).toHaveValue(value);
  });
});
