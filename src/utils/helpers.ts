import moment from 'moment';

import { FK } from '../context/session/sessionContext';
import { CLIENT_FK } from '../context/advancement/advancementContext';
import permisosData from './moduls-permisos.json'

export type status = 'default' | 'warning' | 'disabled' | 'completed';

export const capitalizeFirst = (value: string) => {
  const newValue = value;

  if (newValue) {
    return `${newValue[0].toUpperCase()}${newValue.slice(1)}`;
  }
  return newValue;
};

export const getStatus = (
  disabled: boolean,
  paymentsOverdue?: number,
  completed?: boolean,
  next_payment?: string,
): status => {
  if (completed) {
    return 'completed';
  }

  if (next_payment && !disabled) {
    const dateA = moment(next_payment);
    const dateB = moment();

    if (dateB.diff(dateA, 'days') > 0) {
      return 'warning';
    }
  }

  if (paymentsOverdue && !disabled) {
    if (paymentsOverdue > 0) {
      return 'warning';
    }
  }

  return disabled ? 'disabled' : 'default';
};

export const fullName = (data: FK | CLIENT_FK) =>
  `${capitalizeFirst(data?.name || '')} ${capitalizeFirst(data?.last_name || '',)}`;

export const dateFormat = (value: Date | string) =>
  moment(value).format('YYYY-MM-DD');

export  const validationAccess =(rol:string,module:string,permiso:string)=>{
    if(permisosData[0][rol][module].includes(permiso)){
        return true
    }else{
      return false
    }
  }

export const getItem = (id:any,arr:any[])=> { 
    if(arr.length !== 0 ){
      let newArr = arr.find(r =>{ if(r.id === parseInt(id)) return r })
      return newArr
  }
}