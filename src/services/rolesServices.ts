import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';

// Context
import { RolContext } from '../context';

// Services
import { api } from './config';

export interface RolData extends RolContext.Rol {
  _user: string;
}

const route = 'api/rol';

const create = (data: RolData) => api.post(route, data);

const remove = (id: string) => api.delete(`${route}/${id}`);

const update = (data: RolData) => api.put(`${route}/${data.id}`, data);

const get = () => api.get(route);

const getByFilter = (filter: string) => api.get(`${route}/filter/${filter}`);

const useCreateRol = () =>
  useMutation((data: RolData) => create(data), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useRemoveRol = () => useMutation((_id: string) => remove(_id));

const useUpdateRol = () => useMutation((data: RolData) => update(data));

const useGetRoles = () =>
  useMutation(() => get(), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useGetRolesWithFilter = () =>
  useMutation((filter: string) => getByFilter(filter));

export {
  useCreateRol,
  useRemoveRol,
  useUpdateRol,
  useGetRoles,
  useGetRolesWithFilter,
};
