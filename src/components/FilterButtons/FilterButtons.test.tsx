import { render, screen } from '@testing-library/react';

import { FilterButtons } from '.';
import { TODO_LIST_FILTERS } from '../TodoList';

describe('FilterButtons', () => {
  it('displays the filter buttons', () => {
    render(<FilterButtons filters={TODO_LIST_FILTERS} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(TODO_LIST_FILTERS.length);
  });

  xit('display the first filter as an active filter by default when no `defaultFilter` prop is passed', () => {
    render(<FilterButtons filters={TODO_LIST_FILTERS} />);

    // const buttons = screen.getAllByRole('button');
    // const firstButton = buttons[0];
  });

  xit('display the filter indicated in `defaultFilter` prop as an active filter by default', () => {
    render(<FilterButtons filters={TODO_LIST_FILTERS} />);
  });

  xit(`changes the active filter when clicking an unactive filter button`, () => {
    render(<FilterButtons filters={TODO_LIST_FILTERS} />);
  });

  xit('calls the function passed in the `onSelectFilter` prop when clicking any filter button', async () => {
    render(<FilterButtons filters={TODO_LIST_FILTERS} />);

    // const button = screen.getByRole('button', { name: buttonChild });
    // userEvent.click(button);

    // await waitFor(() => expect(onClickHandler).toHaveBeenCalled());
  });

  // TODO:
});
