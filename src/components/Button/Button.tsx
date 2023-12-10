import React from 'react';

interface ButtonProps {
  type?: string;
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event: any) => void;
}
//
export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className="rounded-md bg-button-bg px-6 py-3 text-button-text "
      onClick={onClick}
    >
      {children}
    </button>
  );
};
