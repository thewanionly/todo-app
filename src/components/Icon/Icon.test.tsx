import { render, screen } from '@/tests/setup';

import { Icon, IconName } from './Icon';

describe('Icon', () => {
  it('displays the icon as indicated in the `name` prop', () => {
    const iconName = IconName.Check;
    render(<Icon name={iconName} />);

    const icon = screen.getByLabelText(`${iconName} icon`);

    expect(icon).toBeInTheDocument();
  });
});
