import Link from 'next/link';

import { twMerge } from 'tailwind-merge';

import { Button } from '../Button';
import { Icon, IconName } from '../Icon';
import { LOGO_HEADING } from './Header.constants';

type HeaderProps = {
  className?: string;
};

export const Header = ({ className = '' }: HeaderProps) => {
  return (
    <>
      <header className={twMerge(`flex items-center justify-between ${className}`)}>
        <h1
          className={twMerge(
            `inline-block text-xl font-bold leading-none tracking-[12px] text-logo-heading-text md:text-[40px] md:tracking-[15px]`
          )}
        >
          <Link href="/">{LOGO_HEADING}</Link>
        </h1>
        <Button aria-label="dark-mode-toggle-button" className="p-0">
          <Icon
            name={IconName.Sun}
            className="h-5 w-5 text-dark-mode-toggle-btn hover:text-dark-mode-toggle-btn-hover md:h-[26px]  md:w-[26px]"
          />
        </Button>
      </header>
      {/* <div>background image</div> */}
    </>
  );
};
