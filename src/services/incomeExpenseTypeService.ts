import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';

// Services
import { api } from './config';

const route = 'api/incomeExpenseType';

const get = () => api.get(route);

const useGetIncomeExpenseTypes = () =>
  useMutation(() => get(), {
    onSuccess: () => Keyboard.dismiss(),
  });

export { useGetIncomeExpenseTypes };
