import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';

// Context
import { TransferContext } from '../context/';

// Services
import { DisabledData } from './officesService';
import { api } from './config';

const route = 'api/transfer';

const create = (data: TransferContext.TransferToSend) => api.post(route, data);

const remove = (data: DisabledData) =>
  api.put(`${route}/disabled/${data.id}`, data);

const update = (data: TransferContext.TransferToSend) =>
  api.put(`${route}/${data.id}`, data);

const get = () => api.get(route);

const getByFilter = (filter: string) => api.get(`${route}/filter/${filter}`);

const getById = (id: string) => api.get(`${route}/${id}`);

const useCreateTransfer = () =>
  useMutation((data: TransferContext.TransferToSend) => create(data), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useRemoveTransfer = () =>
  useMutation((data: DisabledData) => remove(data));

const useUpdateTransfer = () =>
  useMutation((data: TransferContext.TransferToSend) => update(data));

const useGetTransfers = () =>
  useMutation(() => get(), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useGetTransfersWithFilter = () =>
  useMutation((filter: string) => getByFilter(filter));

const useGetTransfer = () =>
  useMutation((id: string) => getById(id), {
    onSuccess: () => Keyboard.dismiss(),
  });

export {
  useCreateTransfer,
  useRemoveTransfer,
  useUpdateTransfer,
  useGetTransfers,
  useGetTransfersWithFilter,
  useGetTransfer,
};
