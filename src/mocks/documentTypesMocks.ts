import { DocumentTypeContext } from '../context/';

export const documentTypeMock: DocumentTypeContext.DocumentType = {
  name: '',
};

export const documentTypesMock: DocumentTypeContext.DocumentType[] = [
  {
    id: 1,
    name: 'NIT',
    created_at: '16/04/2020',
    user: {
      id: 1,
      name: 'Test Test',
    },
  },
  {
    id: 2,
    name: 'Cédula de ciudadanía',
    created_at: '16/04/2020',
    user: {
      id: 2,
      name: 'Test Test',
    },
  },
];
