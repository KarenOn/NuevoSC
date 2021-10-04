import axios from 'axios';

// Constants
import { BASE_URL } from '../constants/';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setToken = (token: string) => {
  api.defaults.headers.Authorization = token;
};

/* api.interceptors.request.use(
  (config) => {
    // console.log(config);
    return config;
  },
  (error) => {
    console.log(error);
    return error;
  },
); */
