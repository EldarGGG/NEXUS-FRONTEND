/* eslint-disable react/display-name */
'use client';

import cn from 'classnames';
import { forwardRef, useState } from 'react';
import type { Ref } from 'react';
import type { FieldProps } from './types';

import EyeIcon from '@/assets/icons/field/eye.svg';
import styles from './Field.module.scss';

export const Field = forwardRef(
  ({ className, type, placeholder, ...rest }: FieldProps, ref: Ref<HTMLInputElement>) => {
    const [isShow, setIsShow] = useState<boolean>(false);

    function handleToggle() {
      setIsShow((prev) => !prev);
    }

    function _renderShowPasswordButton(type: React.HTMLInputTypeAttribute | undefined) {
      if (type !== 'password') return;

      return (
        <button type='button' onClick={handleToggle}>
          <EyeIcon />
        </button>
      );
    }

    return (
      <div className={cn(styles['field'], isShow && styles['password-shown'], className)}>
        <input ref={ref} type={isShow ? 'text' : type} placeholder={placeholder} {...rest} />

        {_renderShowPasswordButton(type)}
      </div>
    );
  },
);
