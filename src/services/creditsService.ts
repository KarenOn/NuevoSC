import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';

// Context
import { CreditContext } from '../context/';

// Services
import { DisabledData } from './officesService';
import { api } from './config';

const route = 'api/credit';

export interface CreditRemoveData extends DisabledData {
  observation: string;
}

export interface VisitCreditData {
  id: number;
  _user: number;
}

const create = (data: CreditContext.CreditToSend) => api.post(route, data);

const remove = (data: CreditRemoveData) =>
  api.put(`${route}/disabled/${data.id}`, data);

const visit = (data: VisitCreditData) =>
  api.put(`${route}/visit/${data.id}`, data);

const update = (data: CreditContext.CreditToSend) =>
  api.put(`${route}/${data.id}`, data);

const get = () => api.get(route);

const getByFilter = (filter: string) => api.get(`${route}/filter/${filter}`);

const getById = (id: string) => api.get(`${route}/${id}`);

const useCreateCredit = () =>
  useMutation((data: CreditContext.CreditToSend) => create(data), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useRemoveCredit = () =>
  useMutation((data: CreditRemoveData) => remove(data));

const useVisitCredit = () =>
  useMutation((data: VisitCreditData) => visit(data));

const useUpdateCredit = () =>
  useMutation((data: CreditContext.CreditToSend) => update(data));

const useGetCredits = () =>
  useMutation(() => get(), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useGetCreditsWithFilter = () =>
  useMutation((filter: string) => getByFilter(filter));

const useGetCredit = () =>
  useMutation((id: string) => getById(id), {
    onSuccess: () => Keyboard.dismiss(),
  });

export {
  useCreateCredit,
  useRemoveCredit,
  useVisitCredit,
  useUpdateCredit,
  useGetCredits,
  useGetCreditsWithFilter,
  useGetCredit,
};
