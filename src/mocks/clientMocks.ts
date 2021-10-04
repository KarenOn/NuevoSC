import { Client } from '../context/client/clientContext';

export const clientMock: Client = {
  route: {
    id: 0,
    name: '',
    disabled: false,
  },
  document_type: {
    id: 0,
    name: '',
  },
  document: '',
  name: '',
  last_name: '',
  alias: '',
  address: '',
  house_phone_number: '',
  phone_number: '+57',
  details: '',
};

export const clientsMock: Client[] = [];
