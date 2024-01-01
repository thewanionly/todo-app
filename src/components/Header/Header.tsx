import Image from 'next/image';
import Link from 'next/link';

import { twMerge } from 'tailwind-merge';

import { DarkModeToggle, useDarkMode } from '../DarkModeToggle';
import { HEADER_BG_IMAGES, LOGO_HEADING } from './Header.constants';

type HeaderProps = {
  className?: string;
};

type HeaderBackgroundImageProps = {
  isDarkMode: boolean;
};

const HeaderBackgroundImage = ({ isDarkMode }: HeaderBackgroundImageProps) => {
  const mode = isDarkMode ? 'dark' : 'light';

  const desktopSrc = HEADER_BG_IMAGES.desktop[mode].src;
  const mobileSrc = HEADER_BG_IMAGES.mobile[mode].src;
  const altText = HEADER_BG_IMAGES.mobile[mode].alt;

  return (
    <picture className="absolute left-0 top-0 block aspect-[1.875] w-full xs:aspect-[4.8]">
      <source media="(min-width: 400px)" srcSet={desktopSrc} />
      <source media="(max-width: 400px)" srcSet={mobileSrc} />
      <Image src={mobileSrc} alt={altText} fill />
    </picture>
  );
};

export const Header = ({ className = '' }: HeaderProps) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode(false);

  return (
    <>
      <header className={twMerge(`relative z-10 flex items-center justify-between ${className}`)}>
        <h1
          className={twMerge(
            `inline-block text-xl font-bold leading-none tracking-[12px] text-logo-heading-text md:text-[40px] md:tracking-[15px]`
          )}
        >
          <Link href="/">{LOGO_HEADING}</Link>
        </h1>
        <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
      </header>
      <HeaderBackgroundImage isDarkMode={isDarkMode} />
    </>
  );
};
