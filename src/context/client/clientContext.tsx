import React, {
  Context,
  useReducer,
  useContext,
  Dispatch,
  createContext,
  FC,
} from 'react';

// constants
import { ERRORS } from '../../constants/';

// Context
import { FK } from '../session/sessionContext';

// Mocks
import { clientMock } from '../../mocks/';

enum ActionTypes {
  SET_CLIENT_DRAFT = 'SET_CLIENT_DRAFT',
  SET_NEW_CLIENT_DRAFT = 'SET_NEW_CLIENT_DRAFT',
  SET_CLIENTS = 'SET_CLIENTS',
}

export interface ROUTE_FK extends FK {
  disabled: boolean;
}

export interface ClientToSend {
  id?: number;
  _user?: number;
  _route: number;
  _document_type: number;
  document: string;
  name: string;
  last_name: string;
  alias?: string;
  address: string;
  house_phone_number?: string;
  phone_number: string;
  details?: string;
}

export interface Client {
  id?: number;
  user?: FK;
  office?: FK;
  route: ROUTE_FK;
  document_type: FK;
  code?: string;
  document: string;
  name: string;
  last_name: string;
  alias?: string;
  address: string;
  house_phone_number?: string;
  phone_number: string;
  active_credits?: number;
  pending_pay?: number;
  payments_overdue?: number;
  last_credit_date?: string;
  details?: string;
  disabled?: boolean;
  created_at?: string;
}

interface ClientProps {
  clientDraft: Client;
  clients: Client[];
}

type Action = {
  type:
    | ActionTypes.SET_CLIENT_DRAFT
    | ActionTypes.SET_NEW_CLIENT_DRAFT
    | ActionTypes.SET_CLIENTS;
  value: Client | Client[];
};

interface Props {
  children: JSX.Element;
}

const defaultValues: ClientProps = {
  clientDraft: clientMock,
  clients: [],
};

const StateContext: Context<ClientProps> = createContext(defaultValues);
const DispatchContext: Dispatch<Action> | any = createContext(undefined);

const reducer = (state: ClientProps = defaultValues, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_CLIENT_DRAFT: {
      const newState: ClientProps = {
        ...state,
        clientDraft: {
          ...state.clientDraft,
          ...(action.value as Client),
        },
      };
      return newState;
    }

    case ActionTypes.SET_NEW_CLIENT_DRAFT: {
      const newState: ClientProps = {
        ...state,
        clientDraft: action.value as Client,
      };
      return newState;
    }

    case ActionTypes.SET_CLIENTS: {
      const newState: ClientProps = {
        ...state,
        clients: action.value as Client[],
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
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error(ERRORS.PROVIDER_STATE_ERROR);
  }

  return context;
};

const useDispatch: any = () => {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error(ERRORS.PROVIDER_DISPATCH_ERROR);
  }

  return context;
};

export { Provider, useState, useDispatch, ActionTypes };
