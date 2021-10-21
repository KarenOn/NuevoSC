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
import { ROUTE_FK } from '../client/clientContext';

// Mocks
import { creditMock } from '../../mocks/';

enum ActionTypes {
  SET_CREDIT_DRAFT = 'SET_CREDIT_DRAFT',
  SET_NEW_CREDIT_DRAFT = 'SET_NEW_CREDIT_DRAFT',
  SET_CREDITS = 'SET_CREDITS',
}

interface CLIENT_FK extends FK {
  document?: string;
  address?: string;
  phone_number?: string;
  pending_pay?: number;
}

export interface CreditToSend {
  id?: number;
  _user?: number;
  _client?: number;
  payment_periosity: string;
  amount: number;
  duration: number;
  percent: number;
  payments: number;
  advancement: number;
}

export interface Credit {
  id?: number;
  _user?: FK;
  _client?: CLIENT_FK;
  office?: FK;
  _route?: ROUTE_FK;
  code?: string;
  payment_periosity: string;
  amount: number;
  duration: number;
  percent: number;
  payments: number;
  payments_overdue?: number;
  payment_amount?: number;
  real_payment_amount?: number;
  positive_balance?: number;
  balance?: number;
  advancement: number;
  last_payment_date?: string;
  next_payment_date?: string;
  observation?: string;
  completed?: boolean;
  disabled?: boolean;
  created_at?: string;
}

interface CreditProps {
  creditDraft: Credit;
  credits: Credit[];
}

type Action = {
  type:
    | ActionTypes.SET_CREDIT_DRAFT
    | ActionTypes.SET_NEW_CREDIT_DRAFT
    | ActionTypes.SET_CREDITS;
  value: Credit | Credit[];
};

interface Props {
  children: JSX.Element;
}

const defaultValues: CreditProps = {
  creditDraft: creditMock,
  credits: [],
};

const StateContext: Context<CreditProps> = createContext(defaultValues);
const DispatchContext: Dispatch<Action> | any = createContext(undefined);

const reducer = (state: CreditProps = defaultValues, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_CREDIT_DRAFT: {
      const newState: CreditProps = {
        ...state,
        creditDraft: {
          ...state.creditDraft,
          ...(action.value as Credit),
        },
      };
      return newState;
    }

    case ActionTypes.SET_NEW_CREDIT_DRAFT: {
      const newState: CreditProps = {
        ...state,
        creditDraft: action.value as Credit,
      };
      return newState;
    }

    case ActionTypes.SET_CREDITS: {
      const newState: CreditProps = {
        ...state,
        credits: action.value as Credit[],
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
