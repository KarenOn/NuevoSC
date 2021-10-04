import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';

// Context
import { OfficeContext } from '../context/';

// Services
import { api } from './config';

export interface DisabledData {
  id: number;
  disabled: boolean;
  _user: number;
}

export interface FilterData {
  token: string;
  filter: string;
}

const route = 'office';

const get = () => api.get(route);

const getByFilter = (filter: string) => api.get(`${route}/filter/${filter}`);

const getById = (id: string) => api.get(`${route}/${id}`);


const create = (data: OfficeContext.OfficeToSend) => api.post(route, data);

const remove = (data: DisabledData) =>
  api.put(`${route}/disabled/${data.id}`, data);

const update = (data: OfficeContext.OfficeToSend) =>
  api.put(`${route}/${data.id}`, data);


const useCreateOffice = () =>
  useMutation((data: OfficeContext.OfficeToSend) => create(data), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useRemoveOffice = () => useMutation((data: DisabledData) => remove(data));

const useUpdateOffice = () =>
  useMutation((data: OfficeContext.OfficeToSend) => update(data));

const useGetOffices = () =>
  useMutation(() => get(), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useGetOfficesWithFilter = () =>
  useMutation((filter: string) => getByFilter(filter));

const useGetOffice = () =>
  useMutation((id: string) => getById(id), {
    onSuccess: () => Keyboard.dismiss(),
  });

export {
  useCreateOffice,
  useRemoveOffice,
  useUpdateOffice,
  useGetOffices,
  useGetOfficesWithFilter,
  useGetOffice,
};
