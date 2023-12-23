import React from 'react';

import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ComponentProps<'button'>;

export const Button = ({ className = '', children, ...props }: ButtonProps) => {
  const classes = twMerge(
    `bg-transparent px-2 py-1.5 text-body-text hover:brightness-150 ${className}`
  );

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
};
