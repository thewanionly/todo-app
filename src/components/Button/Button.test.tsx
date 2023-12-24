import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '.';

describe('Button', () => {
  it('displays button with the passed children', () => {
    const buttonChild = 'hello';
    render(<Button>{buttonChild}</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAccessibleName(buttonChild);
  });

  it('calls the function passed in the `onClick` prop', async () => {
    const buttonChild = 'Click me';
    const onClickHandler = jest.fn();
    render(<Button onClick={onClickHandler}>{buttonChild}</Button>);

    const button = screen.getByRole('button', { name: buttonChild });
    userEvent.click(button);

    await waitFor(() => expect(onClickHandler).toHaveBeenCalled());
  });
});
