import { apiClient } from '@/api';
import { isAxiosError } from 'axios';
import { useMutation } from 'react-query';
import type { AxiosError } from 'axios';
import type { IStoreCreate } from '@/types/local-stores/store';

export function useLocalStore() {
  const storeMutation = useMutation({
    mutationKey: ['createStore'],
    mutationFn: (data: IStoreCreate) => apiClient.post('/stores/stores', data),
  });

  const createStore = async (data: IStoreCreate) => {
    try {
      const response = await storeMutation.mutateAsync(data);
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

      throw error;
    }
  };

  return { createStore, ...storeMutation };
}
