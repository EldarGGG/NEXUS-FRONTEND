import { isAxiosError } from 'axios';
import { apiClient } from '@/api';
import { useMutation } from 'react-query';

import type { AxiosResponse, AxiosError } from 'axios';
import type { ISignup } from '@/types/signup';

interface SuccessResponse {
  message: string;
}

interface ValidationError {
  detail: {
    loc: [string, number];
    msg: string;
    type: string;
  }[];
}

type Response = AxiosResponse<SuccessResponse & ValidationError>;

export function useSignup() {
  const signupMutation = useMutation<Response, AxiosError, ISignup>((data) =>
    apiClient.post('/auth/signup/', data),
  );

  const signup = async (data: ISignup) => {
    try {
      console.log('РЕГИСТРАЦИЯ - ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР')
      const response = await signupMutation.mutateAsync(data);
      return response.data;
    } catch (e) {
      // Возвращает другую ошибку вне axios
      if (!isAxiosError(e)) {
        throw e;
      }

      const error = e as AxiosError;

      // Обработка ошибок, если необходимо

      throw error;
    }
  };

  return { request: signup, ...signupMutation };
}
