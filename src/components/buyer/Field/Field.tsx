import cn from 'classnames';
import styles from './Field.module.scss';
import { FieldProps } from './types';

export function Field({ leftIcon, containerClassName, rightIcon, ...rest }: FieldProps) {
  return (
    <div className={cn(containerClassName, styles['field'])}>
      {leftIcon}
      <input type='text' {...rest} />
      {rightIcon}
    </div>
  );
}
