import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';

// Context
import { RouteContext } from '../context/';

// Services
import { DisabledData } from './officesService';
import { api } from './config';

const route = 'route';

const create = (data: RouteContext.RouteToSend) => api.post(route, data);

const remove = (data: DisabledData) =>
  api.put(`${route}/disabled/${data.id}`, data);

const update = (data: RouteContext.RouteToSend) =>
  api.put(`${route}/${data.id}`, data);

const get = () => api.get(route);

const getByFilter = (filter: string) => api.get(`${route}/filter/${filter}`);

const getByOfficeId = (id: string) => api.get(`${route}/byOffice/${id}`);

const getById = (id: string) => api.get(`${route}/${id}`);

const useCreateRoute = () =>
  useMutation((data: RouteContext.RouteToSend) => create(data), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useRemoveRoute = () => useMutation((data: DisabledData) => remove(data));

const useUpdateRoute = () =>
  useMutation((data: RouteContext.RouteToSend) => update(data));

const useGetRoutes = () =>
  useMutation(() => get(), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useGetRoutesWithFilter = () =>
  useMutation((filter: string) => getByFilter(filter));

const useGetRouteByOffice = () =>
  useMutation((id: string) => getByOfficeId(id), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useGetRoute = () =>
  useMutation((id: string) => getById(id), {
    onSuccess: () => Keyboard.dismiss(),
  });

export {
  useCreateRoute,
  useRemoveRoute,
  useUpdateRoute,
  useGetRoutes,
  useGetRoutesWithFilter,
  useGetRouteByOffice,
  useGetRoute,
};
