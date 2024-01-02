import { useState } from 'react';

import { useOnValueChange } from '@/hooks';

import { Button } from '../Button';

interface FilterItem {
  label: string;
  value: string;
}

interface FilterButtonsProps {
  className?: string;
  filters: FilterItem[];
  defaultFilter?: string;
  onSelectFilter?: (value: string) => void;
}

export const FilterButtons = ({
  className,
  filters,
  defaultFilter = filters[0].value,
  onSelectFilter,
}: FilterButtonsProps) => {
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);

  const handleSelectFilter = (value: string) => () => {
    setSelectedFilter(value);
    onSelectFilter?.(value);
  };

  useOnValueChange(() => {
    setSelectedFilter(defaultFilter);
  }, defaultFilter);

  return (
    <ul
      aria-label="filter buttons list"
      className={`flex items-center justify-center gap-5 rounded-[5px] bg-todo-item-bg px-5 py-3.5 shadow-todo-item-box-shadow ${className}`}
    >
      {filters.map(({ label, value }) => (
        <li key={value}>
          <Button
            aria-pressed={selectedFilter === value}
            className={`p-0 font-bold text-filter-buttons-text hover:text-filter-buttons-text-hover ${
              selectedFilter === value
                ? 'text-filter-buttons-text-active hover:text-filter-buttons-text-active'
                : ''
            }`}
            onClick={handleSelectFilter(value)}
          >
            {label}
          </Button>
        </li>
      ))}
    </ul>
  );
};
