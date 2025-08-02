import { isAxiosError } from 'axios';
import { useMutation } from 'react-query';
import type { AxiosResponse, AxiosError } from 'axios';
import { apiClient } from '@/api';
import type { IToken } from '@/types/auth/token';
import type { ISignin } from '@/types/auth/signin';

interface SuccessResponse extends IToken {}

interface ValidationError {
  detail: {
    loc: [string, number];
    msg: string;
    type: string;
  }[];
}

// eslint-disable-next-line no-unused-vars
type Response = AxiosResponse<SuccessResponse & ValidationError>;

export function useSignin() {
  const signinMutation = useMutation<Response, AxiosError, ISignin>((data: ISignin) =>
    apiClient.post('/auth/login/', data),
  );

  const signin = async (data: ISignin) => {
    try {
      console.log('ЛОГИН - ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР')
      const response = await signinMutation.mutateAsync(data);
      console.log("ЭТО ПОЛУЧЕНИЕ ЧЕГО-ТО С API", response.data)
      return response.data;
    } catch (e) {
      // Возвращает другую ошибку вне axios
      if (!isAxiosError(e)) {
        throw e;
      }

      const error = e as AxiosError;

      // Ошибка при отсутствий интернета
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Ошибка сети!');
      }

      if (!error.response) throw new Error('Не удалось получить response!');

      // Ошибка при отправке неправильных данных
      if (error.response.status === 401) {
        // throw { message: 'Телефон или пароль неверный!', status: 'wrong_data' };
        throw new Error('Телефон или пароль неверный!');
      }

      // Ошибка при отправке не всех ключей в объекте
      if (error.response.status === 422) {
        throw new Error('Не все поля заполнены!');
      }
    }
  };

  return { request: signin, ...signinMutation };
}
