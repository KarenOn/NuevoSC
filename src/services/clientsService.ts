import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';

// Context
import { ClientContext } from '../context/';

// Services
import { DisabledData } from './officesService';
import { api } from './config';

const route = 'api/client';

interface SELECT_FILTER {
  _office?: string;
  _route?: string;
}

const create = (data: ClientContext.ClientToSend) => api.post(route, data);

const remove = (data: DisabledData) =>
  api.put(`${route}/disabled/${data.id}`, data);

const update = (data: ClientContext.ClientToSend) =>
  api.put(`${route}/${data.id}`, data);

const get = () => api.get(route);

const getByFilter = (filter: string) => api.get(`${route}/filter/${filter}`);

const getBySelectFilter = (data: SELECT_FILTER) =>
  api.post(`${route}/filter`, data);

const getById = (id: string) => api.get(`${route}/${id}`);

const useCreateClient = () =>
  useMutation((data: ClientContext.ClientToSend) => create(data), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useRemoveClient = () => useMutation((data: DisabledData) => remove(data));

const useUpdateClient = () =>
  useMutation((data: ClientContext.ClientToSend) => update(data));

const useGetClients = () =>
  useMutation(() => get(), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useGetClientsWithFilter = () =>
  useMutation((filter: string) => getByFilter(filter));

const useGetClientsWithSelectFilter = () =>
  useMutation((data: SELECT_FILTER) => getBySelectFilter(data));

const useGetClient = () =>
  useMutation((id: string) => getById(id), {
    onSuccess: () => Keyboard.dismiss(),
  });

export {
  useCreateClient,
  useRemoveClient,
  useUpdateClient,
  useGetClients,
  useGetClientsWithFilter,
  useGetClientsWithSelectFilter,
  useGetClient,
};
