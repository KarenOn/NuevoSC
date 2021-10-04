import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';

// Context
import { AdvancementContext } from '../context/';

// Services
import { DisabledData } from './officesService';
import { api } from './config';

const route = 'api/advancement';

export interface AdvancementRemoveData extends DisabledData {
  details: string;
}

const create = (data: AdvancementContext.AdvancementToSend) =>
  api.post(route, data);

const remove = (data: AdvancementRemoveData) =>
  api.put(`${route}/disabled/${data.id}`, data);

const update = (data: AdvancementContext.AdvancementToSend) =>
  api.put(`${route}/${data.id}`, data);

const get = () => api.get(route);

const getByFilter = (filter: string) => api.get(`${route}/filter/${filter}`);

const getById = (id: string) => api.get(`${route}/${id}`);

const useCreateAdvancement = () =>
  useMutation((data: AdvancementContext.AdvancementToSend) => create(data), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useRemoveAdvancement = () =>
  useMutation((data: AdvancementRemoveData) => remove(data));

const useUpdateAdvancement = () =>
  useMutation((data: AdvancementContext.AdvancementToSend) => update(data));

const useGetAdvancements = () =>
  useMutation(() => get(), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useGetAdvancementsWithFilter = () =>
  useMutation((filter: string) => getByFilter(filter));

const useGetAdvancement = () =>
  useMutation((id: string) => getById(id), {
    onSuccess: () => Keyboard.dismiss(),
  });

export {
  useCreateAdvancement,
  useRemoveAdvancement,
  useUpdateAdvancement,
  useGetAdvancements,
  useGetAdvancementsWithFilter,
  useGetAdvancement,
};
