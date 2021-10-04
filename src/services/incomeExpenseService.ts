import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';

// Context
import { IncomeExpenseContext } from '../context/';

// Services
import { DisabledData } from './officesService';
import { api } from './config';

const route = 'api/incomeExpense';

const create = (data: IncomeExpenseContext.IncomeExpenseToSend) =>
  api.post(route, data);

const remove = (data: DisabledData) =>
  api.put(`${route}/disabled/${data.id}`, data);

const update = (data: IncomeExpenseContext.IncomeExpenseToSend) =>
  api.put(`${route}/${data.id}`, data);

const get = () => api.get(route);

const getByFilter = (filter: string) => api.get(`${route}/filter/${filter}`);

const getById = (id: string) => api.get(`${route}/${id}`);

const useCreateIncomeExpense = () =>
  useMutation(
    (data: IncomeExpenseContext.IncomeExpenseToSend) => create(data),
    {
      onSuccess: () => Keyboard.dismiss(),
    },
  );

const useRemoveIncomeExpense = () =>
  useMutation((data: DisabledData) => remove(data));

const useUpdateIncomeExpense = () =>
  useMutation((data: IncomeExpenseContext.IncomeExpenseToSend) => update(data));

const useGetIncomeExpenses = () =>
  useMutation(() => get(), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useGetIncomeExpensesWithFilter = () =>
  useMutation((filter: string) => getByFilter(filter));

const useGetIncomeExpense = () =>
  useMutation((id: string) => getById(id), {
    onSuccess: () => Keyboard.dismiss(),
  });

export {
  useCreateIncomeExpense,
  useRemoveIncomeExpense,
  useUpdateIncomeExpense,
  useGetIncomeExpenses,
  useGetIncomeExpensesWithFilter,
  useGetIncomeExpense,
};
