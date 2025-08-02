// Utils
import cn from 'classnames';

// Styles
import styles from './SearchField.module.scss';

// Icon Components
import { SearchIcon } from '@/assets/icons/Search';

// Types
import type { SearchFieldProps } from './types';

export function SearchField({ containerClassName, placeholder, ...rest }: SearchFieldProps) {
  return (
    <label htmlFor='search' className={cn(containerClassName, styles['search'])}>
      <SearchIcon />
      <input {...rest} type='text' id='search' placeholder={placeholder || 'Поиск'} />
    </label>
  );
}
