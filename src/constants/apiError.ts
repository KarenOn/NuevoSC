export type errorTypes =
  | '400'
  | '401'
  | '402'
  | '403'
  | '404'
  | '405'
  | '422'
  | 'Error';

export const getCode = (error: string): string => {
  if (error) {
    const splitError = error.split(' ');
    return splitError[splitError.length - 1];
  }

  return error;
};

const FOUR_HUNDRED_AND_FOUR = 'Recursos no encontrados.';
const FOUR_HUNDRED_AND_TWENTY_TWO = 'Problemas internos, intente más tarde.';
const NETWORK_ERROR = 'Problemas de internet.';

export const BASE_MESSAGES = {
  '400': '',
  '401': 'Acceso denegado.',
  '402': 'El token ha expirado o es invalido.',
  '403': 'No puede registrar más visitas, hasta la próxima fecha de pago',
  '404': FOUR_HUNDRED_AND_FOUR,
  '405': '',
  '422': FOUR_HUNDRED_AND_TWENTY_TWO,
  Error: NETWORK_ERROR,
};

export const CITY_ERRORS = {
  ...BASE_MESSAGES,
  '400': 'Ya existe una ciudad con ese nombre.',
};

export const DOCUMENT_TYPE_ERRORS = {
  ...BASE_MESSAGES,
  '400': 'Ya existe un tipo de documento con ese nombre.',
};

export const ROL_ERRORS = {
  ...BASE_MESSAGES,
  '400': 'Ya existe un rol con ese nombre.',
};

export const OFFICE_ERRORS = {
  ...BASE_MESSAGES,
  '400': 'Ya existe una oficina con ese nombre.',
};

export const ROUTE_ERRORS = {
  ...BASE_MESSAGES,
  '400': 'Ya existe una oficina con ese nombre.',
};

export const USER_ERRORS = {
  ...BASE_MESSAGES,
  '400': 'Ya existe un usuario con ese documento.',
};

export const AUTH_ERRORS = {
  ...BASE_MESSAGES,
  '400': 'Usuario o contraseña incorrectos.',
};

export const CLIENT_ERRORS = {
  ...BASE_MESSAGES,
  '400': 'Ya existe un cliente con ese documento.',
};

export const CREATE_ADVANCEMENT_ERRORS = {
  ...BASE_MESSAGES,
  '400': 'No existe el crédito al que quiere abonar.',
  '403': 'No puede hacer abonos a este crédito.',
};

export const CANCEL_ADVANCEMENT_ERRORS = {
  ...BASE_MESSAGES,
  '400': 'Este abono ya está cancelado.',
  '405': 'Este abono fue creado hace muchos días.',
};

export const VERIFICATION_ERRORS = {
  ...BASE_MESSAGES,
  '400': 'Código de verificación incorrecto.',
};
