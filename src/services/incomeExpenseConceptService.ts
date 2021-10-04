import { useMutation } from 'react-query';

// Services
import { api } from './config';

const route = 'api/incomeExpenseConcept';

const getById = (id: string) => api.get(`${route}/${id}`);

const useGetIncomeExpenseConcepts = () =>
  useMutation((id: string) => getById(id));

export { useGetIncomeExpenseConcepts };
