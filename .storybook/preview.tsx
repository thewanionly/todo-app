import React from 'react';

import type { Preview } from '@storybook/react';

import '../src/app/globals.css';
import { DarkModeProvider } from '../src/components/DarkModeToggle/DarkModeProvider';
import { josefinSans } from '../src/lib/fonts';

const preview: Preview = {
  globalTypes: {
    darkMode: {},
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div id="storybook-decorator" className={josefinSans.variable}>
        <DarkModeProvider>
          <Story />
        </DarkModeProvider>
      </div>
    ),
  ],
};

export default preview;
