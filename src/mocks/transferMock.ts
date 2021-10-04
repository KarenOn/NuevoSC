import { Transfer } from '../context/transfer/transferContext';

export const transferMock: Transfer = {
  office: {
    id: 0,
    name: '',
  },
  route_origin: {
    id: 0,
    name: '',
  },
  route_destination: {
    id: 0,
    name: '',
  },
  observation: '',
  amount: 0,
  office_of_route: '',
};

export const transfersMock: Transfer[] = [];
