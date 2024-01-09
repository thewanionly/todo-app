import { ReactElement } from 'react';

import { render, RenderOptions, RenderResult } from '@testing-library/react';

import { DarkModeProvider } from '@/components/DarkModeToggle/DarkModeProvider';
import { AppTheme } from '@/utils/constants';

type RootWrapperProps = {
  children?: React.ReactNode;
  defaultTheme?: AppTheme;
};

const RootWrapper = ({ children, defaultTheme }: RootWrapperProps) => {
  return <DarkModeProvider defaultValue={defaultTheme}>{children}</DarkModeProvider>;
};

const customRender = (
  ui: ReactElement,
  wrapperProps?: RootWrapperProps,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult =>
  render(ui, {
    wrapper: (props) => <RootWrapper {...props} {...wrapperProps} />,
    ...options,
  });

export * from '@testing-library/react';

export { customRender as render };
