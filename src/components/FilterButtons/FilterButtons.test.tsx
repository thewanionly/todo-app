import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FilterButtons } from '.';
import { TODO_LIST_FILTERS } from '../TodoList';

describe('FilterButtons', () => {
  it('displays the filter buttons', () => {
    render(<FilterButtons filters={TODO_LIST_FILTERS} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(TODO_LIST_FILTERS.length);
  });

  it('display the first filter as an active filter by default when no `defaultFilter` prop is passed', () => {
    render(<FilterButtons filters={TODO_LIST_FILTERS} />);

    const activeFilterButton = screen.getByRole('button', { pressed: true });

    expect(activeFilterButton).toHaveTextContent(TODO_LIST_FILTERS[0].label);
  });

  it('display the filter indicated in `defaultFilter` prop as an active filter by default', () => {
    render(
      <FilterButtons filters={TODO_LIST_FILTERS} defaultFilter={TODO_LIST_FILTERS[1].value} />
    );

    const activeFilterButton = screen.getByRole('button', { pressed: true });

    expect(activeFilterButton).toHaveTextContent(TODO_LIST_FILTERS[1].label);
  });

  it(`changes the active filter when clicking an inactive filter button`, async () => {
    render(<FilterButtons filters={TODO_LIST_FILTERS} />);

    // Assert if the first button is the active filter
    expect(screen.getByRole('button', { pressed: true })).toHaveTextContent(
      TODO_LIST_FILTERS[0].label
    );

    // CLick the second button
    const secondFilterBtn = screen.getAllByRole('button')[1];
    await userEvent.click(secondFilterBtn);

    // Assert if the second button is now the active filter
    expect(screen.getByRole('button', { pressed: true })).toHaveTextContent(
      TODO_LIST_FILTERS[1].label
    );
  });

  it('calls the function passed in the `onSelectFilter` prop when clicking any filter button', async () => {
    const onSelectFilterHandler = jest.fn();
    render(<FilterButtons filters={TODO_LIST_FILTERS} onSelectFilter={onSelectFilterHandler} />);

    const inActiveBtn = screen.getAllByRole('button', { pressed: false })[0];
    await userEvent.click(inActiveBtn);

    expect(onSelectFilterHandler).toHaveBeenCalled();
  });
});
