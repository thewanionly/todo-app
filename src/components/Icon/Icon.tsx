import CheckIcon from 'public/icons/check-icon.svg';
import CloseIcon from 'public/icons/close-icon.svg';
import Moonicon from 'public/icons/moon-icon.svg';
import SunIcon from 'public/icons/sun-icon.svg';

export enum IconName {
  Check = 'check',
  Close = 'close',
  Moon = 'moon',
  Sun = 'sun',
}

const IconMap = {
  [IconName.Check]: CheckIcon,
  [IconName.Close]: CloseIcon,
  [IconName.Moon]: Moonicon,
  [IconName.Sun]: SunIcon,
} as const;

type IconProps = {
  className?: string;
  name: IconName;
};

export const Icon = ({ className = '', name }: IconProps) => {
  const IconComponent = IconMap[name];

  if (!IconComponent) {
    console.error(`We can't find an icon with the name "${name}".`);
    return null;
  }

  return (
    <IconComponent className={`h-5 w-5 text-body-text ${className}`} aria-label={`${name} icon`} />
  );
};
