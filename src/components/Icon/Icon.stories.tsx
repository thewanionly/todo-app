import type { Meta, StoryObj } from '@storybook/react';

import { Icon, IconName } from './Icon';

const meta: Meta<typeof Icon> = {
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

const allIcons = Object.values(IconName);

const AllIconsComponent = () => {
  return (
    <div className="flex gap-20 p-10">
      {allIcons.map((iconName) => (
        <div key={iconName} className="flex flex-col items-center gap-4 text-body-text">
          <Icon name={iconName as IconName} />
          <span>{iconName}</span>
        </div>
      ))}
    </div>
  );
};

export const AllIcons: Story = {
  render: () => <AllIconsComponent />,
};
