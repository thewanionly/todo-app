import { render, screen } from '@testing-library/react';

import { Button } from '.';

describe('Button', () => {
  it('displays button', () => {
    const child = 'hello';
    render(<Button> {child}</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
