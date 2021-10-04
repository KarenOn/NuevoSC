import { Advancement } from '../context/advancement/advancementContext';

export const advancementMock: Advancement = {
  _advancement_type: 'normal',
  amount: 0,
  details: '',
};

export const advancementsMock: Advancement[] = [
  {
    id: 1,
    user: {
      id: 1,
      name: 'Test',
    },
    credit: {
      id: 1,
      name: '',
    },
    _advancement_type: '',
    client: {
      id: 1,
      name: 'Test',
      alias: 'asd',
      document: '123',
    },
    code: '1',
    amount: 0,
    details: '',
    disabled: false,
    created_at: '2020-05-14 09:30:26',
  },
];
