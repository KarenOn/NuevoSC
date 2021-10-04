import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';
import AsyncStorage from '@react-native-community/async-storage';

// Constants
import { STORAGE_TOKEN_KEY, STORAGE_USER_KEY } from '../constants/';

// Services
import { DisabledData } from './officesService';
import { api } from './config';

// Context
import { SessionContext } from '../context/';

export interface LoginData {
  document: string;
  password: string;
}

const route = 'user';

// const login = (data: LoginData) => api.post('auth', data);
const login = (data: LoginData) => api.post('/validate', data);

const smsVerification = (code: string) => api.post('/verification', { code }); 

// api.post('auth/verification', { code });

const create = (data: SessionContext.UserToSend) => api.post(route, data);

const remove = (data: DisabledData) =>
  api.put(`${route}/disabled/${data.id}`, data);

const update = (data: SessionContext.UserToSend) =>
  api.put(`${route}/${data.id}`, data);

const get = () => api.get(route);

const getByFilter = (filter: string) => api.get(`${route}/filter/${filter}`);

const logout = () =>
  AsyncStorage.multiRemove([STORAGE_TOKEN_KEY, STORAGE_USER_KEY]);


const useLogin = () =>
  useMutation((data: LoginData) => login(data), {    
    onSuccess: () => Keyboard.dismiss(),
  });

const useSmsVerification = () =>
  useMutation((code: string) => smsVerification(code), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useLogout = () => useMutation(logout);

const useCreateUser = () =>
  useMutation((data: SessionContext.UserToSend) => create(data), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useRemoveUser = () => useMutation((data: DisabledData) => remove(data));

const useUpdateUser = () =>
  useMutation((data: SessionContext.UserToSend) => update(data));

const useGetUsers = () =>
  useMutation(() => get(), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useGetUsersWithFilter = () =>
  useMutation( (filter: string) => getByFilter(filter) );

export {
  useLogin,
  useSmsVerification,
  useLogout,
  useCreateUser,
  useRemoveUser,
  useUpdateUser,
  useGetUsers,
  useGetUsersWithFilter,
};
