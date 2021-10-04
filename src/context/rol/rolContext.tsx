import React, {
  Context,
  useReducer,
  useContext,
  Dispatch,
  createContext,
  FC,
} from 'react';

// Constants
import { ERRORS } from '../../constants';

// Mocks
import { rolMock } from '../../mocks';

// Context
import { FK } from '../session/sessionContext';

enum ActionTypes {
  SET_ROLES = 'SET_ROLES',
  SET_ROL_DRAFT = 'SET_ROL_DRAFT',
}

export interface Rol {
  id?: number;
  name: string;
  description: string;
  created_at?: string;
  user?: FK;
}

interface RolProps {
  rolDraft: Rol;
  roles: Rol[];
}

type Action = {
  type: ActionTypes.SET_ROLES | ActionTypes.SET_ROL_DRAFT;
  value: Rol[] | Rol;
};

interface Props {
  children: JSX.Element;
}

const defaultValues: RolProps = {
  rolDraft: rolMock,
  roles: [],
};

const StateContext: Context<RolProps> = createContext(defaultValues);
const DispatchContext: Dispatch<Action> | any = createContext(undefined);

const reducer = (state: RolProps = defaultValues, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_ROLES: {
      const newState: RolProps = {
        ...state,
        roles: action.value as Rol[],
      };

      return newState;
    }

    case ActionTypes.SET_ROL_DRAFT: {
      const newState: RolProps = {
        ...state,
        rolDraft: action.value as Rol,
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
