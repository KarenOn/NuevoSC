import { RolContext } from '../context/';

export const rolMock: RolContext.Rol = {
  name: '',
  description: '',
};

export const rolesMock: RolContext.Rol[] = [
  {
    id: 1,
    name: 'Gerente',
    description: 'Super administrador',
    created_at: '16/04/2020',
    user: {
      id: 1,
      name: 'Test Test',
    },
  },
];
