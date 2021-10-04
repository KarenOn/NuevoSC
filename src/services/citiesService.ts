import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';

// Context
import { CityContext } from '../context/';

// Services
import { api } from './config';

export interface cityData extends CityContext.City {
  _user: string;
}

const route = 'api/city';

const create = (data: cityData) => api.post(route, data);

const remove = (id: string) => api.delete(`${route}/${id}`);

const update = (data: cityData) => api.put(`${route}/${data.id}`, data);

const get = () => api.get(route);

const getByFilter = (filter: string) => api.get(`${route}/filter/${filter}`);

const useCreateCity = () =>
  useMutation((data: cityData) => create(data), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useRemoveCity = () => useMutation((id: string) => remove(id));

const useUpdateCity = () => useMutation((data: cityData) => update(data));

const useGetCities = () =>
  useMutation(() => get(), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useGetCitiesWithFilter = () =>
  useMutation((filter: string) => getByFilter(filter));

export {
  useCreateCity,
  useRemoveCity,
  useUpdateCity,
  useGetCities,
  useGetCitiesWithFilter,
};
