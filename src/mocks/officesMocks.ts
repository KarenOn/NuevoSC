import { OfficeContext } from '../context/';

export const officeMock: OfficeContext.Office = {
  name: '',
  can_create_special_credits: false,
  can_edit_phone: false,
  can_create_multiple_routes: false,
  maximum_days_to_cancel: 2,
  minimum_credit_value: 0,
  maximum_credit_value: 0,
  minimum_percent: 1,
  maximum_percent: 20,
};

export const officesMock: OfficeContext.Office[] = [
  {
    id: 1,
    name: 'Oficina uno',
    can_create_special_credits: false,
    can_edit_phone: false,
    can_create_multiple_routes: false,
    maximum_days_to_cancel: 1,
    minimum_credit_value: 50000,
    maximum_credit_value: 1000000,
    minimum_percent: 1,
    maximum_percent: 20,
    user: {
      id: 1,
      name: 'Test Test',
    },
    creator: {
      id: 1,
      name: 'Test Test',
    },
    admin: {
      id: 2,
      name: 'Pepito Perez',
    },
    balance: 0,
    disabled: false,
    created_at: '16/04/2020',
  },
];
