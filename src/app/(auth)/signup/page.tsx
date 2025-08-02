'use client';

import cn from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSignup } from '@/api/auth/signup';
import type { ISignup } from '@/types/signup';
import type { FormType } from '@/types/auth/signup';

import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import styles from './page.module.scss';
import { getData, sendData } from '@/api/getData';

interface IFormData extends ISignup {
  password_confirm: string;
}

export default function Signup() {
  const router = useRouter();
  const signup = useSignup();

  const { handleSubmit, register } = useForm<IFormData>();

  const [formType, setFormType] = useState<FormType>('natural person');

  const handleSignup = async (formData: IFormData) => {
    try {
      // Remove password_confirm from form data
      const { password_confirm, email: phoneOrEmail, ...signupData } = formData;
      
      // Determine if input is phone or email
      const isEmail = phoneOrEmail.includes('@');
      
      // Prepare data for API
      const apiData = {
        ...signupData,
        phone: isEmail ? '' : phoneOrEmail,  // If not email, it's phone
        email: isEmail ? phoneOrEmail : '',  // If email, use it as email
        user_type: formType === 'natural person' ? 'Физическое лицо' : 'Юридическое лицо'
      };
      
      console.log('Sending signup data:', apiData);

      const response = await fetch('http://localhost:8000/auth/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      
      const result = await response.json();
      console.log('Signup response:', result);

      if (response.ok && result.message === 'Successful registration!') {
        // Сохраняем информацию о регистрации для показа уведомления
        localStorage.setItem('newUser', 'true');
        localStorage.setItem('userId', result.user_id);
        localStorage.setItem('storeId', result.store_id);
        
        alert(`Регистрация успешна! Добро пожаловать в Nexus!`);
        // Перенаправляем в общий каталог
        return router.push('/shop');
      } else {
        alert(`Ошибка регистрации: ${result.detail || 'Unknown error'}`);
      }
    } catch (e) {
      console.error('[NEXUS-MARKET:ERROR] Ошибка при регистраций\n', e);
    }
  };

  const _renderNaturalPerson = () => {
    return (
      <>
        <div className={styles['main__form-col']}>
          <Field
            {...register('name', { required: true })}
            className={cn(styles['main__form-field'], styles['main__form-field-name'])}
            placeholder='Ваше имя'
            type='text'
          />

          <Field
            {...register('surname', { required: true })}
            type='text'
            placeholder='Ваша фамилия'
            className={cn(styles['main__form-field'], styles['main__form-field-surname'])}
          />
        </div>
      </>
    );
  };

  const _renderIndividualEntrepreneur = () => {
    return (
      <>
        <div className={styles['main__form-col']}>
          <Field
            {...register('name', { required: true })}
            className={cn(styles['main__form-field'], styles['main__form-field-name'])}
            placeholder='Ваше имя'
            type='text'
          />

          <Field
            {...register('surname', { required: true })}
            type='text'
            placeholder='Ваша фамилия'
            className={cn(styles['main__form-field'], styles['main__form-field-surname'])}
          />
        </div>

        <div className={styles['main__form-col']}>
          <Field
            {...register('name', { required: true })}
            className={cn(styles['main__form-field'], styles['main__form-field-name'])}
            placeholder='Название ИП'
            type='text'
          />

          <Field
            {...register('surname', { required: true })}
            type='text'
            placeholder='ИИН'
            className={cn(styles['main__form-field'], styles['main__form-field-surname'])}
          />
        </div>
      </>
    );
  };

  const _renderLegalEntity = () => {
    return (
      <>
        <Field
          {...register('name', { required: true })}
          className={cn(styles['main__form-field'], styles['main__form-field-name'])}
          placeholder='Название юридического лица'
          type='text'
        />

        <div className={styles['main__form-col']}>
          <Field
            {...register('name', { required: true })}
            className={cn(styles['main__form-field'], styles['main__form-field-name'])}
            placeholder='Название компании'
            type='text'
          />

          <Field
            {...register('surname', { required: true })}
            type='text'
            placeholder='БИН'
            className={cn(styles['main__form-field'], styles['main__form-field-surname'])}
          />
        </div>
      </>
    );
  };

  return (
    <main className={styles['main']}>
      <h1 className={styles['main__title']}>Регистрация</h1>

      <div className={styles['form-nav']}>
        <button
          className={cn(
            styles['form-nav__button'],
            formType === 'natural person' && styles['active'],
          )}
          onClick={() => setFormType('natural person')}
        >
          Физ. лицо
        </button>
        <button
          className={cn(
            styles['form-nav__button'],
            formType === 'individual entrepreneur' && styles['active'],
          )}
          onClick={() => setFormType('individual entrepreneur')}
        >
          ИП
        </button>
        <button
          className={cn(
            styles['form-nav__button'],
            formType === 'legal entity' && styles['active'],
          )}
          onClick={() => setFormType('legal entity')}
        >
          Юр. лицо
        </button>
      </div>

      <form onSubmit={handleSubmit(handleSignup)} className={styles['main__form']}>
        {
          {
            'natural person': _renderNaturalPerson(),
            'individual entrepreneur': _renderIndividualEntrepreneur(),
            'legal entity': _renderLegalEntity(),
          }[formType]
        }

        <Field
          type='text'
          placeholder='Номер телефон / почта'
          className={styles['main__form-field']}
          {...register('email', { required: true })}
        />

        <Field
          type='password'
          placeholder='Введите пароль'
          className={styles['main__form-field']}
          {...register('password', { required: true })}
        />

        <Field
          type='password'
          placeholder='Повторно введите пароль'
          className={styles['main__form-field']}
          {...register('password_confirm', { required: true })}
        />

        <Button
          className={styles['main__form-button']}
          loading={signup.isLoading}
          text='Продолжить регистрацию'
          type='submit'
        />

        <p className={styles['main__form-forgot']}>
          У вас есть аккаунт? <Link href='/signin'>Авторизоваться.</Link>
        </p>
      </form>
    </main>
  );
}




// 'use client';

// import cn from 'classnames';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
// import { useSignup } from '@/api/auth/signup';
// import type { ISignup } from '@/types/signup';
// import type { FormType } from '@/types/auth/signup';

// import { Field } from '@/components/ui/Field';
// import { Button } from '@/components/ui/Button';
// import Link from 'next/link';
// import styles from './page.module.scss';

// interface IFormData extends ISignup {
//   password_confirm: string;
// }

// export default function Signup() {
//   const router = useRouter();
//   const signup = useSignup();

//   const { handleSubmit, register } = useForm<IFormData>();

//   const [formType, setFormType] = useState<FormType>('natural person');

//   const handleSignup = async (formData: IFormData) => {
//     try {
//       const data = await signup.request(formData);

//       console.log(data);

//       if (data.message === 'Successful registration!') {
//         return router.push('/signup/success');
//       }
//     } catch (e) {
//       console.error('[NEXUS-MARKET:ERROR] Ошибка при регистраций\n', e);
//     }
//   };

//   const _renderNaturalPerson = () => {
//     return (
//       <>
//         <div className={styles['main__form-col']}>
//           <Field
//             {...register('name', { required: true })}
//             className={cn(styles['main__form-field'], styles['main__form-field-name'])}
//             placeholder='Ваше имя'
//             type='text'
//           />

//           <Field
//             {...register('surname', { required: true })}
//             type='text'
//             placeholder='Ваша фамилия'
//             className={cn(styles['main__form-field'], styles['main__form-field-surname'])}
//           />
//         </div>
//       </>
//     );
//   };

//   const _renderIndividualEntrepreneur = () => {
//     return (
//       <>
//         <div className={styles['main__form-col']}>
//           <Field
//             {...register('name', { required: true })}
//             className={cn(styles['main__form-field'], styles['main__form-field-name'])}
//             placeholder='Ваше имя'
//             type='text'
//           />

//           <Field
//             {...register('surname', { required: true })}
//             type='text'
//             placeholder='Ваша фамилия'
//             className={cn(styles['main__form-field'], styles['main__form-field-surname'])}
//           />
//         </div>

//         <div className={styles['main__form-col']}>
//           <Field
//             {...register('name', { required: true })}
//             className={cn(styles['main__form-field'], styles['main__form-field-name'])}
//             placeholder='Название ИП'
//             type='text'
//           />

//           <Field
//             {...register('surname', { required: true })}
//             type='text'
//             placeholder='ИИН'
//             className={cn(styles['main__form-field'], styles['main__form-field-surname'])}
//           />
//         </div>
//       </>
//     );
//   };

//   const _renderLegalEntity = () => {
//     return (
//       <>
//         <Field
//           {...register('name', { required: true })}
//           className={cn(styles['main__form-field'], styles['main__form-field-name'])}
//           placeholder='Название юридического лица'
//           type='text'
//         />

//         <div className={styles['main__form-col']}>
//           <Field
//             {...register('name', { required: true })}
//             className={cn(styles['main__form-field'], styles['main__form-field-name'])}
//             placeholder='Название компании'
//             type='text'
//           />

//           <Field
//             {...register('surname', { required: true })}
//             type='text'
//             placeholder='БИН'
//             className={cn(styles['main__form-field'], styles['main__form-field-surname'])}
//           />
//         </div>
//       </>
//     );
//   };

//   return (
//     <main className={styles['main']}>
//       <h1 className={styles['main__title']}>Регистрация</h1>

//       <div className={styles['form-nav']}>
//         <button
//           className={cn(
//             styles['form-nav__button'],
//             formType === 'natural person' && styles['active'],
//           )}
//           onClick={() => setFormType('natural person')}
//         >
//           Физ. лицо
//         </button>
//         <button
//           className={cn(
//             styles['form-nav__button'],
//             formType === 'individual entrepreneur' && styles['active'],
//           )}
//           onClick={() => setFormType('individual entrepreneur')}
//         >
//           ИП
//         </button>
//         <button
//           className={cn(
//             styles['form-nav__button'],
//             formType === 'legal entity' && styles['active'],
//           )}
//           onClick={() => setFormType('legal entity')}
//         >
//           Юр. лицо
//         </button>
//       </div>

//       <form onSubmit={handleSubmit(handleSignup)} className={styles['main__form']}>
//         {
//           {
//             'natural person': _renderNaturalPerson(),
//             'individual entrepreneur': _renderIndividualEntrepreneur(),
//             'legal entity': _renderLegalEntity(),
//           }[formType]
//         }

//         <Field
//           type='text'
//           placeholder='Номер телефон / почта'
//           className={styles['main__form-field']}
//           {...register('email', { required: true })}
//         />

//         <Field
//           type='password'
//           placeholder='Введите пароль'
//           className={styles['main__form-field']}
//           {...register('password', { required: true })}
//         />

//         <Field
//           type='password'
//           placeholder='Повторно введите пароль'
//           className={styles['main__form-field']}
//           {...register('password_confirm', { required: true })}
//         />

//         <Button
//           className={styles['main__form-button']}
//           loading={signup.isLoading}
//           text='Продолжить регистрацию'
//           type='submit'
//         />

//         <p className={styles['main__form-forgot']}>
//           У вас есть аккаунт? <Link href='/signin'>Авторизоваться.</Link>
//         </p>
//       </form>
//     </main>
//   );
// }
