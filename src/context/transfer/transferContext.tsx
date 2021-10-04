import React, {
  Context,
  useReducer,
  useContext,
  Dispatch,
  createContext,
  FC,
} from 'react';

// constants
import { ERRORS } from '../../constants';

// Context
import { FK } from '../session/sessionContext';

// Mocks
import { transferMock } from '../../mocks';

enum ActionTypes {
  SET_TRANSFER_DRAFT = 'SET_TRANSFER_DRAFT',
  SET_TRANSFERS = 'SET_TRANSFERS',
}

export interface TransferToSend {
  id?: number;
  _user?: number;
  _office: number;
  _route_origin?: number;
  _route_destination?: number;
  observation: string;
  amount: number;
}

export interface Transfer {
  id?: number;
  user?: FK;
  office?: FK;
  route_origin?: FK;
  route_destination?: FK;
  code?: string;
  observation: string;
  amount: number;
  office_of_route: string;
  disabled?: boolean;
  created_at?: string;
}

interface TransferProps {
  transferDraft: Transfer;
  transfers: Transfer[];
}

type Action = {
  type: ActionTypes.SET_TRANSFER_DRAFT | ActionTypes.SET_TRANSFERS;
  value: Transfer | Transfer[];
};

interface Props {
  children: JSX.Element;
}

const defaultValues: TransferProps = {
  transferDraft: transferMock,
  transfers: [],
};

const StateContext: Context<TransferProps> = createContext(defaultValues);
const DispatchContext: Dispatch<Action> | any = createContext(undefined);

const reducer = (state: TransferProps = defaultValues, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_TRANSFER_DRAFT: {
      const newState: TransferProps = {
        ...state,
        transferDraft: action.value as Transfer,
      };
      return newState;
    }

    case ActionTypes.SET_TRANSFERS: {
      const newState: TransferProps = {
        ...state,
        transfers: action.value as Transfer[],
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
