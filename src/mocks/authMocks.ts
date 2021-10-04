import { User } from '../context/session/sessionContext';

export const userMock: User = {
  document_type: {
    id: 0,
    name: '',
  },
  document: '',
  name: '',
  last_name: '',
  city: {
    id: 0,
    name: '',
  },
  address: '',
  office: {
    id: 0,
    name: '',
  },
  route: {
    id: 0,
    name: '',
  },
  rol: {
    id: 0,
    name: '',
  },
  password: '',
  phone_number: '+57',
};

export const usersMock: User[] = [
  {
    id: 1,
    document_type: {
      id: 0,
      name: '',
    },
    document: '1234567890',
    name: 'pepito',
    last_name: 'perez',
    city: {
      id: 0,
      name: '',
    },
    address: 'Calle 10',
    office: {
      id: 0,
      name: '',
    },
    route: {
      id: 0,
      name: '',
    },
    rol: {
      id: 1,
      name: 'gerente',
    },
    password: '$2b$10$GKpR5N5Q6fY2Dq2CgRtQuOlgulcZ0WV0s0ERXbsO22mE95i7HEpxu',
    phone_number: '+573003936624',
    disabled: false,
    created_at: '2020-05-17',
    user: {
      id: 0,
      name: '',
    },
  },
];
