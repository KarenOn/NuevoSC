import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';

// Context
import { DocumentTypeContext } from '../context/';

// Services¡
import { api } from './config';

export interface DocumentTypeData extends DocumentTypeContext.DocumentType {
  _user: string;
}

const route = 'api/documentType';

const create = (data: DocumentTypeData) => api.post(route, data);

const remove = (id: string) => api.delete(`${route}/${id}`);

const update = (data: DocumentTypeData) => api.put(`${route}/${data.id}`, data);

const get = () => api.get(route);

const getByFilter = (filter: string) => api.get(`${route}/filter/${filter}`);

const useCreateDocumentType = () =>
  useMutation((data: DocumentTypeData) => create(data), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useRemoveDocumentType = () => useMutation((_id: string) => remove(_id));

const useUpdateDocumentType = () =>
  useMutation((data: DocumentTypeData) => update(data));

const useGetDocumentTypes = () =>
  useMutation(() => get(), {
    onSuccess: () => Keyboard.dismiss(),
  });

const useGetDocumentTypesWithFilter = () =>
  useMutation((filter: string) => getByFilter(filter));

export {
  useCreateDocumentType,
  useRemoveDocumentType,
  useUpdateDocumentType,
  useGetDocumentTypes,
  useGetDocumentTypesWithFilter,
};
