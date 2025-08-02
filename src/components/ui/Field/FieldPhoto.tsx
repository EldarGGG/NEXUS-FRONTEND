'use client';

// Utils
import { useState } from 'react';
import cn from 'classnames';

// Components
import Image from 'next/image';

// Styles
import styles from './Field.module.scss';

// Types
import type { FieldPhotoProps } from './types';
import type { ChangeEvent } from 'react';

export function FieldPhoto({
  className,
  placeholder,
  onSelectPhoto,
  onChangePhotoName,
  ...rest
}: FieldPhotoProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<File>();
  const [photoName, setPhotoName] = useState<string>();

  function handleSelectPhoto({ target: { files } }: ChangeEvent<HTMLInputElement>) {
    if (!files) return;
    const photo = files[0];

    setSelectedPhoto(photo);

    if (onSelectPhoto) onSelectPhoto(photo);
  }

  function handleChangePhotoName({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setPhotoName(value);

    if (onChangePhotoName) onChangePhotoName(value);
  }

  return (
    <div className={cn(styles['field'], className)}>
      <input
        type='text'
        defaultValue={photoName}
        onChange={handleChangePhotoName}
        placeholder={placeholder}
      />

      <label className={selectedPhoto && styles['selected']} htmlFor='photo'>
        {selectedPhoto ? (
          <Image width={34} height={34} src={URL.createObjectURL(selectedPhoto)} alt='' />
        ) : (
          <svg
            width='18'
            height='18'
            viewBox='0 0 18 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='insert-picture-icon 1' clipPath='url(#clip0_471_1875)'>
              <g id='Group'>
                <path
                  id='Vector'
                  opacity='0.995'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M17.9824 2.19727C17.9824 6.72072 17.9824 11.2441 17.9824 15.7676C17.7544 16.6343 17.2036 17.1792 16.3301 17.4023C11.4317 17.4258 6.53319 17.4258 1.63477 17.4023C0.76121 17.1792 0.210429 16.6343 -0.0175781 15.7676C-0.0175781 11.2441 -0.0175781 6.72072 -0.0175781 2.19727C0.210429 1.33061 0.76121 0.785683 1.63477 0.562501C6.53319 0.539062 11.4317 0.539062 16.3301 0.562501C17.2036 0.785683 17.7544 1.33061 17.9824 2.19727ZM11.3027 3.60352C12.2466 3.53327 12.9439 3.90829 13.3945 4.72852C13.728 5.60384 13.5581 6.37144 12.8848 7.03125C12.0023 7.66252 11.1351 7.63907 10.2832 6.96094C9.60349 6.20817 9.50389 5.382 9.98438 4.48242C10.3083 4.01126 10.7478 3.71827 11.3027 3.60352ZM6.16992 7.61133C6.46713 7.59294 6.69565 7.71012 6.85547 7.96289C7.94211 9.37456 9.02025 10.7925 10.0898 12.2168C10.4128 12.6711 10.8288 12.7824 11.3379 12.5508C11.7236 12.2003 12.0986 11.837 12.4629 11.4609C12.8082 11.2441 13.1363 11.2675 13.4473 11.5313C14.2161 12.5943 14.972 13.6665 15.7148 14.748C15.8601 14.9395 15.8836 15.1387 15.7852 15.3457C15.6984 15.4214 15.5988 15.4741 15.4863 15.5039C11.2559 15.5274 7.02538 15.5274 2.79492 15.5039C2.40721 15.4323 2.26073 15.2037 2.35547 14.8184C3.49437 12.5288 4.6428 10.2437 5.80078 7.96289C5.89704 7.81383 6.02009 7.69662 6.16992 7.61133Z'
                  fill='#3B4758'
                />
              </g>
            </g>
            <defs>
              <clipPath id='clip0_471_1875'>
                <rect width='18' height='18' fill='white' />
              </clipPath>
            </defs>
          </svg>
        )}
      </label>

      <input
        id='photo'
        type='file'
        accept='image/*'
        placeholder={placeholder}
        onChange={handleSelectPhoto}
        hidden
        {...rest}
      />
    </div>
  );
}
