import React, {
  Context,
  useReducer,
  useContext,
  Dispatch,
  createContext,
  FC,
} from 'react';

// Constants
import { ERRORS } from '../../constants/';

// Mocks
import { officeMock } from '../../mocks/';

// Context
import { FK } from '../session/sessionContext';

enum ActionTypes {
  SET_OFFICES = 'SET_OFFICES',
  SET_OFFICE_DRAFT = 'SET_OFFICE_DRAFT',
  SET_NEW_OFFICE_DRAFT = 'SET_NEW_OFFICE_DRAFT',
}

export interface Relation {
  _id: string;
  name: string;
  lastName?: string;
  document?: string;
  address?: string;
  phoneNumber?: string;
  pendingPay?: number;
}

export interface Office {
  id?: number;
  user?: FK;
  creator?: FK;
  admin?: FK;
  reviewer?: FK;
  name: string;
  can_create_special_credits: boolean;
  can_edit_phone: boolean;
  can_create_multiple_routes: boolean;
  maximum_days_to_cancel: number;
  minimum_credit_value: number;
  maximum_credit_value: number;
  minimum_percent: number;
  maximum_percent: number;
  balance?: number;
  disabled?: boolean;
  created_at?: string;
}

export interface OfficeToSend {
  id?: number;
  _user?: number;
  name: string;
  can_create_special_credits: boolean;
  can_edit_phone: boolean;
  can_create_multiple_routes: boolean;
  maximum_days_to_cancel: number;
  minimum_credit_value: number;
  maximum_credit_value: number;
  minimum_percent: number;
  maximum_percent: number;
}

interface OfficeProps {
  officeDraft: Office;
  offices: Office[];
}

type Action = {
  type:
    | ActionTypes.SET_OFFICES
    | ActionTypes.SET_OFFICE_DRAFT
    | ActionTypes.SET_NEW_OFFICE_DRAFT;
  value: Office[] | Office | OfficeProps;
};

interface Props {
  children: JSX.Element;
}

const defaultValues: OfficeProps = {
  officeDraft: officeMock,
  offices: [],
};

const StateContext: Context<OfficeProps> = createContext(defaultValues);
const DispatchContext: Dispatch<Action> | any = createContext(undefined);

const reducer = (state: OfficeProps = defaultValues, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_OFFICES: {
      const newState: OfficeProps = {
        ...state,
        offices: action.value as Office[],
      };

      return newState;
    }

    case ActionTypes.SET_NEW_OFFICE_DRAFT: {
      const newState: OfficeProps = {
        ...state,
        officeDraft: action.value as Office,
      };

      return newState;
    }

    case ActionTypes.SET_OFFICE_DRAFT: {
      const newState: OfficeProps = {
        ...state,
        officeDraft: {
          ...state.officeDraft,
          ...(action.value as Office),
        },
      };

      return newState;
    }

    default: {
      throw new Error(`No se puede llamar la acción: ${action.type}`);
    }
  }
};

const Provider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultValues);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useState = () => {

  console.log("OFFICE - USE STATE");

  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error(ERRORS.PROVIDER_STATE_ERROR);
  }

  return context;
};

const useDispatch: any = () => {

  console.log("OFFICE - USE DISPATCH");

  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error(ERRORS.PROVIDER_DISPATCH_ERROR);
  }

  return context;
};

export { Provider, useState, useDispatch, ActionTypes };
