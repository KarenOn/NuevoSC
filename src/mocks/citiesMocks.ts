import { CityContext } from '../context/';

export const cityMock: CityContext.City = {
  name: '',
};

export const citiesMock: CityContext.City[] = [
  {
    id: 1,
    name: 'Medellín',
    created_at: '16/04/2020',
    user: {
      id: 1,
      name: 'Test Test',
    },
  },
  {
    id: 2,
    name: 'Bogotá',
    created_at: '16/04/2020',
    user: {
      id: 1,
      name: 'Test Test',
    },
  },
  {
    id: 3,
    name: 'Cali',
    created_at: '16/04/2020',
    user: {
      id: 1,
      name: 'Test Test',
    },
  },
];
