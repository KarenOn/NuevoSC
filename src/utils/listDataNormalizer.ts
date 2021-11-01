import moment from 'moment';

// Context
import { Office } from '../context/office/officeContext';
import { Route } from '../context/route/routeContext';
import { City } from '../context/city/cityContext';
import { Rol } from '../context/rol/rolContext';
import { User } from '../context/session/sessionContext';
import { DocumentType } from '../context/documentType/documentTypeContext';
import { Client } from '../context/client/clientContext';
import { Credit } from '../context/credit/creditContext';
import {
  Advancement,
  CLIENT_FK,
} from '../context/advancement/advancementContext';
import { IncomeExpense } from '../context/incomeExpense/incomeExpenseContext';
import { IncomeExpenseType } from '../context/incomeExpense/incomeExpenseTypeContext';
import { IncomeExpenseCategory } from '../context/incomeExpense/incomeExpenseCategoryContext';
import { IncomeExpenseConcept } from '../context/incomeExpense/incomeExpenseConceptContext';
import { Transfer } from '../context/transfer/transferContext';
// Constants
import { TextConstants } from '../constants/textConstants';

// Utils
import { capitalizeFirst, fullName } from './helpers';
import { SUPERVISOR, EXCLUDE_REVIEWER } from './permissions';

moment.locale('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
    '_',
  ),
});

export const officesNormalizer = (data: Office, rolName: string) => {
  const creatorName = fullName(data.creator as CLIENT_FK);
  const adminName = fullName(data.admin as CLIENT_FK);
  const reviewerName = fullName(data.reviewer as CLIENT_FK);
  const disabled = data.disabled ? 'N' : 'S';
  const creationDate = moment(data.created_at).format('LL');
  const balance = SUPERVISOR(rolName) && data.balance;

  return [
    {
      id: 1,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_ID}${data.id}`,
    },
    {
      id: 2,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_CREATION}${creationDate}`,
    },
    {
      id: 3,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_CREATOR}${creatorName}`,
    },
    {
      id: 4,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_ADMINISTRATOR}${adminName}`,
    },
    {
      id: 5,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_REVIEWER}${reviewerName}`,
    },
    {
      id: 6,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_BALANCE}${balance}`,
    },
    {
      id: 7,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_DISABLED}${disabled}`,
    },
  ];
};

export const routesNormalizer = (data: Route, rolName: string) => {
  const officeName = data.office?.name || '';
  const disabled = data.disabled ? 'N' : 'S';
  const permitirAbonos = data.permitir_abonos ? 'S' : 'N';
  const adviserName = fullName(data.adviser as CLIENT_FK);
  const balance = EXCLUDE_REVIEWER(rolName) && data.balance;

  return [
    {
      id: 1,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_ID}${data.id}`,
    },
    {
      id: 2,
      value: `${TextConstants.ROUTES_LIST_VIEW_ITEM_PARTNERS}${data.partners}`,
    },
    {
      id: 3,
      value: `${TextConstants.ROUTES_LIST_VIEW_ITEM_PHONE_NUMBER}${data.phone_number}`,
    },
    {
      id: 4,
      value: `${TextConstants.ROUTES_LIST_VIEW_ITEM_PERMITE_ABONOS}${permitirAbonos}`,
    },
    {
      id: 5,
      value: `${TextConstants.ROUTES_LIST_VIEW_ITEM_OFFICE}${capitalizeFirst(
        officeName,
      )}`,
    },
    {
      id: 6,
      value: `${TextConstants.ROUTES_LIST_VIEW_ITEM_ADVISER}${adviserName}`,
    },
    {
      id: 7,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_BALANCE}${balance}`,
    },
    {
      id: 8,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_DISABLED}${disabled}`,
    },
  ];
};

export const citiesNormalizer = (data: City) => {
  return [
    {
      id: 1,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_ID}${data.id}`,
    },
  ];
};

export const rolesNormalizer = (data: Rol) => {
  return [
    {
      id: 1,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_ID}${data.id}`,
    },
    {
      id: 2,
      value: `${TextConstants.ROLES_VIEW_LIST_ITEM_DESCRIPTION}${data.description}`,
    },
  ];
};

export const usersNormalizer = (data: User) => {
  const disabled = data.disabled ? 'N' : 'S';
  return [
    {
      id: 1,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_ID}${data.id}`,
    },
    {
      id: 2,
      value: `${
        TextConstants.USERS_VIEW_LIST_ITEM_DOCUMENT_TYPE
      }${capitalizeFirst(data.document_type?.name || '')}`,
    },
    {
      id: 3,
      value: `${TextConstants.USERS_VIEW_LIST_ITEM_DOCUMENT}${data.document}`,
    },
    {
      id: 4,
      value: `${TextConstants.OFFICES_VIEW_LIST_ITEM_NAME}${capitalizeFirst(
        data.name,
      )}`,
    },
    {
      id: 5,
      value: `${TextConstants.USERS_VIEW_LIST_ITEM_LAST_NAME}${capitalizeFirst(
        data.last_name,
      )}`,
    },
    {
      id: 6,
      value: `${TextConstants.USERS_VIEW_LIST_ITEM_ROUTE}${capitalizeFirst(
        data.route?.name || '',
      )}`,
    },
    {
      id: 7,
      value: `${
        TextConstants.CREATE_OFFICE_CREDIT_TAB_NAME_LABEL
      }${capitalizeFirst(data.office?.name || '')}`,
    },
    {
      id: 8,
      value: `${TextConstants.USERS_VIEW_LIST_ITEM_ROL}${capitalizeFirst(
        data.rol?.name || '',
      )}`,
    },
    {
      id: 9,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_DISABLED}${disabled}`,
    },
  ];
};

export const clientsNormalizer = (data: any) => {
  const {client,office,route} = data
  const disabled = data.disabled ? 'N' : 'S';
  return [
    {
      id: 1,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_ID}${client.code}`,
    },
    {
      id: 2,
      value: `${TextConstants.USERS_VIEW_LIST_ITEM_DOCUMENT}${client.document}`,
    },
    {
      id: 3,
      value: `${TextConstants.CLIENTS_VIEW_LIST_ITEM_ADDRESS}${client.address}`,
    },
    {
      id: 4,
      value: `${TextConstants.USERS_VIEW_LIST_ITEM_ROUTE}${capitalizeFirst(
        route?.name,
      )}`,
    },
    {
      id: 5,
      value: `${TextConstants.ROUTES_LIST_VIEW_ITEM_OFFICE}${capitalizeFirst(
        office?.name as string,
      )}`,
    },
    {
      id: 6,
      value: `${TextConstants.ROUTES_LIST_VIEW_ITEM_PHONE_NUMBER}${
        client.house_phone_number || ''
      }`,
    },
    {
      id: 7,
      value: `${TextConstants.CLIENTS_VIEW_LIST_ITEM_PHONE_NUMBER}${
        client.phone_number || ''
      }`,
    },
    {
      id: 8,
      value: `${TextConstants.CREDITS_VIEW_LIST_ITEM_PAYMENTS_OVERDUE}${client.payments_overdue}`,
    },
    {
      id: 9,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_DISABLED}${disabled}`,
    },
  ];
};

export const creditsNormalizer = (data:any) => {
  const { client, credit,route} = data
  const creationDate = moment(credit.created_at).format('LL');
  const lastPaymentDate = moment(credit.last_payment_date).format('LL');
  const paymentPeriosity = paymentPeriositySelectData().hashTable[
    credit.payment_periosity
  ].label;
  const disabled = credit.disabled ? 'N' : 'S';
  const clientName = fullName(client as CLIENT_FK);
  
  return [
    {
      id: 1,
      value: `${TextConstants.CREATE_CLIENT_VIEW_CONTACT_TAB_NAME_LABEL}${clientName}`,
    },
    {
      id: 2,
      value: `${TextConstants.USERS_VIEW_LIST_ITEM_DOCUMENT}${client?.document}`,
    },
    {
      id: 3,
      value: `${TextConstants.USERS_VIEW_LIST_ITEM_ROUTE}${capitalizeFirst(
        route?.name as string,
      )}`,
    },
    {
      id: 4,
      value: `${TextConstants.CLIENTS_VIEW_LIST_ITEM_ADDRESS}${client?.address}`,
    },
    {
      id: 5,
      value: `${TextConstants.CLIENTS_VIEW_LIST_ITEM_PHONE_NUMBER}${client?.phone_number}`,
    },
    {
      id: 6,
      value: `${TextConstants.CREDITS_VIEW_LIST_ITEM_PENDING_PAY}${client?.pending_pay}`,
    },
    {
      id: 7,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_CREATION}${creationDate}`,
    },
    {
      id: 8,
      value: `${TextConstants.CREDITS_VIEW_LIST_ITEM_CREDIT_VALUE}${credit.amount}`,
    },
    {
      id: 9,
      value: `${TextConstants.CREDITS_VIEW_LIST_ITEM_PERCENT}${credit.percent}%`,
    },
    {
      id: 10,
      value: `${TextConstants.CREDITS_VIEW_LIST_ITEM_PERIOSITY}${paymentPeriosity}`,
    },
    {
      id: 11,
      value: `${TextConstants.CREDITS_VIEW_LIST_ITEM_LAST_PAYMENT}${lastPaymentDate}`,
    },
    {
      id: 12,
      value: `${TextConstants.CREDITS_VIEW_LIST_ITEM_PAYMENTS_OVERDUE}${credit.payments_overdue}`,
    },
    {
      id: 13,
      value: `${TextConstants.CREDITS_VIEW_LIST_ITEM_PAYMENTS}${credit.payments}`,
    },
    {
      id: 14,
      value: `${TextConstants.CREDITS_VIEW_LIST_ITEM_OVERDUE_DAYS}`,
    },
    {
      id: 15,
      value: `${TextConstants.CREDITS_VIEW_LIST_ITEM_BALANCE}${credit.balance}`,
    },
    {
      id: 16,
      value: `${TextConstants.CREDITS_VIEW_LIST_ITEM_PAYMENT_AMOUNT}${credit.payment_amount}`,
    },
    {
      id: 17,
      value: `${TextConstants.CREDITS_VIEW_LIST_ITEM_NEXT_PAYMENT_AMOUNT}${credit.real_payment_amount}`,
    },
    {
      id: 18,
      value: `${TextConstants.CREDITS_VIEW_LIST_ITEM_POSITIVE_BALANCE}${credit.positive_balance}`,
    },
    {
      id: 19,
      value: `${TextConstants.CREDITS_VIEW_LIST_ITEM_ADVANCEMENT}${credit.advancement}`,
    },
    {
      id: 20,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_DISABLED}${disabled}`,
    },
    {
      id: 21,
      value: `${TextConstants.ROLES_VIEW_LIST_ITEM_DESCRIPTION}${credit.observation}`,
    },
  ];
};

export const advancementsNormalizer = (data:any) => {
  const {advancement,client,credit} = data
  const disabled = advancement.disabled ? 'N' : 'S';
  const clientName = fullName(client as CLIENT_FK);

  return [
    {
      id: 1,
      value: `${TextConstants.ADVANCEMENTS_LIST_ITEM_CREDIT_CODE}${credit?.id}`,
    },
    {
      id: 2,
      value: `${TextConstants.CREATE_CLIENT_VIEW_CONTACT_TAB_NAME_LABEL}${clientName}`,
    },
    {
      id: 3,
      value: `${TextConstants.USERS_VIEW_LIST_ITEM_DOCUMENT}${client?.document}`,
    },
    {
      id: 4,
      value: `${
        TextConstants.ADVANCEMENTS_LIST_ITEM_ADVANCEMENT_TYPE
      }${capitalizeFirst(advancement._advancement_type)}`,
    },
    {
      id: 5,
      value: `${TextConstants.ADVANCEMENTS_LIST_ITEM_AMOUNT}${advancement.amount}`,
    },
    {
      id: 6,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_DISABLED}${disabled}`,
    },
    {
      id: 7,
      value: `${TextConstants.ROLES_VIEW_LIST_ITEM_DESCRIPTION}${advancement.details}`,
    },
  ];
};

export const incomeExpenseNormalizer = (data: IncomeExpense) => {
  const disabled = data.disabled ? 'N' : 'S';
  const officeName = capitalizeFirst(data.office?.name as string);
  const routeName = capitalizeFirst(data.route?.name as string);

  return [
    {
      id: 1,
      value: `${TextConstants.INCOME_EXPENSES_LIST_ITEM_TYPE}${capitalizeFirst(
        data.income_expense_type?.name as string,
      )}`,
    },
    {
      id: 2,
      value: `${TextConstants.ROUTES_LIST_VIEW_ITEM_OFFICE}${officeName || ''}`,
    },
    {
      id: 3,
      value: `${TextConstants.USERS_VIEW_LIST_ITEM_ROUTE}${routeName || ''}`,
    },
    {
      id: 4,
      value: `${TextConstants.INCOME_EXPENSES_LIST_ITEM_AMOUNT}${data.amount}`,
    },
    {
      id: 5,
      value: `${TextConstants.ROLES_VIEW_LIST_ITEM_DESCRIPTION}${data.observation}`,
    },
    {
      id: 6,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_DISABLED}${disabled}`,
    },
  ];
};

export const transferNormalizer = (data: Transfer) => {
  const disabled = data.disabled ? 'N' : 'S';
  const origin = data.route_origin || data.office;
  const destination = data.route_destination || data.office;
  const officeName = capitalizeFirst(data.office?.name as string);
  const originName = capitalizeFirst(origin?.name as string);
  const destinationName = capitalizeFirst(destination?.name as string);

  return [
    {
      id: 1,
      value: `${TextConstants.ROUTES_LIST_VIEW_ITEM_OFFICE}${officeName || ''}`,
    },
    {
      id: 2,
      value: `${TextConstants.TRANSFERS_LIST_ITEM_ORIGIN}${originName || ''}`,
    },
    {
      id: 3,
      value: `${TextConstants.TRANSFERS_LIST_ITEM_DESTINATION}${
        destinationName || ''
      }`,
    },
    {
      id: 4,
      value: `${TextConstants.INCOME_EXPENSES_LIST_ITEM_AMOUNT}${data.amount}`,
    },
    {
      id: 5,
      value: `${TextConstants.ROLES_VIEW_LIST_ITEM_DESCRIPTION}${data.observation}`,
    },
    {
      id: 6,
      value: `${TextConstants.OFFICES_LIST_VIEW_ITEM_DISABLED}${disabled}`,
    },
  ];
};

export const citiesSelectData = (cities: City[]) => {
  const hashTable: any = {
    default: { value: 'default', label: 'Seleccione una ciudad' },
  };
  const data = ['default'];

  cities.map((city) => {
    hashTable[city.id?.toString() as string] = {
      value: city.id,
      label: city.name,
    };
    data.push(city.id?.toString() as string);
  });

  return {
    data,
    hashTable,
  };
};

export const officesSelectData = (offices: Office[]) => {
  const hashTable: any = {
    default: { value: 'default', label: 'Seleccione una oficina' },
  };
  const data = ['default'];

  offices.map((office) => {
    hashTable[office.id?.toString() as string] = {
      value: office.id,
      label: office.name,
    };
    data.push(office.id?.toString() as string);
  });

  return {
    data,
    hashTable,
  };
};

export const rolesSelectData = (roles: Rol[]) => {
  const hashTable: any = {
    default: { value: 'default', label: 'Seleccione un rol' },
  };
  const data = ['default'];

  roles.map((rol) => {
    hashTable[rol.id?.toString() as string] = {
      value: rol.id,
      label: rol.name,
    };
    data.push(rol.id?.toString() as string);
  });

  return {
    data,
    hashTable,
  };
};

export const documentTypeSelectData = (documentTypes: DocumentType[]) => {
  const hashTable: any = {
    default: { value: 'default', label: 'Seleccione el tipo' },
  };
  const data = ['default'];

  documentTypes.map((doc) => {
    hashTable[doc.id?.toString() as string] = {
      value: doc.id,
      label: doc.name,
    };
    data.push(doc.id?.toString() as string);
  });

  return {
    data,
    hashTable,
  };
};

export const routesSelectData = (routes: Route[]) => {
  const hashTable: any = {
    default: { value: 'default', label: 'Seleccione una ruta' },
  };
  const data = ['default'];
  const routesData = routes.filter((obj) => !obj.disabled);

  routesData.map((route) => {
    hashTable[route.id?.toString() as string] = {
      value: route.id,
      label: route.name,
    };
    data.push(route.id?.toString() as string);
  });

  return {
    data,
    hashTable,
  };
};

export const routesToReportSelectData = (routes: Route[]) => {
  const hashTable: any = {
    default: { value: 'default', label: 'Seleccione una ruta' },
    all: { value: 'all', label: 'Todas' },
  };
  const data = ['default', 'all'];
  const routesData = routes.filter((obj) => !obj.disabled);

  routesData.map((route) => {
    hashTable[route.id?.toString() as string] = {
      value: route.id,
      label: route.name,
    };
    data.push(route.id?.toString() as string);
  });

  return {
    data,
    hashTable,
  };
};

export const clientsSelectData = (clients: Client[]) => {
  const hashTable: any = {
    default: { value: 'default', label: 'Seleccione un cliente' },
  };
  const data = ['default'];

  const clientData = clients.filter((obj) => {
    return !obj.disabled && !obj._route?.disabled;
  });

  clientData.map((client) => {
    const label = `${fullName(client as CLIENT_FK)} (${client.document})`;

    hashTable[client.id?.toString() as string] = {
      value: client.id,
      label,
    };
    data.push(client.id?.toString() as string);
  });

  return {
    data,
    hashTable,
  };
};

export const paymentPeriositySelectData = () => {
  const hashTable: any = {
    default: { value: 'default', label: 'Seleccione la forma de pago' },
    daily: { value: 'daily', label: 'Diario' },
    weekly: { value: 'weekly', label: 'Semanal' },
    biweekly: { value: 'biweekly', label: 'Quincenal' },
    monthly: { value: 'monthly', label: 'Mensual' },
  };
  const data = ['default', 'daily', 'weekly', 'biweekly', 'monthly'];

  return {
    data,
    hashTable,
  };
};

export const advancementTypesSelectData = () => {
  const hashTable: any = {
    default: { value: 'default', label: 'Seleccione el tipo de abono' },
    normal: { value: 'normal', label: 'Normal' },
    custom: { value: 'custom', label: 'Personalizado' },
  };
  const data = ['default', 'normal', 'custom'];

  return {
    data,
    hashTable,
  };
};

export const incomeExpenseTypesSelectData = (_data: IncomeExpenseType[]) => {
  const hashTable: any = {
    default: { value: 'default', label: 'Seleccione la naturaleza' },
  };
  const data = ['default'];

  _data.map((obj) => {
    hashTable[obj.id?.toString() as string] = {
      value: obj.id,
      label: obj.name,
    };
    data.push(obj.id?.toString() as string);
  });

  return {
    data,
    hashTable,
  };
};

export const incomeExpenseCategoriesSelectData = (
  _data: IncomeExpenseCategory[],
) => {
  const hashTable: any = {
    default: { value: 'default', label: 'Seleccione la Categoría' },
  };
  const data = ['default'];

  _data.map((obj) => {
    hashTable[obj.id?.toString() as string] = {
      value: obj.id,
      label: obj.name,
    };
    data.push(obj.id?.toString() as string);
  });

  return {
    data,
    hashTable,
  };
};

export const incomeExpenseConceptsSelectData = (
  _data: IncomeExpenseConcept[],
) => {
  const hashTable: any = {
    default: { value: 'default', label: 'Seleccione el Concepto' },
  };
  const data = ['default'];

  _data.map((obj) => {
    hashTable[obj.id?.toString() as string] = {
      value: obj.id,
      label: obj.name,
    };
    data.push(obj.id?.toString() as string);
  });

  return {
    data,
    hashTable,
  };
};
