import { useMutation } from 'react-query';

// Services
import { api } from './config';

const route = 'api/incomeExpenseCategory';

const getById = (id: string) => api.get(`${route}/${id}`);

const useGetIncomeExpenseCategories = () =>
  useMutation((id: string) => getById(id));

export { useGetIncomeExpenseCategories };
